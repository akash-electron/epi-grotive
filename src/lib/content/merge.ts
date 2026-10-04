/* Pure helpers shared by the server store and the admin editor. */

type Json = unknown;
const isObj = (v: Json): v is Record<string, Json> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

/* Saved content wins, but only where its shape matches the defaults, so a
   half-filled or stale document can never break a component. Arrays are taken
   whole (items may be added or removed); each item is merged over the matching
   default item, or over the last default item for newly added ones. */
export function mergeWithDefaults<T>(defaults: T, saved: Json): T {
  if (Array.isArray(defaults)) {
    if (!Array.isArray(saved)) return defaults;
    return saved.map((item, i) => {
      const tpl = defaults[Math.min(i, defaults.length - 1)];
      return tpl === undefined ? item : mergeWithDefaults(tpl, item);
    }) as T;
  }
  if (isObj(defaults)) {
    if (!isObj(saved)) return defaults;
    const out: Record<string, Json> = {};
    for (const k of Object.keys(defaults)) out[k] = mergeWithDefaults(defaults[k], saved[k]);
    return out as T;
  }
  return (typeof saved === typeof defaults ? saved : defaults) as T;
}

/* Drops unknown keys and non-string leaves, caps lengths. Used on every save. */
export function sanitize<T>(shape: T, input: Json): T {
  if (Array.isArray(shape)) {
    if (!Array.isArray(input)) return shape;
    const tpl = shape[shape.length - 1];
    return input.slice(0, 200).map((v, i) => sanitize(shape[Math.min(i, shape.length - 1)] ?? tpl, v)) as T;
  }
  if (isObj(shape)) {
    const src = isObj(input) ? input : {};
    const out: Record<string, Json> = {};
    for (const k of Object.keys(shape)) out[k] = sanitize(shape[k], src[k]);
    return out as T;
  }
  return (typeof input === "string" ? input.slice(0, 5000) : shape) as T;
}

/* Only same-site paths, anchors, mailto/tel and http(s) links are allowed. */
export function safeHref(href: string): string {
  const h = href.trim();
  if (/^(#|\/(?!\/)|https?:\/\/|mailto:|tel:)/i.test(h)) return h;
  return "#";
}

/* Cloudinary images get automatic format/quality (smaller files, same look). */
function optimizeCloudinary(url: string): string {
  if (!/^https:\/\/res\.cloudinary\.com\//.test(url) || !url.includes("/image/upload/") || /\/upload\/[^/]*f_auto/.test(url)) return url;
  return url.replace("/image/upload/", "/image/upload/f_auto,q_auto/");
}

export function safeSrc(src: string, fallback = ""): string {
  const s = src.trim();
  return /^(\/(?!\/)|https:\/\/)/.test(s) ? optimizeCloudinary(s) : fallback;
}
