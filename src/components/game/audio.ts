type Wave = OscillatorType;

type Song = {
  bpm: number;
  lead: (number | null)[];
  bass: (number | null)[];
  drum: number[];
  wave: Wave;
};

const N = {
  C3: 48, D3: 50, E3: 52, F3: 53, G3: 55, A3: 57, B3: 59, Bb3: 58,
  C4: 60, D4: 62, Eb4: 63, E4: 64, F4: 65, "F#4": 66, G4: 67, A4: 69, Bb4: 70, B4: 71,
  C5: 72, "C#5": 73, D5: 74, E5: 76, F5: 77, "F#5": 78, G5: 79, A5: 81,
} as const;

const hubLead = [N.E4, N.E4, N.G4, N.E4, N.A4, N.G4, N.E4, N.D4, N.C4, N.E4, N.G4, N.C5, N.B4, N.A4, N.G4, N.E4];
const w1Lead = [N.D4, N["F#4"], N.A4, N.D5, N.A4, N["F#4"], N.E4, N.D4, N.G4, N["F#4"], N.E4, N.A4, N.D5, N.A4, N["F#4"], N.D4];
const w2Lead = [N.A4, N.C5, N.E5, N.C5, N.B4, N.C5, N.E5, N.A4, N.G4, N.A4, N.C5, N.E5, N.D5, N.C5, N.B4, N.A4];
const w3Lead = [N.G4, N.B4, N.D5, N.B4, N.C5, N.B4, N.A4, N.G4, N.E4, N.G4, N.A4, N.B4, N.D5, N.B4, N.G4, N.E4];
const w4Lead = [N.E4, N.G4, N.B4, N.E5, N.D5, N.B4, N.G4, N.E4, N.A4, N.G4, N["F#4"], N.E4, N.D4, N.E4, N.G4, N.B4];
const w5Lead = [N.F4, N.A4, N.C5, N.A4, N.Bb4, N.A4, N.G4, N.F4, N.E4, N.F4, N.G4, N.A4, N.C5, N.A4, N.F4, N.C4];
const w6Lead = [N.A4, N["C#5"], N.E5, N["C#5"], N["F#5"], N.E5, N["C#5"], N.A4, N.B4, N["C#5"], N.E5, N["F#5"], N.E5, N["C#5"], N.A4, N.E4];
const bossLead = [N.D4, N.F4, N.A4, N.D5, N.C5, N.A4, N.F4, N.D4, N.Bb3, N.D4, N.F4, N.A4, N.G4, N.F4, N.E4, N.D4];
const examLead = [N.C4, N.Eb4, N.G4, N.Eb4, N.Bb4, N.G4, N.F4, N.Eb4, N.D4, N.Eb4, N.G4, N.C5, N.Bb4, N.G4, N.Eb4, N.C4];

function song(bpm: number, lead: number[], bassShift: number, wave: Wave, drum: number[]): Song {
  return {
    bpm,
    lead: [...lead, ...lead.map((note, i) => (i % 4 === 3 ? note + 2 : note))],
    bass: lead.map((note) => note - bassShift),
    drum,
    wave,
  };
}

const kick = [1, 0, 0, 0, 1, 0, 2, 0, 1, 0, 0, 2, 1, 0, 2, 0];
const bright = [1, 3, 0, 3, 1, 0, 2, 3, 1, 3, 0, 2, 1, 3, 2, 3];
const soft = [1, 0, 3, 0, 0, 3, 2, 0, 1, 0, 3, 0, 0, 2, 3, 0];

const SONGS: Record<string, Song> = {
  hub: song(118, hubLead, 24, "triangle", bright),
  w1: song(108, w1Lead, 24, "square", kick),
  w2: song(126, w2Lead, 24, "square", bright),
  w3: song(100, w3Lead, 24, "triangle", soft),
  w4: song(112, w4Lead, 24, "square", kick),
  w5: song(116, w5Lead, 24, "triangle", bright),
  w6: song(104, w6Lead, 24, "triangle", soft),
  boss: song(148, bossLead, 12, "sawtooth", kick),
  exam: song(86, examLead, 24, "triangle", soft),
};

