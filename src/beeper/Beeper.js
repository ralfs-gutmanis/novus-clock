import ogg1 from './../resources/one.ogg';
import ogg2 from './../resources/two.ogg';
import ogg3 from './../resources/three.ogg';
import gameOver1 from './../resources/game-over-1.ogg';
import gameOver2 from './../resources/game-over-2.ogg';
import gameOver3 from './../resources/game-over-3.ogg';
import gameOver4 from './../resources/game-over-4.ogg';
import gameOver5 from './../resources/game-over-5.ogg';
import NovusBuffer from './Buffer';

const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const compressor = audioCtx.createDynamicsCompressor();
compressor.connect(audioCtx.destination);

const buffer = new NovusBuffer(audioCtx, [
  ogg1,
  ogg2,
  ogg3,
  gameOver1,
  gameOver2,
  gameOver3,
  gameOver4,
  gameOver5,
]);
buffer.loadAll();

const EXP_REDUCE_SOUND = 'EXP_REDUCE_SOUND';

// The maximum is exclusive and the minimum is inclusive
function getRandomInt(min, max) {
  const minCeil = Math.ceil(min);
  const maxCeil = Math.floor(max);
  return Math.floor(Math.random() * (maxCeil - minCeil)) + minCeil;
}

function playBuffer(index, startTimeDelay = 0) {
  const source = audioCtx.createBufferSource();
  source.buffer = buffer.getSoundByIndex(index);
  source.connect(compressor);
  source.start(audioCtx.currentTime + startTimeDelay);
}

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
  gainNode.connect(compressor);

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

function losingBeep(playMotivationalSpeak = false) {
  const length = 1000;
  const frequency = 1000;
  const volume = 1.0;

  genericBeep(length, frequency, volume, []);

  if (playMotivationalSpeak) {
    playBuffer(getRandomInt(3, 8), 1.5);
  }
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
