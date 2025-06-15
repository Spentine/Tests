let playing = false;

function playAudio(data) {
  if (playing) return;
  playing = true;
  const audioContext = new AudioContext();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
  
  gainNode.gain.setValueAtTime(data.volume, audioContext.currentTime);
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  oscillator.start();
  
  const updateAudio = (data) => {
    // set the volume to data.volume
    gainNode.gain.setValueAtTime(data.volume, audioContext.currentTime);
    // set the frequency to data.frequency
    oscillator.frequency.setValueAtTime(data.frequency, audioContext.currentTime);
  }
  
  return {
    updateAudio
  }
}



export { playAudio };