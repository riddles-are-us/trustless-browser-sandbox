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

export let analyserInfo:null | AnalyserInfo = null;

// Make a buffer to receive the audio data

function handleCanplay(audio: HTMLAudioElement, cb:(audio:HTMLAudioElement) => any) {
  // connect the audio element to the analyser node and the analyser node
  // to the main Web Audio context
  const context = new AudioContext();
  const source = context.createMediaElementSource(audio);
  const analyser = context.createAnalyser();
  analyserInfo = new AnalyserInfo(analyser);
  source.connect(analyser);
  analyser.connect(context.destination);
  cb(audio);
}


export function loadAudio(cb:(audio:HTMLAudioElement) => any) {
  const audio = new Audio();
  audio.loop = true;
  audio.autoplay = true;

  audio.crossOrigin = "anonymous";

  audio.addEventListener('canplay', ()=> {handleCanplay(audio, cb)});
  audio.src = "https://twgljs.org/examples/sounds/DOCTOR%20VOX%20-%20Level%20Up.mp3";
  audio.load();
}
