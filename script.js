const supportedLanguages = ["en", "zh-Hans", "fr", "zh-Hant", "ja"];
const languageCache = new Map();
let currentLanguage = "en";
let currentContent;
let selectedCollectionIndex = 0;
let collectionTheme = "all";
let languageRequest = 0;

document.documentElement.classList.add("js");
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navigation = document.querySelector(".primary-nav");
const languageSelect = document.querySelector("[data-language-select]");
const languageStatus = document.querySelector("[data-language-status]");
const heroVideo = document.querySelector("[data-hero-video]");
const collectionList = document.querySelector("[data-collection-list]");
const detail = {
  image: document.querySelector("[data-detail-image]"),
  type: document.querySelector("[data-detail-type]"),
  title: document.querySelector("[data-detail-title]"),
  description: document.querySelector("[data-detail-description]"),
  date: document.querySelector("[data-detail-date]"),
  place: document.querySelector("[data-detail-place]"),
  context: document.querySelector("[data-detail-context]"),
  look: document.querySelector("[data-detail-look]")
};

function text(key) {
  return currentContent?.strings[key] || languageCache.get("en")?.strings[key] || key;
}

function translateStaticText() {
  document.documentElement.lang = currentLanguage;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = text(element.dataset.i18n);
  });
  document.querySelectorAll("[data-collection-filter]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.collectionFilter === collectionTheme));
  });
  for (const [dataAttribute, attribute] of [["data-i18n-alt", "alt"], ["data-i18n-aria", "aria-label"], ["data-i18n-title", "title"]]) {
    document.querySelectorAll(`[${dataAttribute}]`).forEach((element) => {
      element.setAttribute(attribute, text(element.getAttribute(dataAttribute)));
    });
  }
  document.querySelectorAll("[data-collection-image]").forEach((image) => {
    image.alt = currentContent.collections[Number(image.dataset.collectionImage)].title;
  });
  document.querySelectorAll("[data-poster-en]").forEach((image) => {
    image.src = currentLanguage.startsWith("zh-") ? image.dataset.posterZh : image.dataset.posterEn;
  });
  const mapLanguage = { "zh-Hans": "zh-CN", "zh-Hant": "zh-TW" }[currentLanguage] || currentLanguage;
  document.querySelectorAll("[data-venue-map]").forEach((frame) => {
    const source = new URL(frame.src);
    if (source.searchParams.get("hl") === mapLanguage) return;
    source.searchParams.set("hl", mapLanguage);
    frame.src = source.href;
  });
  const page = document.body.dataset.page || "home";
  document.title = page === "home" ? `MOFER | ${text("museum.name")}`
    : `${text(page === "not-found" ? "error.title" : `page.${page}.title`)} | MOFER`;
  const descriptions = { home: "hero.lede", about: "about.bodyOne", collections: "page.collections.lede", exhibitions: "page.exhibitions.lede", contact: "contact.body", "not-found": "error.body" };
  document.querySelector('meta[name="description"]')?.setAttribute("content", text(descriptions[page] || "hero.lede"));
  languageSelect?.setAttribute("aria-label", text("language.label"));
  updateMenuLabel();
  updateImageLabels();
}

function validateLanguagePack(pack, language) {
  if (pack.locale !== language || !pack.strings || !Array.isArray(pack.collections) || pack.collections.length !== 8) {
    throw new Error("Invalid language pack");
  }
  const english = languageCache.get("en");
  const requiredKeys = english ? Object.keys(english.strings) : ["museum.name", "language.label", "language.error", "nav.openMenu", "viewer.open"];
  for (const key of requiredKeys) {
    if (typeof pack.strings[key] !== "string" || !pack.strings[key].trim()) throw new Error(`Missing translation: ${key}`);
  }
  for (const [index, item] of pack.collections.entries()) {
    for (const key of ["id", "image", "type", "title", "date", "place", "summary", "theme", "context", "look"]) {
      if (typeof item[key] !== "string" || !item[key].trim()) throw new Error(`Incomplete collection: ${index}`);
    }
    if (!["war", "change", "culture"].includes(item.theme)) throw new Error(`Invalid collection theme: ${index}`);
    if (english && (item.id !== english.collections[index].id || item.image !== english.collections[index].image || item.fit !== english.collections[index].fit || item.theme !== english.collections[index].theme)) {
      throw new Error("Collection identity mismatch");
    }
  }
}

