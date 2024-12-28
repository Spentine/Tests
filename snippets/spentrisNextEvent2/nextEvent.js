/*
  Handles events from (a, b] where a is the previous event and b is the current event
*/

class gaEventHandler {
  constructor(gravOffset, gravSpeed, arrOffset, arrSpeed, time) {
    // initialize parameters
    this.gravOffset = gravOffset;
    this.gravSpeed = gravSpeed; // ms / drop
    this.arrOffset = arrOffset;
    this.arrSpeed = arrSpeed;
    this.time = time;
    
    // calculate the minimum value
    this.gravMin = this.gravityEvent(0);
    this.arrMin = this.arrEvent(0);
    
    // calculate the next events
    this.calculateNextGrav();
    this.calculateNextArr();
    
    // flags for selective arr prioritization
    this.arrPriority = false;
    
    // the previous event
    this.prev = null;
    
    // double skip
    this.skipped = false;
  }
  
  gravityEvent(n) {
    return this.gravSpeed * n + this.gravOffset;
  }
  
  arrEvent(n) {
    return this.arrSpeed * n + this.arrOffset;
  }
  
  calculateNextGrav() {
    if (this.gravSpeed === 0) return Infinity;
    if (this.gravSpeed === Infinity) return Math.max(this.time, this.gravOffset);
    
    return Math.max(this.gravMin, this.gravityEvent(Math.floor((this.time - this.gravOffset) / this.gravSpeed) + 1));
  }
  
  calculateNextArr() {
    if (this.arrSpeed === 0) return Infinity;
    if (this.arrSpeed === Infinity) return Math.max(this.time, this.arrOffset);
    
    return Math.max(this.arrMin, this.arrEvent(Math.floor((this.time - this.arrOffset) / this.arrSpeed) + 1));
  }
  
  createEvent(type, time) {
    this.prev = type;
    this.time = time;
    return {
      "action": type,
      "time": time
    };
  }
  
  /**
   * @returns {Object} the next event
   * @returns {String} Object.action the action to take
   * @returns {Number} Object.time the time of the event
   */
  next() {
    this.skipped = false;
    
    // arr prioritization
    if (this.arrPriority) {
      this.arrPriority = false;
      return this.createEvent("arr", this.time);
    }
    
    // prioritize gravity over arr
    const gravNext = this.calculateNextGrav();
    const arrNext = this.calculateNextArr();
    
    if (arrNext === gravNext) { // arr next guaranteed
      this.arrPriority = true;
      return this.createEvent("gravity", arrNext);
    } else if (arrNext < gravNext) {
      return this.createEvent("arr", arrNext);
    } else {
      return this.createEvent("gravity", gravNext);
    }
  }
  
  /**
   * @returns {Object} the next event
   * @returns {String} Object.action the action to take
   * @returns {Number} Object.time the time of the event
   */
  skip() {
    if (this.skipped) return {
      "action": "finish",
      "time": this.time
    };
    
    this.skipped = true;
    
    if (this.prev === "arr") {
      this.arrPriority = true;
      
      // gravity is next event
      const gravNext = this.calculateNextGrav();
      return this.createEvent("gravity", gravNext);
    } else {
      this.arrPriority = false;
      
      // arr is next event
      const arrNext = this.calculateNextArr();
      return this.createEvent("arr", arrNext);
    }
  }
}

export { gaEventHandler };