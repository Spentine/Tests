function posMod(a, b) {
  return ((a % b) + b) % b;
}

function initializeUnicodeExplorer() {
  const container = document.getElementById("unicodeExplorer");
  
  for (let i=0; i<32; i++) {
    const row = document.createElement("row");
    row.classList.add("characterRow");
    
    for (let j=0; j<16; j++) {
      const box = document.createElement("div");
      box.classList.add("characterBox");
      const text = document.createElement("p");
      text.classList.add("characterText");
      box.appendChild(text);
      row.appendChild(box);
    }
    
    container.appendChild(row);
  }
  
  const unicodePosition = document.getElementById("unicodePosition");
  unicodePosition.addEventListener("change", () => {
    scrollLocation = Number(unicodePosition.value);
    renderUnicodeExplorer(0);
  });
  
}

function renderUnicodeExplorer(change) {
  const container = document.getElementById("unicodeExplorer");
  const unicodePosition = document.getElementById("unicodePosition");
  const middle = container.childNodes[8].getBoundingClientRect().top - container.childNodes[1].getBoundingClientRect().top;
  const diff = container.childNodes[2].getBoundingClientRect().top - container.childNodes[1].getBoundingClientRect().top;
  
  scrollLocation += change;
  if (scrollLocation < -32) {
    scrollLocation = 0;
  }
  unicodePosition.value = scrollLocation;
  container.scrollTo(0, middle + posMod(container.scrollTop - middle, diff));
  
  document.getElementById("unicodeExplorer").childNodes.forEach((row, rowIndex) => {
    row.childNodes.forEach((box, boxIndex) => {
      const char = boxIndex + 16 * (rowIndex + scrollLocation);
      const text = box.childNodes[0];
      if (char < 0) {
        text.innerText = char;
      } else {
        try {
          text.innerText = String.fromCodePoint(char);
        } catch (e) {
          text.innerText = char;
          console.log(e);
        }
      }
    });
  });
}

var scrollLocation = 0;
function updateUnicodeExplorer() {
  const container = document.getElementById("unicodeExplorer");
  
  // output.innerHTML = container.scrollTop;
  const middle = container.childNodes[8].getBoundingClientRect().top - container.childNodes[1].getBoundingClientRect().top;
  const diff = container.childNodes[2].getBoundingClientRect().top - container.childNodes[1].getBoundingClientRect().top;
  const change = Math.floor((container.scrollTop - middle) / diff);
  if (change !== 0) {
    if (change > 4) {
      renderUnicodeExplorer(20);
    } else if (change < -4) {
      renderUnicodeExplorer(-20);
    } else {
      renderUnicodeExplorer(change);
    }
  }
  
  requestAnimationFrame(updateUnicodeExplorer);
}

function main() {
  initializeUnicodeExplorer();
  updateUnicodeExplorer();
}

document.addEventListener("DOMContentLoaded", main);