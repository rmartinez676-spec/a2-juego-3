import { NPC_BY_ID } from "@/lib/content";
import type { Ent, Run } from "./engine";
import { T } from "./engine";
import { getImage, BG_IMAGES, getSprite, SPRITES, getNpcSprite } from "./sprites";

type Theme = {
  sky: [string, string, string, string];
  mountainFar: string;
  mountainNear: string;
  hill: string;
  hill2: string;
  ground: string;
  groundShadow: string;
  top: string;
  topHighlight: string;
  accent: string;
  accentGold: string;
  ink: string;
  cloud: string;
  cloudShadow: string;
};

const THEMES: Record<string, Theme> = {
  plaza: {
    sky: ["#5b9bd5", "#8ec8e8", "#f7deb8", "#f3b183"],
    mountainFar: "#8199b5",
    mountainNear: "#6b839f",
    hill: "#c87d60",
    hill2: "#ad5a4b",
    ground: "#baa27a",
    groundShadow: "#8a7452",
    top: "#efe5d0",
    topHighlight: "#fff9ee",
    accent: "#1c8282",
    accentGold: "#e5b452",
    ink: "#33221b",
    cloud: "#ffffff",
    cloudShadow: "#e2d5cb",
  },
  carta: {
    sky: ["#4a7eb5", "#79aada", "#f5e6cc", "#e8c582"],
    mountainFar: "#7b728e",
    mountainNear: "#5d4e68",
    hill: "#8c3846",
    hill2: "#57222c",
    ground: "#cebc94",
    groundShadow: "#9b8a65",
    top: "#f7efe0",
    topHighlight: "#fffcf5",
    accent: "#c99e52",
    accentGold: "#f3cc69",
    ink: "#321d15",
    cloud: "#ffffff",
    cloudShadow: "#ded3c2",
  },
  europa: {
    sky: ["#143b6c", "#24619f", "#528ecf", "#8fb7e6"],
    mountainFar: "#274872",
    mountainNear: "#183253",
    hill: "#13355e",
    hill2: "#0c233f",
    ground: "#b8c9dc",
    groundShadow: "#7c93ae",
    top: "#f3f8fd",
    topHighlight: "#ffffff",
    accent: "#eab438",
    accentGold: "#ffd566",
    ink: "#0c1a2c",
    cloud: "#f4f9ff",
    cloudShadow: "#c5d7ea",
  },
  jardin: {
    sky: ["#4ba3cd", "#8ad2ed", "#cdf0be", "#f8eba7"],
    mountainFar: "#529474",
    mountainNear: "#357053",
    hill: "#347e55",
    hill2: "#1e5b3a",
    ground: "#5e9b4d",
    groundShadow: "#3d702f",
    top: "#dff5a6",
    topHighlight: "#f5ffd9",
    accent: "#d97136",
    accentGold: "#f2a64b",
    ink: "#1d2e18",
    cloud: "#ffffff",
    cloudShadow: "#d8ebd0",
  },
  sello: {
    sky: ["#44528c", "#6e7ebf", "#cdc7ec", "#f1e5d7"],
    mountainFar: "#524d77",
    mountainNear: "#373256",
    hill: "#37346b",
    hill2: "#24214d",
    ground: "#cec6b7",
    groundShadow: "#989083",
    top: "#f6efe3",
    topHighlight: "#ffffff",
    accent: "#6b479e",
    accentGold: "#e2b85a",
    ink: "#1e182d",
    cloud: "#ffffff",
    cloudShadow: "#dad3e8",
  },
  campus: {
    sky: ["#e37b4b", "#f3aa6e", "#f7d8a1", "#9cc7e4"],
    mountainFar: "#9e5c45",
    mountainNear: "#773e2b",
    hill: "#b95c37",
    hill2: "#833b25",
    ground: "#d8b78b",
    groundShadow: "#9f7d54",
    top: "#f8ecd7",
    topHighlight: "#fff8ee",
    accent: "#be4730",
    accentGold: "#f4ba47",
    ink: "#331e16",
    cloud: "#ffffff",
    cloudShadow: "#e9cfbc",
  },
  hacienda: {
    sky: ["#175445", "#2a826c", "#96d8c0", "#f4e4a9"],
    mountainFar: "#275c4e",
    mountainNear: "#134035",
    hill: "#12513f",
    hill2: "#0b3629",
    ground: "#d1ba7c",
    groundShadow: "#97834a",
    top: "#f9f1cd",
    topHighlight: "#fffce8",
    accent: "#ce9812",
    accentGold: "#f8cf49",
    ink: "#15261d",
    cloud: "#ffffff",
    cloudShadow: "#cce2d6",
  },
  examen: {
    sky: ["#1c2637", "#3d324c", "#7e627d", "#e3cfa8"],
    mountainFar: "#3a2d3e",
    mountainNear: "#241a27",
    hill: "#342332",
    hill2: "#1d1219",
    ground: "#c3af8f",
    groundShadow: "#8b785d",
    top: "#f2e4cb",
    topHighlight: "#fffbf2",
    accent: "#aa3341",
    accentGold: "#d9a543",
    ink: "#170f1a",
    cloud: "#f5ede4",
    cloudShadow: "#baa89b",
  },
};

function round(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
}

