import { NPC_BY_ID } from "@/lib/content";
import type { Ent, Run } from "./engine";
import { T } from "./engine";
import { getSprite, SPRITES } from "./sprites";

type Theme = {
  sky: [string, string, string];
  hill: string;
  hill2: string;
  ground: string;
  top: string;
  accent: string;
  ink: string;
  cloud: string;
};

const THEMES: Record<string, Theme> = {
  plaza: { sky: ["#8ec8e8", "#f6d7a8", "#f3b183"], hill: "#d9896a", hill2: "#c46b58", ground: "#c4a574", top: "#efe2c4", accent: "#1f8a8a", ink: "#3a2a22", cloud: "#fff6ea" },
  carta: { sky: ["#6ea0d4", "#f4e2c4", "#e7c27a"], hill: "#8d3d4a", hill2: "#5c2a34", ground: "#d9c7a2", top: "#f4ead2", accent: "#c6a15b", ink: "#3a241c", cloud: "#fff8ee" },
  europa: { sky: ["#1d4e89", "#3d7ec2", "#8eb7e6"], hill: "#163a66", hill2: "#0e2744", ground: "#c5d4e4", top: "#f7fbff", accent: "#f2c14e", ink: "#102033", cloud: "#e7f1fb" },
  jardin: { sky: ["#79c4e2", "#c8ecb8", "#f6e7a8"], hill: "#3e8f62", hill2: "#246b45", ground: "#6aaa58", top: "#d7ef9a", accent: "#e07a3d", ink: "#24361f", cloud: "#f3ffe8" },
  sello: { sky: ["#5b6ea6", "#c9c4e6", "#f0e6d4"], hill: "#3d3a72", hill2: "#2a2754", ground: "#d9d3c5", top: "#f7f1e4", accent: "#6b4c9a", ink: "#241e33", cloud: "#f4f0ff" },
  campus: { sky: ["#f0b36a", "#f6d7a2", "#87b8d8"], hill: "#c46a45", hill2: "#8d4630", ground: "#e2c39a", top: "#f8ead4", accent: "#c4523a", ink: "#3a241c", cloud: "#fff4e4" },
  hacienda: { sky: ["#1f6b58", "#8fd0b8", "#f3e2a8"], hill: "#145744", hill2: "#0d3b2e", ground: "#d9c48a", top: "#f8efc8", accent: "#d4a017", ink: "#1a2e24", cloud: "#f4fff8" },
  examen: { sky: ["#243044", "#6d5a78", "#e7d3b0"], hill: "#3a2a38", hill2: "#241820", ground: "#cbb89a", top: "#f3e6cf", accent: "#b23a48", ink: "#1b1420", cloud: "#efe6dc" },
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

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, width, height);
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, theme.sky[0]);
  sky.addColorStop(0.55, theme.sky[1]);
  sky.addColorStop(1, theme.sky[2]);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  ctx.setTransform(scale * dpr, 0, 0, scale * dpr, (-camX * scale + shake) * dpr, -camY * scale * dpr);
  drawBackdrop(ctx, run, theme, camX, viewW, viewH, camY);
  drawTiles(ctx, run, theme, camX, viewW);
  run.entities.filter((item) => !item.dead && item.kind !== "paper").forEach((item) => drawEntity(ctx, run, item, theme));
  drawPlayer(ctx, run);
  run.entities.filter((item) => item.kind === "paper" && !item.dead).forEach((item) => {
    ctx.fillStyle = "#f7f1e4";
    ctx.fillRect(item.x, item.y, 16, 12);
    ctx.strokeStyle = theme.ink;
    ctx.strokeRect(item.x, item.y, 16, 12);
  });
  if (run.hint && run.hintT > 0) drawBit(ctx, run, theme);

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  drawHud(ctx, run, width);
  if (run.bannerT > 0) drawBanner(ctx, run, width);
  if (run.toast && run.toastT > 0) drawToast(ctx, run, width, height);
  if (run.prompt) drawPrompt(ctx, run.prompt, width, height);
}