async function setLanguage(language, remember = false) {
  const requestedLanguage = supportedLanguages.includes(language) ? language : "en";
  const request = ++languageRequest;
  if (languageSelect) languageSelect.disabled = true;
  try {
    let pack = languageCache.get(requestedLanguage);
    if (!pack) {
      const response = await fetch(`/assets/i18n/${requestedLanguage}.json`);
      if (!response.ok) throw new Error("Translation unavailable");
      pack = await response.json();
      validateLanguagePack(pack, requestedLanguage);
      languageCache.set(requestedLanguage, pack);
    }
    if (request !== languageRequest) return;
    currentLanguage = requestedLanguage;
    currentContent = pack;
    const requestedItem = new URLSearchParams(location.search).get("item");
    if (requestedItem && !document.documentElement.dataset.languageReady) {
      const index = pack.collections.findIndex((item) => item.id === requestedItem);
      if (index >= 0) selectedCollectionIndex = index;
    }
    translateStaticText();
    document.querySelectorAll("[data-collection-preview]").forEach((element) => {
      const item = pack.collections[Number(element.dataset.collectionPreview)];
      element.querySelector("h3").textContent = item.title;
      element.querySelector("p").textContent = `${item.date}, ${item.place}`;
      element.querySelector("img").alt = item.title;
    });
    renderCollections();
    updateCollectionDetail();
    updateGalleryFilter();
    scheduleArtifactLayout();
    if (imageViewer.open) {
      refreshViewerItems();
      imageViewer.querySelector("[data-viewer-image]").src = viewerItems[viewerIndex].source;
      updateViewerCaption();
    }
    if (languageSelect) languageSelect.value = currentLanguage;
    if (languageStatus) languageStatus.hidden = true;
    document.documentElement.dataset.languageReady = currentLanguage;
    if (remember) {
      try { localStorage.setItem("mofer-language", currentLanguage); } catch {}
    }
  } catch {
    if (request !== languageRequest) return;
    if (languageSelect) languageSelect.value = currentLanguage;
    if (languageStatus) {
      const message = document.createElement("span");
      message.textContent = currentContent ? text("language.error") : "This translation could not be loaded. Please try again.";
      const retry = document.createElement("button");
      retry.type = "button";
      retry.textContent = currentContent ? text("language.retry") : "Try again";
      retry.addEventListener("click", () => setLanguage(requestedLanguage, remember));
      languageStatus.replaceChildren(message, retry);
      languageStatus.hidden = false;
    }
  } finally {
    if (request === languageRequest && languageSelect) languageSelect.disabled = false;
  }
}

function renderCollections() {
  if (!collectionList || !currentContent) return;
  const focusedIndex = document.activeElement?.dataset.collectionIndex;
  collectionList.replaceChildren();
  currentContent.collections.forEach((item, index) => {
    if (collectionTheme !== "all" && item.theme !== collectionTheme) return;
    const card = document.createElement("button");
    card.className = `collection-card${index === selectedCollectionIndex ? " is-active" : ""}`;
    card.type = "button";
    card.dataset.collectionIndex = String(index);
    card.setAttribute("aria-pressed", String(index === selectedCollectionIndex));
    card.setAttribute("aria-controls", "collection-detail");

    const image = document.createElement("img");
    image.src = item.image;
    image.alt = item.title;
    image.loading = "eager";
    image.decoding = "async";
    if (item.fit === "contain") image.classList.add("image--contain");

    const mount = document.createElement("span");
    mount.className = "artifact-mount";
    mount.appendChild(image);

    const copy = document.createElement("div");
    copy.className = "collection-card__copy";
    const title = document.createElement("h3");
    title.textContent = item.title;
    const type = document.createElement("span");
    type.textContent = item.type;
    copy.append(title, type);
    card.append(mount, copy);
    card.addEventListener("click", () => {
      selectCollection(index);
      document.querySelector("[data-collection-detail]").scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start"
      });
    });
    collectionList.appendChild(card);
  });
  if (focusedIndex !== undefined) collectionList.querySelector(`[data-collection-index="${focusedIndex}"]`)?.focus({ preventScroll: true });
}

