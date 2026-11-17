import { NPC_BY_ID } from "@/lib/content";
import type { Ent, Run } from "./engine";
import { T } from "./engine";
import { getImage, BG_IMAGES, getSprite, SPRITES } from "./sprites";

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
  const camY = Math.max(0, run.H * T - viewH - 8);
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

function drawBackdrop(
  ctx: CanvasRenderingContext2D,
  run: Run,
  theme: Theme,
  camX: number,
  viewW: number,
  viewH: number,
  camY: number,
) {
  // Photorealistic 3D Pixar Madrid Skyline with Parallax
  const bgImg = getImage(BG_IMAGES.madrid);
  if (bgImg) {
    const bgH = viewH + 30;
    const bgW = (bgH / bgImg.height) * bgImg.width;
    const offset = ((-camX * 0.22) % bgW) - bgW;
    const startX = camX + offset;
    for (let x = startX; x < camX + viewW + bgW; x += bgW) {
      ctx.drawImage(bgImg, x, camY - 10, bgW, bgH);
    }
    return;
  }

  // Fallback procedural backdrop
  // 1. Radiant Sun with atmospheric glow
  const sunX = camX + viewW * 0.72 - (camX * 0.04) % (viewW * 1.2);
  const sunY = camY + 84;
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

  // 2. Distant Sierra de Guadarrama Mountain Ridges (Layer 1 - Far)
  const mountainBase = camY + viewH - 120;
  ctx.fillStyle = theme.mountainFar;
  ctx.globalAlpha = 0.55;
  drawMountainRidge(ctx, camX - 100, mountainBase - 40, viewW + 200, 120, 50, camX * 0.07);

  // Mountain Ridge (Layer 2 - Near)
  ctx.fillStyle = theme.mountainNear;
  ctx.globalAlpha = 0.65;
  drawMountainRidge(ctx, camX - 100, mountainBase - 15, viewW + 200, 110, 40, camX * 0.14 + 180);
  ctx.globalAlpha = 1;

  // 3. Volumetric Clouds with Depth
  drawClouds(ctx, theme, camX, camY, viewW);

  // 4. Rolling park hills behind the city
  ctx.fillStyle = theme.hill2;
  wave(ctx, camX - 60, mountainBase + 10, viewW + 120, 140, 48, camX * 0.22);
  ctx.fillStyle = theme.hill;
  wave(ctx, camX - 60, mountainBase + 34, viewW + 120, 130, 36, camX * 0.35 + 80);

  // 5. Rich Madrid Architecture & Institutional Skyline
  drawSkyline(ctx, run.theme, theme, camX, camY + viewH - 170, viewW);
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
) {
  const blockW = 120;
  const start = Math.floor(camX / blockW) * blockW - blockW;
  for (let x = start; x < camX + viewW + blockW * 2; x += blockW) {
    const n = Math.abs(Math.floor(x / blockW));
    const h = 75 + (n % 4) * 24 + ((n * 3) % 5) * 8;
    const px = x - camX * 0.42;

    ctx.save();
    ctx.translate(px, y - h);

    if (themeKey === "europa") {
      // European Community architecture (Brussels / Berlaymont inspired)
      ctx.fillStyle = n % 2 ? "#1f4a76" : "#17385a";
      round(ctx, 6, 12, 108, h + 20, 6);
      ctx.fill();
      // Glass curtain wall windows
      ctx.fillStyle = "#8ec4eb";
      ctx.globalAlpha = 0.65;
      for (let r = 24; r < h; r += 16) {
        for (let c = 14; c < 100; c += 18) {
          ctx.fillRect(c, r, 12, 10);
        }
      }
      ctx.globalAlpha = 1;
      // Golden star emblem
      ctx.fillStyle = "#ffd54f";
      ctx.beginPath();
      ctx.arc(60, 6, 8, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Madrid Neoclassical & Institutional Façades (INAP / Ministerios / Gran Vía)
      const isCornerDome = n % 4 === 1;
      const isClockTower = n % 4 === 3;
      const wallColor = n % 2 ? "#f4dfc3" : "#eed5b4";
      const trimColor = "#d6b58e";

      // Main facade body
      ctx.fillStyle = wallColor;
      ctx.fillRect(8, 20, 104, h);

      // Classical stone cornice / entablature
      ctx.fillStyle = trimColor;
      ctx.fillRect(4, 14, 112, 8);
      ctx.fillRect(6, 6, 108, 6);

      // Balustrade on rooftop
      ctx.fillStyle = "#bfa07c";
      ctx.fillRect(10, 0, 100, 3);
      for (let b = 12; b < 105; b += 8) {
        ctx.fillRect(b, 3, 3, 4);
      }

      // Windows with warm interior light
      for (let wy = 30; wy < h - 12; wy += 26) {
        for (let wx = 18; wx < 100; wx += 28) {
          // Arched window surround
          ctx.fillStyle = trimColor;
          ctx.fillRect(wx - 2, wy - 3, 20, 22);
          ctx.beginPath();
          ctx.arc(wx + 8, wy - 3, 10, Math.PI, Math.PI * 2);
          ctx.fill();

          // Glass with warm glowing light
          ctx.fillStyle = "rgba(255, 235, 160, 0.88)";
          ctx.fillRect(wx, wy, 16, 17);
          ctx.beginPath();
          ctx.arc(wx + 8, wy, 8, Math.PI, Math.PI * 2);
          ctx.fill();

          // Dark window sash / mullions
          ctx.fillStyle = "#4a3528";
          ctx.fillRect(wx + 7, wy - 6, 2, 23);
          ctx.fillRect(wx, wy + 8, 16, 2);
        }
      }

      // Feature: Madrid Slate Mansard Dome or Clock Tower
      if (isCornerDome) {
        // Paris/Madrid zinc-slate dome
        ctx.fillStyle = "#485263";
        ctx.beginPath();
        ctx.moveTo(34, 6);
        ctx.bezierCurveTo(34, -28, 86, -28, 86, 6);
        ctx.fill();
        // Brass finial
        ctx.fillStyle = "#e5b452";
        ctx.fillRect(58, -36, 4, 10);
        ctx.beginPath();
        ctx.arc(60, -38, 5, 0, Math.PI * 2);
        ctx.fill();
      } else if (isClockTower) {
        // Institutional clock tower
        ctx.fillStyle = "#d6b58e";
        ctx.fillRect(42, -26, 36, 32);
        ctx.fillStyle = "#eed5b4";
        ctx.fillRect(45, -23, 30, 26);
        // Clock face
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(60, -10, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#3a2218";
        ctx.lineWidth = 1.5;
        ctx.stroke();
        // Clock hands
        ctx.fillStyle = "#3a2218";
        ctx.fillRect(59, -16, 2, 7);
        ctx.fillRect(60, -11, 5, 2);

        // Flagpole with waving Spanish / Institutional flag
        ctx.fillStyle = "#695e57";
        ctx.fillRect(59, -50, 2, 24);
        ctx.fillStyle = "#c43328";
        ctx.fillRect(61, -49, 18, 11);
        ctx.fillStyle = "#f3bf2e";
        ctx.fillRect(61, -46, 18, 5);
      } else {
        // Classical triangular pediment (Frontón clásico)
        ctx.fillStyle = trimColor;
        ctx.beginPath();
        ctx.moveTo(20, 6);
        ctx.lineTo(60, -14);
        ctx.lineTo(100, 6);
        ctx.fill();
        ctx.fillStyle = wallColor;
        ctx.beginPath();
        ctx.moveTo(26, 6);
        ctx.lineTo(60, -9);
        ctx.lineTo(94, 6);
        ctx.fill();
      }

      // Classical Madrid park tree in front of facade gap
      ctx.fillStyle = "#4a6838";
      ctx.beginPath();
      ctx.arc(114, h - 16, 18, 0, Math.PI * 2);
      ctx.arc(118, h - 30, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#3d572d";
      ctx.beginPath();
      ctx.arc(116, h - 14, 14, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function drawTiles(ctx: CanvasRenderingContext2D, run: Run, theme: Theme, camX: number, viewW: number) {
  const x0 = Math.max(0, Math.floor(camX / T) - 1);
  const x1 = Math.min(run.W - 1, Math.ceil((camX + viewW) / T) + 1);

  for (let y = 0; y < run.H; y++) {
    for (let x = x0; x <= x1; x++) {
      const tile = run.tiles[y * run.W + x];
      if (!tile) continue;
      const px = x * T;
      const py = y * T;

      if (tile === 2) {
        // Floating platform: Classical carved stone balcony / shelf
        // Top stone moulding
        ctx.fillStyle = theme.topHighlight;
        round(ctx, px, py + 6, T, 6, 2);
        ctx.fill();

        ctx.fillStyle = theme.top;
        ctx.fillRect(px, py + 12, T, 8);

        // Gold inlay trim
        ctx.fillStyle = theme.accentGold;
        ctx.fillRect(px + 4, py + 15, T - 8, 2);

        // Classical stone bracket corbels underneath (ménsulas de piedra)
        ctx.fillStyle = theme.ground;
        // Left corbel
        ctx.beginPath();
        ctx.moveTo(px + 4, py + 20);
        ctx.lineTo(px + 12, py + 20);
        ctx.lineTo(px + 6, py + 32);
        ctx.lineTo(px + 4, py + 20);
        ctx.fill();

        // Right corbel
        ctx.beginPath();
        ctx.moveTo(px + T - 12, py + 20);
        ctx.lineTo(px + T - 4, py + 20);
        ctx.lineTo(px + T - 4, py + 32);
        ctx.lineTo(px + T - 12, py + 20);
        ctx.fill();

        ctx.fillStyle = "rgba(0,0,0,0.12)";
        ctx.fillRect(px, py + 19, T, 2);
        continue;
      }

      // Solid ground tile (tile === 1)
      const exposed = y === 0 || run.tiles[(y - 1) * run.W + x] !== 1;
      const stoneImg = getImage(BG_IMAGES.stone);

      if (exposed) {
        // Granite cobblestone paving (Adoquines de granito con bordillo pulido)
        if (stoneImg) {
          const sx = Math.abs(x * 96) % (stoneImg.naturalWidth ? stoneImg.naturalWidth - 96 : 928);
          const sy = Math.abs(y * 96) % (stoneImg.naturalHeight ? stoneImg.naturalHeight - 96 : 928);
          ctx.drawImage(stoneImg, sx, sy, 96, 96, px, py, T, T);
          // Very light warm tint
          ctx.fillStyle = "rgba(40, 25, 15, 0.08)";
          ctx.fillRect(px, py, T, T);
        } else {
          // Fallback solid stone fill
          ctx.fillStyle = theme.ground;
          ctx.fillRect(px, py, T, T);
          ctx.fillStyle = "rgba(255,255,255,0.22)";
          ctx.fillRect(px + 2, py + 18, 20, 11);
          ctx.fillRect(px + 26, py + 18, 20, 11);
          ctx.fillRect(px + 12, py + 32, 22, 12);
          ctx.strokeStyle = "rgba(45,30,20,0.18)";
          ctx.lineWidth = 1;
          ctx.strokeRect(px + 1, py + 17, 22, 13);
          ctx.strokeRect(px + 25, py + 17, 22, 13);
          ctx.strokeRect(px + 11, py + 31, 24, 14);
        }

        // Madrid polished granite curb slab (Bordillo de granito pulido)
        ctx.fillStyle = theme.top;
        ctx.fillRect(px, py, T, 12);

        // Highlighted beveled top edge
        ctx.fillStyle = theme.topHighlight;
        ctx.fillRect(px, py, T, 3);

        // Ambient contact shadow under curb
        ctx.fillStyle = "rgba(0,0,0,0.22)";
        ctx.fillRect(px, py + 12, T, 3);

        // Vertical curb joints
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.fillRect(px + 23, py, 1.5, 12);
      } else {
        // Deep foundational ashlar masonry (Sillares de cantería maciza)
        if (stoneImg) {
          const sx = Math.abs((x + 5) * 96) % (stoneImg.naturalWidth ? stoneImg.naturalWidth - 96 : 928);
          const sy = Math.abs((y + 3) * 96) % (stoneImg.naturalHeight ? stoneImg.naturalHeight - 96 : 928);
          ctx.drawImage(stoneImg, sx, sy, 96, 96, px, py, T, T);
          // Foundation underground darkening
          ctx.fillStyle = "rgba(25, 18, 14, 0.38)";
          ctx.fillRect(px, py, T, T);
        } else {
          ctx.fillStyle = theme.groundShadow;
          ctx.fillRect(px, py, T, T);
          ctx.fillStyle = theme.ground;
          ctx.fillRect(px + 1, py + 1, T - 2, T - 2);
        }

        // Stone block border joints
        ctx.strokeStyle = "rgba(0,0,0,0.22)";
        ctx.lineWidth = 1;
        ctx.strokeRect(px + 0.5, py + 0.5, T, T);

        // Alternating masonry vertical seam
        const row = y % 2;
        const seamX = row === 0 ? px + 24 : px + 12;
        ctx.fillStyle = "rgba(0,0,0,0.25)";
        ctx.fillRect(seamX, py, 1.5, T);
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
    const spriteKey = item.ref as keyof typeof SPRITES;
    const spritePath = SPRITES[spriteKey];
    const sprite = spritePath ? getSprite(spritePath) : null;

    // Glowing interaction circle on the ground
    ctx.save();
    ctx.translate(item.x + item.w / 2, item.y + item.h);

    const pulse = 0.5 + Math.sin(run.time * 3.5) * 0.25;
    const ring = ctx.createRadialGradient(0, 2, 3, 0, 2, 20);
    ring.addColorStop(0, `rgba(244, 192, 70, ${0.4 * pulse})`);
    ring.addColorStop(0.7, `rgba(244, 192, 70, ${0.2 * pulse})`);
    ring.addColorStop(1, "rgba(244, 192, 70, 0)");
    ctx.fillStyle = ring;
    ctx.beginPath();
    ctx.ellipse(0, 2, 20, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Soft drop shadow
    ctx.fillStyle = "rgba(35, 20, 14, 0.32)";
    ctx.beginPath();
    ctx.ellipse(0, 2, 14, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    const dh = 70;
    const bobNpc = Math.sin(run.time * 2.2 + item.id) * 1.4;

    if (sprite) {
      const dw = dh * (sprite.width / sprite.height);
      ctx.drawImage(sprite, -dw / 2, -dh + bobNpc + 2, dw, dh);
    } else {
      drawChibi(ctx, item.ref, -15, -dh + bobNpc + 16, run.time);
    }
    ctx.restore();

    // Callout bubble when not yet spoken to
    if (!run.talked && run.mode === "stage") {
      bubble(ctx, item.x - 2, item.y - 20, "💬 [E] Hablar");
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
  // Magnificent Institutional Entrance Pavilion (Readable Marquee Sign + Classical Portico)
  ctx.save();
  ctx.translate(item.x, item.y);

  // 1. Classical stone edifice body
  ctx.fillStyle = theme.top;
  round(ctx, 2, 28, item.w - 4, item.h - 28, 8);
  ctx.fill();
  ctx.strokeStyle = theme.ground;
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // 2. Classical triangular pediment (frontón)
  ctx.fillStyle = theme.accent;
  ctx.beginPath();
  ctx.moveTo(0, 32);
  ctx.lineTo(item.w / 2, 2);
  ctx.lineTo(item.w, 32);
  ctx.fill();
  ctx.strokeStyle = theme.accentGold;
  ctx.lineWidth = 2;
  ctx.stroke();

  // Golden institutional emblem atop the pediment
  ctx.fillStyle = theme.accentGold;
  ctx.beginPath();
  ctx.arc(item.w / 2, 18, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = theme.ink;
  ctx.font = "bold 10px Georgia";
  ctx.textAlign = "center";
  ctx.fillText("🏛️", item.w / 2, 22);

  // 3. Fluted marble columns flanking the entrance
  const colW = 12;
  ctx.fillStyle = "#fffdf8";
  ctx.fillRect(8, 36, colW, item.h - 40);
  ctx.fillRect(item.w - 20, 36, colW, item.h - 40);
  ctx.fillStyle = "#e0cfbc";
  ctx.fillRect(6, 32, colW + 4, 5);
  ctx.fillRect(item.w - 22, 32, colW + 4, 5);
  ctx.fillRect(6, item.h - 6, colW + 4, 6);
  ctx.fillRect(item.w - 22, item.h - 6, colW + 4, 6);

  // 4. Arched entrance with deep welcoming ambient light
  const archW = Math.max(48, item.w - 52);
  const archX = (item.w - archW) / 2;
  ctx.fillStyle = "rgba(18, 11, 8, 0.94)";
  round(ctx, archX, item.h - 52, archW, 52, 18);
  ctx.fill();

  // Warm interior lantern glow spilling forward
  const glow = ctx.createRadialGradient(item.w / 2, item.h - 22, 6, item.w / 2, item.h - 22, 34);
  glow.addColorStop(0, "rgba(255, 235, 150, 0.98)");
  glow.addColorStop(0.5, "rgba(242, 170, 60, 0.65)");
  glow.addColorStop(1, "rgba(240, 160, 50, 0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(item.w / 2, item.h - 22, 34, 0, Math.PI * 2);
  ctx.fill();

  // Access steps with crimson carpet runner
  ctx.fillStyle = "#b23326";
  round(ctx, archX + 4, item.h - 8, archW - 8, 8, 2);
  ctx.fill();

  // Brass flanking gas lanterns
  const lamps = [
    { x: archX - 5, y: item.h - 44 },
    { x: archX + archW + 5, y: item.h - 44 },
  ];
  for (const l of lamps) {
    ctx.fillStyle = "#e5b452";
    ctx.beginPath();
    ctx.arc(l.x, l.y, 4, 0, Math.PI * 2);
    ctx.fill();
    const lGlow = ctx.createRadialGradient(l.x, l.y, 1, l.x, l.y, 12);
    lGlow.addColorStop(0, "rgba(255, 240, 170, 0.85)");
    lGlow.addColorStop(1, "rgba(255, 200, 80, 0)");
    ctx.fillStyle = lGlow;
    ctx.beginPath();
    ctx.arc(l.x, l.y, 12, 0, Math.PI * 2);
    ctx.fill();
  }

  // 5. HIGH-CONTRAST ILLUMINATED MARQUEE SIGNBOARD
  const signX = 6;
  const signY = 36;
  const signW = item.w - 12;
  const signH = 44;

  ctx.fillStyle = "rgba(18, 22, 32, 0.96)";
  round(ctx, signX, signY, signW, signH, 7);
  ctx.fill();
  ctx.strokeStyle = "#e5b452";
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
    ctx.fillStyle = "#e5b452";
    ctx.font = "bold 10px Georgia";
    ctx.textAlign = "center";
    ctx.fillText(badge, item.w / 2, signY + 14);
  }

  // Draw Title text (Crisp white with shadow, multi-line aware)
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 11px Georgia";
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(0,0,0,0.9)";
  ctx.shadowBlur = 3;

  const words = (title || raw).split(" ");
  if (words.length <= 2) {
    ctx.fillText(title || raw, item.w / 2, badge ? signY + 32 : signY + 26);
  } else {
    // 2-line split
    const mid = Math.ceil(words.length / 2);
    const line1 = words.slice(0, mid).join(" ");
    const line2 = words.slice(mid).join(" ");
    ctx.fillText(line1, item.w / 2, badge ? signY + 25 : signY + 18);
    ctx.fillText(line2, item.w / 2, badge ? signY + 37 : signY + 32);
  }
  ctx.shadowBlur = 0;

  // 6. Floating animated interaction beacon
  const bobP = Math.sin(time * 3.5 + item.id) * 3;
  ctx.fillStyle = "#e5b452";
  round(ctx, item.w / 2 - 34, item.h - 58 + bobP, 68, 18, 9);
  ctx.fill();
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 1;
  ctx.stroke();

  ctx.fillStyle = "#1e140d";
  ctx.font = "bold 10px Georgia";
  ctx.fillText("▼ [E] ENTRAR", item.w / 2, item.h - 45 + bobP);

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
  if (item.ref === "lamp") {
    // Madrid 3-Globe Fernandina Cast-Iron Streetlamp
    // Iron post
    ctx.fillStyle = "#2c2825";
    ctx.fillRect(13, 20, 5, 42);
    ctx.fillRect(9, 58, 13, 6);

    // Decorative bracket arms
    ctx.beginPath();
    ctx.arc(15, 24, 12, Math.PI, Math.PI * 2);
    ctx.strokeStyle = "#2c2825";
    ctx.lineWidth = 3;
    ctx.stroke();

    // 3 Golden Lanterns with radiant light cones
    const lamps = [
      { x: 3, y: 16 },
      { x: 15, y: 10 },
      { x: 27, y: 16 },
    ];
    for (const l of lamps) {
      // Warm light bloom
      const glow = ctx.createRadialGradient(l.x, l.y, 2, l.x, l.y, 18);
      glow.addColorStop(0, "rgba(255, 245, 180, 0.9)");
      glow.addColorStop(0.5, "rgba(255, 210, 100, 0.45)");
      glow.addColorStop(1, "rgba(255, 190, 80, 0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(l.x, l.y, 18, 0, Math.PI * 2);
      ctx.fill();

      // Glass globe
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(l.x, l.y, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (item.ref === "tree") {
    // Madrid Park Chestnut / Plane Tree
    ctx.fillStyle = "#5c3d28";
    ctx.fillRect(13, 30, 8, 32);

    // Layered lush leafy foliage
    ctx.fillStyle = theme.hill;
    ctx.beginPath();
    ctx.arc(17, 18, 22, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#4a7838";
    ctx.beginPath();
    ctx.arc(14, 14, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#6ca04b";
    ctx.beginPath();
    ctx.arc(19, 11, 14, 0, Math.PI * 2);
    ctx.fill();
  } else if (item.ref === "banner") {
    // Madrid Festival / Convocatoria Banner
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
  } else if (item.ref === "fountain") {
    // Classical Stone Plaza Fountain
    ctx.fillStyle = "#dcd2be";
    round(ctx, 8, 36, 74, 28, 12);
    ctx.fill();
    ctx.strokeStyle = "#8d7c67";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Water pool
    ctx.fillStyle = "#6bb0d8";
    ctx.beginPath();
    ctx.ellipse(45, 46, 26, 9, 0, 0, Math.PI * 2);
    ctx.fill();

    // Animated water jet
    ctx.strokeStyle = "rgba(255,255,255,0.75)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(45, 22, 10 + Math.sin(time * 5) * 2.5, 0, Math.PI);
    ctx.stroke();
  } else if (item.ref === "column") {
    // Classical Fluted Marble Column
    ctx.fillStyle = "#f7eee1";
    ctx.fillRect(16, 8, 16, 62);
    ctx.fillStyle = "#e2d2bd";
    ctx.fillRect(8, 0, 32, 10);
    ctx.fillRect(8, 62, 32, 8);
    ctx.fillStyle = "#cfbeaa";
    ctx.fillRect(20, 10, 3, 50);
    ctx.fillRect(26, 10, 3, 50);
  } else {
    ctx.fillStyle = theme.accent;
    ctx.fillRect(8, 20, 22, 28);
    ctx.fillStyle = theme.top;
    ctx.fillRect(12, 24, 14, 4);
  }
  ctx.restore();
}

function drawChibi(ctx: CanvasRenderingContext2D, id: string, x: number, y: number, time: number) {
  const npc = NPC_BY_ID.get(id);
  const body = npc?.body ?? "#1f8a8a";
  const hair = npc?.hair ?? "#3a2a22";
  const bob = Math.sin(time * 2 + x) * 1.0;
  ctx.save();
  ctx.translate(x, y + bob);
  ctx.fillStyle = "rgba(0,0,0,.15)";
  ctx.beginPath();
  ctx.ellipse(14, 48, 10, 3, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#2c3338";
  ctx.fillRect(8, 36, 5, 12);
  ctx.fillRect(16, 36, 5, 12);
  ctx.fillStyle = body;
  round(ctx, 5, 18, 19, 20, 6);
  ctx.fill();
  ctx.fillStyle = "#f3d2b8";
  ctx.beginPath();
  ctx.arc(14, 13, 9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = hair;
  ctx.beginPath();
  ctx.arc(14, 9, 8, Math.PI, Math.PI * 2);
  ctx.fill();
  if (npc?.hat === "crown" || npc?.hat === "star") {
    ctx.fillStyle = "#e2b657";
    ctx.fillRect(7, 2, 14, 4);
  }
  ctx.fillStyle = "#1b1420";
  ctx.fillRect(10, 12, 2, 2);
  ctx.fillRect(16, 12, 2, 2);
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
