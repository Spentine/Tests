/*
  Usage
  
  gravSpeed and arrSpeed
    time / tick
  
  .next(): gets the next input
  .skip(): skips the input
  
  Output
  
  {
    "action": (gravity / arr),
    "time": (time at which it occurred)
  }
*/

export class gaEventHandler { // gravity/arr event handler
  constructor(gravOffset, gravSpeed, arrOffset, arrSpeed, time) {
    // initialize parameters
    this.gravOffset = gravOffset;
    this.gravSpeed = gravSpeed; // ms / drop
    this.arrOffset = arrOffset;
    this.arrSpeed = arrSpeed;
    this.time = time;
    
    // calculate next of the events
    this.calculateNextGrav();
    this.calculateNextArr();
    
    // previous event is grav?
    this.prev = null;
  }
  
  // s * max((floor((time - o) / s) + 1), 0) + o for next
  // use max bc you don't want to consider things before the offset
  calculateNextGrav() {
    this.gravNext = this.gravSpeed * Math.max(Math.floor((this.time - this.gravOffset) / this.gravSpeed) + 1, 0) + this.gravOffset;
  }
  calculateNextArr() {
    this.arrNext = this.arrSpeed * Math.max(Math.floor((this.time - this.arrOffset) / this.arrSpeed) + 1, 0) + this.arrOffset;
  }
  
  // creates new event
  
  createEvent(type, time) {
    this.prev = type === "gravity";
    this.time = time;
    return {
      "action": type,
      "time": time
    };
  }
  
  /*
    next()
    - Jumps to the next event
    - Provides the event type and time
    
    if if the last action was gravity and this.arrNext = 0:
      send arr
    
    update next values
    
    if: this.arrNext and this.gravNext are different
      use the one that's more recent
    
    else if: this.arrNext and this.gravNext are the same
      send gravity first
  */
  
  next() {
    // gravity then arr condition
    if (this.prev && this.arrNext === this.time) {
      // update it otherwise you fall into an infinite loop
      this.calculateNextArr();
      // send event
      return this.createEvent("arr", this.time);
    }
    
    // calculate the next occurrence
    if (this.arrNext <= this.time) {
      this.calculateNextArr();
    }
    if (this.gravNext <= this.time) {
      this.calculateNextGrav();
    }
    // console.log(this.arrNext, this.gravNext);
    
    // decide which one to send
    if (this.arrNext < this.gravNext) {
      return this.createEvent("arr", this.arrNext);
    } else {
      return this.createEvent("gravity", this.gravNext);
    }
  }
  
  /*
    skip()
    - Jumps over all of the same event
    - Changes the offset of gravity
    - Provides event type and time
    
    if the last action was arr:
      jump to the next gravity event
    
    else if this.arrNext is the same as time:
      use this.arrNext as the next event
      (note: it's not possible to jump to the next arr event because it's exclusive of 0)
    
    else (if the last action was gravity):
      jump to the next arr event
  */
  
  skip() {
    if (this.prev === null) {
      return; // there is no case where you skip immediately
    }
    
    // jump to gravity event
    if (!this.prev) {
      this.calculateNextGrav();
      return this.createEvent("gravity", this.gravNext);
    }
    
    // arr and gravity on same time
    if (this.arrNext === this.time) {
      return this.createEvent("arr", this.arrNext);
    }
    
    // jump to arr
    this.calculateNextArr();
    return this.createEvent("arr", this.arrNext);
  }
  
  // if the block hits the ground the gravity time gets reset
  resetGravityTime() {
    this.gravOffset = this.time;
  }
}