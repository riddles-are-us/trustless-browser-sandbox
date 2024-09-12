import DOCVOX from "../assets/audios/doctorvox.mp3";
import FOREVER from "../assets/audios/forever.mp3";
import PHUTHON from "../assets/audios/phuthon.mp3";
import RANGERS from "../assets/audios/rangers.mp3";


class AudioSystem {
  preparedAudioInfo: Array<AudioInfo>;
  status: "play" | "interrupt" | "pause" | "loading";
  index: number;
  constructor() {
    this.preparedAudioInfo = [];
    this.status = "loading";
    this.index = 0;
  }
  addAudio(aInfo: AudioInfo) {
    aInfo.audio.addEventListener("ended", () => {
      audioSystem.playNext();
    })
    this.preparedAudioInfo.push(aInfo);
  }
  playNext() {
    for (let i=0; i<this.preparedAudioInfo.length; i++) {
      let index = i + this.index + 1;
      index = index%this.preparedAudioInfo.length;
      if(this.preparedAudioInfo[index].analyserInfo != null) {
        this.index = index;
        this.preparedAudioInfo[index].play();
        return;
      }
    }
  }
  play() {
    if(this.status == "play") {
      return this.preparedAudioInfo[this.index].analyserInfo;
    } else if (this.status == "loading") {
      for (let i=0; i<this.preparedAudioInfo.length; i++) {
        if(this.preparedAudioInfo[i].analyserInfo != null) {
          this.index = i;
          this.preparedAudioInfo[i].play();
          this.status = "play";
          return this.preparedAudioInfo[i].analyserInfo;
        }
      }
      return null;
    }
  }
}

export const audioSystem = new AudioSystem();


class AudioInfo {
  audio: HTMLAudioElement;
  analyserInfo: AnalyserInfo | null;
  source: MediaElementAudioSourceNode | null;
  constructor(audio: HTMLAudioElement) {
    this.audio = audio;
    this.analyserInfo = null;
    this.source = null;
  }

  play() {
    if (this.source) {
      this.source.disconnect();
      this.source.connect(this.analyserInfo!.analyser);
    }
    this.audio.play();
  }

  handleCanplay(audio: HTMLAudioElement) {
    // connect the audio element to the analyser node and the analyser node
    // to the main Web Audio context
    const context = new AudioContext();
    if (this.source == null) {
      this.source = context.createMediaElementSource(audio);
      const analyser = context.createAnalyser();
      const analyserInfo = new AnalyserInfo(analyser);
      this.analyserInfo = analyserInfo;
      analyser.connect(context.destination);
    }
  }
}


let loaded = 0;

function prepareAudio(url: string): AudioInfo {
  const audio = new Audio();
  audio.src = url;
  audio.loop = false;
  audio.autoplay = false;
  const audioPrepareInfo = new AudioInfo(audio);
  audio.load();
  audio.addEventListener('canplay', ()=> {
    audioPrepareInfo.handleCanplay(audio);
    loaded += 1;
    if(loaded == 4) {
      audioSystem.play();
    }
  });
  return audioPrepareInfo;
}



export class AnalyserInfo {
  analyser: AnalyserNode;
  numPoints: number;
  audioDataArray: Uint8Array;
  avgDataArray: Array<number>;
  constructor(analyser: AnalyserNode) {
    this.analyser = analyser;
    this.numPoints = analyser.frequencyBinCount;
    this.audioDataArray = new Uint8Array(this.numPoints);
    this.avgDataArray = new Array(16);
    for (let i=0; i<16; i++) {
      this.avgDataArray[i] = 0;
    }
  }
}

export function loadAudio(cb:(audio:HTMLAudioElement) => any) {
  audioSystem.addAudio(prepareAudio(DOCVOX));
  audioSystem.addAudio(prepareAudio(FOREVER));
  audioSystem.addAudio(prepareAudio(RANGERS));
  audioSystem.addAudio(prepareAudio(PHUTHON));
}

export function loadAudio2(cb:(audio:HTMLAudioElement) => any) {
  audioSystem.addAudio(prepareAudio(PHUTHON));
  audioSystem.addAudio(prepareAudio(RANGERS));
  audioSystem.addAudio(prepareAudio(DOCVOX));
  audioSystem.addAudio(prepareAudio(FOREVER));
}
