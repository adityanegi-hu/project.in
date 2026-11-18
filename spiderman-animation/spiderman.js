/**
 * The Amazing Spider-Man Front-End Experience
 * Pure Canvas + Web Audio API + Physics Engine
 */

(function () {
  'use strict';

  // --- AUDIO SYNTHESIS ENGINE (Web Audio API) ---
  class SoundEngine {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playThwip() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // High-pressure web shot sound
      const bufferSize = this.ctx.sampleRate * 0.12;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(3200, now);
      filter.frequency.exponentialRampToValueAtTime(450, now + 0.1);
      filter.Q.setValueAtTime(3.5, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.7, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.11);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.12);

      // Add snap transient
      const osc = this.ctx.createOscillator();
      const oscGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.06);

      oscGain.gain.setValueAtTime(0.4, now);
      oscGain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);

      osc.connect(oscGain);
      oscGain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    }

    playWhoosh(intensity = 1) {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const duration = 0.28;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, now);
      filter.frequency.linearRampToValueAtTime(950 * intensity, now + 0.12);
      filter.frequency.exponentialRampToValueAtTime(180, now + duration);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.linearRampToValueAtTime(0.3 * Math.min(intensity, 1.5), now + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    }

    playSpiderSense() {
      if (!this.enabled) return;
      this.init();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const frequencies = [587.33, 739.99, 880.0, 1174.66, 1479.98]; // D5, F#5, A5, D6, F#6
      frequencies.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        osc.frequency.linearRampToValueAtTime(freq * 1.08, now + idx * 0.04 + 0.12);

        gain.gain.setValueAtTime(0, now + idx * 0.04);
        gain.gain.linearRampToValueAtTime(0.18, now + idx * 0.04 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.04 + 0.16);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now + idx * 0.04);
        osc.stop(now + idx * 0.04 + 0.18);
      });
    }
  }

  const sound = new SoundEngine();

  // --- CANVAS SETUP & RESIZING ---
  const canvas = document.getElementById('spideyCanvas');
  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initSkyline();
  });

  // --- STATE & OPTIONS ---
  let mode = 'swing'; // 'swing' | 'free' | 'hang'
  let currentSuit = 'classic'; // 'classic' | 'miles' | 'symbiote' | 'iron'
  let spiderSenseActive = false;
  let spiderSenseTimer = 0;
  let swingCount = 0;

  // DOM Elements
  const statAltitude = document.getElementById('statAltitude');
  const statSpeed = document.getElementById('statSpeed');
  const statSwings = document.getElementById('statSwings');
  const audioToggleBtn = document.getElementById('btnAudioToggle');
  const audioIcon = document.getElementById('audioIcon');

  // --- SUIT COLOR PALETTES & ATTRIBUTES ---
  const SUITS = {
    classic: {
      red: '#df1825',
      redDark: '#a30c16',
      blue: '#0d48b5',
      blueDark: '#082b6e',
      webLine: '#1a1a1a',
      spiderLogo: '#0d0d0f',
      lensFrame: '#111215',
      lensFill: '#ffffff',
      glow: null,
      waldoes: false,
      venom: false,
    },
    miles: {
      red: '#e62429',
      redDark: '#990000',
      blue: '#16181d', // Miles is mostly black with red accents
      blueDark: '#0d0e12',
      webLine: '#0d0d10',
      spiderLogo: '#e62429',
      lensFrame: '#1b1d24',
      lensFill: '#ffffff',
      glow: '#00d2ff',
      waldoes: false,
      venom: true,
    },
    symbiote: {
      red: '#101218',
      redDark: '#08090d',
      blue: '#161922',
      blueDark: '#0d0e13',
      webLine: '#1f2430',
      spiderLogo: '#f0f3f8',
      lensFrame: '#1e2433',
      lensFill: '#ffffff',
      glow: '#8b5cf6',
      waldoes: false,
      venom: false,
    },
    iron: {
      red: '#961219',
      redDark: '#660b10',
      blue: '#2b0609',
      blueDark: '#1a0406',
      webLine: '#dfa32a',
      spiderLogo: '#dfa32a',
      lensFrame: '#dfa32a',
      lensFill: '#38e8ff',
      glow: '#ffbe0b',
      waldoes: true,
      venom: false,
    },
  };

  // --- COMIC ACTION POPS ("THWIP!", "SWOOSH!") ---
  const comicPops = [];
  function addComicPop(text, x, y, color = '#ffbe0b', scale = 1) {
    comicPops.push({
      text,
      x,
      y,
      color,
      scale: 0.1,
      targetScale: scale,
      opacity: 1,
      rotation: (Math.random() - 0.5) * 0.4,
      vx: (Math.random() - 0.5) * 2,
      vy: -2.5,
    });
  }

  // --- SPARK PARTICLES (Venom strike, city dust) ---
  const particles = [];
  function addSparks(x, y, count = 12, color = '#ffbe0b') {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = Math.random() * 5 + 2;
      particles.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        color,
        size: Math.random() * 3 + 1.5,
        life: 1,
        decay: Math.random() * 0.04 + 0.02,
      });
    }
  }

  // --- BACKGROUND SKYLINE GENERATOR (Parallax NYC) ---
  let buildingsLayer1 = [];
  let buildingsLayer2 = [];
  let buildingsLayer3 = [];
  let moon = { x: 0, y: 120, radius: 45 };
  let stars = [];

  function initSkyline() {
    stars = [];
    for (let i = 0; i < 90; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height * 0.65,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.8 + 0.2,
      });
    }
    moon.x = width * 0.78;

    // Distant background silhouettes
    buildingsLayer1 = [];
    let curX = -100;
    while (curX < width + 400) {
      const bWidth = Math.random() * 90 + 70;
      const bHeight = Math.random() * 260 + 200;
      buildingsLayer1.push({
        x: curX,
        width: bWidth,
        height: bHeight,
        hasAntenna: Math.random() > 0.4,
      });
      curX += bWidth - 10;
    }

    // Midground buildings with window grids
    buildingsLayer2 = [];
    curX = -100;
    while (curX < width + 400) {
      const bWidth = Math.random() * 110 + 90;
      const bHeight = Math.random() * 340 + 260;
      buildingsLayer2.push({
        x: curX,
        width: bWidth,
        height: bHeight,
        windows: generateWindows(bWidth, bHeight),
        hasWaterTower: Math.random() > 0.6,
      });
      curX += bWidth + Math.random() * 15;
    }

    // Foreground buildings (actual web anchor candidates)
    buildingsLayer3 = [];
    curX = -100;
    while (curX < width + 600) {
      const bWidth = Math.random() * 160 + 130;
      const bHeight = Math.random() * 450 + 340;
      buildingsLayer3.push({
        x: curX,
        width: bWidth,
        height: bHeight,
        windows: generateWindows(bWidth, bHeight, 24, 30),
        edgeColor: '#1a2233',
        fillColor: '#0a0d14',
      });
      curX += bWidth + Math.random() * 50 + 40;
    }
  }

  function generateWindows(bWidth, bHeight, colSpacing = 20, rowSpacing = 25) {
    const list = [];
    const cols = Math.floor((bWidth - 20) / colSpacing);
    const rows = Math.floor((bHeight - 40) / rowSpacing);
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        // Randomly lit or unlit
        const lit = Math.random() > 0.45;
        if (lit) {
          list.push({
            x: 10 + c * colSpacing,
            y: 20 + r * rowSpacing,
            w: 8,
            h: 12,
            warmth: Math.random() > 0.25 ? '#ffdc73' : '#aee4ff',
            alpha: Math.random() * 0.5 + 0.3,
          });
        }
      }
    }
    return list;
  }

  initSkyline();

  // --- SPIDER-MAN CHARACTER PHYSICS RIG ---
  const spidey = {
    x: width * 0.3,
    y: height * 0.45,
    vx: 8,
    vy: 0,
    angle: 0,
    angularVelocity: 0,
    scale: 0.85,

    // Web Anchor info
    web: {
      active: false,
      anchorX: 0,
      anchorY: 0,
      length: 280,
      targetLength: 280,
      tension: 0,
      sway: 0,
    },

    // Inverted Hang mode state
    hang: {
      tetherX: width * 0.5,
      tetherY: 0,
      length: 220,
      angle: 0,
      angVel: 0,
    },

    // Interactive Dragging
    isDragging: false,
    dragOffset: { x: 0, y: 0 },

    // Animations / Expressive Lenses
    eyeSquint: 0, // 0 = normal wide open, 1 = narrow focused
    blinkTimer: 0,
    flipAngle: 0,
    isFlipping: false,
    pose: 'swing', // 'swing' | 'dive' | 'hang' | 'reach'
    spiderSenseIntensity: 0,

    // Iron Spider Waldoes extension
    waldoProgress: 0, // 0 to 1
  };

  // --- INPUT HANDLING ---
  let mouse = { x: width * 0.5, y: height * 0.5, isDown: false };

  function triggerSpiderSense() {
    spiderSenseActive = true;
    spiderSenseTimer = 75; // frames
    sound.playSpiderSense();
    addComicPop('SPIDER-SENSE!', spidey.x, spidey.y - 70, '#ffbe0b', 1.3);
    addSparks(spidey.x, spidey.y - 40, 20, '#ff3b30');
  }

  function triggerFlip() {
    spidey.isFlipping = true;
    spidey.flipAngle = 0;
    sound.playWhoosh(1.4);
    addComicPop('FLIP!', spidey.x + 20, spidey.y - 40, '#00d2ff', 1.1);
  }

  canvas.addEventListener('mousedown', (e) => {
    sound.init();
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isDown = true;

    // Check if clicked close to Spider-Man (Drag him)
    const distToSpidey = Math.hypot(mouse.x - spidey.x, mouse.y - spidey.y);
    if (distToSpidey < 60 * spidey.scale) {
      spidey.isDragging = true;
      spidey.dragOffset.x = spidey.x - mouse.x;
      spidey.dragOffset.y = spidey.y - mouse.y;
      spidey.vx = 0;
      spidey.vy = 0;
      return;
    }

    // Shoot Web Anchor to clicked location
    if (mode === 'free' || mode === 'swing') {
      spidey.web.anchorX = mouse.x;
      spidey.web.anchorY = mouse.y;
      spidey.web.active = true;
      spidey.web.length = Math.hypot(spidey.x - mouse.x, spidey.y - mouse.y);
      spidey.web.targetLength = Math.max(120, spidey.web.length * 0.7);
      sound.playThwip();
      addComicPop('THWIP!', spidey.x, spidey.y - 20, '#ffffff', 1.2);
      swingCount++;
      if (statSwings) statSwings.innerText = swingCount;
    }
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;

    if (spidey.isDragging) {
      spidey.x = mouse.x + spidey.dragOffset.x;
      spidey.y = mouse.y + spidey.dragOffset.y;
    }

    // Hover near head triggers spider-sense
    const distToHead = Math.hypot(mouse.x - spidey.x, mouse.y - (spidey.y - 30));
    if (distToHead < 50 && !spiderSenseActive && Math.random() > 0.85) {
      triggerSpiderSense();
    }
  });

  window.addEventListener('mouseup', () => {
    if (spidey.isDragging) {
      spidey.isDragging = false;
      // Fling release velocity
      spidey.vx = (mouse.x - spidey.x) * 0.25;
      spidey.vy = (mouse.y - spidey.y) * 0.25;
      sound.playWhoosh(1.3);
    }
    mouse.isDown = false;
  });

  // Touch Support
  canvas.addEventListener('touchstart', (e) => {
    sound.init();
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
      mouse.isDown = true;

      const dist = Math.hypot(mouse.x - spidey.x, mouse.y - spidey.y);
      if (dist < 70) {
        spidey.isDragging = true;
        spidey.dragOffset.x = spidey.x - mouse.x;
        spidey.dragOffset.y = spidey.y - mouse.y;
      } else {
        spidey.web.anchorX = mouse.x;
        spidey.web.anchorY = mouse.y;
        spidey.web.active = true;
        spidey.web.length = Math.hypot(spidey.x - mouse.x, spidey.y - mouse.y);
        sound.playThwip();
        addComicPop('THWIP!', spidey.x, spidey.y - 20, '#ffffff', 1.2);
      }
    }
  });

  canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      mouse.x = touch.clientX;
      mouse.y = touch.clientY;
      if (spidey.isDragging) {
        spidey.x = mouse.x + spidey.dragOffset.x;
        spidey.y = mouse.y + spidey.dragOffset.y;
      }
    }
  });

  window.addEventListener('touchend', () => {
    spidey.isDragging = false;
    mouse.isDown = false;
  });

  // Keyboards
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      e.preventDefault();
      triggerFlip();
    }
  });

  // UI Event Listeners
  document.querySelectorAll('.mode-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.mode-btn').forEach((b) => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      mode = target.getAttribute('data-mode');
      resetForMode(mode);
    });
  });

  document.querySelectorAll('.suit-btn').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.suit-btn').forEach((b) => b.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      currentSuit = target.getAttribute('data-suit');
      sound.playWhoosh(0.8);
      addComicPop(currentSuit.toUpperCase(), spidey.x, spidey.y - 40, '#ffbe0b', 1.1);
    });
  });

  document.getElementById('btnSpiderSense').addEventListener('click', () => {
    triggerSpiderSense();
  });

  document.getElementById('btnFlipTrick').addEventListener('click', () => {
    triggerFlip();
  });

  audioToggleBtn.addEventListener('click', () => {
    sound.enabled = !sound.enabled;
    if (sound.enabled) {
      sound.init();
      audioIcon.innerText = '🔊';
      audioToggleBtn.classList.add('active');
    } else {
      audioIcon.innerText = '🔇';
      audioToggleBtn.classList.remove('active');
    }
  });

  function resetForMode(newMode) {
    if (newMode === 'hang') {
      spidey.web.active = false;
      spidey.hang.tetherX = width * 0.5;
      spidey.hang.tetherY = 0;
      spidey.hang.length = height * 0.42;
      spidey.hang.angle = 0.15;
      spidey.hang.angVel = 0;
      spidey.x = spidey.hang.tetherX + Math.sin(spidey.hang.angle) * spidey.hang.length;
      spidey.y = spidey.hang.tetherY + Math.cos(spidey.hang.angle) * spidey.hang.length;
      spidey.vx = 0;
      spidey.vy = 0;
    } else if (newMode === 'swing') {
      spidey.x = width * 0.25;
      spidey.y = height * 0.45;
      spidey.vx = 8;
      spidey.vy = 0;
      findNextWebAnchor();
    } else if (newMode === 'free') {
      spidey.web.active = false;
      spidey.x = width * 0.5;
      spidey.y = height * 0.4;
      spidey.vx = 0;
      spidey.vy = 0;
    }
  }

  // --- AUTONOMOUS WEB-SWINGING AI ---
  function findNextWebAnchor() {
    // Find a building roof edge in front of Spidey
    let bestAnchor = null;
    let minScore = Infinity;

    buildingsLayer3.forEach((b) => {
      // Points along top roof corner
      const cornerX = b.x + b.width * 0.85;
      const cornerY = height - b.height + 15;

      const dx = cornerX - spidey.x;
      const dy = cornerY - spidey.y;

      // Anchor should be ahead of spidey and above him
      if (dx > 120 && dx < 600 && dy < 60) {
        const score = Math.abs(dx - 320) + Math.abs(dy + 120);
        if (score < minScore) {
          minScore = score;
          bestAnchor = { x: cornerX, y: cornerY };
        }
      }
    });

    if (!bestAnchor) {
      // Fallback anchor high in the sky
      bestAnchor = {
        x: spidey.x + 320 + Math.random() * 100,
        y: Math.max(60, spidey.y - 280),
      };
    }

    spidey.web.anchorX = bestAnchor.x;
    spidey.web.anchorY = bestAnchor.y;
    spidey.web.active = true;
    spidey.web.length = Math.hypot(spidey.x - bestAnchor.x, spidey.y - bestAnchor.y);
    spidey.web.targetLength = Math.max(160, spidey.web.length * 0.88);

    sound.playThwip();
    sound.playWhoosh(1.1);
    addComicPop('THWIP!', spidey.x, spidey.y - 25, '#ffffff', 1.15);

    swingCount++;
    if (statSwings) statSwings.innerText = swingCount;
  }

  // --- PHYSICS ENGINE UPDATE ---
  const GRAVITY = 0.42;
  const AIR_RESISTANCE = 0.993;

  function updatePhysics() {
    // Waldo animation for Iron Spider suit
    const targetWaldo = currentSuit === 'iron' ? 1 : 0;
    spidey.waldoProgress += (targetWaldo - spidey.waldoProgress) * 0.1;

    // Spider-Sense timer
    if (spiderSenseActive) {
      spiderSenseTimer--;
      if (spiderSenseTimer <= 0) {
        spiderSenseActive = false;
      }
    }

    // Mid-air acrobatic flip trick
    if (spidey.isFlipping) {
      spidey.flipAngle += 0.22;
      if (spidey.flipAngle >= Math.PI * 2) {
        spidey.flipAngle = 0;
        spidey.isFlipping = false;
      }
    }

    // Eye blinking & squinting
    spidey.blinkTimer += 0.04;
    if (spidey.blinkTimer > 10) {
      spidey.blinkTimer = 0;
    }
    const isBlinking = spidey.blinkTimer > 9.7;
    const speed = Math.hypot(spidey.vx, spidey.vy);
    const targetSquint = isBlinking ? 0.95 : Math.min(0.7, speed / 25);
    spidey.eyeSquint += (targetSquint - spidey.eyeSquint) * 0.2;

    // --- MODE 1: INVERTED HANG ---
    if (mode === 'hang') {
      spidey.hang.tetherX = width * 0.5;
      const hang = spidey.hang;

      if (!spidey.isDragging) {
        // Simple pendulum equation: a = -(g/L)*sin(theta) - damping*w
        const gravityPendulum = 0.0035;
        const damping = 0.996;
        const angularAcc = -gravityPendulum * Math.sin(hang.angle);
        hang.angVel += angularAcc;
        hang.angVel *= damping;
        hang.angle += hang.angVel;

        // Gentle breeze perturbation
        hang.angVel += (Math.random() - 0.5) * 0.0003;

        spidey.x = hang.tetherX + Math.sin(hang.angle) * hang.length;
        spidey.y = hang.tetherY + Math.cos(hang.angle) * hang.length;
        spidey.angle = hang.angle;
      } else {
        // Dragging in hang mode
        const dx = spidey.x - hang.tetherX;
        const dy = Math.max(60, spidey.y - hang.tetherY);
        hang.angle = Math.atan2(dx, dy);
        hang.length = Math.hypot(dx, dy);
        spidey.angle = hang.angle;
      }

      // Telemetry
      if (statAltitude) statAltitude.innerText = `${Math.round(height - spidey.y)} FT`;
      if (statSpeed) statSpeed.innerText = `${Math.round(Math.abs(hang.angVel * 800))} MPH`;
      return;
    }

    // --- MODE 2 & 3: CITY SWING / FREE PLAYGROUND ---
    if (!spidey.isDragging) {
      spidey.vy += GRAVITY;
      spidey.vx *= AIR_RESISTANCE;
      spidey.vy *= AIR_RESISTANCE;

      if (spidey.web.active) {
        const dx = spidey.x - spidey.web.anchorX;
        const dy = spidey.y - spidey.web.anchorY;
        const currentDist = Math.hypot(dx, dy);

        // Gradually reel in web to target length
        spidey.web.length += (spidey.web.targetLength - spidey.web.length) * 0.05;

        if (currentDist > spidey.web.length) {
          // Pendulum constraint / spring tension
          const nx = dx / currentDist;
          const ny = dy / currentDist;

          // Project velocity onto radial vector
          const vRadial = spidey.vx * nx + spidey.vy * ny;

          if (vRadial > 0) {
            // Cancel outward radial velocity
            spidey.vx -= vRadial * nx;
            spidey.vy -= vRadial * ny;

            // Add tangential boost (pump swing forward)
            spidey.vx += 0.28;
          }

          // Elastic snap back to web length
          const delta = currentDist - spidey.web.length;
          spidey.x -= nx * delta * 0.8;
          spidey.y -= ny * delta * 0.8;
          spidey.web.tension = delta;
        }

        // Automatic release when swing reaches upward forward apex in city mode
        if (mode === 'swing') {
          const isPastAnchor = spidey.x > spidey.web.anchorX + 40;
          const isAscending = spidey.vy < -2;

          if (isPastAnchor && (isAscending || spidey.x > spidey.web.anchorX + 220)) {
            // Release web!
            spidey.web.active = false;
            sound.playWhoosh(1.2);
            // Launch upward boost
            spidey.vy -= 4.5;
            spidey.vx += 2.5;

            // Occasional acrobatic trick on release
            if (Math.random() > 0.4) {
              triggerFlip();
            }
          }
        }
      }

      // Update positions
      spidey.x += spidey.vx;
      spidey.y += spidey.vy;

      // In City Swing mode: camera scrolls city past Spidey
      if (mode === 'swing') {
        const targetX = width * 0.32;
        const scrollSpeed = spidey.x - targetX;

        if (scrollSpeed > 0) {
          spidey.x = targetX;
          spidey.web.anchorX -= scrollSpeed;

          // Parallax scroll background skyline
          buildingsLayer1.forEach((b) => (b.x -= scrollSpeed * 0.15));
          buildingsLayer2.forEach((b) => (b.x -= scrollSpeed * 0.45));
          buildingsLayer3.forEach((b) => (b.x -= scrollSpeed * 1.0));

          recycleBuildings(buildingsLayer1, 100, 260, 200);
          recycleBuildings(buildingsLayer2, 120, 340, 260);
          recycleBuildings(buildingsLayer3, 160, 450, 340);
        }

        // Auto trigger next web if free falling
        if (!spidey.web.active && spidey.vy > 1.5 && spidey.y > height * 0.42) {
          findNextWebAnchor();
        }
      }

      // Bounds checking & bounce off ground/screen
      if (spidey.y > height - 60) {
        spidey.y = height - 60;
        spidey.vy = -Math.abs(spidey.vy) * 0.55;
        spidey.vx *= 0.8;
        addComicPop('THUD!', spidey.x, spidey.y - 20, '#ff3b30', 0.9);
      }
      if (spidey.y < 50) {
        spidey.y = 50;
        spidey.vy = Math.abs(spidey.vy) * 0.5;
      }
      if (mode === 'free') {
        if (spidey.x < 50) {
          spidey.x = 50;
          spidey.vx = Math.abs(spidey.vx) * 0.6;
        }
        if (spidey.x > width - 50) {
          spidey.x = width - 50;
          spidey.vx = -Math.abs(spidey.vx) * 0.6;
        }
      }

      // Natural body orientation along velocity vector
      const targetAngle = Math.atan2(spidey.vy, spidey.vx) + Math.PI / 2;
      spidey.angle += (targetAngle - spidey.angle) * 0.12;
    }

    // Miles Morales bio-electricity sparks
    if (currentSuit === 'miles' && Math.random() > 0.4) {
      addSparks(spidey.x + (Math.random() - 0.5) * 40, spidey.y + (Math.random() - 0.5) * 40, 2, '#00e5ff');
    }

    // Telemetry display update
    const currentMph = Math.round(Math.hypot(spidey.vx, spidey.vy) * 4.8);
    const currentAltitude = Math.round(Math.max(0, height - spidey.y) * 1.6);
    if (statSpeed) statSpeed.innerText = `${currentMph} MPH`;
    if (statAltitude) statAltitude.innerText = `${currentAltitude} FT`;
  }

  function recycleBuildings(list, minWidth, maxHeight, minHeight) {
    list.forEach((b) => {
      if (b.x + b.width < -120) {
        // Find maximum X currently in list
        let maxX = 0;
        list.forEach((other) => {
          if (other.x > maxX) maxX = other.x + other.width;
        });
        b.x = maxX + Math.random() * 30;
        b.width = Math.random() * minWidth + 100;
        b.height = Math.random() * (maxHeight - minHeight) + minHeight;
        if (b.windows) {
          b.windows = generateWindows(b.width, b.height);
        }
      }
    });
  }

  // --- RENDERING ROUTINES ---

  // 1. Render Sky, Moon, Stars, City
  function drawSkyline() {
    // Deep nocturnal gradient
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, '#060810');
    skyGrad.addColorStop(0.5, '#0b1120');
    skyGrad.addColorStop(1, '#151a2e');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Stars
    ctx.fillStyle = '#ffffff';
    stars.forEach((s) => {
      ctx.globalAlpha = s.alpha * (0.8 + 0.2 * Math.sin(Date.now() * 0.003 + s.x));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Moon with soft atmospheric glow
    const moonGrad = ctx.createRadialGradient(moon.x, moon.y, moon.radius * 0.2, moon.x, moon.y, moon.radius * 2.8);
    moonGrad.addColorStop(0, 'rgba(255, 255, 230, 0.95)');
    moonGrad.addColorStop(0.3, 'rgba(255, 245, 200, 0.45)');
    moonGrad.addColorStop(1, 'rgba(255, 240, 180, 0)');
    ctx.fillStyle = moonGrad;
    ctx.beginPath();
    ctx.arc(moon.x, moon.y, moon.radius * 2.8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#fefdf7';
    ctx.beginPath();
    ctx.arc(moon.x, moon.y, moon.radius, 0, Math.PI * 2);
    ctx.fill();

    // Layer 1: Distant Skyline Silhouettes
    ctx.fillStyle = '#080a14';
    buildingsLayer1.forEach((b) => {
      const topY = height - b.height;
      ctx.fillRect(b.x, topY, b.width, b.height);
      if (b.hasAntenna) {
        ctx.strokeStyle = '#080a14';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(b.x + b.width / 2, topY);
        ctx.lineTo(b.x + b.width / 2, topY - 35);
        ctx.stroke();

        // Red blinking warning light
        if (Math.sin(Date.now() * 0.005 + b.x) > 0) {
          ctx.fillStyle = '#ff3b30';
          ctx.beginPath();
          ctx.arc(b.x + b.width / 2, topY - 35, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = '#080a14';
        }
      }
    });

    // Layer 2: Midground Buildings with Window Grids
    ctx.fillStyle = '#0f1422';
    buildingsLayer2.forEach((b) => {
      const topY = height - b.height;
      ctx.fillRect(b.x, topY, b.width, b.height);

      // Water tower on roof
      if (b.hasWaterTower) {
        ctx.fillStyle = '#151b2c';
        ctx.fillRect(b.x + 20, topY - 24, 28, 24);
        ctx.beginPath();
        ctx.moveTo(b.x + 16, topY - 24);
        ctx.lineTo(b.x + 34, topY - 38);
        ctx.lineTo(b.x + 52, topY - 24);
        ctx.fill();
        ctx.fillStyle = '#0f1422';
      }

      // Windows
      if (b.windows) {
        b.windows.forEach((w) => {
          ctx.fillStyle = w.warmth;
          ctx.globalAlpha = w.alpha * 0.7;
          ctx.fillRect(b.x + w.x, topY + w.y, w.w, w.h);
        });
        ctx.globalAlpha = 1;
      }
    });

    // Layer 3: Foreground Buildings (Detailed architecture)
    buildingsLayer3.forEach((b) => {
      const topY = height - b.height;

      // Building Body
      ctx.fillStyle = '#0a0d17';
      ctx.fillRect(b.x, topY, b.width, b.height);

      // Roof cornice trim
      ctx.fillStyle = '#1d263b';
      ctx.fillRect(b.x - 4, topY - 6, b.width + 8, 8);

      // Window grid
      if (b.windows) {
        b.windows.forEach((w) => {
          ctx.fillStyle = w.warmth;
          ctx.globalAlpha = w.alpha;
          ctx.fillRect(b.x + w.x, topY + w.y, w.w, w.h);
        });
        ctx.globalAlpha = 1;
      }
    });
  }

  // 2. Render Web Line
  function drawWebLine() {
    if (mode === 'hang') {
      const hang = spidey.hang;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(hang.tetherX, hang.tetherY);
      ctx.lineTo(spidey.x, spidey.y - 45); // attaches to Spidey's inverted feet
      ctx.stroke();

      // Web shine glow
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
      ctx.lineWidth = 5;
      ctx.stroke();
      return;
    }

    if (!spidey.web.active) return;

    const ax = spidey.web.anchorX;
    const ay = spidey.web.anchorY;

    // Web Anchor Web Splat at building attachment point
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(ax, ay, 6, 0, Math.PI * 2);
    ctx.fill();
    for (let i = 0; i < 6; i++) {
      const ang = (i * Math.PI) / 3;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ax, ay);
      ctx.lineTo(ax + Math.cos(ang) * 14, ay + Math.sin(ang) * 14);
      ctx.stroke();
    }

    // Elastic curving web line to Spidey's wrist
    const wristX = spidey.x + Math.sin(spidey.angle) * 15;
    const wristY = spidey.y - Math.cos(spidey.angle) * 15;

    ctx.save();
    ctx.strokeStyle = currentSuit === 'symbiote' ? '#e2e8f0' : '#ffffff';
    ctx.lineWidth = 2.4;
    ctx.shadowColor = '#ffffff';
    ctx.shadowBlur = 6;

    // Cattenary droop or straight tension
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    const midX = (ax + wristX) / 2;
    const midY = (ay + wristY) / 2 + Math.max(-10, 20 - spidey.web.tension * 0.4);
    ctx.quadraticCurveTo(midX, midY, wristX, wristY);
    ctx.stroke();

    // Cross-spiral strands along the web
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    for (let t = 0.15; t < 0.95; t += 0.08) {
      const px = ax + (wristX - ax) * t;
      const py = ay + (wristY - ay) * t;
      ctx.beginPath();
      ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 3. Render Spider-Man Character Rig
  function drawSpiderMan() {
    ctx.save();
    ctx.translate(spidey.x, spidey.y);

    const suit = SUITS[currentSuit];

    // Check if in Inverted Hang mode
    if (mode === 'hang') {
      ctx.rotate(spidey.angle + Math.PI); // Inverted upside down!
    } else {
      ctx.rotate(spidey.angle + (spidey.isFlipping ? spidey.flipAngle : 0));
    }

    ctx.scale(spidey.scale, spidey.scale);

    // Spider-Sense lightning arcs radiating from head
    if (spiderSenseActive) {
      drawSpiderSenseFX();
    }

    // Iron Spider Waldoes (Robotic Golden Spider Legs)
    if (spidey.waldoProgress > 0.02) {
      drawIronSpiderWaldoes(spidey.waldoProgress);
    }

    // --- LEGS ---
    ctx.save();
    if (mode === 'hang') {
      // Inverted hang pose: legs crossed over web line
      drawInvertedLegs(suit);
    } else {
      // Dynamic swinging / diving legs
      drawSwingingLegs(suit);
    }
    ctx.restore();

    // --- TORSO ---
    drawTorso(suit);

    // --- ARMS ---
    ctx.save();
    if (mode === 'hang') {
      drawInvertedArms(suit);
    } else {
      drawSwingingArms(suit);
    }
    ctx.restore();

    // --- HEAD & EXPRESSIVE MASK LENSES ---
    drawHead(suit);

    ctx.restore();
  }

  // Sub-Routine: Expressive Head & Mask
  function drawHead(suit) {
    ctx.save();
    ctx.translate(0, -38);

    // Head Oval
    ctx.fillStyle = suit.red;
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 21, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head Webbing Pattern
    ctx.strokeStyle = suit.webLine;
    ctx.lineWidth = 1;
    // Radial spokes
    for (let i = 0; i < 8; i++) {
      const rad = (i * Math.PI) / 4;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(Math.cos(rad) * 16, Math.sin(rad) * 21);
      ctx.stroke();
    }
    // Web rings
    ctx.beginPath();
    ctx.ellipse(0, 0, 7, 10, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.ellipse(0, 0, 13, 17, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Expressive Mask Lenses (Left & Right)
    const squint = spidey.eyeSquint;
    drawMaskLens(-1, suit, squint); // Left Lens
    drawMaskLens(1, suit, squint); // Right Lens

    ctx.restore();
  }

  function drawMaskLens(side, suit, squint) {
    ctx.save();
    ctx.scale(side, 1); // Mirror for right eye

    // Outer Black/Framed Border
    ctx.fillStyle = suit.lensFrame;
    ctx.beginPath();
    ctx.moveTo(3, -7);
    ctx.quadraticCurveTo(15, -12 + squint * 5, 14, 2 - squint * 3);
    ctx.quadraticCurveTo(11, 10 - squint * 4, 3, 2);
    ctx.closePath();
    ctx.fill();

    // Inner White/Reflective Lens
    ctx.fillStyle = suit.lensFill;
    if (suit.glow) {
      ctx.shadowColor = suit.glow;
      ctx.shadowBlur = 8;
    }
    ctx.beginPath();
    ctx.moveTo(4, -5);
    ctx.quadraticCurveTo(13, -9 + squint * 5, 12, 1 - squint * 3);
    ctx.quadraticCurveTo(9, 7 - squint * 3, 4, 1);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  // Sub-Routine: Muscular Torso & Emblem
  function drawTorso(suit) {
    // Red Center Chest
    ctx.fillStyle = suit.red;
    ctx.beginPath();
    ctx.moveTo(-16, -26);
    ctx.lineTo(16, -26);
    ctx.lineTo(12, 12);
    ctx.lineTo(-12, 12);
    ctx.closePath();
    ctx.fill();

    // Blue (or Suit) Flanks / Lats
    ctx.fillStyle = suit.blue;
    // Left rib flank
    ctx.beginPath();
    ctx.moveTo(-16, -24);
    ctx.lineTo(-9, -24);
    ctx.lineTo(-7, 10);
    ctx.lineTo(-12, 10);
    ctx.closePath();
    ctx.fill();
    // Right rib flank
    ctx.beginPath();
    ctx.moveTo(16, -24);
    ctx.lineTo(9, -24);
    ctx.lineTo(7, 10);
    ctx.lineTo(12, 10);
    ctx.closePath();
    ctx.fill();

    // Torso Webbing Grid
    ctx.strokeStyle = suit.webLine;
    ctx.lineWidth = 1;
    ctx.beginPath();
    // Horizontal web arcs
    ctx.moveTo(-13, -18);
    ctx.quadraticCurveTo(0, -14, 13, -18);
    ctx.moveTo(-11, -8);
    ctx.quadraticCurveTo(0, -4, 11, -8);
    ctx.moveTo(-10, 2);
    ctx.quadraticCurveTo(0, 5, 10, 2);
    // Vertical center line
    ctx.moveTo(0, -26);
    ctx.lineTo(0, 12);
    ctx.stroke();

    // Iconic Chest Spider Emblem
    drawSpiderEmblem(suit);

    // Belt / Waistline
    ctx.fillStyle = suit.red;
    ctx.fillRect(-12, 10, 24, 7);
    ctx.strokeStyle = suit.webLine;
    ctx.strokeRect(-12, 10, 24, 7);
  }

  function drawSpiderEmblem(suit) {
    ctx.save();
    ctx.translate(0, -9);
    ctx.fillStyle = suit.spiderLogo;
    ctx.strokeStyle = suit.spiderLogo;
    ctx.lineWidth = 1.6;

    // Spider abdomen & thorax
    ctx.beginPath();
    ctx.ellipse(0, 0, 3, 5, 0, 0, Math.PI * 2);
    ctx.ellipse(0, -4, 2, 2.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // 8 Spider Legs (4 upper pointing up-out, 4 lower pointing down-out)
    // Upper legs
    ctx.beginPath();
    ctx.moveTo(-1, -4);
    ctx.lineTo(-9, -11);
    ctx.lineTo(-12, -7);

    ctx.moveTo(1, -4);
    ctx.lineTo(9, -11);
    ctx.lineTo(12, -7);

    ctx.moveTo(-1, -3);
    ctx.lineTo(-10, -5);
    ctx.lineTo(-13, 0);

    ctx.moveTo(1, -3);
    ctx.lineTo(10, -5);
    ctx.lineTo(13, 0);

    // Lower legs
    ctx.moveTo(-1, 1);
    ctx.lineTo(-9, 5);
    ctx.lineTo(-10, 11);

    ctx.moveTo(1, 1);
    ctx.lineTo(9, 5);
    ctx.lineTo(10, 11);

    ctx.moveTo(-1, 3);
    ctx.lineTo(-7, 9);
    ctx.lineTo(-6, 15);

    ctx.moveTo(1, 3);
    ctx.lineTo(7, 9);
    ctx.lineTo(6, 15);
    ctx.stroke();

    ctx.restore();
  }

  // Sub-Routine: Arms
  function drawSwingingArms(suit) {
    // Lead arm (reaches up towards web anchor)
    ctx.save();
    ctx.translate(14, -22);
    const reachAngle = spidey.web.active
      ? Math.atan2(spidey.web.anchorY - spidey.y, spidey.web.anchorX - spidey.x) - spidey.angle - Math.PI / 2
      : -0.8;

    ctx.rotate(reachAngle);

    // Bicep (blue)
    ctx.fillStyle = suit.blue;
    ctx.fillRect(-4, -20, 8, 20);
    // Forearm & Glove (red + webbing)
    ctx.fillStyle = suit.red;
    ctx.fillRect(-5, -42, 10, 22);
    ctx.strokeStyle = suit.webLine;
    ctx.strokeRect(-5, -42, 10, 22);

    // Hand in classic 'Thwip' web shooting pose
    ctx.beginPath();
    ctx.arc(0, -45, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Trailing Arm (balances out behind)
    ctx.save();
    ctx.translate(-14, -22);
    ctx.rotate(0.9);
    ctx.fillStyle = suit.blue;
    ctx.fillRect(-4, 0, 8, 18);
    ctx.fillStyle = suit.red;
    ctx.fillRect(-5, 18, 10, 20);
    ctx.strokeStyle = suit.webLine;
    ctx.strokeRect(-5, 18, 10, 20);
    ctx.restore();
  }

  function drawInvertedArms(suit) {
    // Hanging upside down: Arms casually folded or hanging
    ctx.save();
    ctx.translate(-13, -20);
    ctx.rotate(0.4);
    ctx.fillStyle = suit.blue;
    ctx.fillRect(-3, 0, 7, 18);
    ctx.fillStyle = suit.red;
    ctx.fillRect(-4, 18, 9, 18);
    ctx.restore();

    ctx.save();
    ctx.translate(13, -20);
    ctx.rotate(-0.4);
    ctx.fillStyle = suit.blue;
    ctx.fillRect(-3, 0, 7, 18);
    ctx.fillStyle = suit.red;
    ctx.fillRect(-4, 18, 9, 18);
    ctx.restore();
  }

  // Sub-Routine: Legs
  function drawSwingingLegs(suit) {
    // Dynamic Spider-Man swing: Lead leg extended forward, rear leg bent up
    // Hip base
    ctx.fillStyle = suit.blue;
    ctx.beginPath();
    ctx.moveTo(-12, 16);
    ctx.lineTo(12, 16);
    ctx.lineTo(8, 28);
    ctx.lineTo(-8, 28);
    ctx.closePath();
    ctx.fill();

    // Lead Leg (Forward Kick)
    ctx.save();
    ctx.translate(7, 26);
    ctx.rotate(0.65);
    ctx.fillStyle = suit.blue;
    ctx.fillRect(-5, 0, 10, 26); // Thigh
    ctx.translate(0, 26);
    ctx.rotate(-0.4);
    ctx.fillStyle = suit.red; // Boot
    ctx.fillRect(-5, 0, 10, 28);
    ctx.strokeStyle = suit.webLine;
    ctx.strokeRect(-5, 0, 10, 28);
    // Foot
    ctx.fillRect(-5, 26, 15, 7);
    ctx.restore();

    // Rear Leg (Tucked Back)
    ctx.save();
    ctx.translate(-7, 26);
    ctx.rotate(-0.85);
    ctx.fillStyle = suit.blue;
    ctx.fillRect(-5, 0, 10, 24);
    ctx.translate(0, 24);
    ctx.rotate(1.2);
    ctx.fillStyle = suit.red;
    ctx.fillRect(-5, 0, 10, 26);
    ctx.strokeStyle = suit.webLine;
    ctx.strokeRect(-5, 0, 10, 26);
    ctx.restore();
  }

  function drawInvertedLegs(suit) {
    // Upside down hanging pose: legs bent, ankles crossed over the web thread
    ctx.fillStyle = suit.blue;
    // Left Leg
    ctx.save();
    ctx.translate(-8, 16);
    ctx.rotate(0.35);
    ctx.fillRect(-4, 0, 8, 22);
    ctx.translate(0, 22);
    ctx.rotate(-0.7);
    ctx.fillStyle = suit.red;
    ctx.fillRect(-4, 0, 8, 20);
    ctx.restore();

    // Right Leg
    ctx.save();
    ctx.translate(8, 16);
    ctx.rotate(-0.35);
    ctx.fillStyle = suit.blue;
    ctx.fillRect(-4, 0, 8, 22);
    ctx.translate(0, 22);
    ctx.rotate(0.7);
    ctx.fillStyle = suit.red;
    ctx.fillRect(-4, 0, 8, 20);
    ctx.restore();
  }

  // Sub-Routine: Iron Spider Mechanical Waldoes (Golden Arms)
  function drawIronSpiderWaldoes(progress) {
    ctx.save();
    ctx.strokeStyle = '#ffbe0b';
    ctx.fillStyle = '#ffbe0b';
    ctx.lineWidth = 3.5;
    ctx.shadowColor = '#ffd000';
    ctx.shadowBlur = 10;

    const angles = [-2.1, -2.6, 2.1, 2.6];
    angles.forEach((baseAngle) => {
      ctx.save();
      ctx.translate(0, -15);
      const len1 = 38 * progress;
      const len2 = 32 * progress;
      const len3 = 24 * progress;

      // Segment 1
      const x1 = Math.cos(baseAngle) * len1;
      const y1 = Math.sin(baseAngle) * len1;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(x1, y1);
      ctx.stroke();

      // Segment 2 (Elbow bend)
      const bend = baseAngle > 0 ? 0.7 : -0.7;
      const x2 = x1 + Math.cos(baseAngle + bend) * len2;
      const y2 = y1 + Math.sin(baseAngle + bend) * len2;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Segment 3 (Claw tip)
      const x3 = x2 + Math.cos(baseAngle + bend * 1.5) * len3;
      const y3 = y2 + Math.sin(baseAngle + bend * 1.5) * len3;
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x3, y3);
      ctx.stroke();

      // Glowing claw pincer
      ctx.beginPath();
      ctx.arc(x3, y3, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });

    ctx.restore();
  }

  // Sub-Routine: Steve Ditko Style Spider-Sense Visual Warning
  function drawSpiderSenseFX() {
    ctx.save();
    ctx.translate(0, -42);
    const count = 7;
    for (let i = 0; i < count; i++) {
      const angle = -Math.PI + (i * Math.PI) / (count - 1);
      const dist = 32 + Math.sin(Date.now() * 0.02 + i) * 6;

      ctx.strokeStyle = i % 2 === 0 ? '#ffbe0b' : '#ff3b30';
      ctx.lineWidth = 2.2;
      ctx.beginPath();

      // Jagged zig-zag lightning squiggle
      const startX = Math.cos(angle) * 16;
      const startY = Math.sin(angle) * 16;
      ctx.moveTo(startX, startY);

      const midX1 = Math.cos(angle + 0.15) * (dist * 0.55);
      const midY1 = Math.sin(angle + 0.15) * (dist * 0.55);
      ctx.lineTo(midX1, midY1);

      const midX2 = Math.cos(angle - 0.15) * (dist * 0.78);
      const midY2 = Math.sin(angle - 0.15) * (dist * 0.78);
      ctx.lineTo(midX2, midY2);

      const endX = Math.cos(angle) * dist;
      const endY = Math.sin(angle) * dist;
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
    ctx.restore();
  }

  // 4. Render Particles & Comic Action Popups
  function drawFX() {
    // Particle Sparks
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;
      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.life;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Comic Text Popups
    for (let i = comicPops.length - 1; i >= 0; i--) {
      const pop = comicPops[i];
      pop.x += pop.vx;
      pop.y += pop.vy;
      pop.scale += (pop.targetScale - pop.scale) * 0.25;
      pop.opacity -= 0.022;

      if (pop.opacity <= 0) {
        comicPops.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(pop.x, pop.y);
      ctx.rotate(pop.rotation);
      ctx.scale(pop.scale, pop.scale);

      ctx.font = '900 32px "Bangers", cursive, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Drop shadow / 3D comic border
      ctx.fillStyle = '#000000';
      ctx.fillText(pop.text, 3, 3);
      ctx.fillText(pop.text, -2, -2);
      ctx.fillText(pop.text, 2, -2);
      ctx.fillText(pop.text, -2, 2);

      // Inner text
      ctx.fillStyle = pop.color;
      ctx.globalAlpha = pop.opacity;
      ctx.fillText(pop.text, 0, 0);

      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  // --- MAIN ANIMATION LOOP (60 FPS) ---
  function animate() {
    updatePhysics();

    ctx.clearRect(0, 0, width, height);

    drawSkyline();
    drawWebLine();
    drawSpiderMan();
    drawFX();

    requestAnimationFrame(animate);
  }

  // Start with pleasant initial web swing
  resetForMode('swing');
  requestAnimationFrame(animate);
})();
