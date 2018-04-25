export default class NovusBuffer {
  constructor(context, urls) {
    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }

  loadSound(url, index) {
    const request = new XMLHttpRequest();
    request.open('get', url, true);
    request.responseType = 'arraybuffer';
    const thisBuffer = this;
    request.onload = () => {
      thisBuffer.context.decodeAudioData(request.response, (buffer) => {
        thisBuffer.buffer[index] = buffer;
        if (index === thisBuffer.urls.length - 1) {
          thisBuffer.loaded();
        }
      });
    };
    request.send();
  }

  loadAll() {
    this.urls.forEach((url, index) => {
      this.loadSound(url, index);
    });
  }

  loaded() {
    console.info('Audio files loaded');
    console.debug(this.buffer);
  }

  getSoundByIndex(index) {
    return this.buffer[index];
  }
}
