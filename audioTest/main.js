import { playAudio } from "./audio.js";

function main() {
  const button = document.getElementById("play");
  const volume = document.getElementById("volume");
  const frequency = document.getElementById("frequency");
  const volumeValue = document.getElementById("volumeValue");
  const frequencyValue = document.getElementById("frequencyValue");
  let updateAudio;
  
  const mapFrequency = (value) => {
    const mappedValue = Math.round(Math.pow(1000, value) * 20);
    return mappedValue;
  }
  
  const updateDisplay = () => {
    volumeValue.innerText = `Volume: ${Math.round(volume.value * 1000) / 10}%`;
    frequencyValue.innerText = `Frequency: ${mapFrequency(frequency.value)}Hz`;
  }
  
  const data = {
    volume: volume.value,
    frequency: mapFrequency(frequency.value)
  };
  
  button.addEventListener("click", () => {
    updateAudio = playAudio(data).updateAudio;
  });
  
  volume.addEventListener("input", () => {
    data.volume = volume.value;
    updateAudio(data);
    updateDisplay();
  });
  
  frequency.addEventListener("input", () => {
    data.frequency = mapFrequency(frequency.value);
    updateAudio(data);
    updateDisplay();
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}