function midi(note: number) {
  return 440 * Math.pow(2, (note - 69) / 12);
}

class AudioEngine {
  muted = false;
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private timer: number | null = null;
  private step = 0;
  private nextTime = 0;
  private song: Song | null = null;
  private transpose = 0;
  private bpmScale = 1;
  private wave: Wave = "square";
  private signature = "";
  private currentId = "";

  constructor() {
    if (typeof window !== "undefined") {
      this.muted = window.localStorage.getItem("opos-music-muted") === "1";
    }
  }

  private ensure() {
    if (this.ctx) return;
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new Ctx();
    this.master = this.ctx.createGain();
    this.musicGain = this.ctx.createGain();
    this.sfxGain = this.ctx.createGain();
    this.musicGain.connect(this.master);
    this.sfxGain.connect(this.master);
    this.master.connect(this.ctx.destination);
    this.applyGains();
  }

  private applyGains() {
    if (!this.ctx || !this.musicGain || !this.sfxGain) return;
    const now = this.ctx.currentTime;
    this.musicGain.gain.cancelScheduledValues(now);
    this.sfxGain.gain.cancelScheduledValues(now);
    this.musicGain.gain.setValueAtTime(this.muted ? 0 : 0.16, now);
    this.sfxGain.gain.setValueAtTime(this.muted ? 0 : 0.12, now);
  }

  unlock() {
    this.ensure();
    if (this.ctx?.state === "suspended") void this.ctx.resume();
  }

  setMuted(next: boolean) {
    this.muted = next;
    try {
      window.localStorage.setItem("opos-music-muted", next ? "1" : "0");
    } catch {
      /* ignore */
    }
    try {
      this.ensure();
      this.unlock();
      this.applyGains();
      if (!next && this.currentId) this.play(this.currentId, true);
    } catch {
      /* the flag is already stored, so the button still silences later notes */
    }
    return this.muted;
  }

  toggle() {
    return this.setMuted(!this.muted);
  }

  play(id: string, force = false) {
    this.currentId = id;
    const resolved = this.resolve(id);
    const signature = `${resolved.base}|${resolved.transpose}|${resolved.bpmScale}|${resolved.wave}`;
    if (!force && signature === this.signature) return;
    this.signature = signature;
    this.song = SONGS[resolved.base] ?? SONGS.hub;
    this.transpose = resolved.transpose;
    this.bpmScale = resolved.bpmScale;
    this.wave = resolved.wave;
    this.step = 0;
    this.ensure();
    this.unlock();
    if (!this.ctx) return;
    this.nextTime = this.ctx.currentTime + 0.05;
    this.arm();
  }

  private resolve(id: string) {
    if (id.startsWith("boss")) {
      const block = Number(id.split("-")[1] || 1);
      return { base: "boss", transpose: [0, 3, -2, 5, -5, 2][(block - 1) % 6], bpmScale: 1, wave: "sawtooth" as Wave };
    }
    if (id === "exam" || id === "final") return { base: "exam", transpose: 0, bpmScale: 1, wave: "triangle" as Wave };
    const topic = id.match(/^(w\d)-t(\d+)$/);
    if (topic) {
      const n = Number(topic[2]);
      return {
        base: topic[1],
        transpose: [0, 2, -2, 5, 3, -3, 7][n % 7],
        bpmScale: [1, 1.07, 0.94, 1.12][n % 4],
        wave: (["square", "triangle", "sawtooth"] as Wave[])[n % 3],
      };
    }
    const map = id.match(/^map-(w\d)$/);
    if (map) return { base: map[1], transpose: 0, bpmScale: 0.96, wave: "triangle" as Wave };
    if (SONGS[id]) return { base: id, transpose: 0, bpmScale: 1, wave: SONGS[id].wave };
    return { base: "hub", transpose: 0, bpmScale: 1, wave: "triangle" as Wave };
  }

