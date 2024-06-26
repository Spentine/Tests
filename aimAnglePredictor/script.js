var canvas;
var ctx;

console.log(`
=====================================
              Keybinds:
            -------------
  B: Change Bullet Speed (px / ms)
  T: Change Target Speed (px / ms)
  S: Change Spawn Time (ms / target)
  E: Export Settings
  I: Import Settings
=====================================
`);

function main() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  window.requestAnimationFrame(tick);
}

var prevFrame = Date.now();
const startTime = Date.now();
var time = 0;
var prevTime = 0;
var mouseDown = false;

function tick() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  time = Date.now() - startTime;
  prevTime = prevFrame - startTime;
  
  gameTick();
  
  render();
  
  prevFrame = Date.now();
  
  window.requestAnimationFrame(tick);
}

class Position {
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
  
  add(pos) {
    return new Position(this.x + pos.x, this.y + pos.y);
  }
  
  subtract(pos) {
    return new Position(this.x - pos.x, this.y - pos.y);
  }
  
  multiply(vec) {
    return new Position(vec * this.x, vec * this.y);
  }
  
  divide(vec) {
    return new Position(this.x / vec, this.y / vec);
  }
  
  duplicate() {
    return new Position(this.x, this.y);
  }
  
  rotate(angle) {
    return new Position(this.x * Math.cos(angle) - this.y * Math.sin(angle), this.x * Math.sin(angle) + this.y * Math.cos(angle));
  }
  
  screenPos() {
    return [this.x + canvas.width * 0.5, this.y + canvas.height * 0.5];
  }
}

class Bullet {
  constructor(pos, vel) {
    this.pos = pos;
    this.vel = vel;
    this.updateTime = time;
    this.createTime = time;
  }
  
  advance() {
    this.pos = this.pos.add(this.vel.multiply(time - this.updateTime));
    this.updateTime = time;
  }
}

class Target {
  constructor(data) {
    this.type = data.type;
    if (data.type === "linear") {
      this.pos = data.pos;
      this.vel = data.vel;
      this.updateTime = time;
      this.createTime = time;
    }
  }
  
  advance() {
    if (this.type === "linear") {
      this.pos = this.pos.add(this.vel.multiply(time - this.updateTime));
      this.updateTime = time;
    }
  }
}

var bulletSpeed = 0.8;
var targetSpeed = 0.5;
var spawnTime = 500;

var playerPos = new Position(0, 0);
var targets = [];
var bullets = [];
var shotBullets = 0;
var hitTargets = 0;

function gameTick() {
  
  if (Math.floor(time / spawnTime) > Math.floor(prevTime / spawnTime)) {
    
    const targetPos = playerPos.add(
      new Position(
        Math.floor(canvas.width * (Math.random(canvas.width) - 0.5)),
        Math.floor(canvas.height * (Math.random(canvas.height) - 0.5))
      )
    );
    
    const diffPos = targetPos.subtract(playerPos);
    
    const randNum = Math.random() * 0.25 + (0.75 * Math.floor(Math.random() * 2));
    const rAngle = (randNum * Math.PI / 2 - Math.PI / 4);
    
    targets.push(
      new Target({
        "type": "linear",
        "pos": targetPos,
        "vel": new Position(targetSpeed, 0).rotate(rAngle - Math.PI / 2 - Math.atan2(diffPos.x, diffPos.y)),
      })
    );
  }
  
  for (let i=0; i<bullets.length; i++) {
    if (bullets[i].createTime + 2000 < time) {
      bullets.splice(i, 1);
      i--;
    } else {
      bullets[i].advance(time);
    }
  }
  
  for (let i=0; i<targets.length; i++) {
    if (targets[i].createTime + 10000 < time) {
      targets.splice(i, 1);
      i--;
    } else {
      
      targets[i].advance(time);
      
      const hit = !(bullets.every((b) => {
        const x = targets[i].pos.x - b.pos.x;
        const y = targets[i].pos.y - b.pos.y;
        return (x*x+y*y) > 25 * 25;
      }));
      
      
      if (hit) {
        hitTargets += 1;
        targets.splice(i, 1);
        i--;
      }
    }
  }
}

function render() {
  ctx.fillStyle = "#101010";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(...playerPos.screenPos(), 20, 0, 2 * Math.PI);
  ctx.fill();
  
  for (let i=0; i<bullets.length; i++) {
    const pos = bullets[i].pos;
    
    ctx.fillStyle = "#ffff88";
    ctx.beginPath();
    ctx.arc(...pos.screenPos(), 5, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  for (let i=0; i<targets.length; i++) {
    const pos = targets[i].pos;
    
    ctx.fillStyle = "#ff8888";
    ctx.beginPath();
    ctx.arc(...pos.screenPos(), 20, 0, 2 * Math.PI);
    ctx.fill();
  }
  
  ctx.font = "50px sans-serif";
  ctx.fillStyle = "#ffffff";
  
  
  
  const textDisplay = `${hitTargets} / ${shotBullets} | ${Math.round(10000 * hitTargets / shotBullets) / 100}%`
  
  const metrics = ctx.measureText(textDisplay);
  ctx.fillText(textDisplay, 10, 10 + metrics.hangingBaseline);
  
}

document.addEventListener("DOMContentLoaded", main);
document.addEventListener("mouseup", () => {
  mouseDown = false;
});
document.addEventListener("mousedown", (e) => {
  mouseDown = true;
  shotBullets += 1;
  
  const pos = playerPos.duplicate();
  const angle = Math.PI / 2 - Math.atan2(e.clientX - 0.5 * canvas.width, e.clientY - 0.5 * canvas.height);
  
  bullets.push(
    new Bullet(
      pos,
      new Position(bulletSpeed, 0).rotate(angle),
    )
  )
});

document.addEventListener("keydown", (e) => {
  if (!e.repeat) {
    if (e.code === "KeyB") {
      try {
        bulletSpeed = Number(prompt("enter bullet speed"));
      } catch {
        console.log("error with input");
      }
    } else if (e.code === "KeyT") {
      try {
        targetSpeed = Number(prompt("enter target speed"));
      } catch {
        console.log("error with input");
      }
    } else if (e.code === "KeyS") {
      try {
        spawnTime = Number(prompt("enter spawn time"));
      } catch {
        console.log("error with input");
      }
    } else if (e.code === "KeyE") {
      console.log(JSON.stringify({
        "bulletSpeed": bulletSpeed,
        "targetSpeed": targetSpeed,
        "spawnTime": spawnTime,
      }));
    } else if (e.code === "KeyI") {
      try {
        const settings = JSON.parse(prompt("enter settings"));
        bulletSpeed = settings.bulletSpeed;
        targetSpeed = settings.targetSpeed;
        spawnTime = settings.spawnTime;
      } catch {
        console.log("error with input");
      }
    }
  }
});