function drawBackdrop(ctx: CanvasRenderingContext2D, run: Run, theme: Theme, camX: number, viewW: number, viewH: number, camY: number) {
  const sunX = 180 - camX * 0.05;
  ctx.fillStyle = "rgba(255,244,214,0.9)";
  ctx.beginPath();
  ctx.arc(sunX, camY + 78, 42, 0, Math.PI * 2);
  ctx.fill();
  for (let i = 0; i < 5; i++) {
    const x = ((i * 280 - camX * 0.15) % (viewW + 400)) - 80;
    ctx.fillStyle = theme.cloud;
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.ellipse(camX + x, camY + 70 + (i % 3) * 18, 54, 18, 0, 0, Math.PI * 2);
    ctx.ellipse(camX + x + 36, camY + 64 + (i % 3) * 18, 34, 16, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }
  const base = camY + viewH - 150;
  ctx.fillStyle = theme.hill2;
  wave(ctx, camX - 40, base, viewW + 80, 180, 90, camX * 0.25);
  ctx.fillStyle = theme.hill;
  wave(ctx, camX - 40, base + 28, viewW + 80, 170, 70, camX * 0.4);
  drawSkyline(ctx, run.theme, camX, camY + viewH - 210, viewW);
}

function wave(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, amp: number, shift: number) {
  ctx.beginPath();
  ctx.moveTo(x, y + h);
  ctx.lineTo(x, y);
  for (let i = 0; i <= w; i += 20) ctx.lineTo(x + i, y - Math.sin((i + shift) / 80) * amp);
  ctx.lineTo(x + w, y + h);
  ctx.fill();
}

function drawSkyline(ctx: CanvasRenderingContext2D, theme: string, camX: number, y: number, viewW: number) {
  const start = Math.floor(camX / 90) * 90 - 90;
  for (let x = start; x < camX + viewW + 120; x += 90) {
    const n = Math.abs(Math.floor(x / 90));
    const h = 50 + (n % 5) * 18;
    const px = x - camX * 0.45;
    ctx.save();
    ctx.translate(px, y - h);
    if (theme === "europa") {
      ctx.fillStyle = n % 2 ? "#245c92" : "#1a446f";
      round(ctx, 8, 20, 70, h, 8);
      ctx.fill();
      ctx.fillStyle = "#f2c14e";
      ctx.beginPath();
      ctx.arc(42, 8, 7, 0, Math.PI * 2);
      ctx.fill();
    } else if (theme === "carta") {
      ctx.fillStyle = "#f4ead2";
      ctx.fillRect(16, 24, 18, h);
      ctx.fillRect(48, 10, 16, h + 14);
      ctx.fillStyle = "#7c2f3b";
      ctx.fillRect(10, 18, 62, 10);
    } else if (theme === "jardin") {
      ctx.fillStyle = ["#2f6b4f", "#c46a2a", "#7a3e78", "#2f8f8a"][n % 4];
      round(ctx, 12, 30, 64, h - 10, 10);
      ctx.fill();
      ctx.fillStyle = "#d7ef9a";
      ctx.beginPath();
      ctx.arc(44, 18, 16, 0, Math.PI * 2);
      ctx.fill();
    } else if (theme === "sello") {
      ctx.fillStyle = "#3d3a72";
      round(ctx, 18, 16, 48, h, 6);
      ctx.fill();
      ctx.fillStyle = "#e7d7a8";
      ctx.fillRect(30, h - 16, 24, 16);
    } else if (theme === "hacienda") {
      ctx.fillStyle = "#14624f";
      round(ctx, 10, 20, 68, h, 4);
      ctx.fill();
      ctx.fillStyle = "#e2b657";
      ctx.fillRect(18, 8, 52, 10);
    } else if (theme === "examen") {
      ctx.fillStyle = "#2a2438";
      ctx.fillRect(12, 8, 64, h + 10);
      ctx.fillStyle = "#e7d3b0";
      for (let w = 0; w < 3; w++) ctx.fillRect(22 + w * 16, 20, 8, 18);
    } else {
      ctx.fillStyle = n % 2 ? "#e7b089" : "#f0d2ae";
      ctx.fillRect(8, 28, 72, h);
      ctx.fillStyle = "#8d3d4a";
      ctx.beginPath();
      ctx.moveTo(4, 30);
      ctx.lineTo(44, 4);
      ctx.lineTo(84, 30);
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
        ctx.fillStyle = theme.accent;
        round(ctx, px + 2, py + 8, T - 4, 14, 7);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,.35)";
        ctx.fillRect(px + 8, py + 11, T - 20, 3);
        continue;
      }
      const exposed = y === 0 || run.tiles[(y - 1) * run.W + x] !== 1;
      ctx.fillStyle = exposed ? theme.top : theme.ground;
      ctx.fillRect(px, py, T + 1, T + 1);
      if (exposed) {
        ctx.fillStyle = theme.ground;
        ctx.fillRect(px, py + 14, T + 1, T - 13);
        ctx.fillStyle = theme.accent;
        ctx.fillRect(px, py + 12, T + 1, 4);
      }
      ctx.strokeStyle = "rgba(0,0,0,0.06)";
      ctx.strokeRect(px + 0.5, py + 0.5, T, T);
    }
  }
}

