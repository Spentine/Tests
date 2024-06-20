const scenes = {
  "home": {
    
  },
}

function main() {
  const canvas = document.getElementById("canvas");
  const ctx = canvas.getContext("2d");
  
  resize();
  window.requestAnimationFrame(tick);
  
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  function mouseMovement(event) {
    mousePosition.x = event.clientX;
    mousePosition.y = event.clientY;
    lastPosition = structuredClone(mousePosition);
  }
  
  function render() {
    ctx.fillStyle = "#222222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  
  function tick() {
    render();
    window.requestAnimationFrame(tick);
  }
  
  window.onresize = resize;
}

document.addEventListener("DOMContentLoaded", main);