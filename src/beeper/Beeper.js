import ogg1 from './../resources/one.ogg';
import ogg2 from './../resources/two.ogg';
import ogg3 from './../resources/three.ogg';
import NovusBuffer from './Buffer';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const EXP_REDUCE_SOUND = 'EXP_REDUCE_SOUND';

function afterStart(type, audioContext, gainNode) {
  switch (type) {
    case EXP_REDUCE_SOUND: {
      gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 1);
      break;
    }
    default:
      break;
  }
}

function genericBeep(
  length,
  frequency,
  volume,
  afterStartActions,
) {
  audioCtx.resume();

  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  const { currentTime } = audioCtx;

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  gainNode.gain.setValueAtTime(volume, currentTime);
  oscillator.frequency.setValueAtTime(frequency, currentTime);
  oscillator.type = 'sine';
  afterStartActions.forEach((action) => {
    afterStart(action, audioCtx, gainNode);
  });

  oscillator.start();

  setTimeout(
    () => { oscillator.stop(); },
    length,
  );
}

function buttonPressBeep() {
  const length = 1000;
  const frequency = 440.0;
  const volume = 1.0;

  genericBeep(
    length,
    frequency,
    volume,
    [EXP_REDUCE_SOUND],
  );
}

function countdownBeep() {
  const length = 150;
  const frequency = 1000;
  const volume = 1.0;

  genericBeep(length, frequency, volume, []);
}

function losingBeep() {
  const length = 1000;
  const frequency = 1000;
  const volume = 1.0;

  genericBeep(length, frequency, volume, []);
}

const buffer = new NovusBuffer(audioCtx, [ogg1, ogg2, ogg3]);
buffer.loadAll();

function playBuffer(index) {
  const source = audioCtx.createBufferSource();
  source.buffer = buffer.getSoundByIndex(index);
  source.connect(audioCtx.destination);
  source.start();
}

function playOne() {
  playBuffer(0);
}

function playTwo() {
  playBuffer(1);
}

function playThree() {
  playBuffer(2);
}

export {
  buttonPressBeep,
  countdownBeep,
  losingBeep,
  playOne,
  playTwo,
  playThree,
};
