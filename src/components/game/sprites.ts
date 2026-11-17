const cache = new Map<string, HTMLCanvasElement | "loading" | "error">();
const waiters = new Map<string, Array<() => void>>();

function keyColor(data: Uint8ClampedArray) {
  let r = 0;
  let g = 0;
  let b = 0;
  let n = 0;
  const w = Math.min(8, Math.floor(Math.sqrt(data.length / 4)));
  for (let i = 0; i < w; i++) {
    r += data[i * 4];
    g += data[i * 4 + 1];
    b += data[i * 4 + 2];
    n++;
  }
  return { r: r / n, g: g / n, b: b / n };
}

export function chromaTrim(img: CanvasImageSource & { width: number; height: number }) {
  const src = document.createElement("canvas");
  src.width = img.width;
  src.height = img.height;
  const ctx = src.getContext("2d", { willReadFrequently: true });
  if (!ctx) return src;
  ctx.drawImage(img, 0, 0);
  const image = ctx.getImageData(0, 0, src.width, src.height);
  const d = image.data;

  // Check if image already has transparent pixels (like all our PNG sprites)
  let transparentCount = 0;
  for (let i = 3; i < d.length; i += 16) {
    if (d[i] < 30) {
      transparentCount++;
      if (transparentCount > 20) break;
    }
  }

  // ONLY perform chroma keying if the image is completely opaque (e.g. solid magenta background)
  if (transparentCount <= 20) {
    const key = keyColor(d);
    // Only key out if the corner color is noticeably magenta or high saturation
    const isMagentaKey = key.r > 150 && key.b > 150 && key.g < 120;
    if (isMagentaKey) {
      for (let i = 0; i < d.length; i += 4) {
        const dr = d[i] - key.r;
        const dg = d[i + 1] - key.g;
        const db = d[i + 2] - key.b;
        const dist = Math.sqrt(dr * dr + dg * dg + db * db);
        const magenta = d[i] > 170 && d[i + 2] > 170 && d[i + 1] < 150;
        if (dist < 72 || (magenta && dist < 120)) d[i + 3] = 0;
        else if (dist < 128) d[i + 3] = Math.round((d[i + 3] * (dist - 72)) / 56);
      }
      ctx.putImageData(image, 0, 0);
    }
  }

  let minX = src.width;
  let minY = src.height;
  let maxX = 0;
  let maxY = 0;
  for (let y = 0; y < src.height; y++) {
    for (let x = 0; x < src.width; x++) {
      if (d[(y * src.width + x) * 4 + 3] > 18) {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
      }
    }
  }
  if (maxX <= minX || maxY <= minY) return src;
  const out = document.createElement("canvas");
  out.width = maxX - minX + 1;
  out.height = maxY - minY + 1;
  out.getContext("2d")?.drawImage(src, minX, minY, out.width, out.height, 0, 0, out.width, out.height);
  return out;
}

export function getSprite(src: string) {
  const hit = cache.get(src);
  if (hit && hit !== "loading" && hit !== "error") return hit;
  if (!hit && typeof window !== "undefined") {
    cache.set(src, "loading");
    const img = new Image();
    img.onload = () => {
      try {
        cache.set(src, chromaTrim(img));
      } catch {
        cache.set(src, "error");
      }
      waiters.get(src)?.forEach((fn) => fn());
      waiters.delete(src);
    };
    img.onerror = () => {
      cache.set(src, "error");
      waiters.get(src)?.forEach((fn) => fn());
      waiters.delete(src);
    };
    img.src = src;
  }
  return null;
}

export function preload(srcs: string[]) {
  return Promise.all(
    srcs.map(
      (src) =>
        new Promise<void>((resolve) => {
          if (getSprite(src)) {
            resolve();
            return;
          }
          const list = waiters.get(src) ?? [];
          list.push(() => resolve());
          waiters.set(src, list);
          getSprite(src);
          window.setTimeout(resolve, 2500);
        }),
    ),
  );
}

const imgCache = new Map<string, HTMLImageElement>();

export function getImage(src: string): HTMLImageElement | null {
  const hit = imgCache.get(src);
  if (hit) return hit.complete && hit.naturalWidth > 0 ? hit : null;
  if (typeof window !== "undefined") {
    const img = new Image();
    img.src = src;
    imgCache.set(src, img);
    return null;
  }
  return null;
}

export const BG_IMAGES: Record<string, string> = {
  madrid: "/backgrounds/madrid-bg.jpg",
  plaza: "/backgrounds/madrid-bg.jpg",
  carta: "/backgrounds/madrid-bg.jpg",
  europa: "/backgrounds/europa-bg.jpg",
  jardin: "/backgrounds/jardin-bg.jpg",
  sello: "/backgrounds/sello-bg.jpg",
  campus: "/backgrounds/madrid-bg.jpg",
  hacienda: "/backgrounds/hacienda-bg.jpg",
  examen: "/backgrounds/examen-bg.jpg",
  stone: "/backgrounds/granite-stone.jpg",
};

export const SPRITES = {
  stand: "/sprites/alba-stand.png",
  walk: "/sprites/alba-walk.png",
  walk0: "/sprites/alba-walk-0.png",
  walk1: "/sprites/alba-walk-1.png",
  walk2: "/sprites/alba-walk-2.png",
  walk3: "/sprites/alba-walk-3.png",
  jump: "/sprites/alba-jump.png",
  cheer: "/sprites/alba-cheer.png",
  pilar: "/sprites/npc-pilar.png",
  erika: "/sprites/npc-erika.png",
  aurelio: "/sprites/npc-aurelio.png",
  comisaria: "/sprites/npc-comisaria.png",
  sello: "/sprites/npc-sello.png",
  carmen: "/sprites/npc-carmen.png",
};
