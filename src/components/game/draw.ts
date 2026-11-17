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

function drawBackdrop(
  ctx: CanvasRenderingContext2D,
  run: Run,
  theme: Theme,
  camX: number,
  viewW: number,
  viewH: number,
  camY: number,
) {
  // Photorealistic 3D Pixar Backdrop matching each world's unique block theme
  const bgPath = BG_IMAGES[run.theme] ?? BG_IMAGES.madrid;
  const bgImg = getImage(bgPath) ?? getImage(BG_IMAGES.madrid);
  if (bgImg) {
    const bgH = viewH + 20;
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