function drawEntity(ctx: CanvasRenderingContext2D, run: Run, item: Ent, theme: Theme) {
  const bob = Math.sin(run.time * 3 + item.id) * 3;
  if (item.kind === "article") {
    ctx.save();
    ctx.translate(item.x + 11, item.y + bob);
    ctx.fillStyle = "#e2b657";
    ctx.beginPath();
    ctx.arc(0, 0, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#7c2f3b";
    ctx.font = "bold 12px Georgia";
    ctx.textAlign = "center";
    ctx.fillText("§", 0, 4);
    ctx.restore();
  } else if (item.kind === "qblock") {
    ctx.save();
    ctx.translate(item.x, item.y + (item.used ? 0 : bob));
    ctx.fillStyle = item.used ? "#b9a48a" : "#e2b657";
    round(ctx, 0, 0, 36, 36, 8);
    ctx.fill();
    ctx.strokeStyle = theme.ink;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = theme.ink;
    ctx.font = "bold 20px Georgia";
    ctx.textAlign = "center";
    ctx.fillText(item.used ? "·" : "?", 18, 25);
    ctx.restore();
  } else if (item.kind === "enemy") {
    ctx.save();
    ctx.translate(item.x, item.y + Math.abs(Math.sin(run.time * 6 + item.id)) * 2);
    ctx.fillStyle = "#f4efe6";
    round(ctx, 0, 4, 30, 24, 8);
    ctx.fill();
    ctx.strokeStyle = theme.ink;
    ctx.stroke();
    ctx.fillStyle = theme.ink;
    ctx.fillRect(7, 12, 4, 4);
    ctx.fillRect(18, 12, 4, 4);
    ctx.restore();
  } else if (item.kind === "npc") {
    const spriteKey = item.ref as keyof typeof SPRITES;
    const spritePath = SPRITES[spriteKey];
    const sprite = spritePath ? getSprite(spritePath) : null;
    if (sprite) {
      const dh = 112;
      const dw = dh * (sprite.width / sprite.height);
      const bob = Math.sin(run.time * 2 + item.id) * 2;
      ctx.save();
      ctx.translate(item.x + 18, item.y + item.h);
      ctx.fillStyle = "rgba(40,24,16,.22)";
      ctx.beginPath();
      ctx.ellipse(0, 2, 18, 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.drawImage(sprite, -dw / 2, -dh + bob + 4, dw, dh);
      ctx.restore();
    } else {
      drawChibi(ctx, item.ref, item.x, item.y, run.time);
    }
    if (!run.talked && run.mode === "stage") bubble(ctx, item.x + 18, item.y - 16, "!");
  } else if (item.kind === "flag") {
    ctx.fillStyle = theme.ink;
    ctx.fillRect(item.x + 6, item.y, 4, item.h);
    ctx.fillStyle = item.ref === "exam" ? "#b23a48" : theme.accent;
    ctx.beginPath();
    ctx.moveTo(item.x + 10, item.y + 6);
    ctx.lineTo(item.x + 42, item.y + 18 + Math.sin(run.time * 4) * 2);
    ctx.lineTo(item.x + 10, item.y + 30);
    ctx.fill();
  } else if (item.kind === "portal" || item.kind === "panel") {
    drawBuilding(ctx, item, theme, run.time);
  } else if (item.kind === "boss") {
    drawBoss(ctx, run, item, theme);
  } else if (item.kind === "spring") {
    ctx.fillStyle = "#1f8a8a";
    round(ctx, item.x, item.y, item.w, item.h, 6);
    ctx.fill();
    ctx.fillStyle = "#f6efe2";
    ctx.fillRect(item.x + 6, item.y + 6, item.w - 12, 4);
  } else if (item.kind === "deco") {
    drawDeco(ctx, item, theme, run.time);
  }
}

function drawBuilding(ctx: CanvasRenderingContext2D, item: Ent, theme: Theme, time: number) {
  ctx.save();
  ctx.translate(item.x, item.y);
  ctx.fillStyle = theme.ink;
  round(ctx, 4, 28, item.w - 8, item.h - 28, 8);
  ctx.fill();
  ctx.fillStyle = theme.top;
  ctx.fillRect(10, 40, item.w - 20, item.h - 52);
  ctx.fillStyle = theme.accent;
  ctx.beginPath();
  ctx.moveTo(0, 36);
  ctx.lineTo(item.w / 2, 8 + Math.sin(time + item.id) * 0);
  ctx.lineTo(item.w, 36);
  ctx.fill();
  ctx.fillStyle = "#e2b657";
  ctx.fillRect(item.w / 2 - 8, item.h - 28, 16, 28);
  ctx.fillStyle = "#fff8ee";
  ctx.font = "bold 11px Georgia";
  ctx.textAlign = "center";
  const words = item.label.split(" ");
  words.slice(0, 2).forEach((word, index) => ctx.fillText(word, item.w / 2, 58 + index * 13));
  ctx.restore();
}

function drawBoss(ctx: CanvasRenderingContext2D, run: Run, item: Ent, theme: Theme) {
  ctx.save();
  ctx.translate(item.x, item.y + Math.sin(run.time * 2) * 3);
  ctx.fillStyle = theme.hill2;
  round(ctx, 8, 20, 62, 70, 16);
  ctx.fill();
  ctx.fillStyle = theme.accent;
  ctx.beginPath();
  ctx.arc(39, 24, 22, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1b1420";
  ctx.fillRect(28, 20, 6, 6);
  ctx.fillRect(44, 20, 6, 6);
  ctx.fillStyle = "#f6efe2";
  ctx.font = "bold 12px Georgia";
  ctx.textAlign = "center";
  ctx.fillText(`${run.bossHp}/${run.bossMax}`, 39, 8);
  ctx.restore();
}

function drawDeco(ctx: CanvasRenderingContext2D, item: Ent, theme: Theme, time: number) {
  ctx.save();
  ctx.translate(item.x, item.y);
  if (item.ref === "lamp") {
    ctx.fillStyle = theme.ink;
    ctx.fillRect(12, 16, 4, 42);
    ctx.fillStyle = "#f2c14e";
    ctx.beginPath();
    ctx.arc(14, 12, 8, 0, Math.PI * 2);
    ctx.fill();
  } else if (item.ref === "tree") {
    ctx.fillStyle = "#6b442c";
    ctx.fillRect(14, 28, 6, 30);
    ctx.fillStyle = theme.hill;
    ctx.beginPath();
    ctx.arc(17, 20, 16, 0, Math.PI * 2);
    ctx.fill();
  } else if (item.ref === "banner") {
    ctx.fillStyle = theme.ink;
    ctx.fillRect(6, 0, 3, 58);
    ctx.fillStyle = theme.accent;
    ctx.beginPath();
    ctx.moveTo(9, 4);
    ctx.lineTo(30, 12 + Math.sin(time * 3) * 2);
    ctx.lineTo(9, 24);
    ctx.fill();
  } else if (item.ref === "fountain") {
    ctx.fillStyle = "#d9c7a2";
    round(ctx, 8, 36, 74, 28, 12);
    ctx.fill();
    ctx.fillStyle = "#7eb7d8";
    ctx.beginPath();
    ctx.ellipse(45, 46, 24, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#7eb7d8";
    ctx.beginPath();
    ctx.arc(45, 20, 8 + Math.sin(time * 4) * 2, 0, Math.PI);
    ctx.stroke();
  } else if (item.ref === "column") {
    ctx.fillStyle = "#f3e6cf";
    ctx.fillRect(16, 8, 16, 62);
    ctx.fillRect(8, 0, 32, 10);
    ctx.fillRect(8, 62, 32, 8);
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
  const bob = Math.sin(time * 2 + x) * 1.5;
  ctx.save();
  ctx.translate(x, y + bob);
  ctx.fillStyle = "rgba(0,0,0,.15)";
  ctx.beginPath();
  ctx.ellipse(22, 76, 16, 4, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#2c3338";
  ctx.fillRect(12, 58, 8, 16);
  ctx.fillRect(26, 58, 8, 16);
  ctx.fillStyle = body;
  round(ctx, 8, 28, 30, 34, 10);
  ctx.fill();
  ctx.fillStyle = "#f3d2b8";
  ctx.beginPath();
  ctx.arc(23, 20, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = hair;
  ctx.beginPath();
  ctx.arc(23, 14, 12, Math.PI, Math.PI * 2);
  ctx.fill();
  if (npc?.hat === "crown" || npc?.hat === "star") {
    ctx.fillStyle = "#e2b657";
    ctx.fillRect(12, 4, 22, 6);
  }
  ctx.fillStyle = "#1b1420";
  ctx.fillRect(17, 18, 3, 3);
  ctx.fillRect(26, 18, 3, 3);
  ctx.restore();
}

function drawPlayer(ctx: CanvasRenderingContext2D, run: Run) {
  const body = run.player;
  const jumping = !body.onGround;
  const walking = Math.abs(body.vx) > 24 && body.onGround;
  const sprite = getSprite(jumping ? SPRITES.jump : walking ? SPRITES.walk : SPRITES.stand) ?? getSprite(SPRITES.walk);
  const dh = jumping ? 120 : 114;
  ctx.save();
  ctx.translate(body.x + body.w / 2, body.y + body.h);
  ctx.scale(body.face, body.land > 0 ? 0.9 : 1);
  ctx.fillStyle = "rgba(40,24,16,.22)";
  ctx.beginPath();
  ctx.ellipse(0, 2, 18, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  if (sprite) {
    const dw = dh * (sprite.width / sprite.height);
    if (run.iframe > 0 && Math.sin(run.time * 30) > 0) ctx.globalAlpha = 0.45;
    const bob = walking ? Math.sin(run.time * 14) * 2.5 : 0;
    ctx.drawImage(sprite, -dw / 2, -dh + bob + 4, dw, dh);
  } else {
    ctx.fillStyle = "#d4654a";
    ctx.beginPath();
    ctx.arc(0, -78, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#8d8f93";
    round(ctx, -16, -64, 32, 28, 8);
    ctx.fill();
    ctx.fillStyle = "#1f8a8a";
    ctx.fillRect(-8, -58, 16, 16);
    ctx.fillStyle = "#243044";
    ctx.fillRect(-8, -36, 7, 24);
    ctx.fillRect(2, -36, 7, 24);
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
  round(ctx, x, y, Math.max(28, text.length * 7), 18, 8);
  ctx.fill();
  ctx.fillStyle = "#3a2a22";
  ctx.font = "bold 11px Georgia";
  ctx.textAlign = "center";
  ctx.fillText(text, x + 16, y + 13);
  ctx.restore();
}

function drawHud(ctx: CanvasRenderingContext2D, run: Run, width: number) {
  for (let i = 0; i < run.maxHearts; i++) {
    ctx.fillStyle = i < run.hearts ? "#c4523a" : "rgba(255,255,255,.35)";
    ctx.beginPath();
    ctx.arc(22 + i * 18, 22, 7, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "#fffaf2";
  ctx.font = "bold 13px Georgia";
  ctx.textAlign = "left";
  ctx.fillText(`§ ${run.articles}${run.articleTotal ? `/${run.articleTotal}` : ""}`, 22, 44);
  ctx.textAlign = "right";
  ctx.fillText(run.difficulty, width - 16, 24);
}

function drawBanner(ctx: CanvasRenderingContext2D, run: Run, width: number) {
  ctx.save();
  ctx.globalAlpha = Math.min(1, run.bannerT);
  ctx.fillStyle = "rgba(36,22,16,.72)";
  round(ctx, width / 2 - 220, 16, 440, 54, 12);
  ctx.fill();
  ctx.fillStyle = "#f6efe2";
  ctx.textAlign = "center";
  ctx.font = "700 18px Georgia";
  ctx.fillText(run.title, width / 2, 38);
  ctx.font = "13px Georgia";
  ctx.fillStyle = "#e2b657";
  ctx.fillText(run.subtitle, width / 2, 56);
  ctx.restore();
}

function drawToast(ctx: CanvasRenderingContext2D, run: Run, width: number, height: number) {
  ctx.save();
  ctx.globalAlpha = Math.min(1, run.toastT);
  const text = run.toast.length > 110 ? `${run.toast.slice(0, 107)}…` : run.toast;
  ctx.fillStyle = "rgba(255,248,236,.94)";
  round(ctx, 16, height - 58, Math.min(width - 32, 640), 42, 10);
  ctx.fill();
  ctx.fillStyle = "#3a2a22";
  ctx.font = "13px Georgia";
  ctx.textAlign = "left";
  ctx.fillText(text, 28, height - 32);
  ctx.restore();
}

function drawPrompt(ctx: CanvasRenderingContext2D, text: string, width: number, height: number) {
  ctx.save();
  ctx.fillStyle = "rgba(31,138,138,.94)";
  const w = Math.min(width - 24, text.length * 8 + 28);
  round(ctx, width / 2 - w / 2, height - 28, w, 22, 11);
  ctx.fill();
  ctx.fillStyle = "#fff";
  ctx.font = "bold 12px Georgia";
  ctx.textAlign = "center";
  ctx.fillText(text, width / 2, height - 13);
  ctx.restore();
}
