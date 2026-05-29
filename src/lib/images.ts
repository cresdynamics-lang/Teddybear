/**
 * Product images: public/images/
 *
 *   image1.jpg  → product id 1
 *   image2.jpg  → product id 2
 *   …
 *   image12.jpg → product id 12
 *   hero.jpg    → homepage hero
 *
 * Any size or format (.jpg .png .webp) works.
 */

const IMAGE_DIR = "/images";

export const IMAGE_FALLBACK = `${IMAGE_DIR}/fallback.svg`;

const DEFAULT_EXT = ".jpg";

const EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".JPG", ".JPEG", ".PNG", ".WEBP"];

export const PRODUCT_COUNT = 12;

export function imageForProduct(productId: string | number): string {
  const n = typeof productId === "number" ? productId : parseInt(productId, 10);
  if (Number.isNaN(n) || n < 1 || n > PRODUCT_COUNT) return IMAGE_FALLBACK;
  return `${IMAGE_DIR}/image${n}${DEFAULT_EXT}`;
}

export const HERO_IMAGE = `${IMAGE_DIR}/hero${DEFAULT_EXT}`;

export function imageSrcCandidates(basePath: string): string[] {
  const withoutExt = basePath.replace(/\.(jpe?g|png|webp)$/i, "");
  const seen = new Set<string>();
  const list: string[] = [];

  for (const ext of EXTENSIONS) {
    const path = `${withoutExt}${ext}`;
    if (!seen.has(path.toLowerCase())) {
      seen.add(path.toLowerCase());
      list.push(path);
    }
  }
  return list.length > 0 ? list : [basePath];
}

export function productImage(id: string, extra?: string): string {
  return extra ?? imageForProduct(id);
}

export const PRODUCT_IMAGE_GUIDE: { file: string; productId: string; name: string }[] = [
  { file: "image1.jpg", productId: "1", name: "Name Embroidery" },
  { file: "image2.jpg", productId: "2", name: "Mini Teddy Keychains" },
  { file: "image3.jpg", productId: "3", name: "45cm Brown Teddy" },
  { file: "image4.jpg", productId: "4", name: "55cm Pink Teddy" },
  { file: "image5.jpg", productId: "5", name: "65cm Blue Teddy" },
  { file: "image6.jpg", productId: "6", name: "80cm Brown Teddy" },
  { file: "image7.jpg", productId: "7", name: "100cm Giant Teddy" },
  { file: "image8.jpg", productId: "8", name: "120cm Life-Size Teddy" },
  { file: "image9.jpg", productId: "9", name: "130cm Pink & White" },
  { file: "image10.jpg", productId: "10", name: "130cm Musical Teddy" },
  { file: "image11.jpg", productId: "11", name: "140cm Giant Teddy" },
  { file: "image12.jpg", productId: "12", name: "White Teddy (Sale)" },
  { file: "hero.jpg", productId: "—", name: "Homepage hero" },
];