function collectionIndices() {
  return currentContent.collections.flatMap((item, index) => collectionTheme === "all" || item.theme === collectionTheme ? [index] : []);
}

function selectCollection(index) {
  selectedCollectionIndex = index;
  updateCollectionDetail();
  collectionList.querySelectorAll(".collection-card").forEach((card) => {
    const selected = Number(card.dataset.collectionIndex) === index;
    card.classList.toggle("is-active", selected);
    card.setAttribute("aria-pressed", String(selected));
  });
  const url = new URL(location.href);
  url.searchParams.set("item", currentContent.collections[index].id);
  history.replaceState(null, "", url);
}

function stepCollection(offset) {
  const indices = collectionIndices();
  const position = indices.indexOf(selectedCollectionIndex);
  selectCollection(indices[(position + offset + indices.length) % indices.length]);
}

document.querySelectorAll("[data-collection-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    collectionTheme = button.dataset.collectionFilter;
    const indices = collectionIndices();
    if (!indices.includes(selectedCollectionIndex)) selectCollection(indices[0]);
    renderCollections();
    updateCollectionDetail();
  });
});
document.querySelector("[data-collection-previous]")?.addEventListener("click", () => stepCollection(-1));
document.querySelector("[data-collection-next]")?.addEventListener("click", () => stepCollection(1));
collectionList?.addEventListener("keydown", (event) => {
  if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key) || !currentContent) return;
  event.preventDefault();
  const indices = collectionIndices();
  if (event.key === "Home" || event.key === "End") selectCollection(indices[event.key === "Home" ? 0 : indices.length - 1]);
  else stepCollection(event.key === "ArrowLeft" ? -1 : 1);
  collectionList.querySelector(`[data-collection-index="${selectedCollectionIndex}"]`).focus({ preventScroll: true });
});

function updateCollectionDetail() {
  if (!currentContent || !detail.image) return;
  const item = currentContent.collections[selectedCollectionIndex];
  detail.image.src = item.image;
  detail.image.alt = item.title;
  detail.image.classList.toggle("image--contain", item.fit === "contain");
  detail.type.textContent = item.type;
  detail.title.textContent = item.title;
  detail.description.textContent = item.summary;
  detail.date.textContent = item.date;
  detail.place.textContent = item.place;
  detail.context.textContent = item.context;
  detail.look.textContent = item.look;
  const indices = collectionIndices();
  document.querySelector("[data-collection-position]").textContent = text("desk.position").replace("{current}", String(indices.indexOf(selectedCollectionIndex) + 1)).replace("{total}", String(indices.length));
  document.querySelectorAll("[data-collection-previous], [data-collection-next]").forEach((button) => { button.disabled = indices.length < 2; });
  document.querySelector("[data-collection-controls]").hidden = false;
  updateImageLabels();
}
detail.image?.addEventListener("load", () => {
  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) detail.image.animate([{ opacity: .3 }, { opacity: 1 }], { duration: 220, easing: "ease-out" });
});

languageSelect?.addEventListener("change", () => setLanguage(languageSelect.value, true));

function updateMenuLabel() {
  if (!menuToggle) return;
  const key = menuToggle.getAttribute("aria-expanded") === "true" ? "nav.closeMenu" : "nav.openMenu";
  menuToggle.setAttribute("aria-label", text(key));
  menuToggle.title = text(key);
}