  private arm() {
    if (this.timer) window.clearInterval(this.timer);
    this.timer = window.setInterval(() => this.pump(), 60);
  }

  private pump() {
    if (!this.ctx || !this.song || !this.musicGain) return;
    if (this.ctx.state === "suspended") return;
    const eighth = 60 / (this.song.bpm * this.bpmScale) / 2;
    const horizon = this.ctx.currentTime + 0.28;
    while (this.nextTime < horizon) {
      this.schedule(this.nextTime);
      this.step = (this.step + 1) % this.song.lead.length;
      this.nextTime += eighth;
    }
  }

  private tone(time: number, freq: number, dur: number, type: Wave, gain: number, dest: GainNode) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const amp = this.ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);
    amp.gain.setValueAtTime(0.0001, time);
    amp.gain.exponentialRampToValueAtTime(Math.max(0.001, gain), time + 0.02);
    amp.gain.exponentialRampToValueAtTime(0.0001, time + dur);
    osc.connect(amp);
    amp.connect(dest);
    osc.start(time);
    osc.stop(time + dur + 0.02);
  }

  private noise(time: number, dur: number, gain: number) {
    if (!this.ctx || !this.sfxGain) return;
    const length = Math.floor(this.ctx.sampleRate * dur);
    const buffer = this.ctx.createBuffer(1, length, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length);
    const src = this.ctx.createBufferSource();
    const amp = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.value = 900;
    src.buffer = buffer;
    amp.gain.value = gain;
    src.connect(filter);
    filter.connect(amp);
    amp.connect(this.sfxGain);
    src.start(time);
  }

  private schedule(time: number) {
    if (!this.song || !this.musicGain) return;
    const lead = this.song.lead[this.step];
    const bass = this.song.bass[this.step % this.song.bass.length];
    const drum = this.song.drum[this.step % this.song.drum.length];
    const music = this.musicGain;
    const sfx = this.sfxGain;
    if (lead) this.tone(time, midi(lead + this.transpose), 0.18, this.wave, 0.08, music);
    if (bass && this.step % 2 === 0) this.tone(time, midi(bass + this.transpose), 0.22, "triangle", 0.07, music);
    if (drum && sfx) {
      if (drum === 1) this.tone(time, 90, 0.08, "sine", 0.12, sfx);
      if (drum === 2) this.noise(time, 0.05, 0.04);
      if (drum === 3) this.tone(time, 1400, 0.03, "square", 0.015, sfx);
    }
  }

  sfx(kind: "jump" | "coin" | "hurt" | "ok" | "bad" | "stomp" | "win") {
    this.ensure();
    this.unlock();
    if (!this.ctx || !this.sfxGain || this.muted) return;
    const dest = this.sfxGain;
    const t = this.ctx.currentTime;
    if (kind === "jump") this.tone(t, 520, 0.12, "square", 0.05, dest);
    if (kind === "coin") {
      this.tone(t, 880, 0.08, "triangle", 0.06, dest);
      this.tone(t + 0.07, 1320, 0.12, "triangle", 0.05, dest);
    }
    if (kind === "hurt") this.tone(t, 180, 0.2, "sawtooth", 0.06, dest);
    if (kind === "ok") {
      this.tone(t, 523, 0.1, "triangle", 0.06, dest);
      this.tone(t + 0.09, 659, 0.1, "triangle", 0.06, dest);
      this.tone(t + 0.18, 784, 0.16, "triangle", 0.06, dest);
    }
    if (kind === "bad") this.tone(t, 220, 0.18, "square", 0.05, dest);
    if (kind === "stomp") this.noise(t, 0.06, 0.05);
    if (kind === "win") [523, 659, 784, 1046].forEach((freq, i) => this.tone(t + i * 0.12, freq, 0.2, "triangle", 0.07, dest));
  }
}

export const audio = new AudioEngine();
