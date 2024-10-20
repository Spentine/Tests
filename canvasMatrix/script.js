async function getImage(link) {
  const image = new Image();
  const promise = new Promise((resolve, reject) => {
    image.onload = () => resolve(image);
    image.onerror = reject;
  });
  image.src = link;
  return promise;
}

async function main() {
  const canvas = document.getElementById("render");
  canvas.width = 1200;
  canvas.height = 1200;
  const ctx = canvas.getContext("2d");
  const img = await getImage("./image.png");
  
  const m = [
    document.getElementById("a"),
    document.getElementById("b"),
    document.getElementById("c"),
    document.getElementById("d"),
    document.getElementById("e"),
    document.getElementById("f"),
  ];
  
  function getMatrix() {
    return [
      m[0].value,
      m[1].value,
      m[2].value,
      m[3].value,
      m[4].value,
      m[5].value,
    ];
  }
  
  function render() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // console.log(getMatrix().join(" "));
    ctx.setTransform(...getMatrix());
    ctx.drawImage(img, 0, 0);
    
    window.requestAnimationFrame(render);
  }
  
  render();
}

document.addEventListener("DOMContentLoaded", main);