function setMenuOpen(open, returnFocus = false) {
  if (!menuToggle) return;
  menuToggle.setAttribute("aria-expanded", String(open));
  header.classList.toggle("menu-open", open);
  updateMenuLabel();
  if (returnFocus) menuToggle.focus();
}

menuToggle?.addEventListener("click", () => setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true"));
navigation?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenuOpen(false);
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && header?.classList.contains("menu-open")) setMenuOpen(false, true);
});
document.addEventListener("click", (event) => {
  if (header && !header.contains(event.target)) setMenuOpen(false);
});
matchMedia("(min-width: 1025px)").addEventListener("change", (event) => {
  if (event.matches) setMenuOpen(false);
});

if (heroVideo) {
  heroVideo.defaultPlaybackRate = 0.85;
  heroVideo.playbackRate = 0.85;
  heroVideo.muted = true;
  heroVideo.autoplay = true;
  heroVideo.play().catch(() => document.body.classList.add("motion-paused"));
}

const imageViewer = document.createElement("dialog");
imageViewer.className = "image-viewer";
imageViewer.dataset.imageViewer = "";
imageViewer.setAttribute("aria-labelledby", "viewer-caption");
imageViewer.innerHTML = `
  <div class="viewer-toolbar">
    <span class="viewer-brand">MOFER</span>
    <span class="viewer-counter" data-viewer-counter></span>
    <button class="icon-button" type="button" data-viewer-zoom aria-label="Zoom in"><span class="icon icon--plus" aria-hidden="true"></span></button>
    <button class="icon-button" type="button" data-viewer-close aria-label="Close image" autofocus><span class="icon icon--close" aria-hidden="true"></span></button>
  </div>
  <div class="viewer-stage"><img src="/assets/collections/tim-louie-victory-address.jpg" alt="" data-viewer-image></div>
  <div class="viewer-bottom">
    <button class="icon-button" type="button" data-viewer-previous aria-label="Previous image"><span class="icon icon--left" aria-hidden="true"></span></button>
    <h2 id="viewer-caption"></h2>
    <button class="icon-button" type="button" data-viewer-next aria-label="Next image"><span class="icon icon--right" aria-hidden="true"></span></button>
  </div>`;
document.body.appendChild(imageViewer);
let viewerItems = [];
let viewerIndex = 0;
let viewerTrigger = null;
let viewerSource = [];

function refreshViewerItems() {
  viewerItems = viewerSource === "collection"
    ? collectionIndices().map((index) => ({ source: currentContent.collections[index].image, title: currentContent.collections[index].title }))
    : viewerSource.map((item) => ({
      source: item.dataset.fullSrc || item.getAttribute("src"),
      title: item.closest("figure")?.querySelector("figcaption")?.textContent || item.closest(".pathway-card")?.querySelector("h3")?.textContent || item.alt
    }));
}

function updateImageLabels() {
  if (!currentContent) return;
  document.querySelectorAll("[data-image-open]").forEach((button) => {
    button.setAttribute("aria-label", `${text("viewer.open")}: ${button.querySelector("img").alt}`);
    button.title = text("viewer.open");
  });
  imageViewer.querySelectorAll("[data-viewer-close], [data-viewer-previous], [data-viewer-next], [data-viewer-zoom]").forEach((button) => {
    const key = button.hasAttribute("data-viewer-close") ? "viewer.close"
      : button.hasAttribute("data-viewer-previous") ? "viewer.previous"
      : button.hasAttribute("data-viewer-next") ? "viewer.next"
      : imageViewer.classList.contains("is-zoomed") ? "viewer.zoomOut" : "viewer.zoomIn";
    button.setAttribute("aria-label", text(key));
    button.title = text(key);
  });
}

function updateViewerCaption() {
  const item = viewerItems[viewerIndex];
  imageViewer.querySelector("[data-viewer-image]").alt = item.title;
  imageViewer.querySelector("#viewer-caption").textContent = item.title;
}

