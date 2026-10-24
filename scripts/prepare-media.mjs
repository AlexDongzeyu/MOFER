import { cp, mkdir, readdir, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "img");
const output = path.join(root, "assets", "gallery");
const names = await readdir(source);
await mkdir(output, { recursive: true });

function ffmpeg(args) {
  const result = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], { encoding: "utf8" });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr);
}

const groups = [
  { prefix: "海外首场", slug: "tokyo-poster", category: "posters", caption: "media.tokyoPoster" },
  { prefix: "本周限定", slug: "boynton-2025", category: "community", caption: "media.visitors" },
  { prefix: "多伦多招募", slug: "boynton-visitors", category: "community", caption: "media.visitors" },
  { prefix: "🇨🇦", slug: "tokyo-exhibition", category: "tokyo", caption: "media.tokyoPhoto" },
  { prefix: "一寸山河", slug: "archive", category: "archive", caption: "media.archivePhoto" },
  { prefix: "当文物遇见", slug: "outreach", category: "community", caption: "media.communityPhoto" }
];
const items = [];
for (const group of groups) {
  for (const name of names.filter((name) => name.startsWith(group.prefix) && name.endsWith(".jpg")).sort((a, b) => a.localeCompare(b, "en", { numeric: true }))) {
    const number = Number(name.match(/_(\d+)_/)[1]);
    const id = `${group.slug}-${String(number).padStart(2, "0")}`;
    let { category, caption } = group;
    if (group.slug === "boynton-2025" && number === 4) { category = "posters"; caption = "media.pastPoster"; }
    if (group.slug === "boynton-visitors" && number === 1) { category = "posters"; caption = "media.tokyoPoster"; }
    if (group.slug === "tokyo-poster" && number === 2) { category = "archive"; caption = "media.archivePhoto"; }
    if (id === "archive-04") caption = "gallery.archive";
    if (id === "boynton-visitors-09") caption = "gallery.poster";
    await cp(path.join(source, name), path.join(output, `${id}.jpg`));
    ffmpeg(["-i", path.join(source, name), "-vf", "scale=480:-1", "-frames:v", "1", "-quality", "82", path.join(output, `${id}-thumb.webp`)]);
    items.push({ id, category, caption, source: name });
  }
}
await writeFile(path.join(output, "manifest.json"), `${JSON.stringify(items, null, 2)}\n`);

// A single encoded sequence avoids source-switching gaps on mobile browsers.
const clips = names.filter((name) => name.endsWith(".mp4")).sort();
if (clips.length !== 4) throw new Error("Expected the four supplied exhibition film clips.");
const order = [0, 1, 3, 2];
const filters = order.map((_, index) => `[${index}:v]scale=960:540:force_original_aspect_ratio=increase,crop=960:540:(iw-ow)/2:(ih-oh)*0.25,setsar=1,fps=24,trim=duration=5,settb=AVTB,setpts=PTS-STARTPTS[v${index}]`).join(";");
const transitions = [
  "[v0]split=2[first][repeat]",
  "[repeat]trim=duration=0.5,setpts=PTS-STARTPTS[loop]",
  "[first][v1]xfade=transition=fade:duration=0.5:offset=4.5[x1]",
  "[x1][v2]xfade=transition=fade:duration=0.5:offset=9[x2]",
  "[x2][v3]xfade=transition=fade:duration=0.5:offset=13.5[x3]",
  "[x3][loop]xfade=transition=fade:duration=0.5:offset=18[x4]",
  "[x4]trim=start=0.5,setpts=PTS-STARTPTS[out]"
].join(";");
ffmpeg([
  ...order.flatMap((index) => ["-i", path.join(source, clips[index])]),
  "-filter_complex", `${filters};${transitions}`,
  "-map", "[out]", "-an", "-c:v", "libx264", "-preset", "medium", "-crf", "23",
  "-pix_fmt", "yuv420p", "-movflags", "+faststart", path.join(root, "assets", "video", "remembrance-montage.mp4")
]);
ffmpeg(["-ss", "1", "-i", path.join(root, "assets", "video", "remembrance-montage.mp4"), "-frames:v", "1", "-update", "1", path.join(root, "assets", "video", "remembrance-poster.jpg")]);
console.log(`Prepared ${items.length} full photographs, thumbnails, and a four-clip montage.`);