export function drawRun(ctx: CanvasRenderingContext2D, run: Run, width: number, height: number) {
  if (width < 2 || height < 2) return;
  const dpr = ctx.canvas.width / width || 1;
  const theme = THEMES[run.theme] ?? THEMES.plaza;
  const viewH = height < 260 ? 390 : 470;
  const scale = height / viewH;
  const viewW = width / scale;
  const worldW = run.W * T;
  let camX = run.player.x - viewW * 0.38;
  camX = Math.max(0, Math.min(worldW - viewW, camX));
  // Reduce ground height to a slim 58px sidewalk so 88% of screen is background and architecture
  const groundY = 11 * T;
  const camY = Math.max(0, groundY - viewH + 58);
  const shake = run.shake > 0 ? Math.sin(run.time * 50) * 4 : 0;

  // Sky base gradient
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, theme.sky[0]);
  sky.addColorStop(0.35, theme.sky[1]);
  sky.addColorStop(0.72, theme.sky[2]);
  sky.addColorStop(1, theme.sky[3]);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  // World layer
  ctx.setTransform(scale * dpr, 0, 0, scale * dpr, (-camX * scale + shake) * dpr, -camY * scale * dpr);
  drawBackdrop(ctx, run, theme, camX, viewW, viewH, camY);
  drawTiles(ctx, run, theme, camX, viewW);

  // Entities behind player
  run.entities
    .filter((item) => !item.dead && item.kind !== "paper")
    .forEach((item) => drawEntity(ctx, run, item, theme));

  // Player
  drawPlayer(ctx, run);

  // Floating paper notes / royal decrees thrown by the boss
  run.entities
    .filter((item) => item.kind === "paper" && !item.dead)
    .forEach((item) => {
      ctx.save();
      ctx.translate(item.x + 9, item.y + 9);
      ctx.rotate(run.time * 8 + item.id);

      // Magical glowing trail
      ctx.fillStyle = "rgba(244, 192, 70, 0.4)";
      ctx.beginPath();
      ctx.arc(-item.vx * 0.04, 0, 11, 0, Math.PI * 2);
      ctx.fill();

      // Official parchment scroll with red wax seal
      ctx.fillStyle = "#fffcf4";
      ctx.fillRect(-10, -7, 20, 14);
      ctx.strokeStyle = "#8b5a2b";
      ctx.lineWidth = 1.5;
      ctx.strokeRect(-10, -7, 20, 14);

      // Red wax seal in center
      ctx.fillStyle = "#c43328";
      ctx.beginPath();
      ctx.arc(0, 0, 4, 0, Math.PI * 2);
      ctx.fill();

      // Written law lines
      ctx.fillStyle = "#5c4033";
      ctx.fillRect(-7, -4, 4, 1.5);
      ctx.fillRect(3, -4, 4, 1.5);
      ctx.fillRect(-7, 3, 14, 1.5);
      ctx.restore();
    });

  if (run.hint && run.hintT > 0) drawBit(ctx, run, theme);

  // Screen UI overlay
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawHud(ctx, run, width);
  if (run.bannerT > 0) drawBanner(ctx, run, width);
  if (run.toast && run.toastT > 0) drawToast(ctx, run, width, height);
  if (run.prompt) drawPrompt(ctx, run.prompt, width, height);
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerRadius: number, innerRadius: number, color: string) {
  let rot = (Math.PI / 2) * 3;
  let x = cx;
  let y = cy;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    x = cx + Math.cos(rot) * outerRadius;
    y = cy + Math.sin(rot) * outerRadius;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerRadius;
    y = cy + Math.sin(rot) * innerRadius;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerRadius);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function drawBackdrop(
  ctx: CanvasRenderingContext2D,
  run: Run,
  theme: Theme,
  camX: number,
  viewW: number,
  viewH: number,
  camY: number,
) {
  // 1. Soft atmospheric photographic texture if image exists (blended behind skyline)
  const bgPath = BG_IMAGES[run.theme] ?? BG_IMAGES.madrid;
  const bgImg = getImage(bgPath) ?? getImage(BG_IMAGES.madrid);
  if (bgImg) {
    ctx.save();
    ctx.globalAlpha = 0.28;
    const bgH = viewH + 20;
    const bgW = (bgH / bgImg.height) * bgImg.width;
    const offset = ((-camX * 0.16) % bgW) - bgW;
    const startX = camX + offset;
    for (let x = startX; x < camX + viewW + bgW; x += bgW) {
      ctx.drawImage(bgImg, x, camY - 10, bgW, bgH);
    }
    ctx.restore();
  }

  const tKey = run.theme;
  const time = run.time;

  // 2. Thematic Celestial Bodies and Atmospheric Phenomena
  const sunX = camX + viewW * 0.72 - (camX * 0.04) % (viewW * 1.2);
  const sunY = camY + 84;

  if (tKey === "hacienda") {
    // Grand Golden Fiscal Sun with Shimmering Currency Aura
    const glow = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 190);
    glow.addColorStop(0, "rgba(255, 235, 120, 0.95)");
    glow.addColorStop(0.3, "rgba(244, 190, 60, 0.45)");
    glow.addColorStop(0.7, "rgba(35, 140, 90, 0.18)");
    glow.addColorStop(1, "rgba(10, 45, 30, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 190, 0, Math.PI * 2);
    ctx.fill();

    // Golden solar coin disc
    ctx.fillStyle = "#ffd966";
    ctx.beginPath();
    ctx.arc(sunX, sunY, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#e5b452";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Floating golden currency sparkle constellation
    ctx.fillStyle = "rgba(255, 225, 90, 0.75)";
    for (let i = 0; i < 7; i++) {
      const cx = camX + ((i * 180 + Math.sin(time + i) * 20) % viewW);
      const cy = camY + 40 + ((i * 35) % 90);
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5 + Math.sin(time * 3 + i) * 1.2, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (tKey === "europa") {
    // 12 Golden Stars of the European Union in orbit
    const ringCenterX = camX + viewW * 0.65;
    const ringCenterY = camY + 76;
    const rx = 65;
    const ry = 36;
    for (let i = 0; i < 12; i++) {
      const angle = time * 0.4 + (i * Math.PI * 2) / 12;
      const sx = ringCenterX + Math.cos(angle) * rx;
      const sy = ringCenterY + Math.sin(angle) * ry;

      // Glow
      ctx.fillStyle = "rgba(255, 220, 80, 0.35)";
      ctx.beginPath();
      ctx.arc(sx, sy, 8, 0, Math.PI * 2);
      ctx.fill();

      // 5-point Gold Star
      drawStar(ctx, sx, sy, 5, 5.5, 2.8, "#ffd54f");
    }
  } else if (tKey === "jardin") {
    // Bright Ecological Sun with Agenda 2030 Rainbow Halo
    const glow = ctx.createRadialGradient(sunX, sunY, 20, sunX, sunY, 160);
    glow.addColorStop(0, "rgba(255, 255, 240, 0.98)");
    glow.addColorStop(0.25, "rgba(255, 235, 150, 0.55)");
    glow.addColorStop(0.6, "rgba(120, 220, 160, 0.22)");
    glow.addColorStop(1, "rgba(80, 180, 120, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 160, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(sunX, sunY, 30, 0, Math.PI * 2);
    ctx.fill();

    // Subtle rainbow refraction arc
    ctx.save();
    ctx.globalAlpha = 0.35;
    const rainbowColors = ["#e5243b", "#dda63a", "#4c9f38", "#c5192d", "#ff3a21", "#26bde2", "#fcc30b", "#a21942", "#fd6925", "#dd1367", "#fd9d24", "#bf8b2e", "#3f7e44", "#0a97d9", "#56c02b", "#00689d", "#19486a"];
    for (let r = 0; r < 6; r++) {
      ctx.strokeStyle = rainbowColors[(r * 3) % rainbowColors.length];
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.arc(sunX, sunY, 48 + r * 3, Math.PI * 0.15, Math.PI * 0.85);
      ctx.stroke();
    }
    ctx.restore();
  } else if (tKey === "sello") {
    // Moody Archival Amber Moon behind misty clouds
    const moonX = camX + viewW * 0.76;
    const moonY = camY + 68;
    const moonGlow = ctx.createRadialGradient(moonX, moonY, 10, moonX, moonY, 100);
    moonGlow.addColorStop(0, "rgba(255, 210, 140, 0.9)");
    moonGlow.addColorStop(0.4, "rgba(190, 140, 110, 0.35)");
    moonGlow.addColorStop(1, "rgba(50, 35, 60, 0)");
    ctx.fillStyle = moonGlow;
    ctx.beginPath();
    ctx.arc(moonX, moonY, 100, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffecd2";
    ctx.beginPath();
    ctx.arc(moonX, moonY, 26, 0, Math.PI * 2);
    ctx.fill();
  } else {
    // Standard Warm Madrid Sun
    const glow = ctx.createRadialGradient(sunX, sunY, 15, sunX, sunY, 180);
    glow.addColorStop(0, "rgba(255, 250, 220, 0.95)");
    glow.addColorStop(0.2, "rgba(255, 225, 160, 0.45)");
    glow.addColorStop(0.5, "rgba(255, 200, 140, 0.18)");
    glow.addColorStop(1, "rgba(255, 180, 120, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 180, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(sunX, sunY, 32, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. Mountain Ridges (Layer 1 - Far)
  const mountainBase = camY + viewH - 120;
  ctx.fillStyle = theme.mountainFar;
  ctx.globalAlpha = 0.55;
  drawMountainRidge(ctx, camX - 100, mountainBase - 40, viewW + 200, 120, 50, camX * 0.07);

  // Mountain Ridge (Layer 2 - Near)
  ctx.fillStyle = theme.mountainNear;
  ctx.globalAlpha = 0.65;
  drawMountainRidge(ctx, camX - 100, mountainBase - 15, viewW + 200, 110, 40, camX * 0.14 + 180);
  ctx.globalAlpha = 1;

  // 4. In Jardín: Animated Clean Energy Wind Turbines on the hills
  if (tKey === "jardin") {
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    for (let i = 0; i < 4; i++) {
      const tx = camX + ((i * 320 - camX * 0.12) % (viewW + 200)) + 60;
      const ty = mountainBase - 25 + (i % 2) * 12;
      // Mast
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx, ty - 32);
      ctx.stroke();
      // Rotor hub
      ctx.beginPath();
      ctx.arc(tx, ty - 32, 2.5, 0, Math.PI * 2);
      ctx.fill();
      // 3 Blades spinning
      const spin = time * 2.2 + i * 1.5;
      for (let b = 0; b < 3; b++) {
        const bladeAngle = spin + (b * Math.PI * 2) / 3;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(tx, ty - 32);
        ctx.lineTo(tx + Math.cos(bladeAngle) * 16, ty - 32 + Math.sin(bladeAngle) * 16);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  // 5. Volumetric Clouds with Depth
  drawClouds(ctx, theme, camX, camY, viewW);

  // 6. Rolling park hills behind the city
  ctx.fillStyle = theme.hill2;
  wave(ctx, camX - 60, mountainBase + 10, viewW + 120, 140, 48, camX * 0.22);
  ctx.fillStyle = theme.hill;
  wave(ctx, camX - 60, mountainBase + 34, viewW + 120, 130, 36, camX * 0.35 + 80);

  // 7. Rich Thematic Architecture & Institutional Skyline per Block/World
  drawSkyline(ctx, run.theme, theme, camX, camY + viewH - 170, viewW, run.time);
}

function drawMountainRidge(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  amp: number,
  shift: number,
) {
  ctx.beginPath();
  ctx.moveTo(x, y + h);
  ctx.lineTo(x, y);
  const step = 45;
  for (let i = 0; i <= w; i += step) {
    const s = Math.sin((i + shift) * 0.009) * amp * 0.7 + Math.sin((i + shift) * 0.022) * amp * 0.3;
    ctx.lineTo(x + i, y - s);
  }
  ctx.lineTo(x + w, y + h);
  ctx.fill();
}

function wave(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, amp: number, shift: number) {
  ctx.beginPath();
  ctx.moveTo(x, y + h);
  ctx.lineTo(x, y);
  for (let i = 0; i <= w; i += 24) ctx.lineTo(x + i, y - Math.sin((i + shift) / 85) * amp);
  ctx.lineTo(x + w, y + h);
  ctx.fill();
}

function drawClouds(ctx: CanvasRenderingContext2D, theme: Theme, camX: number, camY: number, viewW: number) {
  // High wispy layer
  ctx.fillStyle = theme.cloud;
  ctx.globalAlpha = 0.45;
  for (let i = 0; i < 4; i++) {
    const cx = (((i * 420 - camX * 0.08) % (viewW + 500)) + viewW + 500) % (viewW + 500) - 150;
    const cy = camY + 45 + (i % 3) * 16;
    ctx.beginPath();
    ctx.ellipse(camX + cx, cy, 75, 14, 0, 0, Math.PI * 2);
    ctx.ellipse(camX + cx + 45, cy - 3, 50, 12, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Fluffy cumulus layer with highlights
  for (let i = 0; i < 5; i++) {
    const cx = (((i * 320 - camX * 0.18) % (viewW + 480)) + viewW + 480) % (viewW + 480) - 120;
    const cy = camY + 75 + (i % 4) * 22;

    // Cloud shadow underside
    ctx.fillStyle = theme.cloudShadow;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    ctx.ellipse(camX + cx, cy + 8, 64, 22, 0, 0, Math.PI * 2);
    ctx.ellipse(camX + cx + 42, cy + 6, 48, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cloud bright body
    ctx.fillStyle = theme.cloud;
    ctx.globalAlpha = 0.95;
    ctx.beginPath();
    ctx.ellipse(camX + cx, cy, 60, 24, 0, 0, Math.PI * 2);
    ctx.ellipse(camX + cx + 32, cy - 8, 42, 22, 0, 0, Math.PI * 2);
    ctx.ellipse(camX + cx - 28, cy + 2, 36, 18, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;
}

function drawSkyline(
  ctx: CanvasRenderingContext2D,
  themeKey: string,
  theme: Theme,
  camX: number,
  y: number,
  viewW: number,
  time: number = 0,
) {
  const blockW = 120;
  const start = Math.floor(camX / blockW) * blockW - blockW;
  for (let x = start; x < camX + viewW + blockW * 2; x += blockW) {
    const n = Math.abs(Math.floor(x / blockW));
    const h = 75 + (n % 4) * 24 + ((n * 3) % 5) * 8;
    const px = x - camX * 0.42;

    ctx.save();
    ctx.translate(px, y - h);

    if (themeKey === "hacienda") {
      // 1. Fortaleza de la Hacienda / Banco de España / Tesoro Público (Emerald & Gold)
      const wallColor = n % 2 ? "#144533" : "#0f3627";
      const goldTrim = "#d4af37";
      const goldBright = "#f5cb4a";

      // Neoclassical Banker Facade
      ctx.fillStyle = wallColor;
      ctx.fillRect(8, 20, 104, h);

      // Gold Entablature & Cornice
      ctx.fillStyle = goldTrim;
      ctx.fillRect(4, 14, 112, 7);
      ctx.fillStyle = goldBright;
      ctx.fillRect(6, 6, 108, 6);

      // Golden Rooftop Balustrade
      ctx.fillStyle = "#a88526";
      ctx.fillRect(10, 0, 100, 3);
      for (let b = 12; b < 105; b += 8) {
        ctx.fillRect(b, 3, 3, 4);
      }

      // Windows with golden interior glow & iron security crossbars
      for (let wy = 30; wy < h - 12; wy += 26) {
        for (let wx = 18; wx < 100; wx += 28) {
          ctx.fillStyle = goldTrim;
          ctx.fillRect(wx - 2, wy - 3, 20, 22);
          ctx.beginPath();
          ctx.arc(wx + 8, wy - 3, 10, Math.PI, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "rgba(255, 235, 140, 0.92)";
          ctx.fillRect(wx, wy, 16, 17);
          ctx.beginPath();
          ctx.arc(wx + 8, wy, 8, Math.PI, Math.PI * 2);
          ctx.fill();

          // Iron vault security bars
          ctx.fillStyle = "#162b20";
          ctx.fillRect(wx + 4, wy - 4, 1.5, 21);
          ctx.fillRect(wx + 8, wy - 6, 1.5, 23);
          ctx.fillRect(wx + 12, wy - 4, 1.5, 21);
          ctx.fillRect(wx, wy + 8, 16, 1.5);
        }
      }

      // 4 Fluted Golden Corinthian Columns
      for (let c = 0; c < 4; c++) {
        const cx = 16 + c * 24;
        ctx.fillStyle = goldBright;
        ctx.fillRect(cx, 24, 7, h - 24);
        ctx.fillStyle = goldTrim;
        ctx.fillRect(cx - 2, 21, 11, 4);
        ctx.fillRect(cx - 2, h - 3, 11, 4);
      }

      // Feature on roof
      if (n % 3 === 0) {
        // Giant Spinning Bank Vault Gear
        const gx = 60;
        const gy = -10;
        const gSpin = time * 0.4 + n;
        ctx.fillStyle = "#221a12";
        ctx.beginPath();
        ctx.arc(gx, gy, 20, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = goldBright;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Gear teeth
        ctx.fillStyle = goldBright;
        for (let t = 0; t < 8; t++) {
          const ga = gSpin + (t * Math.PI * 2) / 8;
          ctx.fillRect(gx + Math.cos(ga) * 19 - 2.5, gy + Math.sin(ga) * 19 - 2.5, 5, 5);
        }
        // Center dial
        ctx.fillStyle = goldTrim;
        ctx.beginPath();
        ctx.arc(gx, gy, 7, 0, Math.PI * 2);
        ctx.fill();
      } else if (n % 3 === 1) {
        // Classical Pediment with Golden Scales of Justice
        ctx.fillStyle = goldTrim;
        ctx.beginPath();
        ctx.moveTo(18, 6);
        ctx.lineTo(60, -16);
        ctx.lineTo(102, 6);
        ctx.fill();
        ctx.fillStyle = wallColor;
        ctx.beginPath();
        ctx.moveTo(24, 6);
        ctx.lineTo(60, -11);
        ctx.lineTo(96, 6);
        ctx.fill();
        // Golden Scale symbol
        ctx.fillStyle = goldBright;
        ctx.fillRect(59, -8, 2, 10);
        ctx.fillRect(52, -5, 16, 2);
        ctx.beginPath();
        ctx.arc(52, 1, 3, 0, Math.PI);
        ctx.arc(68, 1, 3, 0, Math.PI);
        ctx.fill();
      } else {
        // Golden Treasury Dome with Coin Spire
        ctx.fillStyle = goldTrim;
        ctx.beginPath();
        ctx.moveTo(34, 6);
        ctx.bezierCurveTo(34, -30, 86, -30, 86, 6);
        ctx.fill();
        ctx.fillStyle = goldBright;
        ctx.fillRect(58, -38, 4, 10);
        ctx.beginPath();
        ctx.arc(60, -42, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (themeKey === "jardin") {
      // 2. Paseo de los Ministerios (Políticas Públicas - Eco Bioclimatic Architecture)
      const wallColor = n % 2 ? "#ebf6ee" : "#d9edd9";
      const timberColor = "#8c5c38";
      const greenPlant = "#3c8a4c";
      const glassCyan = "#7fd4e3";

      // Modern Eco-Pavilion Body
      round(ctx, 8, 16, 104, h + 10, 8);
      ctx.fillStyle = wallColor;
      ctx.fill();

      // Cedar wood pergola brackets & trim
      ctx.fillStyle = timberColor;
      ctx.fillRect(6, 12, 108, 5);

      // Living vertical plant garden walls on facade
      ctx.fillStyle = greenPlant;
      ctx.fillRect(12, 26, 14, h - 38);
      ctx.fillRect(94, 26, 14, h - 38);
      // Small pink and white flowers on living wall
      ctx.fillStyle = "#ff8fa3";
      for (let fl = 30; fl < h - 16; fl += 14) {
        ctx.fillRect(15, fl, 3, 3);
        ctx.fillRect(97, fl + 4, 3, 3);
      }

      // Panoramic solar glass curtain windows
      ctx.fillStyle = glassCyan;
      ctx.globalAlpha = 0.75;
      for (let wy = 28; wy < h - 14; wy += 22) {
        for (let wx = 32; wx < 88; wx += 26) {
          round(ctx, wx, wy, 22, 16, 3);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      // Rooftop features
      if (n % 3 === 0) {
        // Retiro Glass Crystal Greenhouse Dome
        ctx.fillStyle = "rgba(125, 215, 230, 0.65)";
        ctx.beginPath();
        ctx.arc(60, 6, 26, Math.PI, 0);
        ctx.fill();
        ctx.strokeStyle = "#408560";
        ctx.lineWidth = 1.8;
        ctx.stroke();
        // Palm frond inside dome
        ctx.fillStyle = "#2c703b";
        ctx.beginPath();
        ctx.arc(60, 4, 12, Math.PI * 0.2, Math.PI * 0.8);
        ctx.fill();
      } else if (n % 3 === 1) {
        // Tilted Solar Photovoltaic Panels on roof
        ctx.fillStyle = "#1e486b";
        ctx.beginPath();
        ctx.moveTo(24, 8);
        ctx.lineTo(48, -12);
        ctx.lineTo(92, -12);
        ctx.lineTo(72, 8);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = "#a5d8f0";
        ctx.lineWidth = 1.2;
        ctx.stroke();
        // Solar grid lines
        ctx.beginPath();
        ctx.moveTo(36, 8); ctx.lineTo(60, -12);
        ctx.moveTo(52, 8); ctx.lineTo(76, -12);
        ctx.stroke();
      } else {
        // Agenda 2030 Rainbow colored banner ribbon
        const rCols = ["#e5243b", "#4c9f38", "#ff3a21", "#26bde2", "#fcc30b", "#dd1367", "#00689d"];
        for (let c = 0; c < rCols.length; c++) {
          ctx.fillStyle = rCols[c];
          ctx.fillRect(18 + c * 12, 4, 12, 6);
        }
      }

      // Flowering Jacaranda / Plane Tree beside pavilion
      ctx.fillStyle = "#5c3c26";
      ctx.fillRect(114, h - 26, 6, 26);
      ctx.fillStyle = "#8a489c"; // Jacaranda violet
      ctx.beginPath();
      ctx.arc(117, h - 28, 16, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#489e50"; // Green foliage
      ctx.beginPath();
      ctx.arc(114, h - 24, 12, 0, Math.PI * 2);
      ctx.fill();
    } else if (themeKey === "europa") {
      // 3. Archipiélago de las Doce Estrellas (Brussels & Strasbourg European Architecture)
      ctx.fillStyle = n % 2 ? "#183e68" : "#122f50";
      round(ctx, 6, 12, 108, h + 20, 6);
      ctx.fill();

      // Reflective cyan glass curtain wall
      ctx.fillStyle = "#70b8e8";
      ctx.globalAlpha = 0.65;
      for (let r = 24; r < h; r += 16) {
        for (let c = 14; c < 100; c += 18) {
          ctx.fillRect(c, r, 12, 10);
        }
      }
      ctx.globalAlpha = 1;

      // Chrome roofline & Golden Stars
      ctx.fillStyle = "#94afc7";
      ctx.fillRect(6, 8, 108, 4);
      drawStar(ctx, 60, -4, 5, 9, 4.5, "#ffd54f");

      // European flag waving
      ctx.fillStyle = "#698099";
      ctx.fillRect(94, -28, 2, 36);
      ctx.fillStyle = "#0c3066";
      ctx.fillRect(96, -27, 18, 11);
      drawStar(ctx, 105, -21, 5, 3, 1.5, "#ffd54f");
    } else if (themeKey === "sello") {
      // 4. Ciudad del Sello (Simancas Antique Granite Fortress & Machicolations)
      const stoneDark = n % 2 ? "#322b3d" : "#241f2c";
      ctx.fillStyle = stoneDark;
      ctx.fillRect(8, 18, 104, h);

      // Machicolations and crenellations on roof
      ctx.fillStyle = "#4a4058";
      ctx.fillRect(4, 10, 112, 8);
      for (let c = 8; c < 112; c += 18) {
        ctx.fillRect(c, 0, 10, 10);
      }

      // Gothic narrow arrow slits with orange torchlight
      for (let wy = 34; wy < h - 14; wy += 32) {
        for (let wx = 24; wx < 100; wx += 36) {
          ctx.fillStyle = "#16131c";
          round(ctx, wx - 1, wy - 1, 10, 24, 4);
          ctx.fill();
          ctx.fillStyle = "rgba(255, 175, 60, 0.88)";
          ctx.fillRect(wx + 2, wy + 2, 4, 18);
        }
      }

      // Giant Red Wax Seal Medallion on stone facade
      ctx.fillStyle = "#962327";
      ctx.beginPath();
      ctx.arc(60, 36, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#e5b452";
      ctx.beginPath();
      ctx.arc(60, 36, 6, 0, Math.PI * 2);
      ctx.fill();
    } else if (themeKey === "campus") {
      // 5. Campus de Función Pública (Madrid Neo-Mudéjar Red Brick & White Granite)
      const brickRed = n % 2 ? "#8f3020" : "#a83a27";
      const stoneWhite = "#eee6d6";

      // Red brick body
      ctx.fillStyle = brickRed;
      ctx.fillRect(8, 20, 104, h);

      // White granite horizontal bands
      ctx.fillStyle = stoneWhite;
      ctx.fillRect(4, 14, 112, 6);
      ctx.fillRect(8, 45, 104, 3);
      ctx.fillRect(8, 75, 104, 3);

      // Horseshoe Mudéjar brick arched windows
      for (let wy = 26; wy < h - 14; wy += 30) {
        for (let wx = 20; wx < 100; wx += 28) {
          ctx.fillStyle = stoneWhite;
          ctx.beginPath();
          ctx.arc(wx + 8, wy + 2, 8, Math.PI, 0);
          ctx.lineTo(wx + 16, wy + 18);
          ctx.lineTo(wx, wy + 18);
          ctx.fill();

          ctx.fillStyle = "#2c1c14";
          ctx.fillRect(wx + 2, wy + 4, 12, 14);
        }
      }

      // Central INAP Clock Tower at 10:10
      if (n % 3 === 1) {
        ctx.fillStyle = brickRed;
        ctx.fillRect(40, -32, 40, 46);
        ctx.fillStyle = stoneWhite;
        ctx.fillRect(36, -34, 48, 5);
        ctx.fillRect(44, -50, 32, 16);

        // Clock Face
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(60, -14, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#3a2218";
        ctx.lineWidth = 1.8;
        ctx.stroke();

        // Hands pointing to 10:10
        ctx.strokeStyle = "#22140d";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(60, -14);
        ctx.lineTo(55, -20); // hour hand to 10
        ctx.moveTo(60, -14);
        ctx.lineTo(67, -20); // minute hand to 2
        ctx.stroke();
      }
    } else if (themeKey === "carta") {
      // 6. Palacio de la Carta Magna (Congreso de los Diputados Neoclassical Marble)
      const marble = n % 2 ? "#fcf9f2" : "#efe6d5";
      ctx.fillStyle = marble;
      ctx.fillRect(8, 20, 104, h);

      // Classical entablature & pediment
      ctx.fillStyle = "#d6c1a0";
      ctx.fillRect(4, 12, 112, 8);

      // Triangular pediment with 1978 in gold
      ctx.fillStyle = "#d6c1a0";
      ctx.beginPath();
      ctx.moveTo(16, 12);
      ctx.lineTo(60, -16);
      ctx.lineTo(104, 12);
      ctx.fill();
      ctx.fillStyle = marble;
      ctx.beginPath();
      ctx.moveTo(22, 12);
      ctx.lineTo(60, -11);
      ctx.lineTo(98, 12);
      ctx.fill();

      // 4 Monumental Corinthian Columns
      for (let c = 0; c < 4; c++) {
        const cx = 18 + c * 23;
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(cx, 20, 7, h - 20);
        ctx.fillStyle = "#d6c1a0";
        ctx.fillRect(cx - 2, 18, 11, 4);
      }

      // Spanish Flag waving
      ctx.fillStyle = "#5c4f46";
      ctx.fillRect(59, -38, 2, 22);
      ctx.fillStyle = "#c43328";
      ctx.fillRect(61, -37, 18, 11);
      ctx.fillStyle = "#f3bf2e";
      ctx.fillRect(61, -34, 18, 5);
    } else {
      // Default: Classical Madrid Skyline
      const wallColor = n % 2 ? "#f4dfc3" : "#eed5b4";
      const trimColor = "#d6b58e";

      ctx.fillStyle = wallColor;
      ctx.fillRect(8, 20, 104, h);
      ctx.fillStyle = trimColor;
      ctx.fillRect(4, 14, 112, 8);
      ctx.fillRect(6, 6, 108, 6);

      // Balustrade
      ctx.fillStyle = "#bfa07c";
      ctx.fillRect(10, 0, 100, 3);
      for (let b = 12; b < 105; b += 8) ctx.fillRect(b, 3, 3, 4);

      // Windows
      for (let wy = 30; wy < h - 12; wy += 26) {
        for (let wx = 18; wx < 100; wx += 28) {
          ctx.fillStyle = "rgba(255, 235, 160, 0.88)";
          ctx.fillRect(wx, wy, 16, 17);
        }
      }
    }
    ctx.restore();
  }
}

function drawTiles(ctx: CanvasRenderingContext2D, run: Run, theme: Theme, camX: number, viewW: number) {
  const x0 = Math.max(0, Math.floor(camX / T) - 1);
  const x1 = Math.min(run.W - 1, Math.ceil((camX + viewW) / T) + 1);
  const tKey = run.theme;

  for (let y = 0; y < run.H; y++) {
    for (let x = x0; x <= x1; x++) {
      const tile = run.tiles[y * run.W + x];
      if (!tile) continue;
      const px = x * T;
      const py = y * T;

      if (tile === 2) {
        // ==========================================
        // FLOATING PLATFORMS (tile === 2) PER THEME
        // ==========================================
        if (tKey === "hacienda") {
          // Solid Gold Bullion Ingot Platform with Emerald Velvet Runner
          ctx.fillStyle = "#f5cb4a";
          round(ctx, px, py + 6, T, 14, 3);
          ctx.fill();
          // Top gold shine
          ctx.fillStyle = "#fff099";
          ctx.fillRect(px + 2, py + 7, T - 4, 2);
          // Dark emerald velvet inset
          ctx.fillStyle = "#124e38";
          ctx.fillRect(px + 4, py + 10, T - 8, 7);
          // Gold rivets
          ctx.fillStyle = "#ffd966";
          ctx.fillRect(px + 6, py + 12, 3, 3);
          ctx.fillRect(px + T - 9, py + 12, 3, 3);
          // Gold brackets underneath
          ctx.fillStyle = "#c99e28";
          ctx.fillRect(px + 4, py + 20, 6, 8);
          ctx.fillRect(px + T - 10, py + 20, 6, 8);
        } else if (tKey === "jardin") {
          // Cedar Wood Pergola with Hanging Green Ivy Leaves & Flowers
          ctx.fillStyle = "#8c5a36";
          round(ctx, px, py + 6, T, 12, 3);
          ctx.fill();
          ctx.fillStyle = "#a87146";
          ctx.fillRect(px + 2, py + 7, T - 4, 3);
          // Hanging green ivy vine leaves
          ctx.fillStyle = "#38822d";
          ctx.beginPath();
          ctx.arc(px + 8, py + 20, 4, 0, Math.PI * 2);
          ctx.arc(px + 18, py + 22, 5, 0, Math.PI * 2);
          ctx.arc(px + 32, py + 21, 4.5, 0, Math.PI * 2);
          ctx.fill();
          // Violet and white floral blossoms
          ctx.fillStyle = "#cf8bf0";
          ctx.fillRect(px + 9, py + 21, 2.5, 2.5);
          ctx.fillRect(px + 33, py + 22, 2.5, 2.5);
        } else if (tKey === "europa") {
          // High-Tech Azure Glass Platform with Neon Cyan Light Strip
          ctx.fillStyle = "rgba(75, 145, 215, 0.88)";
          round(ctx, px, py + 6, T, 12, 3);
          ctx.fill();
          // Glowing cyan underglow
          ctx.fillStyle = "#00e5ff";
          ctx.fillRect(px + 2, py + 16, T - 4, 2.5);
          // Chrome brackets
          ctx.fillStyle = "#a0bccc";
          ctx.fillRect(px + 4, py + 18, 5, 8);
          ctx.fillRect(px + T - 9, py + 18, 5, 8);
        } else if (tKey === "sello") {
          // Dark Weathered Oak Timber Beams with Iron Strap Brackets
          ctx.fillStyle = "#3d2d1e";
          round(ctx, px, py + 6, T, 14, 2);
          ctx.fill();
          ctx.fillStyle = "#57422f";
          ctx.fillRect(px + 2, py + 7, T - 4, 3);
          // Forged iron strap brackets & rivets
          ctx.fillStyle = "#1e1b24";
          ctx.fillRect(px + 5, py + 6, 7, 18);
          ctx.fillRect(px + T - 12, py + 6, 7, 18);
          ctx.fillStyle = "#948f9e";
          ctx.fillRect(px + 7, py + 9, 3, 3);
          ctx.fillRect(px + T - 10, py + 9, 3, 3);
        } else if (tKey === "campus") {
          // Madrid Neo-Mudéjar Terracotta Brick Arch Platform
          ctx.fillStyle = "#9c3525";
          round(ctx, px, py + 6, T, 14, 2);
          ctx.fill();
          // White limestone coping
          ctx.fillStyle = "#eee6d6";
          ctx.fillRect(px, py + 6, T, 4);
          // Brick seam joints
          ctx.fillStyle = "#702316";
          ctx.fillRect(px + 12, py + 10, 1.5, 9);
          ctx.fillRect(px + 28, py + 10, 1.5, 9);
        } else if (tKey === "carta") {
          // Fluted Carrara Marble Balcony with Gold Dentils
          ctx.fillStyle = "#fcfaf4";
          round(ctx, px, py + 6, T, 12, 2);
          ctx.fill();
          ctx.fillStyle = "#d4af37";
          ctx.fillRect(px + 3, py + 14, T - 6, 2.5);
          ctx.fillStyle = "#c43328";
          ctx.fillRect(px + 5, py + 17, T - 10, 1.5);
        } else {
          // Fallback Classical Carved Stone Balcony
          ctx.fillStyle = theme.topHighlight;
          round(ctx, px, py + 6, T, 6, 2);
          ctx.fill();
          ctx.fillStyle = theme.top;
          ctx.fillRect(px, py + 12, T, 8);
          ctx.fillStyle = theme.accentGold;
          ctx.fillRect(px + 4, py + 15, T - 8, 2);
        }
        continue;
      }

      // ==========================================
      // SOLID GROUND TILES (tile === 1) PER THEME
      // ==========================================
      const exposed = y === 0 || run.tiles[(y - 1) * run.W + x] !== 1;

      if (exposed) {
        if (tKey === "hacienda") {
          // Polished Emerald Malachite Marble with Gold Foil Veining & Brass Studded Curb
          ctx.fillStyle = "#0f3a2b";
          ctx.fillRect(px, py, T, T);
          // Lighter green vein
          ctx.fillStyle = "#1b5a44";
          ctx.fillRect(px + 4, py + 14, 18, 14);
          ctx.fillRect(px + 26, py + 22, 16, 12);
          // Gold foil veins
          ctx.strokeStyle = "#e5b452";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(px + 2, py + 16);
          ctx.lineTo(px + 16, py + 28);
          ctx.lineTo(px + 36, py + 20);
          ctx.stroke();
          // Polished Brass curb with gold coin studs
          ctx.fillStyle = "#d4af37";
          ctx.fillRect(px, py, T, 10);
          ctx.fillStyle = "#fff099";
          ctx.fillRect(px, py, T, 2.5);
          // Coin studs
          ctx.fillStyle = "#f5cb4a";
          ctx.beginPath();
          ctx.arc(px + 12, py + 5, 3, 0, Math.PI * 2);
          ctx.arc(px + 32, py + 5, 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (tKey === "jardin") {
          // Fresh Green Garden Lawn Turf with Terracotta Stepping Paver Stones
          ctx.fillStyle = "#438c35";
          ctx.fillRect(px, py, T, T);
          // Lighter turf patches
          ctx.fillStyle = "#5ca84a";
          ctx.fillRect(px + 2, py + 14, 20, 12);
          ctx.fillRect(px + 24, py + 18, 18, 14);
          // Terracotta paver slab
          ctx.fillStyle = "#d97c55";
          round(ctx, px + 8, py + 18, 26, 14, 4);
          ctx.fill();
          // Fresh lawn curb with blooming daisy sprigs
          ctx.fillStyle = "#2d6924";
          ctx.fillRect(px, py, T, 8);
          ctx.fillStyle = "#74bf56";
          ctx.fillRect(px, py, T, 3);
          // Tiny flowers on curb
          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(px + 14, py + 4, 2.5, 0, Math.PI * 2);
          ctx.arc(px + 34, py + 4, 2.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = "#ffd54f";
          ctx.fillRect(px + 13, py + 3, 2, 2);
          ctx.fillRect(px + 33, py + 3, 2, 2);
        } else if (tKey === "europa") {
          // High-Tech Midnight Cobalt Slate Tiles with Glowing Cyan Lightline Trim
          ctx.fillStyle = "#142c4b";
          ctx.fillRect(px, py, T, T);
          ctx.fillStyle = "#1d3e69";
          ctx.fillRect(px + 2, py + 12, 19, 14);
          ctx.fillRect(px + 23, py + 12, 19, 14);
          // Glowing cyan LED border line
          ctx.fillStyle = "#00e5ff";
          ctx.fillRect(px, py, T, 4);
          ctx.fillStyle = "#e2f8ff";
          ctx.fillRect(px, py, T, 1.5);
          // Golden star rivets
          drawStar(ctx, px + 12, py + 7, 5, 3, 1.5, "#ffd54f");
          drawStar(ctx, px + 32, py + 7, 5, 3, 1.5, "#ffd54f");
        } else if (tKey === "sello") {
          // Antique Simancas Dark Slate Flagstones with Mortar & Crimson Wax Drops
          ctx.fillStyle = "#2c2536";
          ctx.fillRect(px, py, T, T);
          ctx.fillStyle = "#3c3349";
          ctx.fillRect(px + 2, py + 12, 19, 14);
          ctx.fillRect(px + 23, py + 12, 19, 14);
          ctx.strokeStyle = "#1a1622";
          ctx.lineWidth = 1.5;
          ctx.strokeRect(px + 1, py + 11, 20, 15);
          ctx.strokeRect(px + 22, py + 11, 20, 15);
          // Dark gothic stone curb
          ctx.fillStyle = "#4a3f57";
          ctx.fillRect(px, py, T, 9);
          // Dropped red wax seal mark
          ctx.fillStyle = "#a82a30";
          ctx.beginPath();
          ctx.arc(px + 20, py + 5, 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (tKey === "campus") {
          // Madrid Red Brick Herringbone Pavers with White Granite Curb
          ctx.fillStyle = "#8f3020";
          ctx.fillRect(px, py, T, T);
          // Brick pattern
          ctx.fillStyle = "#a83a27";
          ctx.fillRect(px + 2, py + 12, 19, 10);
          ctx.fillRect(px + 23, py + 12, 19, 10);
          ctx.fillRect(px + 12, py + 24, 20, 10);
          // White Madrid Granite Curb
          ctx.fillStyle = "#eee6d6";
          ctx.fillRect(px, py, T, 10);
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(px, py, T, 2.5);
        } else if (tKey === "carta") {
          // Salamanca Sandstone Slabs with Royal Crimson Velvet Border Carpet
          ctx.fillStyle = "#cebb94";
          ctx.fillRect(px, py, T, T);
          ctx.fillStyle = "#ded0b0";
          ctx.fillRect(px + 2, py + 12, 40, 24);
          // Crimson Velvet Runner
          ctx.fillStyle = "#b82626";
          ctx.fillRect(px, py, T, 10);
          ctx.fillStyle = "#e5b452";
          ctx.fillRect(px, py + 8, T, 2);
        } else {
          // Madrid Granite Cobblestone Standard
          ctx.fillStyle = theme.ground;
          ctx.fillRect(px, py, T, T);
          ctx.fillStyle = theme.top;
          ctx.fillRect(px, py, T, 12);
          ctx.fillStyle = theme.topHighlight;
          ctx.fillRect(px, py, T, 3);
        }
      } else {
        // Sub-ground foundational masonry
        if (tKey === "hacienda") {
          ctx.fillStyle = "#08241b";
          ctx.fillRect(px, py, T, T);
          ctx.fillStyle = "#0c3326";
          ctx.fillRect(px + 1, py + 1, T - 2, T - 2);
        } else if (tKey === "jardin") {
          ctx.fillStyle = "#302419";
          ctx.fillRect(px, py, T, T);
          ctx.fillStyle = "#423223";
          ctx.fillRect(px + 1, py + 1, T - 2, T - 2);
        } else if (tKey === "europa") {
          ctx.fillStyle = "#0a192b";
          ctx.fillRect(px, py, T, T);
          ctx.fillStyle = "#122a46";
          ctx.fillRect(px + 1, py + 1, T - 2, T - 2);
        } else if (tKey === "sello") {
          ctx.fillStyle = "#1a1520";
          ctx.fillRect(px, py, T, T);
          ctx.fillStyle = "#261f2e";
          ctx.fillRect(px + 1, py + 1, T - 2, T - 2);
        } else {
          ctx.fillStyle = theme.groundShadow;
          ctx.fillRect(px, py, T, T);
          ctx.fillStyle = theme.ground;
          ctx.fillRect(px + 1, py + 1, T - 2, T - 2);
        }
      }
    }
  }
}

function drawEntity(ctx: CanvasRenderingContext2D, run: Run, item: Ent, theme: Theme) {
  const bob = Math.sin(run.time * 3 + item.id) * 3;

  if (item.kind === "article") {
    // Collectible Spanish Constitution Article Seal
    ctx.save();
    ctx.translate(item.x + 11, item.y + bob);

    // Glowing aura
    const aura = ctx.createRadialGradient(0, 0, 4, 0, 0, 18);
    aura.addColorStop(0, "rgba(248, 215, 95, 0.65)");
    aura.addColorStop(1, "rgba(248, 215, 95, 0)");
    ctx.fillStyle = aura;
    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI * 2);
    ctx.fill();

    // Gold coin body
    ctx.fillStyle = "#e5b452";
    ctx.beginPath();
    ctx.arc(0, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#8b3820";
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = "#8b3820";
    ctx.font = "bold 13px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("§", 0, 4.5);
    ctx.restore();
  } else if (item.kind === "qblock") {
    // Official Exam Question Box
    ctx.save();
    ctx.translate(item.x, item.y + (item.used ? 0 : bob));
    ctx.fillStyle = item.used ? "#9d8d7b" : "#e5b452";
    round(ctx, 0, 0, 36, 36, 8);
    ctx.fill();
    ctx.strokeStyle = theme.ink;
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Rivets
    ctx.fillStyle = theme.ink;
    ctx.fillRect(3, 3, 3, 3);
    ctx.fillRect(30, 3, 3, 3);
    ctx.fillRect(3, 30, 3, 3);
    ctx.fillRect(30, 30, 3, 3);

    ctx.fillStyle = theme.ink;
    ctx.font = "bold 22px Georgia";
    ctx.textAlign = "center";
    ctx.fillText(item.used ? "·" : "?", 18, 26);
    ctx.restore();
  } else if (item.kind === "enemy") {
    // Mario / Alex Kidd style animated retro obstacles
    ctx.save();
    const type = item.variant % 3;
    const walkBob = Math.abs(Math.sin(run.time * 8 + item.id)) * 4;
    const facing = item.vx >= 0 ? 1 : -1;

    ctx.translate(item.x + item.w / 2, item.y + item.h);
    ctx.scale(facing, 1);

    // Soft drop shadow
    ctx.fillStyle = "rgba(25, 14, 10, 0.28)";
    ctx.beginPath();
    ctx.ellipse(0, 1, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    if (type === 0) {
      // 1. "El Sello Furioso" (Angry Rubber Stamp - Mario Goomba style)
      // Stepping cartoon feet
      const footStep = Math.sin(run.time * 10 + item.id) * 3;
      ctx.fillStyle = "#8d3222";
      round(ctx, -14, -6 + (footStep > 0 ? -3 : 0), 10, 6, 3);
      ctx.fill();
      round(ctx, 4, -6 + (footStep < 0 ? -3 : 0), 10, 6, 3);
      ctx.fill();

      // Stamp wooden handle
      ctx.fillStyle = "#a87146";
      ctx.fillRect(-4, -38 - walkBob, 8, 12);
      ctx.beginPath();
      ctx.arc(0, -38 - walkBob, 8, 0, Math.PI * 2);
      ctx.fill();
      // Brass collar
      ctx.fillStyle = "#e5b452";
      ctx.fillRect(-7, -27 - walkBob, 14, 4);

      // Red rubber stamp body
      ctx.fillStyle = "#c43328";
      round(ctx, -15, -24 - walkBob, 30, 20, 6);
      ctx.fill();
      ctx.strokeStyle = "#60140e";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Big cartoon expressive eyes
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.ellipse(-6, -15 - walkBob, 5, 6, 0, 0, Math.PI * 2);
      ctx.ellipse(6, -15 - walkBob, 5, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pupils looking ahead
      ctx.fillStyle = "#1b1420";
      ctx.beginPath();
      ctx.arc(-4, -15 - walkBob, 2.5, 0, Math.PI * 2);
      ctx.arc(8, -15 - walkBob, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Angry furrowed eyebrows
      ctx.strokeStyle = "#4a120b";
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-11, -21 - walkBob);
      ctx.lineTo(-2, -18 - walkBob);
      ctx.moveTo(11, -21 - walkBob);
      ctx.lineTo(2, -18 - walkBob);
      ctx.stroke();
    } else if (type === 1) {
      // 2. "El Expediente Alado" (Winged Dossier - Koopa Paratroopa / Alex Kidd style)
      const wingFlap = Math.sin(run.time * 14 + item.id);
      const floatY = -8 + Math.sin(run.time * 4 + item.id) * 5;

      // Animated feathered wings behind body
      ctx.save();
      ctx.translate(0, floatY - 14);
      ctx.fillStyle = "#ffffff";
      ctx.strokeStyle = "#c0cad4";
      ctx.lineWidth = 1.5;

      // Left wing
      ctx.save();
      ctx.translate(-14, 0);
      ctx.rotate(-0.35 + wingFlap * 0.45);
      ctx.beginPath();
      ctx.ellipse(-10, -4, 12, 6, -0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Right wing
      ctx.save();
      ctx.translate(14, 0);
      ctx.rotate(0.35 - wingFlap * 0.45);
      ctx.beginPath();
      ctx.ellipse(10, -4, 12, 6, 0.4, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();
      ctx.restore();

      // Crimson official folder body
      ctx.fillStyle = "#8c2436";
      round(ctx, -14, floatY - 26, 28, 24, 4);
      ctx.fill();
      ctx.strokeStyle = "#4d101d";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Gold seal badge in center
      ctx.fillStyle = "#e5b452";
      ctx.beginPath();
      ctx.arc(0, floatY - 14, 5, 0, Math.PI * 2);
      ctx.fill();

      // Peeking cute cartoon eyes
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(-9, floatY - 22, 6, 7);
      ctx.fillRect(3, floatY - 22, 6, 7);
      ctx.fillStyle = "#15101a";
      ctx.fillRect(-7, floatY - 20, 3, 4);
      ctx.fillRect(5, floatY - 20, 3, 4);
    } else {
      // 3. "El Reloj Tic-Tac" (Official Stopwatch - Bob-omb / Alex Kidd style)
      const tickBob = Math.sin(run.time * 8 + item.id) * 2;
      // Spinning wind-up key on top
      ctx.save();
      ctx.translate(0, -32 - tickBob);
      ctx.rotate(run.time * 6);
      ctx.fillStyle = "#e5b452";
      round(ctx, -7, -2.5, 14, 5, 2);
      ctx.fill();
      ctx.restore();

      // Metal ring & neck
      ctx.fillStyle = "#c89b38";
      ctx.fillRect(-2, -30 - tickBob, 4, 4);

      // Gold pocket watch round body
      ctx.fillStyle = "#e5b452";
      ctx.beginPath();
      ctx.arc(0, -15 - tickBob, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#8d6418";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Clock face
      ctx.fillStyle = "#fffcf4";
      ctx.beginPath();
      ctx.arc(0, -15 - tickBob, 11, 0, Math.PI * 2);
      ctx.fill();

      // Angry clock eyes & needle hands
      ctx.fillStyle = "#1b1420";
      ctx.fillRect(-6, -18 - tickBob, 3, 4);
      ctx.fillRect(3, -18 - tickBob, 3, 4);
      // Spinning clock needles
      ctx.strokeStyle = "#a42218";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -15 - tickBob);
      ctx.lineTo(Math.sin(run.time * 5) * 6, -15 - tickBob - Math.cos(run.time * 5) * 6);
      ctx.stroke();

      // Little mechanical stepping feet
      const footStep = Math.sin(run.time * 10 + item.id) * 2.5;
      ctx.fillStyle = "#8d6418";
      ctx.fillRect(-10, -4 + (footStep > 0 ? -2 : 0), 6, 4);
      ctx.fillRect(4, -4 + (footStep < 0 ? -2 : 0), 6, 4);
    }
    ctx.restore();
  } else if (item.kind === "npc") {
    const sprite = getNpcSprite(item.ref);

    // Glowing interaction circle on the ground
    ctx.save();
    ctx.translate(item.x + item.w / 2, item.y + item.h);

    const pulse = 0.5 + Math.sin(run.time * 3.5) * 0.25;
    const ring = ctx.createRadialGradient(0, 2, 3, 0, 2, 22);
    ring.addColorStop(0, `rgba(244, 192, 70, ${0.45 * pulse})`);
    ring.addColorStop(0.7, `rgba(244, 192, 70, ${0.22 * pulse})`);
    ring.addColorStop(1, "rgba(244, 192, 70, 0)");
    ctx.fillStyle = ring;
    ctx.beginPath();
    ctx.ellipse(0, 2, 22, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Soft drop shadow
    ctx.fillStyle = "rgba(35, 20, 14, 0.32)";
    ctx.beginPath();
    ctx.ellipse(0, 2, 16, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    const dh = 72;
    const bobNpc = Math.sin(run.time * 2.2 + item.id) * 1.5;

    if (sprite) {
      const dw = dh * (sprite.width / sprite.height);
      ctx.drawImage(sprite, -dw / 2, -dh + bobNpc + 2, dw, dh);
    } else {
      drawChibi(ctx, item.ref, 0, bobNpc, run.time);
    }
    ctx.restore();

    // Callout bubble when not yet spoken to
    if (!run.talked && run.mode === "stage") {
      bubble(ctx, item.x - 2, item.y - 20, "💬 ¡Pasa para hablar!");
    }
  } else if (item.kind === "flag") {
    // Official Tribunal Finish Flag
    ctx.save();
    ctx.translate(item.x, item.y);
    // Flagpole with bronze finial
    ctx.fillStyle = "#8a7566";
    ctx.fillRect(6, 0, 5, item.h);
    ctx.fillStyle = "#e5b452";
    ctx.beginPath();
    ctx.arc(8.5, 0, 6, 0, Math.PI * 2);
    ctx.fill();

    // Spanish / Institutional double-pennant
    const waveFlag = Math.sin(run.time * 4.5) * 3;
    ctx.fillStyle = item.ref === "exam" ? "#b23a48" : theme.accent;
    ctx.beginPath();
    ctx.moveTo(11, 4);
    ctx.lineTo(46, 16 + waveFlag);
    ctx.lineTo(11, 32);
    ctx.fill();

    // Gold stripe inside flag
    ctx.fillStyle = "#f4c653";
    ctx.beginPath();
    ctx.moveTo(11, 10);
    ctx.lineTo(40, 18 + waveFlag);
    ctx.lineTo(11, 26);
    ctx.fill();
    ctx.restore();
  } else if (item.kind === "portal" || item.kind === "panel") {
    drawBuilding(ctx, item, theme, run.time);
  } else if (item.kind === "boss") {
    drawBoss(ctx, run, item, theme);
  } else if (item.kind === "spring") {
    // Retro platformer coiled trampoline spring pad
    ctx.save();
    ctx.translate(item.x, item.y);
    const bounce = Math.sin(run.time * 6) * 1.5;

    // Heavy iron base
    ctx.fillStyle = "#2c221e";
    round(ctx, 2, item.h - 8, item.w - 4, 8, 3);
    ctx.fill();

    // Coiled metal spring
    ctx.strokeStyle = "#c4523a";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    const midX = item.w / 2;
    ctx.moveTo(midX - 10, item.h - 8);
    ctx.lineTo(midX + 10, item.h - 13 + bounce);
    ctx.lineTo(midX - 10, item.h - 18 + bounce);
    ctx.lineTo(midX + 10, item.h - 22 + bounce * 0.5);
    ctx.stroke();

    // Top bouncy springboard plate
    ctx.fillStyle = "#e5b452";
    round(ctx, 0, 0 + bounce, item.w, 9, 4);
    ctx.fill();
    ctx.strokeStyle = "#8b3820";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "#8b3820";
    ctx.fillRect(4, 3 + bounce, item.w - 8, 2);
    ctx.restore();
  } else if (item.kind === "deco") {
    drawDeco(ctx, item, theme, run.time);
  }
}

function drawBuilding(ctx: CanvasRenderingContext2D, item: Ent, theme: Theme, time: number) {
  ctx.save();
  ctx.translate(item.x, item.y);

  const w = item.w;
  const h = item.h;
  const ref = item.ref;
  const isFinal = ref === "exam-hall" || ref.includes("final");
  const isBoss = ref.includes("boss");

  // Determine architectural theme by block/subject
  let arch: "carta" | "europa" | "jardin" | "sello" | "campus" | "hacienda" | "exam" | "boss" | "plaza" = "plaza";
  if (isBoss) arch = "boss";
  else if (isFinal) arch = "exam";
  else if (ref === "map-w1" || ref.startsWith("I-")) arch = "carta";
  else if (ref === "map-w2" || ref.startsWith("II-")) arch = "europa";
  else if (ref === "map-w3" || ref.startsWith("III-")) arch = "jardin";
  else if (ref === "map-w4" || ref.startsWith("IV-")) arch = "sello";
  else if (ref === "map-w5" || ref.startsWith("V-")) arch = "campus";
  else if (ref === "map-w6" || ref.startsWith("VI-")) arch = "hacienda";

  // Palette & style definitions per block
  let wallColor = theme.top;
  let shadowColor = theme.groundShadow;
  let trimColor = theme.topHighlight;
  let accentColor = theme.accent;
  let goldColor = theme.accentGold;
  let gateColor = "#120e18";

  if (arch === "carta") {
    wallColor = "#fbf8f0";
    shadowColor = "#baa68b";
    trimColor = "#eddab8";
    accentColor = "#c43328";
    goldColor = "#e5b452";
  } else if (arch === "europa") {
    wallColor = "#123a6d";
    shadowColor = "#0c2547";
    trimColor = "#568fc9";
    accentColor = "#ffd54f";
    goldColor = "#ffd54f";
  } else if (arch === "jardin") {
    wallColor = "#ded4bd";
    shadowColor = "#1d5835";
    trimColor = "#2d784c";
    accentColor = "#803882";
    goldColor = "#f4a742";
  } else if (arch === "sello") {
    wallColor = "#3c3548";
    shadowColor = "#231e2b";
    trimColor = "#655778";
    accentColor = "#9c2838";
    goldColor = "#e2b85a";
  } else if (arch === "campus") {
    wallColor = "#8e3124";
    shadowColor = "#5b1c14";
    trimColor = "#eee8db";
    accentColor = "#d4883b";
    goldColor = "#f4ba47";
  } else if (arch === "hacienda") {
    wallColor = "#164433";
    shadowColor = "#0d2b20";
    trimColor = "#cca44b";
    accentColor = "#e5b452";
    goldColor = "#f7d568";
  } else if (arch === "exam") {
    wallColor = "#4a1226";
    shadowColor = "#2b0714";
    trimColor = "#ffffff";
    accentColor = "#ffd54f";
    goldColor = "#ffd54f";
  } else if (arch === "boss") {
    wallColor = "#201824";
    shadowColor = "#0f0b12";
    trimColor = "#8a2232";
    accentColor = "#d63044";
    goldColor = "#e5a828";
  }

  // 1. CASTLE TOWERS (Twin Bastions flanking left and right)
  const towerW = 28;
  const towerH = h + 18;
  const towerY = -18;

  // Left Tower
  ctx.fillStyle = wallColor;
  round(ctx, 0, towerY + 12, towerW, towerH - 12, 4);
  ctx.fill();
  ctx.strokeStyle = shadowColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Right Tower
  round(ctx, w - towerW, towerY + 12, towerW, towerH - 12, 4);
  ctx.fill();
  ctx.stroke();

  // Block 5 (Campus): Brick texture lines
  if (arch === "campus") {
    ctx.strokeStyle = "rgba(255,255,255,0.2)";
    ctx.lineWidth = 1;
    for (let by = towerY + 18; by < towerY + towerH - 6; by += 8) {
      ctx.beginPath();
      ctx.moveTo(2, by); ctx.lineTo(towerW - 2, by);
      ctx.moveTo(w - towerW + 2, by); ctx.lineTo(w - 2, by);
      ctx.stroke();
    }
  }

  // Tower Battlements / Crenellations
  ctx.fillStyle = trimColor;
  if (arch === "boss") {
    // Spiked gothic battlements
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo(i * 9, towerY + 10);
      ctx.lineTo(i * 9 + 4.5, towerY - 4);
      ctx.lineTo(i * 9 + 9, towerY + 10);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(w - towerW + i * 9, towerY + 10);
      ctx.lineTo(w - towerW + i * 9 + 4.5, towerY - 4);
      ctx.lineTo(w - towerW + i * 9 + 9, towerY + 10);
      ctx.fill();
    }
  } else {
    // Left tower crenellations
    ctx.fillRect(0, towerY, 8, 12);
    ctx.fillRect(10, towerY + 4, 8, 8);
    ctx.fillRect(20, towerY, 8, 12);
    // Right tower crenellations
    ctx.fillRect(w - towerW, towerY, 8, 12);
    ctx.fillRect(w - towerW + 10, towerY + 4, 8, 8);
    ctx.fillRect(w - 8, towerY, 8, 12);
  }

  // Flagpoles atop towers
  const waveFlag = Math.sin(time * 5) * 3;
  ctx.fillStyle = goldColor;
  ctx.fillRect(13, towerY - 24, 2.5, 24);
  ctx.fillRect(w - 15.5, towerY - 24, 2.5, 24);
  ctx.beginPath();
  ctx.arc(14.25, towerY - 24, 3, 0, Math.PI * 2);
  ctx.arc(w - 14.25, towerY - 24, 3, 0, Math.PI * 2);
  ctx.fill();

  // THEMATIC FLAGS
  const drawPennant = (fx: number, dir: 1 | -1) => {
    ctx.save();
    ctx.translate(fx, towerY - 24);
    if (arch === "carta") {
      // Spanish National Flag (Red - Gold - Red)
      ctx.fillStyle = "#c43328";
      ctx.fillRect(0, 0, 20 * dir, 14);
      ctx.fillStyle = "#f4c653";
      ctx.fillRect(0, 3.5, 20 * dir, 7);
      ctx.fillStyle = "#c43328";
      ctx.fillRect(0, 0, 20 * dir, 3.5);
      ctx.fillRect(0, 10.5, 20 * dir, 3.5);
    } else if (arch === "europa") {
      // European Blue Flag with 12 Gold Stars
      ctx.fillStyle = "#124ca0";
      ctx.fillRect(0, 0, 20 * dir, 13);
      ctx.fillStyle = "#ffd54f";
      for (let s = 0; s < 6; s++) {
        const sa = (s / 6) * Math.PI * 2;
        ctx.fillRect(10 * dir + Math.cos(sa) * 4 - 1, 6.5 + Math.sin(sa) * 4 - 1, 2, 2);
      }
    } else if (arch === "jardin") {
      // Emerald Green & Violet Ribbon
      ctx.fillStyle = "#2d8856";
      ctx.fillRect(0, 0, 20 * dir, 8);
      ctx.fillStyle = "#803882";
      ctx.fillRect(0, 8, 20 * dir, 6);
    } else if (arch === "sello") {
      // Royal Burgundy Archive Velvet
      ctx.fillStyle = "#8a2434";
      ctx.fillRect(0, 0, 20 * dir, 14);
      ctx.fillStyle = "#ffd54f";
      ctx.fillRect(4 * dir, 4, 3, 6);
    } else if (arch === "campus") {
      // Madrid Institutional Crimson
      ctx.fillStyle = "#9a2824";
      ctx.fillRect(0, 0, 20 * dir, 14);
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(3 * dir, 3, 2, 2);
      ctx.fillRect(7 * dir, 3, 2, 2);
    } else if (arch === "hacienda") {
      // Golden Treasury Banner
      ctx.fillStyle = "#e5b452";
      ctx.fillRect(0, 0, 20 * dir, 14);
      ctx.fillStyle = "#184534";
      ctx.fillRect(2 * dir, 2, 16 * dir, 10);
      ctx.fillStyle = "#f4c653";
      ctx.beginPath();
      ctx.arc(10 * dir, 7, 3, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = accentColor;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(20 * dir, 6 + waveFlag);
      ctx.lineTo(0, 12);
      ctx.fill();
    }
    ctx.restore();
  };

  drawPennant(15.5, 1);
  drawPennant(w - 13, -1);

  // 2. CENTRAL PALACE / CASTLE KEEP (Gran Cuerpo Central)
  const mainX = towerW - 4;
  const mainW = w - (towerW - 4) * 2;
  const mainH = h;
  ctx.fillStyle = wallColor;
  round(ctx, mainX, 16, mainW, mainH - 16, 4);
  ctx.fill();
  ctx.strokeStyle = shadowColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Central Roofline & Balustrade
  ctx.fillStyle = trimColor;
  ctx.fillRect(mainX - 2, 8, mainW + 4, 8);
  for (let ax = mainX + 4; ax < mainX + mainW - 8; ax += 12) {
    ctx.fillRect(ax, 2, 7, 8);
  }

  // 3. THEMATIC ROOF CREST & ORNAMENTS
  if (arch === "carta") {
    // Classical Triangular Greek Pediment with Spanish Crown & 1978
    ctx.fillStyle = trimColor;
    ctx.beginPath();
    ctx.moveTo(mainX - 4, 8);
    ctx.lineTo(w / 2, -14);
    ctx.lineTo(w - mainX + 4, 8);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = goldColor;
    ctx.beginPath();
    ctx.arc(w / 2, -2, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#1e140d";
    ctx.font = "bold 8px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("1978", w / 2, 1);
  } else if (arch === "europa") {
    // Modern Berlaymont Atrium + Rotating 12 Gold Stars
    ctx.fillStyle = "#10356c";
    ctx.fillRect(w / 2 - 18, -10, 36, 18);
    ctx.fillStyle = "#79b7ea";
    ctx.fillRect(w / 2 - 14, -8, 28, 14);

    // 12 Golden Stars orbiting atop the roof
    const starRadius = 14;
    ctx.fillStyle = "#ffd54f";
    for (let s = 0; s < 12; s++) {
      const sa = (s / 12) * Math.PI * 2 + time * 1.5;
      const sx = w / 2 + Math.cos(sa) * starRadius;
      const sy = -16 + Math.sin(sa) * 5;
      ctx.fillRect(sx - 1.5, sy - 1.5, 3, 3);
    }
  } else if (arch === "jardin") {
    // Stepped Living Green Rooftop Garden + Golden Sun
    ctx.fillStyle = "#2d784c";
    round(ctx, mainX + 4, -4, mainW - 8, 12, 6);
    ctx.fill();
    // Colorful blooming flowers
    const flowers = ["#f2545b", "#f9c80e", "#ea7af4", "#43bccd"];
    flowers.forEach((fc, i) => {
      ctx.fillStyle = fc;
      ctx.beginPath();
      ctx.arc(mainX + 12 + i * 11, -2, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    // Radiant Sun
    ctx.fillStyle = "#f4a742";
    ctx.beginPath();
    ctx.arc(w / 2, -14, 8, 0, Math.PI * 2);
    ctx.fill();
  } else if (arch === "sello") {
    // Enormous Crimson Wax Seal + Crossed Quills
    ctx.fillStyle = "#9e2536";
    ctx.beginPath();
    ctx.arc(w / 2, 0, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = 2;
    ctx.stroke();

    // Wax seal ribbon tails
    ctx.fillStyle = goldColor;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 6, 8);
    ctx.lineTo(w / 2 - 10, 20);
    ctx.lineTo(w / 2 - 4, 18);
    ctx.lineTo(w / 2, 10);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(w / 2 + 6, 8);
    ctx.lineTo(w / 2 + 10, 20);
    ctx.lineTo(w / 2 + 4, 18);
    ctx.lineTo(w / 2, 10);
    ctx.fill();

    ctx.fillStyle = "#fffcf4";
    ctx.font = "bold 9px serif";
    ctx.textAlign = "center";
    ctx.fillText("⚖️", w / 2, 3.5);
  } else if (arch === "campus") {
    // Historic Central Clock Tower (Torre del Reloj de la Jornada)
    ctx.fillStyle = wallColor;
    ctx.fillRect(w / 2 - 14, -20, 28, 28);
    ctx.strokeStyle = shadowColor;
    ctx.strokeRect(w / 2 - 14, -20, 28, 28);

    // Copper mansard roof
    ctx.fillStyle = "#4e7a68";
    ctx.beginPath();
    ctx.moveTo(w / 2 - 16, -20);
    ctx.lineTo(w / 2, -32);
    ctx.lineTo(w / 2 + 16, -20);
    ctx.fill();

    // Clock Face (10:10)
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(w / 2, -6, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#3a2218";
    ctx.lineWidth = 1.2;
    ctx.stroke();
    // Hands
    ctx.fillStyle = "#1e140d";
    ctx.fillRect(w / 2 - 1, -11, 2, 6);
    ctx.fillRect(w / 2, -7, 4, 2);
  } else if (arch === "hacienda") {
    // Golden Scales of Justice and Abacus Crest
    ctx.fillStyle = trimColor;
    ctx.fillRect(w / 2 - 18, -12, 36, 20);
    ctx.strokeStyle = goldColor;
    ctx.strokeRect(w / 2 - 18, -12, 36, 20);

    ctx.fillStyle = goldColor;
    ctx.font = "bold 11px serif";
    ctx.textAlign = "center";
    ctx.fillText("⚖️", w / 2, 2);
  } else if (arch === "exam") {
    // Imperial Roman Triumphal Arch & Roman Eagle
    ctx.fillStyle = goldColor;
    ctx.beginPath();
    ctx.arc(w / 2, 0, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#4a1226";
    ctx.font = "bold 13px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("👑", w / 2, 4);
  } else if (arch === "boss") {
    // Boss Skull & Spikes
    ctx.fillStyle = "#a62838";
    ctx.beginPath();
    ctx.arc(w / 2, 0, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 11px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("⚔️", w / 2, 4);
  } else {
    // Default Palace Crest
    ctx.fillStyle = goldColor;
    ctx.beginPath();
    ctx.arc(w / 2, 4, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = shadowColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.fillStyle = "#1e140d";
    ctx.font = "bold 9px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("🏰", w / 2, 7.5);
  }

  // 4. GRAND ARCADED GATEWAY (El Gran Portón Temático)
  const gateW = 44;
  const gateH = 58;
  const gateX = (w - gateW) / 2;
  const gateY = h - gateH;

  // Outer Stone Arch Moulding
  ctx.fillStyle = trimColor;
  round(ctx, gateX - 4, gateY - 4, gateW + 8, gateH + 4, 20);
  ctx.fill();

  // Fluting / Columns if classical (carta, hacienda)
  if (arch === "carta" || arch === "hacienda") {
    ctx.fillStyle = trimColor;
    // Left column
    ctx.fillRect(gateX - 8, gateY, 5, gateH);
    // Right column
    ctx.fillRect(gateX + gateW + 3, gateY, 5, gateH);
    ctx.fillStyle = goldColor;
    ctx.fillRect(gateX - 9, gateY - 2, 7, 4);
    ctx.fillRect(gateX + gateW + 2, gateY - 2, 7, 4);
  }

  // Inner Dark Gateway Abyss
  ctx.fillStyle = gateColor;
  round(ctx, gateX, gateY, gateW, gateH, 18);
  ctx.fill();

  if (arch === "hacienda") {
    // Banking Vault Round Wheel Door
    ctx.fillStyle = "#cca44b";
    ctx.beginPath();
    ctx.arc(w / 2, gateY + 28, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#8f7030";
    ctx.lineWidth = 3;
    ctx.stroke();
    // Vault spoke wheel
    ctx.strokeStyle = "#4a3512";
    ctx.lineWidth = 2;
    for (let sp = 0; sp < 4; sp++) {
      const spa = (sp / 4) * Math.PI;
      ctx.beginPath();
      ctx.moveTo(w / 2 - Math.cos(spa) * 12, gateY + 28 - Math.sin(spa) * 12);
      ctx.lineTo(w / 2 + Math.cos(spa) * 12, gateY + 28 + Math.sin(spa) * 12);
      ctx.stroke();
    }
  } else if (arch === "europa") {
    // Azure high-tech glass portal with cyan illumination
    ctx.strokeStyle = "#5ce1e6";
    ctx.lineWidth = 2;
    round(ctx, gateX + 2, gateY + 2, gateW - 4, gateH - 4, 16);
    ctx.stroke();
  } else {
    // Classic Portcullis Grate
    ctx.strokeStyle = "rgba(220, 195, 150, 0.45)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let px = gateX + 8; px < gateX + gateW - 4; px += 8) {
      ctx.moveTo(px, gateY);
      ctx.lineTo(px, gateY + 22);
    }
    ctx.moveTo(gateX + 4, gateY + 12);
    ctx.lineTo(gateX + gateW - 4, gateY + 12);
    ctx.moveTo(gateX + 4, gateY + 20);
    ctx.lineTo(gateX + gateW - 4, gateY + 20);
    ctx.stroke();
  }

  // Warm golden inviting light spilling from the doorway
  const glow = ctx.createRadialGradient(w / 2, h - 16, 4, w / 2, h - 16, 32);
  glow.addColorStop(0, "rgba(255, 235, 140, 0.95)");
  glow.addColorStop(0.5, "rgba(240, 160, 50, 0.55)");
  glow.addColorStop(1, "rgba(240, 140, 40, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(w / 2, h - 16, 32, 0, Math.PI * 2);
  ctx.fill();

  // Ceremonial Red Carpet rolling out through the gate
  ctx.fillStyle = arch === "exam" ? "#7c1828" : "#b22e23";
  ctx.beginPath();
  ctx.moveTo(gateX + 8, h - 14);
  ctx.lineTo(gateX + gateW - 8, h - 14);
  ctx.lineTo(gateX + gateW - 4, h);
  ctx.lineTo(gateX + 4, h);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = goldColor;
  ctx.fillRect(gateX + 4, h - 1, gateW - 8, 2);

  // Animated Torches / Lanterns
  const torches = [gateX - 8, gateX + gateW + 8];
  for (const tx of torches) {
    ctx.fillStyle = "#2c221e";
    ctx.fillRect(tx - 2, h - 42, 4, 14);
    ctx.fillStyle = goldColor;
    ctx.fillRect(tx - 4, h - 46, 8, 5);
    const flicker = Math.sin(time * 12 + tx) * 1.5;
    const flame = ctx.createRadialGradient(tx, h - 49 + flicker, 1, tx, h - 49 + flicker, 10);
    flame.addColorStop(0, "rgba(255, 255, 200, 0.95)");
    flame.addColorStop(0.4, arch === "boss" ? "rgba(255, 60, 60, 0.85)" : "rgba(255, 160, 40, 0.75)");
    flame.addColorStop(1, "rgba(255, 80, 20, 0)");
    ctx.fillStyle = flame;
    ctx.beginPath();
    ctx.arc(tx, h - 49 + flicker, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. HIGH-CONTRAST ILLUMINATED ARCADE MARQUEE SIGNBOARD
  const signX = 8;
  const signY = 28;
  const signW = w - 16;
  const signH = 40;

  ctx.fillStyle = "rgba(18, 22, 34, 0.96)";
  round(ctx, signX, signY, signW, signH, 6);
  ctx.fill();
  ctx.strokeStyle = goldColor;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Parse label into badge and title
  const raw = item.label;
  let badge = "";
  let title = raw;
  if (raw.includes(":")) {
    const parts = raw.split(":");
    badge = parts[0].trim();
    title = parts.slice(1).join(":").trim();
  } else if (raw.startsWith("Bloque") || raw.startsWith("Tema") || raw.startsWith("Jefe") || raw.startsWith("Examen")) {
    const parts = raw.split(" ");
    badge = parts.slice(0, 2).join(" ");
    title = parts.slice(2).join(" ");
  }

  // Draw Badge (Gold on dark)
  if (badge) {
    ctx.fillStyle = goldColor;
    ctx.font = "bold 9px Georgia";
    ctx.textAlign = "center";
    ctx.fillText(badge, w / 2, signY + 12);
  }

  // Draw Title text (Crisp white with shadow)
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 10.5px Georgia";
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(0,0,0,0.9)";
  ctx.shadowBlur = 3;

  const words = (title || raw).split(" ");
  if (words.length <= 2) {
    ctx.fillText(title || raw, w / 2, badge ? signY + 28 : signY + 24);
  } else {
    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid).join(" ");
    const line2 = words.slice(mid).join(" ");
    ctx.fillText(line1, w / 2, badge ? signY + 22 : signY + 16);
    ctx.fillText(line2, w / 2, badge ? signY + 34 : signY + 28);
  }
  ctx.shadowBlur = 0;

  // 6. Floating animated interaction beacon
  const beaconBob = Math.sin(time * 3.5 + item.id) * 3;
  ctx.fillStyle = goldColor;
  round(ctx, w / 2 - 46, signY + signH + 4 + beaconBob, 92, 16, 8);
  ctx.fill();
  ctx.fillStyle = "#1e140d";
  ctx.font = "bold 9px sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("▲ ENTRAR (W / ↑)", w / 2, signY + signH + 15 + beaconBob);

  ctx.restore();
}

function drawBoss(ctx: CanvasRenderingContext2D, run: Run, item: Ent, theme: Theme) {
  // Legendary Retro Boss Fight: "El Gran Magistrado del Tribunal" (Mario / Alex Kidd Boss Style)
  ctx.save();
  const time = run.time;
  const hoverY = Math.sin(time * 2.8) * 6;
  const isHurt = run.shake > 0;
  const facing = item.vx >= 0 ? 1 : -1;

  ctx.translate(item.x + item.w / 2, item.y + item.h + hoverY);

  // 1. Magical Tribunal Aura (Pulsing glowing halo)
  const aura = ctx.createRadialGradient(0, -50, 10, 0, -50, 75);
  const hpRatio = Math.max(0, run.bossHp / run.bossMax);
  const auraAlpha = 0.35 + Math.sin(time * 4) * 0.15;
  aura.addColorStop(0, `rgba(226, 182, 87, ${auraAlpha})`);
  aura.addColorStop(0.6, `rgba(178, 58, 72, ${auraAlpha * 0.5})`);
  aura.addColorStop(1, "rgba(178, 58, 72, 0)");
  ctx.fillStyle = aura;
  ctx.beginPath();
  ctx.arc(0, -50, 75, 0, Math.PI * 2);
  ctx.fill();

  // Shadow on the ground below hover
  ctx.fillStyle = "rgba(25, 14, 10, 0.35)";
  ctx.beginPath();
  ctx.ellipse(0, 3 - hoverY, 34, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Boss body scale & damage flash
  ctx.scale(facing, 1);
  if (isHurt && Math.sin(time * 30) > 0) {
    ctx.globalAlpha = 0.6;
  }

  // 2. Velvet Magistrate Robes (Body)
  // Deep imperial purple / judicial maroon robe
  ctx.fillStyle = isHurt ? "#d94236" : "#4a1c38";
  round(ctx, -28, -78, 56, 78, 16);
  ctx.fill();
  ctx.strokeStyle = "#e5b452";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Gold frogging and trim down the center
  ctx.fillStyle = "#e5b452";
  ctx.fillRect(-3, -78, 6, 76);
  for (let b = -70; b < -10; b += 14) {
    ctx.fillRect(-12, b, 24, 3);
  }

  // White ermine / lace judicial jabot (chabó de encaje)
  ctx.fillStyle = "#fffaf2";
  ctx.beginPath();
  ctx.moveTo(0, -68);
  ctx.lineTo(10, -52);
  ctx.lineTo(-10, -52);
  ctx.closePath();
  ctx.fill();

  // 3. Head & Classic Judicial Wig (Peluca con bucles de magistrado)
  // Face
  ctx.fillStyle = isHurt ? "#fcd8d4" : "#f5d4be";
  ctx.beginPath();
  ctx.arc(0, -78, 16, 0, Math.PI * 2);
  ctx.fill();

  // Curly powdered wig (bucles laterales)
  ctx.fillStyle = "#e8e5df";
  ctx.beginPath();
  // Left curls
  ctx.arc(-16, -82, 8, 0, Math.PI * 2);
  ctx.arc(-18, -72, 7, 0, Math.PI * 2);
  ctx.arc(-16, -63, 6, 0, Math.PI * 2);
  // Right curls
  ctx.arc(16, -82, 8, 0, Math.PI * 2);
  ctx.arc(18, -72, 7, 0, Math.PI * 2);
  ctx.arc(16, -63, 6, 0, Math.PI * 2);
  // Top wig volume
  ctx.arc(0, -90, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#b5b0a6";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Judicial Bicorne / Crown
  ctx.fillStyle = "#22131e";
  ctx.beginPath();
  ctx.moveTo(-20, -88);
  ctx.lineTo(0, -104);
  ctx.lineTo(20, -88);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#e5b452";
  ctx.fillRect(-8, -94, 16, 4);

  // Stern animated face: glowing eyes tracking player
  ctx.fillStyle = "#ffdd44";
  ctx.beginPath();
  ctx.ellipse(-5, -78, 4, 3, 0, 0, Math.PI * 2);
  ctx.ellipse(7, -78, 4, 3, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1a0e14";
  ctx.beginPath();
  ctx.arc(-4, -78, 1.8, 0, Math.PI * 2);
  ctx.arc(8, -78, 1.8, 0, Math.PI * 2);
  ctx.fill();

  // Fierce bushy eyebrows
  ctx.strokeStyle = "#402636";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(-10, -83);
  ctx.lineTo(-2, -80);
  ctx.moveTo(11, -83);
  ctx.lineTo(3, -80);
  ctx.stroke();

  // 4. WEAPON 1: GIANT GOLDEN GAVEL (Maza de Tribunal) in Left Hand
  ctx.save();
  const gavelAngle = Math.sin(time * 5) * 0.35;
  ctx.translate(-26, -50);
  ctx.rotate(gavelAngle);
  // Handle
  ctx.fillStyle = "#8d542c";
  ctx.fillRect(-3, -26, 6, 32);
  // Gavel Head
  ctx.fillStyle = "#e5b452";
  round(ctx, -14, -38, 22, 14, 3);
  ctx.fill();
  ctx.strokeStyle = "#a47820";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();

  // 5. WEAPON 2: GLOWING RED EXAM PEN (Pluma de Calificación) in Right Hand
  ctx.save();
  ctx.translate(26, -50);
  ctx.rotate(-0.3 + Math.sin(time * 4) * 0.2);
  // Quill feather in crimson
  ctx.fillStyle = "#c43328";
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(12, -20, 4, -36);
  ctx.quadraticCurveTo(-2, -18, 0, 0);
  ctx.fill();
  // Glowing nib spark
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(4, -36, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.restore(); // Restore boss body transformation

  // 6. RETRO ARCADE BOSS HEALTH BAR & NAMEPLATE (HUD style above boss)
  ctx.save();
  const barW = 140;
  const barH = 16;
  const barX = item.x + item.w / 2 - barW / 2;
  const barY = item.y - 44 + hoverY;

  // Boss Title
  ctx.fillStyle = "#fff8ee";
  ctx.font = "bold 11px Georgia";
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(0,0,0,0.85)";
  ctx.shadowBlur = 4;
  ctx.fillText(`👑 ${item.label.toUpperCase()}`, item.x + item.w / 2, barY - 4);
  ctx.shadowBlur = 0;

  // Outer metal frame
  ctx.fillStyle = "rgba(18, 12, 16, 0.94)";
  round(ctx, barX, barY, barW, barH, 4);
  ctx.fill();
  ctx.strokeStyle = "#e5b452";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Segmented life pips (Retro Street Fighter / Mega Man style)
  const pips = run.bossMax;
  const pipGap = 2;
  const pipW = (barW - 8 - (pips - 1) * pipGap) / pips;
  for (let i = 0; i < pips; i++) {
    const active = i < run.bossHp;
    const px = barX + 4 + i * (pipW + pipGap);
    if (active) {
      // Glowing green/yellow/red gradient depending on HP
      ctx.fillStyle = hpRatio > 0.5 ? "#56bf5e" : hpRatio > 0.25 ? "#f0b429" : "#e53e3e";
      round(ctx, px, barY + 3, pipW, barH - 6, 2);
      ctx.fill();
      // Highlight shine
      ctx.fillStyle = "rgba(255,255,255,0.45)";
      ctx.fillRect(px, barY + 3, pipW, 3);
    } else {
      ctx.fillStyle = "rgba(255,255,255,0.1)";
      round(ctx, px, barY + 3, pipW, barH - 6, 2);
      ctx.fill();
    }
  }

  // Stomp Hint Badge
  ctx.fillStyle = "#e5b452";
  round(ctx, item.x + item.w / 2 - 44, barY + barH + 3, 88, 14, 7);
  ctx.fill();
  ctx.fillStyle = "#1e140d";
  ctx.font = "bold 9px Georgia";
  ctx.textAlign = "center";
  ctx.fillText("⭐ PÍSALE LA CABEZA", item.x + item.w / 2, barY + barH + 13);

  ctx.restore();
}

function drawDeco(ctx: CanvasRenderingContext2D, item: Ent, theme: Theme, time: number) {
  ctx.save();
  ctx.translate(item.x, item.y);

  if (item.ref === "vault_safe") {
    // Heavy Bank Treasury Safe
    ctx.fillStyle = "#163a2c";
    round(ctx, 4, 12, 34, 46, 6);
    ctx.fill();
    ctx.strokeStyle = "#e5b452";
    ctx.lineWidth = 2;
    ctx.stroke();
    // Dial
    ctx.fillStyle = "#f5cb4a";
    ctx.beginPath();
    ctx.arc(21, 35, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0c231a";
    ctx.beginPath();
    ctx.arc(21, 35, 4, 0, Math.PI * 2);
    ctx.fill();
  } else if (item.ref === "gold_stack") {
    // Stack of 3 Gold Bullion Bars with Coins
    ctx.fillStyle = "#f5cb4a";
    ctx.fillRect(4, 44, 34, 14);
    ctx.fillStyle = "#ffd966";
    ctx.fillRect(6, 45, 30, 3);
    ctx.fillStyle = "#e5b452";
    ctx.fillRect(10, 30, 22, 14);
    ctx.fillStyle = "#ffe480";
    ctx.fillRect(12, 31, 18, 3);
    // Gold coins around
    ctx.fillStyle = "#ffd966";
    ctx.beginPath();
    ctx.arc(6, 56, 4, 0, Math.PI * 2);
    ctx.arc(36, 56, 4, 0, Math.PI * 2);
    ctx.fill();
  } else if (item.ref === "balance_scale") {
    // Bronze Balance Scale of Budget Justice
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(19, 10, 4, 48);
    ctx.fillRect(10, 56, 22, 4);
    ctx.fillRect(4, 18, 34, 3);
    // Pans
    ctx.fillStyle = "#f5cb4a";
    ctx.beginPath();
    ctx.arc(8, 30, 7, 0, Math.PI);
    ctx.arc(34, 30, 7, 0, Math.PI);
    ctx.fill();
  } else if (item.ref === "ledger_book") {
    // PGE Leather Budget Ledger
    ctx.fillStyle = "#2a1c12";
    ctx.fillRect(6, 22, 30, 36);
    ctx.fillStyle = "#e5b452";
    ctx.fillRect(6, 22, 30, 4);
    ctx.fillRect(6, 54, 30, 4);
    ctx.fillStyle = "#fffcf0";
    ctx.fillRect(9, 26, 24, 28);
    ctx.fillStyle = "#c43328"; // Red bookmark ribbon
    ctx.fillRect(19, 24, 4, 32);
  } else if (item.ref === "brass_lamp") {
    // Green Glass Banker Lamp on Brass Stem
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(19, 24, 4, 34);
    ctx.fillRect(12, 56, 18, 4);
    // Green glass shade
    ctx.fillStyle = "#186338";
    round(ctx, 6, 16, 30, 12, 6);
    ctx.fill();
    // Warm light
    const glow = ctx.createRadialGradient(21, 26, 2, 21, 26, 16);
    glow.addColorStop(0, "rgba(255, 245, 160, 0.95)");
    glow.addColorStop(1, "rgba(255, 215, 80, 0)");
    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(21, 26, 16, 0, Math.PI * 2);
    ctx.fill();
  } else if (item.ref === "solar_panel") {
    // Photovoltaic Solar Panel
    ctx.fillStyle = "#8a9ba8";
    ctx.fillRect(18, 34, 6, 24);
    ctx.fillStyle = "#1e4c73";
    ctx.beginPath();
    ctx.moveTo(4, 34);
    ctx.lineTo(16, 12);
    ctx.lineTo(38, 12);
    ctx.lineTo(26, 34);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#80d0ff";
    ctx.lineWidth = 1.2;
    ctx.stroke();
  } else if (item.ref === "sdg_banner") {
    // Agenda 2030 Rainbow Banner Totem
    ctx.fillStyle = "#4a3c30";
    ctx.fillRect(19, 4, 4, 54);
    const rCols = ["#e5243b", "#dda63a", "#4c9f38", "#c5192d", "#ff3a21", "#26bde2", "#fcc30b", "#a21942", "#dd1367"];
    for (let c = 0; c < rCols.length; c++) {
      ctx.fillStyle = rCols[c];
      ctx.fillRect(23, 6 + c * 5, 14, 5);
    }
  } else if (item.ref === "equality_ribbon") {
    // Gender Equality Violet Ribbon Monument
    ctx.fillStyle = "#ece6d8";
    round(ctx, 10, 48, 22, 12, 3);
    ctx.fill();
    ctx.fillStyle = "#783c84"; // Equality Purple
    ctx.beginPath();
    ctx.arc(21, 24, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(21, 24, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#783c84";
    ctx.fillRect(14, 28, 6, 18);
    ctx.fillRect(22, 28, 6, 18);
  } else if (item.ref === "eco_planter") {
    // Modern Cedar Planter with Flowers
    ctx.fillStyle = "#8c5a36";
    round(ctx, 4, 38, 34, 20, 4);
    ctx.fill();
    ctx.fillStyle = "#3c8a4c"; // Leaves
    ctx.beginPath();
    ctx.arc(14, 34, 10, 0, Math.PI * 2);
    ctx.arc(28, 34, 10, 0, Math.PI * 2);
    ctx.fill();
    // Colorful flowers
    ctx.fillStyle = "#ff69b4";
    ctx.beginPath(); ctx.arc(14, 32, 4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffd700";
    ctx.beginPath(); ctx.arc(28, 32, 4, 0, Math.PI * 2); ctx.fill();
  } else if (item.ref === "green_tree") {
    // Lush Blooming Tree
    ctx.fillStyle = "#5c3d28";
    ctx.fillRect(17, 30, 8, 32);
    ctx.fillStyle = "#3a8542";
    ctx.beginPath();
    ctx.arc(21, 18, 20, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#56aa5e";
    ctx.beginPath();
    ctx.arc(16, 14, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ff94c2"; // Flower buds
    ctx.fillRect(14, 12, 3, 3);
    ctx.fillRect(26, 16, 3, 3);
  } else if (item.ref === "eu_flag") {
    // European Flag on Chrome Pole
    ctx.fillStyle = "#9cb2c7";
    ctx.fillRect(10, 0, 3, 58);
    ctx.fillStyle = "#0c3066";
    ctx.fillRect(13, 4, 26, 17);
    drawStar(ctx, 26, 12, 5, 4, 2, "#ffd54f");
  } else if (item.ref === "euro_pillar") {
    // Chrome Pillar with Glowing Euro
    ctx.fillStyle = "#8a9fb5";
    ctx.fillRect(16, 18, 10, 42);
    ctx.fillRect(10, 56, 22, 4);
    ctx.fillStyle = "#ffd54f";
    ctx.beginPath();
    ctx.arc(21, 12, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#0c284d";
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("€", 21, 16);
  } else if (item.ref === "eu_terminal") {
    // Glowing Blue EUR-Lex Terminal
    ctx.fillStyle = "#1a3352";
    round(ctx, 6, 18, 30, 38, 4);
    ctx.fill();
    ctx.fillStyle = "#00e5ff";
    ctx.fillRect(9, 22, 24, 18);
    ctx.fillStyle = "#10233b";
    ctx.fillRect(12, 26, 18, 2);
    ctx.fillRect(12, 30, 14, 2);
  } else if (item.ref === "treaty_pedestal") {
    // White Marble Pedestal with European Treaty
    ctx.fillStyle = "#edf2f7";
    round(ctx, 8, 28, 26, 32, 3);
    ctx.fill();
    ctx.fillStyle = "#ffd54f";
    ctx.fillRect(10, 16, 22, 12);
  } else if (item.ref === "wax_seal_post") {
    // Stone Pillar with Red Wax Seal
    ctx.fillStyle = "#3e3748";
    ctx.fillRect(15, 10, 12, 50);
    ctx.fillStyle = "#9e252a";
    ctx.beginPath();
    ctx.arc(21, 20, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffd54f";
    ctx.beginPath();
    ctx.arc(21, 20, 5, 0, Math.PI * 2);
    ctx.fill();
  } else if (item.ref === "quill_inkpot") {
    // Giant Inkpot with White Feather Quill
    ctx.fillStyle = "#221c2b";
    round(ctx, 12, 38, 18, 20, 5);
    ctx.fill();
    ctx.fillStyle = "#f5f0e6"; // Quill
    ctx.beginPath();
    ctx.moveTo(21, 40);
    ctx.lineTo(34, 6);
    ctx.lineTo(26, 16);
    ctx.closePath();
    ctx.fill();
  } else if (item.ref === "archive_tome") {
    // Ancient Legal Codex
    ctx.fillStyle = "#4a2d1f";
    ctx.fillRect(8, 20, 26, 38);
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(10, 24, 22, 4);
    ctx.fillRect(10, 50, 22, 4);
  } else if (item.ref === "iron_torch") {
    // Castle Iron Torch with Flame
    ctx.fillStyle = "#221e28";
    ctx.fillRect(19, 24, 4, 34);
    ctx.fillRect(16, 20, 10, 6);
    const flicker = Math.sin(time * 10) * 2;
    ctx.fillStyle = "#ff8c1a";
    ctx.beginPath();
    ctx.arc(21, 14 + flicker, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#ffe640";
    ctx.beginPath();
    ctx.arc(21, 15 + flicker, 4, 0, Math.PI * 2);
    ctx.fill();
  } else if (item.ref === "inap_laurel") {
    // INAP Laurel Column
    ctx.fillStyle = "#ede6db";
    ctx.fillRect(14, 14, 14, 46);
    ctx.fillStyle = "#d4af37";
    ctx.beginPath();
    ctx.arc(21, 14, 9, 0, Math.PI * 2);
    ctx.fill();
  } else if (item.ref === "bulletin_board") {
    // OEP Gazette Noticeboard
    ctx.fillStyle = "#5c3d28";
    ctx.fillRect(8, 12, 4, 48);
    ctx.fillRect(30, 12, 4, 48);
    ctx.fillStyle = "#eedcba";
    ctx.fillRect(10, 16, 22, 28);
    ctx.fillStyle = "#c43328";
    ctx.fillRect(12, 18, 18, 3);
  } else if (item.ref === "clock_post") {
    // Clock Post showing 10:10
    ctx.fillStyle = "#2c2825";
    ctx.fillRect(19, 20, 4, 40);
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(21, 14, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#22140d";
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(21, 14); ctx.lineTo(17, 9);
    ctx.moveTo(21, 14); ctx.lineTo(26, 9);
    ctx.stroke();
  } else if (item.ref === "lion_statue") {
    // Congreso Bronze Lion
    ctx.fillStyle = "#7a5833";
    round(ctx, 6, 26, 30, 32, 6);
    ctx.fill();
    ctx.fillStyle = "#946f45";
    ctx.beginPath();
    ctx.arc(16, 22, 10, 0, Math.PI * 2);
    ctx.fill();
  } else if (item.ref === "ce_column") {
    // Classical Corinthian Column
    ctx.fillStyle = "#f7eee1";
    ctx.fillRect(16, 8, 10, 50);
    ctx.fillStyle = "#e2d2bd";
    ctx.fillRect(12, 0, 18, 8);
    ctx.fillRect(12, 58, 18, 6);
  } else if (item.ref === "spanish_flag") {
    // Spanish Flag on Brass Pole
    ctx.fillStyle = "#d4af37";
    ctx.fillRect(10, 0, 3, 58);
    ctx.fillStyle = "#c43328";
    ctx.fillRect(13, 4, 26, 17);
    ctx.fillStyle = "#f3bf2e";
    ctx.fillRect(13, 8, 26, 9);
  } else if (item.ref === "pediment_monument") {
    // Magna Carta 1978 Monument
    ctx.fillStyle = "#ede6db";
    ctx.fillRect(6, 20, 30, 38);
    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 9px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("1978", 21, 38);
  } else if (item.ref === "lamp" || item.ref === "fernandina_lamp") {
    // Madrid 3-Globe Fernandina Cast-Iron Streetlamp
    ctx.fillStyle = "#2c2825";
    ctx.fillRect(13, 20, 5, 42);
    ctx.fillRect(9, 58, 13, 6);

    ctx.beginPath();
    ctx.arc(15, 24, 12, Math.PI, Math.PI * 2);
    ctx.strokeStyle = "#2c2825";
    ctx.lineWidth = 3;
    ctx.stroke();

    const lamps = [{ x: 3, y: 16 }, { x: 15, y: 10 }, { x: 27, y: 16 }];
    for (const l of lamps) {
      const glow = ctx.createRadialGradient(l.x, l.y, 2, l.x, l.y, 18);
      glow.addColorStop(0, "rgba(255, 245, 180, 0.9)");
      glow.addColorStop(0.5, "rgba(255, 210, 100, 0.45)");
      glow.addColorStop(1, "rgba(255, 190, 80, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(l.x, l.y, 18, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(l.x, l.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (item.ref === "tree") {
    ctx.fillStyle = "#5c3d28";
    ctx.fillRect(13, 30, 8, 32);
    ctx.fillStyle = theme.hill;
    ctx.beginPath();
    ctx.arc(17, 18, 22, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#4a7838";
    ctx.beginPath();
    ctx.arc(14, 14, 18, 0, Math.PI * 2);
    ctx.fill();
  } else if (item.ref === "banner") {
    ctx.fillStyle = "#3a2a22";
    ctx.fillRect(6, 0, 3, 58);
    ctx.fillStyle = theme.accent;
    ctx.beginPath();
    ctx.moveTo(9, 4);
    ctx.lineTo(34, 14 + Math.sin(time * 3) * 2.5);
    ctx.lineTo(9, 28);
    ctx.fill();
    ctx.fillStyle = theme.accentGold;
    ctx.fillRect(9, 14, 18, 3);
  } else {
    ctx.fillStyle = theme.accent;
    ctx.fillRect(8, 20, 22, 28);
    ctx.fillStyle = theme.top;
    ctx.fillRect(12, 24, 14, 4);
  }

  ctx.restore();
}

function drawChibi(ctx: CanvasRenderingContext2D, id: string, cx: number, bob: number, time: number) {
  const npc = NPC_BY_ID.get(id);
  const suitColor = npc?.body ?? "#1f7f86";
  const shirtColor = npc?.accent ?? "#ffffff";
  const hairColor = npc?.hair ?? "#3a2a22";
  const hatType = npc?.hat ?? "badge";
  const breathe = Math.sin(time * 3 + cx) * 0.8;

  ctx.save();
  ctx.translate(cx, bob);

  // 1. Natural Ground Shadow
  ctx.fillStyle = "rgba(18, 12, 10, 0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 1, 15, 4.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // 2. Leather Shoes (left & right)
  ctx.fillStyle = "#1e1410";
  round(ctx, -13, -7, 11, 7, 3);
  ctx.fill();
  round(ctx, 2, -7, 11, 7, 3);
  ctx.fill();
  // Shoe shine
  ctx.fillStyle = "rgba(255,255,255,0.35)";
  ctx.fillRect(-10, -6, 5, 2);
  ctx.fillRect(5, -6, 5, 2);

  // 3. Tailored Formal Trousers / Skirt
  ctx.fillStyle = "#273239";
  // Left leg
  ctx.fillRect(-11, -22, 9, 16);
  // Right leg
  ctx.fillRect(2, -22, 9, 16);
  // Crease fold
  ctx.fillStyle = "#1b2328";
  ctx.fillRect(-7, -20, 1.5, 14);
  ctx.fillRect(6, -20, 1.5, 14);

  // 4. Suit Jacket / Blazer / Formal Coat
  ctx.fillStyle = suitColor;
  round(ctx, -15, -42 + breathe, 30, 22, 6);
  ctx.fill();
  ctx.strokeStyle = "rgba(0,0,0,0.18)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // 5. White / Silk Collared Shirt & Lapels
  ctx.fillStyle = shirtColor;
  ctx.beginPath();
  ctx.moveTo(-6, -42 + breathe);
  ctx.lineTo(6, -42 + breathe);
  ctx.lineTo(0, -32 + breathe);
  ctx.closePath();
  ctx.fill();

  // Necktie or Bow / Scarf
  ctx.fillStyle = hatType === "crown" ? "#e2b657" : hatType === "scales" ? "#4a3b82" : "#a82e2e";
  ctx.beginPath();
  ctx.moveTo(-2, -39 + breathe);
  ctx.lineTo(2, -39 + breathe);
  ctx.lineTo(3, -29 + breathe);
  ctx.lineTo(0, -26 + breathe);
  ctx.lineTo(-3, -29 + breathe);
  ctx.closePath();
  ctx.fill();

  // Gold jacket buttons
  ctx.fillStyle = "#e5b452";
  ctx.beginPath();
  ctx.arc(0, -29 + breathe, 1.5, 0, Math.PI * 2);
  ctx.arc(0, -24 + breathe, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // 6. Arms & Official BOE Dossier / Clipboard in Hand
  // Left arm
  ctx.fillStyle = suitColor;
  round(ctx, -18, -39 + breathe, 6, 17, 3);
  ctx.fill();
  // Left hand (holding folder)
  ctx.fillStyle = "#f6d8c3";
  ctx.beginPath();
  ctx.arc(-15, -22 + breathe, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // Official Dossier / Book of Laws in Left Hand
  ctx.fillStyle = "#8a2434"; // Crimson official leather cover
  round(ctx, -23, -27 + breathe, 11, 14, 2);
  ctx.fill();
  ctx.fillStyle = "#f8f3e8"; // Paper pages trim
  ctx.fillRect(-14, -25 + breathe, 2, 10);
  ctx.fillStyle = "#e5b452"; // Gold crest on cover
  ctx.beginPath();
  ctx.arc(-18, -20 + breathe, 2, 0, Math.PI * 2);
  ctx.fill();

  // Right arm & hand
  ctx.fillStyle = suitColor;
  round(ctx, 12, -39 + breathe, 6, 17, 3);
  ctx.fill();
  ctx.fillStyle = "#f6d8c3";
  ctx.beginPath();
  ctx.arc(15, -22 + breathe, 3.5, 0, Math.PI * 2);
  ctx.fill();

  // 7. Beautiful Chibi Head
  const headY = -54 + breathe * 0.5;

  // Back hair layer
  ctx.fillStyle = hairColor;
  ctx.beginPath();
  ctx.arc(0, headY, 15, 0, Math.PI * 2);
  ctx.fill();
  if (hatType === "bun") {
    // Elegant bun for Doña Pilar
    ctx.beginPath();
    ctx.arc(0, headY - 14, 7, 0, Math.PI * 2);
    ctx.fill();
  }

  // Soft face skin
  ctx.fillStyle = "#f6d8c3";
  ctx.beginPath();
  ctx.arc(0, headY + 1, 12.5, 0, Math.PI * 2);
  ctx.fill();

  // Rosy cheeks
  ctx.fillStyle = "rgba(235, 110, 110, 0.4)";
  ctx.beginPath();
  ctx.ellipse(-7, headY + 4, 3, 1.8, 0, 0, Math.PI * 2);
  ctx.ellipse(7, headY + 4, 3, 1.8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Detailed Anime / Chibi Eyes (Left & Right)
  const drawEye = (ex: number) => {
    // Eye white
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(ex, headY, 3.5, 4.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Iris (Vibrant color)
    ctx.fillStyle = hatType === "scales" ? "#34557d" : hatType === "star" ? "#236359" : "#4a2d1d";
    ctx.beginPath();
    ctx.ellipse(ex, headY + 0.3, 2.5, 3.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pupil
    ctx.fillStyle = "#120d18";
    ctx.beginPath();
    ctx.arc(ex, headY + 0.5, 1.4, 0, Math.PI * 2);
    ctx.fill();

    // Specular highlight gleam
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(ex - 0.9, headY - 1.2, 1.1, 0, Math.PI * 2);
    ctx.arc(ex + 0.9, headY + 1.2, 0.6, 0, Math.PI * 2);
    ctx.fill();

    // Eyelash line
    ctx.strokeStyle = "#231818";
    ctx.lineWidth = 1.3;
    ctx.beginPath();
    ctx.arc(ex, headY - 1, 3.4, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
  };

  drawEye(-5);
  drawEye(5);

  // Friendly curved smile
  ctx.strokeStyle = "#a24838";
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(0, headY + 4, 3, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Eyebrows
  ctx.strokeStyle = hairColor;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(-7, headY - 6);
  ctx.quadraticCurveTo(-5, headY - 7.5, -2, headY - 6);
  ctx.moveTo(2, headY - 6);
  ctx.quadraticCurveTo(5, headY - 7.5, 7, headY - 6);
  ctx.stroke();

  // Styled Front Bangs / Hair Fringe
  ctx.fillStyle = hairColor;
  ctx.beginPath();
  ctx.moveTo(-13, headY - 3);
  ctx.quadraticCurveTo(-8, headY - 12, 0, headY - 13);
  ctx.quadraticCurveTo(8, headY - 12, 13, headY - 3);
  ctx.quadraticCurveTo(9, headY - 6, 6, headY - 3);
  ctx.quadraticCurveTo(0, headY - 7, -6, headY - 3);
  ctx.quadraticCurveTo(-10, headY - 6, -13, headY - 3);
  ctx.fill();

  // 8. Distinguishing Departmental Headwear / Accessories
  if (hatType === "crown") {
    // Golden Crown Insignia for Cortes / Corona
    ctx.fillStyle = "#f4c653";
    ctx.beginPath();
    ctx.moveTo(-8, headY - 12);
    ctx.lineTo(-6, headY - 17);
    ctx.lineTo(-2, headY - 13);
    ctx.lineTo(0, headY - 18);
    ctx.lineTo(2, headY - 13);
    ctx.lineTo(6, headY - 17);
    ctx.lineTo(8, headY - 12);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#c83232";
    ctx.beginPath();
    ctx.arc(0, headY - 14, 1.2, 0, Math.PI * 2);
    ctx.fill();
  } else if (hatType === "star") {
    // European 12-Star Gold Beret Pin
    ctx.fillStyle = "#ffd54f";
    ctx.beginPath();
    ctx.arc(9, headY - 10, 3, 0, Math.PI * 2);
    ctx.fill();
  } else if (hatType === "stamp" || hatType === "abacus") {
    // Wireframe Tortoiseshell Glasses
    ctx.strokeStyle = "#8a5828";
    ctx.lineWidth = 1.2;
    ctx.strokeRect(-8, headY - 3, 6, 5);
    ctx.strokeRect(2, headY - 3, 6, 5);
    ctx.beginPath();
    ctx.moveTo(-2, headY - 1);
    ctx.lineTo(2, headY - 1);
    ctx.stroke();
  } else {
    // INAP Official Silver/Gold Lapel Badge
    ctx.fillStyle = "#f4c653";
    ctx.beginPath();
    ctx.arc(7, -34 + breathe, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawPlayer(ctx: CanvasRenderingContext2D, run: Run) {
  const body = run.player;
  const jumping = !body.onGround;
  const walking = Math.abs(body.vx) > 20 && body.onGround;

  // Walk cycle frame selection (4 smooth walking phases from the user's doll)
  let spritePath = SPRITES.stand;
  let bob = 0;
  let tilt = 0;

  if (jumping) {
    spritePath = SPRITES.jump;
    tilt = Math.max(-0.15, Math.min(0.15, body.vy * 0.0003 * body.face));
  } else if (walking) {
    const stepProgress = Math.abs(body.x * 0.048);
    const frameIdx = Math.floor(stepProgress) % 4;
    const walkFrames = [SPRITES.walk0, SPRITES.walk1, SPRITES.walk2, SPRITES.walk3];
    spritePath = walkFrames[frameIdx] ?? SPRITES.walk;

    // Organic walking stride bob & forward lean
    bob = Math.sin(stepProgress * Math.PI) * 2.2;
    tilt = Math.max(-0.12, Math.min(0.12, body.vx * 0.00035 * body.face));
  } else {
    // Idle breathing animation
    spritePath = SPRITES.stand;
    bob = Math.sin(run.time * 2.8) * 1.0;
  }

  const sprite = getSprite(spritePath) ?? getSprite(SPRITES.walk);
  const dh = jumping ? 72 : 68;

  ctx.save();
  ctx.translate(body.x + body.w / 2, body.y + body.h);

  // Soft double-layer contact shadow that scales with jump height
  const shadowScale = jumping ? 0.65 : 1;
  ctx.fillStyle = "rgba(25, 16, 12, 0.28)";
  ctx.beginPath();
  ctx.ellipse(0, 2, 13 * shadowScale, 3.8 * shadowScale, 0, 0, Math.PI * 2);
  ctx.fill();

  // Subtle footstep dust when running
  if (walking && Math.abs(bob) > 1.8) {
    ctx.fillStyle = "rgba(235, 218, 195, 0.4)";
    ctx.beginPath();
    ctx.arc(-body.face * 8, 0, 3, 0, Math.PI * 2);
    ctx.arc(-body.face * 12, -1.5, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Facing, tilt, and landing squash/stretch
  const squashY = body.land > 0 ? 0.9 : jumping ? 1.04 : 1;
  const squashX = body.land > 0 ? 1.1 : jumping ? 0.96 : 1;
  ctx.scale(body.face * squashX, squashY);
  ctx.rotate(tilt);

  if (sprite) {
    const dw = dh * (sprite.width / sprite.height);
    // Invulnerability flashing
    if (run.iframe > 0 && Math.sin(run.time * 30) > 0) ctx.globalAlpha = 0.45;
    ctx.drawImage(sprite, -dw / 2, -dh + bob + 2, dw, dh);
  } else {
    // Fallback chibi if loading
    ctx.fillStyle = "#d4654a";
    ctx.beginPath();
    ctx.arc(0, -48, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#8d8f93";
    round(ctx, -10, -38, 20, 18, 5);
    ctx.fill();
    ctx.fillStyle = "#1f8a8a";
    ctx.fillRect(-5, -34, 10, 10);
    ctx.fillStyle = "#243044";
    ctx.fillRect(-5, -20, 4, 16);
    ctx.fillRect(1, -20, 4, 16);
  }
  ctx.restore();
}

function drawBit(ctx: CanvasRenderingContext2D, run: Run, theme: Theme) {
  const x = run.player.x + (run.player.face === 1 ? 36 : -28);
  const y = run.player.y - 18 + Math.sin(run.time * 4) * 3;
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = "#d4654a";
  round(ctx, 0, 0, 22, 18, 5);
  ctx.fill();
  ctx.fillStyle = "#f6efe2";
  ctx.fillRect(4, 5, 5, 4);
  ctx.fillRect(13, 5, 5, 4);
  ctx.fillStyle = theme.ink;
  ctx.fillRect(10, -4, 2, 5);
  ctx.restore();
  bubble(ctx, x - 20, y - 36, "pista");
}

function bubble(ctx: CanvasRenderingContext2D, x: number, y: number, text: string) {
  ctx.save();
  ctx.fillStyle = "#fffaf2";
  const w = Math.max(34, text.length * 7.5 + 16);
  round(ctx, x, y, w, 22, 10);
  ctx.fill();
  ctx.strokeStyle = "rgba(45,28,18,0.2)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "#3a2a22";
  ctx.font = "bold 11px Georgia";
  ctx.textAlign = "center";
  ctx.fillText(text, x + w / 2, y + 15);
  ctx.restore();
}

function drawHud(ctx: CanvasRenderingContext2D, run: Run, width: number) {
  // Heart life indicators with glowing borders
  for (let i = 0; i < run.maxHearts; i++) {
    const active = i < run.hearts;
    ctx.fillStyle = active ? "#d94236" : "rgba(255,255,255,.32)";
    ctx.beginPath();
    ctx.arc(22 + i * 20, 22, 7.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = active ? "#7c221b" : "rgba(0,0,0,0.2)";
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  // Articles Collected Counter
  ctx.fillStyle = "#fffaf2";
  ctx.font = "bold 13px Georgia";
  ctx.textAlign = "left";
  ctx.shadowColor = "rgba(0,0,0,0.6)";
  ctx.shadowBlur = 4;
  ctx.fillText(`§ ${run.articles}${run.articleTotal ? `/${run.articleTotal}` : ""}`, 22, 46);

  // Difficulty badge
  ctx.textAlign = "right";
  ctx.fillText(run.difficulty.toUpperCase(), width - 18, 24);
  ctx.shadowBlur = 0;
}

function drawBanner(ctx: CanvasRenderingContext2D, run: Run, width: number) {
  ctx.save();
  ctx.globalAlpha = Math.min(1, run.bannerT);
  ctx.fillStyle = "rgba(36,22,16,.85)";
  round(ctx, width / 2 - 230, 16, 460, 56, 14);
  ctx.fill();
  ctx.strokeStyle = "rgba(226, 182, 87, 0.4)";
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.fillStyle = "#f6efe2";
  ctx.textAlign = "center";
  ctx.font = "700 18px Georgia";
  ctx.fillText(run.title, width / 2, 39);
  ctx.font = "13px Georgia";
  ctx.fillStyle = "#e5b452";
  ctx.fillText(run.subtitle, width / 2, 58);
  ctx.restore();
}

function drawToast(ctx: CanvasRenderingContext2D, run: Run, width: number, height: number) {
  ctx.save();
  ctx.globalAlpha = Math.min(1, run.toastT);
  const text = run.toast.length > 110 ? `${run.toast.slice(0, 107)}…` : run.toast;
  ctx.fillStyle = "rgba(255,248,236,.96)";
  round(ctx, 16, height - 60, Math.min(width - 32, 660), 44, 12);
  ctx.fill();
  ctx.strokeStyle = "rgba(40,24,16,0.15)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "#3a2a22";
  ctx.font = "13px Georgia";
  ctx.textAlign = "left";
  ctx.fillText(text, 28, height - 33);
  ctx.restore();
}

function drawPrompt(ctx: CanvasRenderingContext2D, text: string, width: number, height: number) {
  ctx.save();
  ctx.fillStyle = "rgba(28, 130, 130, 0.96)";
  const w = Math.min(width - 24, text.length * 8 + 32);
  round(ctx, width / 2 - w / 2, height - 30, w, 24, 12);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 12px Georgia";
  ctx.textAlign = "center";
  ctx.fillText(text, width / 2, height - 14);
  ctx.restore();
}