function renderViewer() {
  const item = viewerItems[viewerIndex];
  imageViewer.classList.remove("is-zoomed");
  imageViewer.querySelector("[data-viewer-zoom] .icon").className = "icon icon--plus";
  const image = imageViewer.querySelector("[data-viewer-image]");
  image.src = item.source;
  updateViewerCaption();
  imageViewer.querySelector("[data-viewer-counter]").textContent = `${String(viewerIndex + 1).padStart(2, "0")} / ${String(viewerItems.length).padStart(2, "0")}`;
  imageViewer.querySelectorAll("[data-viewer-previous], [data-viewer-next]").forEach((button) => { button.disabled = viewerItems.length < 2; });
  imageViewer.querySelector(".viewer-stage").scrollTo(0, 0);
  updateImageLabels();
}

function moveViewer(offset) {
  viewerIndex = (viewerIndex + offset + viewerItems.length) % viewerItems.length;
  renderViewer();
}

imageViewer.querySelector("[data-viewer-close]").addEventListener("click", () => imageViewer.close());
imageViewer.querySelector("[data-viewer-next]").addEventListener("click", () => moveViewer(1));
imageViewer.querySelector("[data-viewer-previous]").addEventListener("click", () => moveViewer(-1));
imageViewer.querySelector("[data-viewer-zoom]").addEventListener("click", () => {
  const zoomed = imageViewer.classList.toggle("is-zoomed");
  imageViewer.querySelector("[data-viewer-zoom] .icon").className = `icon icon--${zoomed ? "minus" : "plus"}`;
  updateImageLabels();
});
imageViewer.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
    event.preventDefault();
    moveViewer(event.key === "ArrowRight" ? 1 : -1);
  }
});
imageViewer.addEventListener("click", (event) => {
  if (event.target === imageViewer) imageViewer.close();
});
imageViewer.addEventListener("close", () => {
  document.body.classList.remove("viewer-open");
  viewerTrigger?.focus({ preventScroll: true });
});

document.querySelectorAll("[data-detail-image], .gallery-grid img, .pathway-card > img, .exhibition__feature > img, .involvement__image img, [data-poster], .exhibition-highlights img").forEach((image) => {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "image-open";
  button.dataset.imageOpen = "";
  const originalLink = image.closest(".gallery-original");
  if (originalLink) originalLink.replaceWith(button);
  else image.before(button);
  button.appendChild(image);
  const affordance = document.createElement("span");
  affordance.className = "image-open__symbol";
  affordance.setAttribute("aria-hidden", "true");
  const icon = document.createElement("span");
  icon.className = "icon icon--expand";
  affordance.appendChild(icon);
  button.appendChild(affordance);
  button.addEventListener("click", () => {
    viewerTrigger = button;
    if (image.hasAttribute("data-detail-image")) {
      if (!currentContent) return;
      viewerSource = "collection";
      viewerIndex = collectionIndices().indexOf(selectedCollectionIndex);
    } else {
      const group = image.closest(".gallery-grid, .pathway-grid");
      viewerSource = group ? Array.from(group.querySelectorAll("img")) : [image];
      viewerIndex = viewerSource.indexOf(image);
    }
    refreshViewerItems();
    renderViewer();
    document.body.classList.add("viewer-open");
    imageViewer.showModal();
  });
});

window.addEventListener("scroll", () => header?.classList.toggle("is-scrolled", window.scrollY > 24), { passive: true });

let artifactLayoutFrame = 0;
const artifactGrids = Array.from(document.querySelectorAll(".preview-grid, .collection-list, .pathway-grid, .gallery-grid"));

