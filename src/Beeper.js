// TODO pass in genericBeep and check if defined
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function genericBeep(
  length,
  frequency,
  volume,
  afterStart,
) {
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.value = volume;
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';

  oscillator.start();

  afterStart(gainNode);

  setTimeout(
    () => { oscillator.stop(); },
    length,
  );
}

function buttonPressBeep() {
  const length = 1000;
  const frequency = 440.0;
  const volume = 0.5;

  genericBeep(
    length,
    frequency,
    volume,
    (g) => { g.gain.exponentialRampToValueAtTime(0.00001, audioCtx.currentTime + 1); },
  );
}

function countdownBeep() {
  const length = 150;
  const frequency = 1000;
  const volume = 0.5;

  genericBeep(length, frequency, volume, () => {});
}

function losingBeep() {
  const length = 1000;
  const frequency = 1000;
  const volume = 0.5;

  genericBeep(length, frequency, volume, () => {});
}

export { buttonPressBeep, countdownBeep, losingBeep };