function scheduleArtifactLayout() {
  if (artifactLayoutFrame) return;
  artifactLayoutFrame = requestAnimationFrame(() => {
    artifactLayoutFrame = 0;
    const updates = [];
    for (const grid of artifactGrids) {
      if (grid.closest("[hidden]")) continue;
      const rows = new Map();
      for (const item of grid.children) {
        const image = item.querySelector("img");
        if (!image?.complete || !image.naturalWidth) continue;
        const mount = image.closest(".artifact-mount, .image-open, .preview-object__image") || image;
        const bounds = mount.getBoundingClientRect();
        const row = Math.round(item.getBoundingClientRect().top);
        if (!rows.has(row)) rows.set(row, []);
        rows.get(row).push({ item, width: bounds.width, height: bounds.height });
      }
      for (const items of rows.values()) {
        const height = Math.max(...items.map((item) => item.height));
        for (const item of items) updates.push({ ...item, offset: (height - item.height) / 2 });
      }
    }
    for (const { item, width, offset } of updates) {
      item.style.setProperty("--caption-width", `${width}px`);
      item.style.setProperty("--media-offset", `${offset}px`);
    }
  });
}

const artifactGridWidths = new WeakMap();
const artifactResizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (artifactGridWidths.get(entry.target) === entry.contentRect.width) continue;
    artifactGridWidths.set(entry.target, entry.contentRect.width);
    scheduleArtifactLayout();
  }
});
artifactGrids.forEach((grid) => artifactResizeObserver.observe(grid));
document.addEventListener("load", (event) => {
  if (event.target instanceof HTMLImageElement) scheduleArtifactLayout();
}, true);
document.fonts.ready.then(scheduleArtifactLayout);
document.fonts.addEventListener("loadingdone", scheduleArtifactLayout);
window.addEventListener("resize", scheduleArtifactLayout, { passive: true });
scheduleArtifactLayout();

const collectionGallery = document.querySelector(".collection-gallery");
let activeGalleryCategory = "posters";
function updateGalleryFilter() {
  if (!collectionGallery || !currentContent) return;
  document.querySelectorAll("[data-gallery-panel]").forEach((panel) => {
    panel.hidden = panel.id !== activeGalleryCategory;
  });
  document.querySelectorAll("[data-gallery-filter]").forEach((link) => {
    if (link.dataset.galleryFilter === activeGalleryCategory) link.setAttribute("aria-current", "true");
    else link.removeAttribute("aria-current");
  });
  const count = document.getElementById(activeGalleryCategory).querySelectorAll(".photo-grid img").length;
  document.querySelector("[data-gallery-count]").textContent = text("gallery.count").replace("{count}", String(count));
  scheduleArtifactLayout();
}
function revealGalleryTarget() {
  if (!collectionGallery || !location.hash) return;
  const target = document.getElementById(location.hash.slice(1));
  if (!target || (target !== collectionGallery && !collectionGallery.contains(target))) return;
  if (target.hasAttribute("data-gallery-panel")) activeGalleryCategory = target.id;
  updateGalleryFilter();
  collectionGallery.open = true;
  requestAnimationFrame(() => collectionGallery.scrollIntoView({ block: "start", behavior: "instant" }));
}
collectionGallery?.addEventListener("toggle", scheduleArtifactLayout);
document.querySelectorAll('a[href="#gallery"]').forEach((link) => link.addEventListener("click", (event) => {
  event.preventDefault();
  collectionGallery.open = true;
  if (location.hash !== "#gallery") history.pushState(null, "", "#gallery");
  revealGalleryTarget();
}));
document.querySelectorAll("[data-gallery-filter]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    activeGalleryCategory = link.dataset.galleryFilter;
    history.replaceState(null, "", link.getAttribute("href"));
    updateGalleryFilter();
  });
});
window.addEventListener("hashchange", revealGalleryTarget);
revealGalleryTarget();

async function initializeLanguage() {
  let preferred = "en";
  try {
    const saved = localStorage.getItem("mofer-language");
    if (supportedLanguages.includes(saved)) preferred = saved;
  } catch {}
  await setLanguage("en");
  if (preferred !== "en") await setLanguage(preferred);
}

initializeLanguage();