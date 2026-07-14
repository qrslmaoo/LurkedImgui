const state = {
  projectName: "GeneratedImGuiApp",
  windowTitle: "My ImGui Tool",
  windowWidth: 820,
  windowHeight: 560,
  projectAuthor: "LurkedAccounts",
  projectVersion: "1.0.0",
  projectBackend: "glfw-opengl",
  selectedId: null,
  selectedIds: [],
  pendingType: null,
  activeThemePreset: "dark",
  grid: true,
  snapSize: 8,
  codeFile: "src/ui_layout.cpp",
  flags: {
    noTitleBar: false,
    noResize: false,
    noScrollbar: false,
    alwaysAutoResize: false
  },
  stylePresets: [],
  theme: {
    windowBg: "#2b3038",
    titleBg: "#20242a",
    titleText: "#f4f5f6",
    windowBorder: "#111316",
    windowRadius: 0,
    windowOpacity: 100,
    paddingX: 8,
    paddingY: 8
  },
  items: [
    { id: uid(), type: "text", label: "Hello from ImGui", x: 26, y: 28, w: 160, h: 24, textColor: "#f0f2f4", fontSize: 14, visible: true, locked: false, align: "left" },
    { id: uid(), type: "button", label: "Run Action", x: 26, y: 72, w: 128, h: 32, fill: "#4b5969", border: "#12161a", radius: 4, borderWidth: 1, fontSize: 14, visible: true, locked: false, align: "center" },
    { id: uid(), type: "checkbox", label: "Enabled", x: 26, y: 120, w: 132, h: 26, value: true, textColor: "#f0f2f4", fontSize: 14, visible: true, locked: false, align: "left" },
    { id: uid(), type: "box", label: "Custom Box", x: 230, y: 28, w: 250, h: 150, fill: "#20262d", fill2: "#314353", border: "#657080", textColor: "#cfd5dc", radius: 8, gradient: true, gradientDir: "vertical", borderWidth: 1, fontSize: 12, visible: true, locked: false, align: "left" }
  ]
};

const els = {
  stage: document.getElementById("stage"),
  canvas: document.getElementById("canvas"),
  canvasTitle: document.getElementById("canvasTitle"),
  projectName: document.getElementById("projectName"),
  windowTitle: document.getElementById("windowTitle"),
  windowWidth: document.getElementById("windowWidth"),
  windowHeight: document.getElementById("windowHeight"),
  projectAuthor: document.getElementById("projectAuthor"),
  projectVersion: document.getElementById("projectVersion"),
  projectBackend: document.getElementById("projectBackend"),
  flagNoTitleBar: document.getElementById("flagNoTitleBar"),
  flagNoResize: document.getElementById("flagNoResize"),
  flagNoScrollbar: document.getElementById("flagNoScrollbar"),
  flagAlwaysAutoResize: document.getElementById("flagAlwaysAutoResize"),
  themePreset: document.getElementById("themePreset"),
  stylePreset: document.getElementById("stylePreset"),
  animType: document.getElementById("animType"),
  animTrigger: document.getElementById("animTrigger"),
  animSpeed: document.getElementById("animSpeed"),
  animDistance: document.getElementById("animDistance"),
  animIntensity: document.getElementById("animIntensity"),
  animDelay: document.getElementById("animDelay"),
  propertySearch: document.getElementById("propertySearch"),
  layerSearch: document.getElementById("layerSearch"),
  layersList: document.getElementById("layersList"),
  validationList: document.getElementById("validationList"),
  themeWindowBg: document.getElementById("themeWindowBg"),
  themeTitleBg: document.getElementById("themeTitleBg"),
  themeTitleText: document.getElementById("themeTitleText"),
  themeWindowBorder: document.getElementById("themeWindowBorder"),
  themeWindowRadius: document.getElementById("themeWindowRadius"),
  themeWindowOpacity: document.getElementById("themeWindowOpacity"),
  themePaddingX: document.getElementById("themePaddingX"),
  themePaddingY: document.getElementById("themePaddingY"),
  inspector: document.getElementById("inspector"),
  emptyInspector: document.getElementById("emptyInspector"),
  propLabel: document.getElementById("propLabel"),
  propX: document.getElementById("propX"),
  propY: document.getElementById("propY"),
  propW: document.getElementById("propW"),
  propH: document.getElementById("propH"),
  propMin: document.getElementById("propMin"),
  propMax: document.getElementById("propMax"),
  propValue: document.getElementById("propValue"),
  propOptions: document.getElementById("propOptions"),
  propRows: document.getElementById("propRows"),
  propCols: document.getElementById("propCols"),
  propFill: document.getElementById("propFill"),
  propFill2: document.getElementById("propFill2"),
  propBorder: document.getElementById("propBorder"),
  propTextColor: document.getElementById("propTextColor"),
  propRadius: document.getElementById("propRadius"),
  propOpacity: document.getElementById("propOpacity"),
  propFontSize: document.getElementById("propFontSize"),
  propBorderWidth: document.getElementById("propBorderWidth"),
  propAlign: document.getElementById("propAlign"),
  propGradientDir: document.getElementById("propGradientDir"),
  propImageFit: document.getElementById("propImageFit"),
  propTint: document.getElementById("propTint"),
  propCropX: document.getElementById("propCropX"),
  propCropY: document.getElementById("propCropY"),
  propZoom: document.getElementById("propZoom"),
  propGradient: document.getElementById("propGradient"),
  propVisible: document.getElementById("propVisible"),
  propLocked: document.getElementById("propLocked"),
  rangeFields: document.getElementById("rangeFields"),
  valueField: document.getElementById("valueField"),
  optionsField: document.getElementById("optionsField"),
  tableFields: document.getElementById("tableFields"),
  imageField: document.getElementById("imageField"),
  imageFitField: document.getElementById("imageFitField"),
  imageAdjustFields: document.getElementById("imageAdjustFields"),
  imagePicker: document.getElementById("imagePicker"),
  designTab: document.getElementById("designTab"),
  codeTab: document.getElementById("codeTab"),
  designView: document.getElementById("designView"),
  codeView: document.getElementById("codeView"),
  codePreview: document.getElementById("codePreview"),
  codeFileSelect: document.getElementById("codeFileSelect"),
  status: document.getElementById("status"),
  gridToggle: document.getElementById("gridToggle"),
  undoBtn: document.getElementById("undoBtn"),
  redoBtn: document.getElementById("redoBtn"),
  snapSize: document.getElementById("snapSize")
};

let drag = null;
let suppressHistory = false;
const undoStack = [];
const redoStack = [];

init();

function init() {
  document.querySelectorAll("[data-add]").forEach((button) => {
    button.addEventListener("click", () => armTool(button.dataset.add));
  });

  ["projectName", "windowTitle", "windowWidth", "windowHeight", "projectAuthor", "projectVersion", "projectBackend"].forEach((key) => {
    els[key].addEventListener("input", () => {
      pushHistory();
      state[key] = key.includes("Width") || key.includes("Height")
        ? clamp(parseInt(els[key].value || "0", 10), key.includes("Width") ? 320 : 240, key.includes("Width") ? 1600 : 1200)
        : els[key].value;
      render();
    });
  });
  els.projectBackend.addEventListener("change", () => {
    pushHistory();
    state.projectBackend = els.projectBackend.value;
    render();
  });

  ["flagNoTitleBar", "flagNoResize", "flagNoScrollbar", "flagAlwaysAutoResize"].forEach((key) => {
    els[key].addEventListener("change", updateFlagsFromControls);
  });
  document.querySelectorAll("[data-align]").forEach((button) => {
    button.addEventListener("click", () => alignSelection(button.dataset.align));
  });
  document.getElementById("selectAllBtn").addEventListener("click", selectAllItems);
  document.getElementById("groupBtn").addEventListener("click", groupSelection);
  document.getElementById("applyThemePresetBtn").addEventListener("click", applyThemePreset);
  document.getElementById("saveStylePresetBtn").addEventListener("click", saveStylePreset);
  document.getElementById("applyStylePresetBtn").addEventListener("click", applyStylePreset);
  document.querySelectorAll("[data-anim-preset]").forEach((button) => {
    button.addEventListener("click", () => applyAnimationPreset(button.dataset.animPreset));
  });
  document.getElementById("applyAnimationBtn").addEventListener("click", applyAnimationFromControls);
  document.getElementById("clearAnimationBtn").addEventListener("click", clearAnimation);
  els.propertySearch.addEventListener("input", filterInspector);
  els.layerSearch.addEventListener("input", renderLayers);

  ["themeWindowBg", "themeTitleBg", "themeTitleText", "themeWindowBorder", "themeWindowRadius", "themeWindowOpacity", "themePaddingX", "themePaddingY"].forEach((key) => {
    els[key].addEventListener("input", updateThemeFromControls);
  });

  ["propLabel", "propX", "propY", "propW", "propH", "propMin", "propMax", "propValue", "propOptions", "propRows", "propCols", "propFill", "propFill2", "propBorder", "propTextColor", "propRadius", "propOpacity", "propFontSize", "propBorderWidth", "propCropX", "propCropY", "propZoom"].forEach((key) => {
    els[key].addEventListener("input", updateSelectedFromInspector);
  });
  ["propAlign", "propGradientDir", "propImageFit", "propTint"].forEach((key) => {
    els[key].addEventListener("change", updateSelectedFromInspector);
  });
  els.propGradient.addEventListener("change", updateSelectedFromInspector);
  els.propVisible.addEventListener("change", updateSelectedFromInspector);
  els.propLocked.addEventListener("change", updateSelectedFromInspector);
  els.imagePicker.addEventListener("change", loadSelectedImage);

  document.getElementById("duplicateBtn").addEventListener("click", duplicateSelected);
  document.getElementById("deleteBtn").addEventListener("click", deleteSelected);
  document.getElementById("backBtn").addEventListener("click", sendSelectedBack);
  document.getElementById("frontBtn").addEventListener("click", bringSelectedFront);
  document.getElementById("clearBtn").addEventListener("click", clearLayout);
  document.getElementById("writeDirBtn").addEventListener("click", writeProjectDirectory);
  document.getElementById("downloadZipBtn").addEventListener("click", downloadZip);
  document.getElementById("saveLayoutBtn").addEventListener("click", saveLayout);
  document.getElementById("loadLayoutInput").addEventListener("change", loadLayout);
  document.getElementById("copyCodeBtn").addEventListener("click", copyCode);
  els.codeFileSelect.addEventListener("change", () => {
    state.codeFile = els.codeFileSelect.value;
    renderCodePreview();
  });
  els.gridToggle.addEventListener("click", () => {
    state.grid = !state.grid;
    render();
  });
  els.snapSize.addEventListener("input", () => {
    state.snapSize = clamp(parseInt(els.snapSize.value || "1", 10), 1, 64);
    render();
  });
  els.undoBtn.addEventListener("click", undo);
  els.redoBtn.addEventListener("click", redo);

  els.designTab.addEventListener("click", () => setMode("design"));
  els.codeTab.addEventListener("click", () => setMode("code"));
  els.stage.addEventListener("pointerdown", (event) => {
    if (event.target !== els.stage) return;
    if (state.pendingType) {
      const rect = els.stage.getBoundingClientRect();
      addItem(state.pendingType, event.clientX - rect.left, event.clientY - rect.top);
      return;
    }
    selectItem(null);
  });
  document.addEventListener("pointermove", onPointerMove);
  document.addEventListener("pointerup", (event) => {
    finishDrag(event);
    drag = null;
  });
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z" && !isEditingText()) {
      event.preventDefault();
      event.shiftKey ? redo() : undo();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "y" && !isEditingText()) {
      event.preventDefault();
      redo();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "d" && state.selectedId && !isEditingText()) {
      event.preventDefault();
      duplicateSelected();
      return;
    }
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "a" && !isEditingText()) {
      event.preventDefault();
      selectAllItems();
      return;
    }
    if (event.key === "Escape" && !isEditingText()) {
      selectItem(null);
      return;
    }
    if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key) && state.selectedIds.length && !isEditingText()) {
      event.preventDefault();
      nudgeSelection(event.key, event.shiftKey ? 10 : 1);
      return;
    }
    if ((event.key === "Delete" || event.key === "Backspace") && state.selectedId && !isEditingText()) {
      event.preventDefault();
      deleteSelected();
    }
  });

  render();
}

function uid() {
  return Math.random().toString(36).slice(2, 9);
}

function armTool(type) {
  state.pendingType = state.pendingType === type ? null : type;
  setStatus(state.pendingType ? `Click the canvas to place a ${type}.` : "");
  renderToolButtons();
}

function addItem(type, x, y) {
  const defaults = {
    text: { label: "Text Label", w: 130, h: 24, textColor: "#f0f2f4", opacity: 100, fontSize: 14, visible: true, locked: false, align: "left" },
    button: { label: "Button", w: 110, h: 32, fill: "#4b5969", fill2: "#64758a", border: "#12161a", textColor: "#f4f5f6", radius: 4, opacity: 100, fontSize: 14, borderWidth: 1, visible: true, locked: false, align: "center", gradientDir: "vertical" },
    checkbox: { label: "Checkbox", w: 130, h: 26, textColor: "#f0f2f4", value: false, opacity: 100, fontSize: 14, visible: true, locked: false, align: "left" },
    slider: { label: "Slider", w: 220, h: 28, fill: "#4fb477", border: "#515a66", textColor: "#f0f2f4", value: 0.5, min: 0, max: 1, radius: 4, opacity: 100, fontSize: 14, borderWidth: 1, visible: true, locked: false, align: "left", gradientDir: "vertical" },
    input: { label: "Input", w: 220, h: 28, fill: "#171a1f", border: "#545c66", textColor: "#f0f2f4", value: "Text", radius: 3, opacity: 100, fontSize: 14, borderWidth: 1, visible: true, locked: false, align: "left" },
    box: { label: "Box", w: 240, h: 140, fill: "#20262d", fill2: "#314353", border: "#657080", textColor: "#cfd5dc", radius: 8, gradient: true, gradientDir: "vertical", opacity: 100, fontSize: 12, borderWidth: 1, visible: true, locked: false, align: "left" },
    image: { label: "Image", w: 220, h: 140, fill: "#20262d", border: "#657080", textColor: "#d6dde5", radius: 8, opacity: 100, fontSize: 12, borderWidth: 1, visible: true, locked: false, align: "center", imageFit: "cover", tint: "#ffffff", cropX: 0, cropY: 0, zoom: 100 },
    combo: { label: "Combo", w: 190, h: 30, fill: "#252b33", border: "#56616f", textColor: "#f0f2f4", value: "One", options: "One, Two, Three", radius: 4, opacity: 100, fontSize: 14, borderWidth: 1, visible: true, locked: false, align: "left" },
    progress: { label: "Progress", w: 220, h: 26, fill: "#29313a", fill2: "#4fb477", border: "#56616f", textColor: "#f0f2f4", value: 0.65, radius: 4, opacity: 100, fontSize: 12, borderWidth: 1, visible: true, locked: false, align: "center" },
    color: { label: "Color", w: 210, h: 30, fill: "#4fb477", border: "#56616f", textColor: "#f0f2f4", value: "#4fb477", radius: 4, opacity: 100, fontSize: 14, borderWidth: 1, visible: true, locked: false, align: "left" },
    separator: { label: "Separator", w: 220, h: 12, fill: "#657080", border: "#657080", textColor: "#f0f2f4", opacity: 100, fontSize: 12, borderWidth: 1, visible: true, locked: false, align: "left" },
    tabs: { label: "Tabs", w: 260, h: 120, fill: "#20262d", fill2: "#313946", border: "#657080", textColor: "#f0f2f4", options: "Main, Settings, About", value: "Main", activeTab: 0, radius: 6, gradient: true, opacity: 100, fontSize: 13, borderWidth: 1, visible: true, locked: false, align: "left" },
    table: { label: "Table", w: 320, h: 160, fill: "#20262d", border: "#657080", textColor: "#f0f2f4", rows: 4, cols: 3, radius: 4, opacity: 100, fontSize: 12, borderWidth: 1, visible: true, locked: false, align: "left" }
  };
  pushHistory();
  const offset = 24 + state.items.length * 14;
  const width = defaults[type].w;
  const height = defaults[type].h;
  const item = {
    id: uid(),
    type,
    x: clamp(snap(typeof x === "number" ? x : offset % Math.max(96, state.windowWidth - 260)), 0, state.windowWidth - width),
    y: clamp(snap(typeof y === "number" ? y : offset % Math.max(96, state.windowHeight - 120)), 0, state.windowHeight - 32 - height),
    ...defaults[type],
    ...itemStyleForTheme(state.activeThemePreset, type)
  };
  if (type === "color" && item.fill) item.value = item.fill;
  item.animation = defaultAnimation();
  state.items.push(item);
  state.pendingType = null;
  selectItem(item.id);
  render();
}

function render() {
  state.windowWidth = clamp(Number(state.windowWidth) || 820, 320, 1600);
  state.windowHeight = clamp(Number(state.windowHeight) || 560, 240, 1200);
  els.canvas.style.width = `${state.windowWidth}px`;
  els.canvas.style.height = `${state.windowHeight}px`;
  els.designView.classList.toggle("glass-backdrop", !!state.theme.glassEffect);
  els.canvas.style.background = state.theme.glassEffect ? "transparent" : state.theme.windowBg;
  els.canvas.style.borderColor = state.theme.windowBorder;
  els.canvas.style.borderRadius = `${Number(state.theme.windowRadius || 0)}px`;
  els.canvas.style.opacity = state.theme.glassEffect ? "1" : String(clamp(Number(state.theme.windowOpacity ?? 100), 0, 100) / 100);
  els.canvas.classList.toggle("flag-no-titlebar", !!state.flags.noTitleBar);
  els.canvas.classList.toggle("flag-no-resize", !!state.flags.noResize);
  els.canvas.classList.toggle("flag-no-scrollbar", !!state.flags.noScrollbar);
  els.canvas.classList.toggle("flag-auto-resize", !!state.flags.alwaysAutoResize);
  els.canvas.classList.toggle("theme-glass", !!state.theme.glassEffect);
  els.canvasTitle.textContent = state.windowTitle || "Untitled";
  els.canvasTitle.parentElement.style.background = state.theme.titleBg;
  els.canvasTitle.parentElement.style.color = state.theme.titleText;
  els.projectName.value = state.projectName;
  els.windowTitle.value = state.windowTitle;
  els.windowWidth.value = state.windowWidth;
  els.windowHeight.value = state.windowHeight;
  els.projectAuthor.value = state.projectAuthor;
  els.projectVersion.value = state.projectVersion;
  els.projectBackend.value = state.projectBackend;
  els.themePreset.value = state.activeThemePreset;
  renderFlagControls();
  renderThemeControls();
  els.snapSize.value = state.snapSize;
  els.stage.classList.toggle("grid", state.grid);
  els.gridToggle.classList.toggle("active", state.grid);
  els.undoBtn.disabled = undoStack.length === 0;
  els.redoBtn.disabled = redoStack.length === 0;
  renderToolButtons();

  els.stage.innerHTML = "";
  for (const item of state.items) {
    els.stage.appendChild(renderItem(item));
  }
  renderInspector();
  renderLayers();
  renderValidation();
  renderStylePresets();
  renderAnimationControls();
  renderCodePreview();
}

function renderToolButtons() {
  document.querySelectorAll("[data-add]").forEach((button) => {
    button.classList.toggle("active", button.dataset.add === state.pendingType);
  });
}

function renderThemeControls() {
  els.themeWindowBg.value = state.theme.windowBg;
  els.themeTitleBg.value = state.theme.titleBg;
  els.themeTitleText.value = state.theme.titleText;
  els.themeWindowBorder.value = state.theme.windowBorder;
  els.themeWindowRadius.value = state.theme.windowRadius;
  els.themeWindowOpacity.value = state.theme.windowOpacity;
  els.themePaddingX.value = state.theme.paddingX;
  els.themePaddingY.value = state.theme.paddingY;
}

function renderFlagControls() {
  els.flagNoTitleBar.checked = !!state.flags.noTitleBar;
  els.flagNoResize.checked = !!state.flags.noResize;
  els.flagNoScrollbar.checked = !!state.flags.noScrollbar;
  els.flagAlwaysAutoResize.checked = !!state.flags.alwaysAutoResize;
}

function renderItem(item) {
  const node = document.createElement("div");
  node.className = `widget w-${item.type}`;
  node.dataset.id = item.id;
  node.style.left = `${item.x}px`;
  node.style.top = `${item.y}px`;
  node.style.width = `${item.w}px`;
  node.style.height = `${item.h}px`;
  node.style.color = item.textColor || "#f4f5f6";
  node.style.opacity = String(clamp(Number(item.opacity ?? 100), 0, 100) / 100);
  node.style.borderColor = item.border || "";
  node.style.borderWidth = `${Number(item.borderWidth ?? 1)}px`;
  node.style.borderRadius = `${Number(item.radius ?? 0)}px`;
  node.style.fontSize = `${Number(item.fontSize ?? 14)}px`;
  node.style.justifyContent = alignToJustify(item.align);
  applyVisualFill(node, item);
  applyAnimationPreview(node, item);
  node.classList.toggle("selected", state.selectedIds.includes(item.id));
  node.classList.toggle("hidden-export", item.visible === false);
  node.classList.toggle("locked", !!item.locked);
  node.classList.toggle("item-glass", !!item.glassItem);
  node.addEventListener("pointerdown", (event) => beginDrag(event, item, "move"));

  if (item.type === "slider") {
    node.innerHTML = `<span>${escapeHtml(item.label)}</span><span class="track"></span>`;
  } else if (item.type === "input") {
    node.innerHTML = `<span>${escapeHtml(item.label)}</span><span class="field"></span>`;
  } else if (item.type === "combo") {
    node.innerHTML = `<span>${escapeHtml(item.label)}</span><span class="field">${escapeHtml(String(item.value || firstOption(item)))}</span>`;
  } else if (item.type === "progress") {
    node.innerHTML = `<span class="progress-fill" style="width:${clamp(Number(item.value ?? 0), 0, 1) * 100}%"></span><span class="progress-label">${escapeHtml(item.label)}</span>`;
  } else if (item.type === "color") {
    node.innerHTML = `<span class="color-swatch" style="background:${item.value || item.fill || "#4fb477"}"></span><span>${escapeHtml(item.label)}</span>`;
  } else if (item.type === "separator") {
    node.innerHTML = "";
  } else if (item.type === "tabs") {
    node.innerHTML = optionList(item).map((tab, index) => `<span class="tab ${index === Number(item.activeTab || 0) ? "active" : ""}" data-tab-index="${index}">${escapeHtml(tab)}</span>`).join("");
    node.querySelectorAll(".tab").forEach((tabNode) => {
      tabNode.addEventListener("pointerdown", (event) => event.stopPropagation());
      tabNode.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        pushHistory();
        item.activeTab = Number(tabNode.dataset.tabIndex) || 0;
        item.value = optionList(item)[item.activeTab] || "";
        selectItem(item.id);
      });
    });
  } else if (item.type === "table") {
    node.innerHTML = tablePreview(item);
  } else if (item.type === "box") {
    node.dataset.label = item.label;
  } else if (item.type === "image") {
    node.classList.toggle("empty", !item.imageDataUrl);
    if (item.imageDataUrl) {
      node.style.backgroundImage = `url("${item.imageDataUrl}")`;
      node.style.backgroundSize = imageFitToCss(item.imageFit);
      node.style.backgroundPosition = `${clamp(Number(item.cropX || 0), 0, 100)}% ${clamp(Number(item.cropY || 0), 0, 100)}%`;
      node.textContent = "";
    } else {
      node.innerHTML = `<span class="image-label">${escapeHtml(item.label || "Choose image")}</span>`;
    }
  } else {
    node.textContent = item.label;
  }

  if (item.type === "checkbox") {
    node.classList.toggle("checked", !!item.value);
  }

  if (item.type !== "text" && item.type !== "separator") {
    const resize = document.createElement("span");
    resize.className = "resize";
    resize.addEventListener("pointerdown", (event) => beginDrag(event, item, "resize"));
    node.appendChild(resize);
  }
  return node;
}

function applyVisualFill(node, item) {
  if (item.type === "text" || item.type === "checkbox") return;
  const fill = item.fill || "#2f353e";
  const fill2 = item.fill2 || fill;
  if (item.type === "image" && item.imageDataUrl) {
    node.style.backgroundColor = fill;
    return;
  }
  if (item.glassItem) {
    node.style.background = `linear-gradient(${gradientCssDirection(item.gradientDir)}, rgba(255,255,255,.34), rgba(184,220,255,.12))`;
    return;
  }
  node.style.background = item.gradient ? `linear-gradient(${gradientCssDirection(item.gradientDir)}, ${fill}, ${fill2})` : fill;
}

function gradientCssDirection(direction) {
  if (direction === "horizontal") return "90deg";
  if (direction === "diagonal") return "135deg";
  return "180deg";
}

function imageFitToCss(fit) {
  if (fit === "contain") return "contain";
  if (fit === "stretch") return "100% 100%";
  return "cover";
}

function imageUv(item) {
  const zoom = clamp(Number(item.zoom || 100), 50, 300) / 100;
  const span = clamp(1 / zoom, 0.05, 1);
  const centerX = clamp(Number(item.cropX || 0), 0, 100) / 100;
  const centerY = clamp(Number(item.cropY || 0), 0, 100) / 100;
  const u0 = clamp(centerX - span / 2, 0, 1 - span);
  const v0 = clamp(centerY - span / 2, 0, 1 - span);
  return { u0, v0, u1: u0 + span, v1: v0 + span };
}

function alignToJustify(align) {
  if (align === "center") return "center";
  if (align === "right") return "flex-end";
  return "flex-start";
}

function defaultAnimation() {
  return { type: "none", trigger: "always", speed: 400, distance: 8, intensity: 35, delay: 0 };
}

function animationPreset(type) {
  const presets = {
    hoverLift: { type: "hoverLift", trigger: "hover", speed: 180, distance: -8, intensity: 35, delay: 0 },
    hoverGlow: { type: "hoverGlow", trigger: "hover", speed: 220, distance: 0, intensity: 45, delay: 0 },
    pulse: { type: "pulse", trigger: "always", speed: 900, distance: 0, intensity: 35, delay: 0 },
    slideIn: { type: "slideIn", trigger: "always", speed: 420, distance: 28, intensity: 30, delay: 0 },
    shake: { type: "shake", trigger: "hover", speed: 260, distance: 10, intensity: 50, delay: 0 },
    fade: { type: "fade", trigger: "always", speed: 850, distance: 0, intensity: 45, delay: 0 }
  };
  return { ...defaultAnimation(), ...(presets[type] || {}) };
}

function applyAnimationPreview(node, item) {
  const animation = normalizeAnimation(item.animation);
  node.classList.add(`anim-${animation.type}`);
  node.classList.toggle("anim-hoverOnly", animation.trigger === "hover");
  node.classList.toggle("anim-activeOnly", animation.trigger === "active");
  node.classList.toggle("anim-always", animation.trigger === "always");
  node.style.setProperty("--anim-speed", `${animation.speed}ms`);
  node.style.setProperty("--anim-delay", `${animation.delay}ms`);
  node.style.setProperty("--anim-distance", `${animation.distance}px`);
  node.style.setProperty("--anim-strength", `${clamp(Number(animation.intensity), 0, 100) / 100}`);
}

function normalizeAnimation(animation) {
  return {
    ...defaultAnimation(),
    ...(animation || {}),
    speed: clamp(Number(animation?.speed ?? 400), 60, 4000),
    distance: clamp(Number(animation?.distance ?? 8), -80, 80),
    intensity: clamp(Number(animation?.intensity ?? 35), 0, 100),
    delay: clamp(Number(animation?.delay ?? 0), 0, 4000)
  };
}

function renderAnimationControls() {
  const item = selectedItem();
  const animation = normalizeAnimation(item?.animation);
  els.animType.value = animation.type;
  els.animTrigger.value = animation.trigger;
  els.animSpeed.value = animation.speed;
  els.animDistance.value = animation.distance;
  els.animIntensity.value = animation.intensity;
  els.animDelay.value = animation.delay;
}

function applyAnimationPreset(type) {
  const items = selectedItems();
  if (!items.length) return;
  pushHistory();
  const preset = animationPreset(type);
  for (const item of items) item.animation = { ...preset };
  render();
}

function applyAnimationFromControls() {
  const items = selectedItems();
  if (!items.length) return;
  pushHistory();
  const animation = normalizeAnimation({
    type: els.animType.value,
    trigger: els.animTrigger.value,
    speed: els.animSpeed.value,
    distance: els.animDistance.value,
    intensity: els.animIntensity.value,
    delay: els.animDelay.value
  });
  for (const item of items) item.animation = { ...animation };
  render();
}

function clearAnimation() {
  const items = selectedItems();
  if (!items.length) return;
  pushHistory();
  for (const item of items) item.animation = defaultAnimation();
  render();
}

function beginDrag(event, item, mode) {
  event.preventDefault();
  event.stopPropagation();
  if (item.locked) {
    selectItem(item.id, event.ctrlKey || event.metaKey || event.shiftKey);
    return;
  }
  pushHistory();
  if (!state.selectedIds.includes(item.id) || event.ctrlKey || event.metaKey || event.shiftKey) {
    selectItem(item.id, event.ctrlKey || event.metaKey || event.shiftKey);
  }
  drag = {
    mode,
    id: item.id,
    startX: event.clientX,
    startY: event.clientY,
    itemX: item.x,
    itemY: item.y,
    itemW: item.w,
    itemH: item.h,
    itemType: item.type,
    items: selectedItems().map((selected) => ({ id: selected.id, x: selected.x, y: selected.y, w: selected.w, h: selected.h }))
  };
  event.currentTarget.setPointerCapture?.(event.pointerId);
}

function finishDrag(event) {
  if (!drag || drag.mode !== "move" || drag.itemType !== "checkbox") return;
  const moved = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
  if (moved > 4) return;
  const item = state.items.find((candidate) => candidate.id === drag.id);
  if (!item || item.locked) return;
  pushHistory();
  item.value = !item.value;
  render();
}

function onPointerMove(event) {
  if (!drag) return;
  const item = selectedItem();
  if (!item) return;
  const dx = event.clientX - drag.startX;
  const dy = event.clientY - drag.startY;
  if (drag.mode === "move") {
    for (const snapshot of drag.items) {
      const moved = state.items.find((candidate) => candidate.id === snapshot.id);
      if (!moved || moved.locked) continue;
      moved.x = clamp(smartSnapX(snapshot.x + dx, moved), 0, state.windowWidth - moved.w);
      moved.y = clamp(smartSnapY(snapshot.y + dy, moved), 0, state.windowHeight - 32 - moved.h);
    }
  } else {
    item.w = clamp(snap(drag.itemW + dx), ["box", "image"].includes(item.type) ? 80 : 32, state.windowWidth - item.x);
    item.h = clamp(snap(drag.itemH + dy), ["box", "image"].includes(item.type) ? 60 : 20, state.windowHeight - 32 - item.y);
  }
  render();
}

function selectItem(id, additive = false) {
  if (!id) {
    state.selectedId = null;
    state.selectedIds = [];
    render();
    return;
  }
  if (additive) {
    state.selectedIds = state.selectedIds.includes(id)
      ? state.selectedIds.filter((selected) => selected !== id)
      : [...state.selectedIds, id];
  } else {
    state.selectedIds = [id];
  }
  state.selectedId = state.selectedIds[state.selectedIds.length - 1] || null;
  render();
}

function selectedItem() {
  return state.items.find((item) => item.id === state.selectedId) || null;
}

function selectedItems() {
  return state.items.filter((item) => state.selectedIds.includes(item.id));
}

function optionList(item) {
  return String(item.options || "").split(",").map((part) => part.trim()).filter(Boolean);
}

function firstOption(item) {
  return optionList(item)[0] || "";
}

function tablePreview(item) {
  const rows = clamp(Number(item.rows || 3), 1, 20);
  const cols = clamp(Number(item.cols || 3), 1, 8);
  const cells = [];
  for (let i = 0; i < rows * cols; i++) {
    cells.push(`<span class="table-cell">${i < cols ? `Column ${i + 1}` : ""}</span>`);
  }
  return `<div style="display:grid;grid-template-columns:repeat(${cols},1fr);width:100%;height:100%">${cells.join("")}</div>`;
}

function renderLayers() {
  const query = (els.layerSearch.value || "").toLowerCase();
  els.layersList.innerHTML = "";
  state.items.slice().reverse().forEach((item) => {
    if (query && !`${item.label} ${item.type}`.toLowerCase().includes(query)) return;
    const row = document.createElement("div");
    row.className = "layer-row";
    row.classList.toggle("selected", state.selectedIds.includes(item.id));
    const type = document.createElement("span");
    type.textContent = item.type;
    const label = document.createElement("span");
    label.textContent = item.label || item.type;
    const visible = document.createElement("button");
    visible.title = "Toggle visible";
    visible.textContent = item.visible === false ? "H" : "V";
    const lock = document.createElement("button");
    lock.title = "Toggle lock";
    lock.textContent = item.locked ? "L" : "U";
    row.appendChild(type);
    row.appendChild(label);
    row.appendChild(visible);
    row.appendChild(lock);
    row.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") return;
      selectItem(item.id, event.ctrlKey || event.metaKey || event.shiftKey);
    });
    visible.addEventListener("click", () => {
      pushHistory();
      item.visible = item.visible === false;
      render();
    });
    lock.addEventListener("click", () => {
      pushHistory();
      item.locked = !item.locked;
      render();
    });
    els.layersList.appendChild(row);
  });
}

function renderValidation() {
  const warnings = validateLayout();
  els.validationList.innerHTML = warnings.length
    ? warnings.map((warning) => `<div class="validation-row">${escapeHtml(warning)}</div>`).join("")
    : '<div class="muted">No issues found.</div>';
}

function validateLayout() {
  const warnings = [];
  for (const item of state.items) {
    if (!item.label && !["separator", "image"].includes(item.type)) warnings.push(`${item.type} is missing a label.`);
    if (item.x + item.w > state.windowWidth || item.y + item.h > state.windowHeight - 32) warnings.push(`${item.label || item.type} extends outside the window.`);
    if (item.type === "image" && !item.imageDataUrl) warnings.push(`${item.label || "Image"} has no selected image.`);
  }
  for (let i = 0; i < state.items.length; i++) {
    for (let j = i + 1; j < state.items.length; j++) {
      if (overlaps(state.items[i], state.items[j])) {
        warnings.push(`${state.items[i].label || state.items[i].type} overlaps ${state.items[j].label || state.items[j].type}.`);
      }
    }
  }
  return warnings.slice(0, 20);
}

function overlaps(a, b) {
  return a.visible !== false && b.visible !== false && a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y;
}

function renderCodePreview() {
  const files = generateProjectFiles();
  const keys = Object.keys(files);
  if (!keys.includes(state.codeFile)) state.codeFile = keys.includes("src/ui_layout.cpp") ? "src/ui_layout.cpp" : keys[0];
  els.codeFileSelect.innerHTML = keys.map((key) => `<option value="${escapeHtml(key)}"${key === state.codeFile ? " selected" : ""}>${escapeHtml(key)}</option>`).join("");
  const content = files[state.codeFile];
  els.codePreview.textContent = content instanceof Uint8Array ? `[binary asset: ${content.byteLength} bytes]` : content;
}

function updateThemeFromControls() {
  pushHistory();
  state.theme.windowBg = els.themeWindowBg.value;
  state.theme.titleBg = els.themeTitleBg.value;
  state.theme.titleText = els.themeTitleText.value;
  state.theme.windowBorder = els.themeWindowBorder.value;
  state.theme.windowRadius = clamp(Number(els.themeWindowRadius.value) || 0, 0, 40);
  state.theme.windowOpacity = clamp(Number(els.themeWindowOpacity.value) || 0, 0, 100);
  state.theme.paddingX = clamp(Number(els.themePaddingX.value) || 0, 0, 80);
  state.theme.paddingY = clamp(Number(els.themePaddingY.value) || 0, 0, 80);
  render();
}

function updateFlagsFromControls() {
  pushHistory();
  state.flags.noTitleBar = els.flagNoTitleBar.checked;
  state.flags.noResize = els.flagNoResize.checked;
  state.flags.noScrollbar = els.flagNoScrollbar.checked;
  state.flags.alwaysAutoResize = els.flagAlwaysAutoResize.checked;
  if (state.flags.alwaysAutoResize) {
    state.flags.noResize = true;
  }
  render();
}

function applyThemePreset() {
  pushHistory();
  state.activeThemePreset = els.themePreset.value || "dark";
  state.theme = normalizeTheme(themePresetFor(state.activeThemePreset));
  render();
}

function themePresetFor(name) {
  const presets = {
    dark: { windowBg: "#2b3038", titleBg: "#20242a", titleText: "#f4f5f6", windowBorder: "#111316", windowRadius: 0, windowOpacity: 100, paddingX: 8, paddingY: 8 },
    red: { windowBg: "#1d1416", titleBg: "#3b151c", titleText: "#ffe5e8", windowBorder: "#793840", windowRadius: 6, windowOpacity: 100, paddingX: 10, paddingY: 10 },
    blue: { windowBg: "#202833", titleBg: "#26384f", titleText: "#e6f1ff", windowBorder: "#526b8a", windowRadius: 6, windowOpacity: 100, paddingX: 10, paddingY: 10 },
    light: { windowBg: "#e8ebef", titleBg: "#cdd5df", titleText: "#15171a", windowBorder: "#9da8b5", windowRadius: 4, windowOpacity: 100, paddingX: 10, paddingY: 10 },
    glass: { windowBg: "#dceeff", titleBg: "#f9fdff", titleText: "#17202b", windowBorder: "#ffffff", windowRadius: 24, windowOpacity: 28, paddingX: 14, paddingY: 14, glassEffect: true }
  };
  return presets[name] || presets.dark;
}

function itemStyleForTheme(name, type) {
  const styles = {
    dark: { fill: "#4b5969", fill2: "#64758a", border: "#12161a", textColor: "#f4f5f6", radius: 4, opacity: 100, borderWidth: 1, gradient: false },
    red: { fill: "#3b151c", fill2: "#6f2631", border: "#a94b58", textColor: "#ffe5e8", radius: 6, opacity: 100, borderWidth: 1, gradient: true, gradientDir: "vertical" },
    blue: { fill: "#26384f", fill2: "#385a7c", border: "#6f91b8", textColor: "#e6f1ff", radius: 6, opacity: 100, borderWidth: 1, gradient: true, gradientDir: "vertical" },
    light: { fill: "#d7dde5", fill2: "#f4f6f8", border: "#9da8b5", textColor: "#15171a", radius: 4, opacity: 100, borderWidth: 1, gradient: true, gradientDir: "vertical" },
    glass: { fill: "#f7fbff", fill2: "#b7dcff", border: "#ffffff", textColor: "#f7fbff", radius: 16, opacity: 72, borderWidth: 1, gradient: true, gradientDir: "diagonal", glassItem: true }
  };
  const style = { ...(styles[name] || styles.dark) };
  if (["text", "checkbox", "separator"].includes(type)) {
    delete style.fill;
    delete style.fill2;
    delete style.gradient;
  }
  if (type === "progress") {
    style.fill = name === "glass" ? "#ffffff" : style.fill;
    style.fill2 = name === "glass" ? "#7bc8ff" : style.fill2;
  }
  if (type === "image") {
    style.tint = name === "glass" ? "#ffffff" : undefined;
  }
  return Object.fromEntries(Object.entries(style).filter(([, value]) => value !== undefined));
}

function saveStylePreset() {
  const item = selectedItem();
  if (!item) return;
  const name = `${item.label || item.type} Style`;
  const preset = {
    name,
    style: pickStyle(item)
  };
  state.stylePresets.push(preset);
  render();
}

function renderStylePresets() {
  els.stylePreset.innerHTML = state.stylePresets.length
    ? state.stylePresets.map((preset, index) => `<option value="${index}">${escapeHtml(preset.name)}</option>`).join("")
    : '<option value="">No saved styles</option>';
}

function applyStylePreset() {
  const item = selectedItem();
  const preset = state.stylePresets[Number(els.stylePreset.value)];
  if (!item || !preset) return;
  pushHistory();
  Object.assign(item, preset.style);
  render();
}

function pickStyle(item) {
  const keys = ["fill", "fill2", "border", "textColor", "radius", "opacity", "fontSize", "borderWidth", "align", "gradient", "gradientDir", "glassItem", "imageFit", "tint", "cropX", "cropY", "zoom"];
  return Object.fromEntries(keys.filter((key) => item[key] !== undefined).map((key) => [key, item[key]]));
}

function renderInspector() {
  const item = selectedItem();
  els.emptyInspector.classList.toggle("hidden", !!item);
  els.inspector.classList.toggle("hidden", !item);
  if (!item) return;
  els.propLabel.value = item.label ?? "";
  els.propX.value = item.x;
  els.propY.value = item.y;
  els.propW.value = item.w;
  els.propH.value = item.h;
  els.propMin.value = item.min ?? 0;
  els.propMax.value = item.max ?? 1;
  els.propValue.value = item.type === "tabs" ? (optionList(item)[Number(item.activeTab || 0)] || "") : (item.value ?? "");
  els.propOptions.value = item.options ?? "";
  els.propRows.value = item.rows ?? 3;
  els.propCols.value = item.cols ?? 3;
  els.propFill.value = item.fill || "#2f353e";
  els.propFill2.value = item.fill2 || item.fill || "#2f353e";
  els.propBorder.value = item.border || "#657080";
  els.propTextColor.value = item.textColor || "#f4f5f6";
  els.propRadius.value = item.radius ?? 0;
  els.propOpacity.value = item.opacity ?? 100;
  els.propFontSize.value = item.fontSize ?? 14;
  els.propBorderWidth.value = item.borderWidth ?? 1;
  els.propAlign.value = item.align || "left";
  els.propGradientDir.value = item.gradientDir || "vertical";
  els.propImageFit.value = item.imageFit || "cover";
  els.propTint.value = item.tint || "#ffffff";
  els.propCropX.value = item.cropX ?? 0;
  els.propCropY.value = item.cropY ?? 0;
  els.propZoom.value = item.zoom ?? 100;
  els.propGradient.checked = !!item.gradient;
  els.propVisible.checked = item.visible !== false;
  els.propLocked.checked = !!item.locked;
  els.rangeFields.classList.toggle("hidden", item.type !== "slider");
  els.valueField.classList.toggle("hidden", !["checkbox", "slider", "input", "combo", "progress", "color", "tabs"].includes(item.type));
  els.optionsField.classList.toggle("hidden", !["combo", "tabs"].includes(item.type));
  els.tableFields.classList.toggle("hidden", item.type !== "table");
  els.imageField.classList.toggle("hidden", item.type !== "image");
  els.imageFitField.classList.toggle("hidden", item.type !== "image");
  els.imageAdjustFields.classList.toggle("hidden", item.type !== "image");
  filterInspector();
}

function updateSelectedFromInspector() {
  const item = selectedItem();
  if (!item) return;
  pushHistory();
  item.label = els.propLabel.value;
  item.x = clamp(snap(Number(els.propX.value) || 0), 0, state.windowWidth - item.w);
  item.y = clamp(snap(Number(els.propY.value) || 0), 0, state.windowHeight - 32 - item.h);
  item.w = clamp(snap(Number(els.propW.value) || item.w), ["box", "image"].includes(item.type) ? 80 : 24, state.windowWidth - item.x);
  item.h = clamp(snap(Number(els.propH.value) || item.h), ["box", "image"].includes(item.type) ? 60 : 20, state.windowHeight - 32 - item.y);
  item.options = els.propOptions.value;
  item.rows = clamp(Number(els.propRows.value) || 3, 1, 20);
  item.cols = clamp(Number(els.propCols.value) || 3, 1, 8);
  item.fill = els.propFill.value;
  item.fill2 = els.propFill2.value;
  item.border = els.propBorder.value;
  item.textColor = els.propTextColor.value;
  item.radius = clamp(Number(els.propRadius.value) || 0, 0, 40);
  item.opacity = clamp(Number(els.propOpacity.value) || 0, 0, 100);
  item.fontSize = clamp(Number(els.propFontSize.value) || 14, 8, 48);
  item.borderWidth = clamp(Number(els.propBorderWidth.value) || 0, 0, 12);
  item.align = els.propAlign.value;
  item.gradientDir = els.propGradientDir.value;
  item.imageFit = els.propImageFit.value;
  item.tint = els.propTint.value;
  item.cropX = clamp(Number(els.propCropX.value) || 0, 0, 100);
  item.cropY = clamp(Number(els.propCropY.value) || 0, 0, 100);
  item.zoom = clamp(Number(els.propZoom.value) || 100, 50, 300);
  item.gradient = els.propGradient.checked;
  item.visible = els.propVisible.checked;
  item.locked = els.propLocked.checked;
  if (item.type === "slider") {
    item.min = Number(els.propMin.value) || 0;
    item.max = Number(els.propMax.value) || 1;
    item.value = Number(els.propValue.value) || 0;
  } else if (item.type === "checkbox") {
    item.value = /^(true|1|yes|on)$/i.test(els.propValue.value);
  } else if (item.type === "input") {
    item.value = els.propValue.value;
  } else if (item.type === "combo") {
    item.value = els.propValue.value || firstOption(item);
  } else if (item.type === "progress") {
    item.value = clamp(Number(els.propValue.value) || 0, 0, 1);
  } else if (item.type === "color") {
    item.value = /^#[0-9a-f]{6}$/i.test(els.propValue.value) ? els.propValue.value : els.propFill.value;
    item.fill = item.value;
  } else if (item.type === "tabs") {
    const index = optionList(item).findIndex((option) => option.toLowerCase() === els.propValue.value.toLowerCase());
    item.activeTab = index >= 0 ? index : Number(item.activeTab || 0);
    item.value = optionList(item)[item.activeTab] || "";
  }
  render();
}

function filterInspector() {
  const query = (els.propertySearch.value || "").toLowerCase();
  document.querySelectorAll("#inspector label, #inspector .split-fields, #inspector .style-grid, #inspector .row-actions").forEach((node) => {
    const text = node.textContent.toLowerCase();
    node.classList.toggle("property-hidden", !!query && !text.includes(query));
  });
}

async function loadSelectedImage(event) {
  const item = selectedItem();
  const file = event.target.files?.[0];
  if (!item || item.type !== "image" || !file) return;
  pushHistory();
  item.imageName = safeAssetName(file.name || `${item.label || "image"}.png`);
  item.imageDataUrl = await readFileAsDataUrl(file);
  if (!item.label || item.label === "Image") {
    item.label = item.imageName;
  }
  event.target.value = "";
  render();
}

function duplicateSelected() {
  const items = selectedItems();
  if (!items.length) return;
  pushHistory();
  const copies = items.map((item) => ({ ...item, id: uid(), x: clamp(item.x + 18, 0, state.windowWidth - item.w), y: clamp(item.y + 18, 0, state.windowHeight - 32 - item.h) }));
  state.items.push(...copies);
  state.selectedIds = copies.map((item) => item.id);
  state.selectedId = state.selectedIds[state.selectedIds.length - 1] || null;
  render();
}

function deleteSelected() {
  if (!state.selectedIds.length) return;
  pushHistory();
  state.items = state.items.filter((item) => !state.selectedIds.includes(item.id));
  state.selectedId = null;
  state.selectedIds = [];
  render();
}

function sendSelectedBack() {
  const index = state.items.findIndex((item) => item.id === state.selectedId);
  if (index <= 0) return;
  pushHistory();
  const [item] = state.items.splice(index, 1);
  state.items.unshift(item);
  render();
}

function bringSelectedFront() {
  const index = state.items.findIndex((item) => item.id === state.selectedId);
  if (index < 0 || index === state.items.length - 1) return;
  pushHistory();
  const [item] = state.items.splice(index, 1);
  state.items.push(item);
  render();
}

function selectAllItems() {
  state.selectedIds = state.items.map((item) => item.id);
  state.selectedId = state.selectedIds[state.selectedIds.length - 1] || null;
  render();
}

function alignSelection(mode) {
  const items = selectedItems().filter((item) => !item.locked);
  if (items.length < 2) return;
  pushHistory();
  const minX = Math.min(...items.map((item) => item.x));
  const maxX = Math.max(...items.map((item) => item.x + item.w));
  const minY = Math.min(...items.map((item) => item.y));
  const maxY = Math.max(...items.map((item) => item.y + item.h));
  const first = items[0];
  for (const item of items) {
    if (mode === "left") item.x = minX;
    if (mode === "center") item.x = Math.round((minX + maxX - item.w) / 2);
    if (mode === "right") item.x = maxX - item.w;
    if (mode === "top") item.y = minY;
    if (mode === "middle") item.y = Math.round((minY + maxY - item.h) / 2);
    if (mode === "bottom") item.y = maxY - item.h;
    if (mode === "sameW") item.w = first.w;
    if (mode === "sameH") item.h = first.h;
  }
  render();
}

function groupSelection() {
  const items = selectedItems();
  if (items.length < 2) return;
  pushHistory();
  const minX = Math.min(...items.map((item) => item.x));
  const minY = Math.min(...items.map((item) => item.y));
  const maxX = Math.max(...items.map((item) => item.x + item.w));
  const maxY = Math.max(...items.map((item) => item.y + item.h));
  const group = {
    id: uid(),
    type: "box",
    label: "Group",
    x: clamp(minX - 12, 0, state.windowWidth - 80),
    y: clamp(minY - 12, 0, state.windowHeight - 92),
    w: clamp(maxX - minX + 24, 80, state.windowWidth - minX),
    h: clamp(maxY - minY + 24, 60, state.windowHeight - 32 - minY),
    fill: "#14181d",
    fill2: "#222a33",
    border: "#657080",
    textColor: "#cfd5dc",
    radius: 8,
    gradient: true,
    gradientDir: "vertical",
    opacity: 60,
    fontSize: 12,
    borderWidth: 1,
    visible: true,
    locked: false,
    align: "left"
  };
  state.items.unshift(group);
  selectItem(group.id);
}

function nudgeSelection(key, amount) {
  const dx = key === "ArrowLeft" ? -amount : key === "ArrowRight" ? amount : 0;
  const dy = key === "ArrowUp" ? -amount : key === "ArrowDown" ? amount : 0;
  const items = selectedItems().filter((item) => !item.locked);
  if (!items.length) return;
  pushHistory();
  for (const item of items) {
    item.x = clamp(item.x + dx, 0, state.windowWidth - item.w);
    item.y = clamp(item.y + dy, 0, state.windowHeight - 32 - item.h);
  }
  render();
}

function smartSnapX(value, item) {
  let result = snap(value);
  for (const other of state.items) {
    if (other.id === item.id) continue;
    for (const target of [other.x, other.x + other.w, other.x + Math.round(other.w / 2)]) {
      for (const sourceOffset of [0, item.w, Math.round(item.w / 2)]) {
        if (Math.abs(value + sourceOffset - target) <= 5) result = target - sourceOffset;
      }
    }
  }
  return snap(result);
}

function smartSnapY(value, item) {
  let result = snap(value);
  for (const other of state.items) {
    if (other.id === item.id) continue;
    for (const target of [other.y, other.y + other.h, other.y + Math.round(other.h / 2)]) {
      for (const sourceOffset of [0, item.h, Math.round(item.h / 2)]) {
        if (Math.abs(value + sourceOffset - target) <= 5) result = target - sourceOffset;
      }
    }
  }
  return snap(result);
}

function clearLayout() {
  if (!confirm("Clear the current layout?")) return;
  pushHistory();
  state.items = [];
  state.selectedId = null;
  state.selectedIds = [];
  render();
}

function setMode(mode) {
  const code = mode === "code";
  els.designView.classList.toggle("hidden", code);
  els.codeView.classList.toggle("hidden", !code);
  els.designTab.classList.toggle("active", !code);
  els.codeTab.classList.toggle("active", code);
  if (code) {
    els.codePreview.textContent = generateProjectFiles()["src/ui_layout.cpp"];
  }
}

async function writeProjectDirectory() {
  const files = generateProjectFiles();
  if (!window.showDirectoryPicker) {
    setStatus("Directory writing is unavailable in this browser. Downloading zip instead.");
    await downloadZip();
    return;
  }
  try {
    const root = await window.showDirectoryPicker({ mode: "readwrite" });
    const folderName = safeName(state.projectName);
    const projectDir = await root.getDirectoryHandle(folderName, { create: true });
    for (const [path, content] of Object.entries(files)) {
      await writeFile(projectDir, path, content);
    }
    setStatus(`Wrote ${Object.keys(files).length} files to ${folderName}.`);
  } catch (error) {
    if (error.name !== "AbortError") setStatus(`Write failed: ${error.message}`);
  }
}

async function writeFile(root, path, content) {
  const parts = path.split("/");
  let dir = root;
  for (const part of parts.slice(0, -1)) {
    dir = await dir.getDirectoryHandle(part, { create: true });
  }
  const handle = await dir.getFileHandle(parts.at(-1), { create: true });
  const writable = await handle.createWritable();
  await writable.write(content);
  await writable.close();
}

async function downloadZip() {
  const files = generateProjectFiles();
  const zipBlob = makeZip(files);
  downloadBlob(zipBlob, `${safeName(state.projectName)}.zip`);
  setStatus("Downloaded generated project zip.");
}

function saveLayout() {
  downloadBlob(new Blob([JSON.stringify(toLayout(), null, 2)], { type: "application/json" }), `${safeName(state.projectName)}.layout.json`);
  setStatus("Saved layout JSON.");
}

async function loadLayout(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  try {
    const loaded = JSON.parse(await file.text());
    pushHistory();
    state.projectName = loaded.projectName || state.projectName;
    state.windowTitle = loaded.windowTitle || state.windowTitle;
    state.windowWidth = clamp(Number(loaded.windowWidth) || state.windowWidth, 320, 1600);
    state.windowHeight = clamp(Number(loaded.windowHeight) || state.windowHeight, 240, 1200);
    state.projectAuthor = loaded.projectAuthor || state.projectAuthor;
    state.projectVersion = loaded.projectVersion || state.projectVersion;
    state.projectBackend = loaded.projectBackend || state.projectBackend;
    state.activeThemePreset = loaded.activeThemePreset || state.activeThemePreset;
    state.snapSize = clamp(Number(loaded.snapSize) || state.snapSize, 1, 64);
    state.theme = normalizeTheme(loaded.theme || state.theme);
    state.flags = normalizeFlags(loaded.flags || state.flags);
    state.stylePresets = Array.isArray(loaded.stylePresets) ? loaded.stylePresets : [];
    state.items = Array.isArray(loaded.items) ? loaded.items.map((item) => ({ ...item, id: item.id || uid() })) : state.items;
    state.selectedId = null;
    state.selectedIds = [];
    render();
    setStatus("Loaded layout.");
  } catch (error) {
    setStatus(`Load failed: ${error.message}`);
  } finally {
    event.target.value = "";
  }
}

async function copyCode() {
  await navigator.clipboard.writeText(els.codePreview.textContent);
  setStatus("Copied code preview.");
}

function toLayout() {
  return {
    projectName: state.projectName,
    windowTitle: state.windowTitle,
    windowWidth: state.windowWidth,
    windowHeight: state.windowHeight,
    projectAuthor: state.projectAuthor,
    projectVersion: state.projectVersion,
    projectBackend: state.projectBackend,
    activeThemePreset: state.activeThemePreset,
    snapSize: state.snapSize,
    selectedId: state.selectedId,
    selectedIds: state.selectedIds,
    theme: state.theme,
    flags: state.flags,
    stylePresets: state.stylePresets,
    items: state.items
  };
}

function generateProjectFiles() {
  const projectName = safeName(state.projectName);
  const files = {
    "CMakeLists.txt": generateCMake(projectName),
    "README.md": generateReadme(projectName),
    "src/main.cpp": generateMainCpp(),
    "src/ui_layout.h": generateHeader(),
    "src/ui_layout.cpp": generateUiCpp(),
    "src/image_loader.h": generateImageLoaderHeader(),
    "src/image_loader.cpp": generateImageLoaderCpp(),
    "project.json": JSON.stringify(generateProjectManifest(projectName), null, 2),
    "layout.json": JSON.stringify(toLayout(), null, 2)
  };
  for (const item of imageItems()) {
    files[`assets/${imageAssetFile(item)}`] = dataUrlToBytes(item.imageDataUrl);
  }
  return files;
}

function generateCMake(projectName) {
  return `cmake_minimum_required(VERSION 3.20)
project(${projectName} LANGUAGES C CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

include(FetchContent)

FetchContent_Declare(
  glfw
  GIT_REPOSITORY https://github.com/glfw/glfw.git
  GIT_TAG 3.4
)
FetchContent_MakeAvailable(glfw)

FetchContent_Declare(
  stb
  GIT_REPOSITORY https://github.com/nothings/stb.git
  GIT_TAG master
)
FetchContent_MakeAvailable(stb)

FetchContent_Declare(
  imgui
  GIT_REPOSITORY https://github.com/ocornut/imgui.git
  GIT_TAG docking
)
FetchContent_MakeAvailable(imgui)

add_executable(${projectName}
  src/main.cpp
  src/ui_layout.cpp
  src/image_loader.cpp
  \${imgui_SOURCE_DIR}/imgui.cpp
  \${imgui_SOURCE_DIR}/imgui_demo.cpp
  \${imgui_SOURCE_DIR}/imgui_draw.cpp
  \${imgui_SOURCE_DIR}/imgui_tables.cpp
  \${imgui_SOURCE_DIR}/imgui_widgets.cpp
  \${imgui_SOURCE_DIR}/backends/imgui_impl_glfw.cpp
  \${imgui_SOURCE_DIR}/backends/imgui_impl_opengl3.cpp
)

target_include_directories(${projectName} PRIVATE
  \${imgui_SOURCE_DIR}
  \${imgui_SOURCE_DIR}/backends
  \${stb_SOURCE_DIR}
)

target_link_libraries(${projectName} PRIVATE glfw)

if (WIN32)
  target_link_libraries(${projectName} PRIVATE opengl32)
elseif (APPLE)
  find_library(OpenGL_LIBRARY OpenGL REQUIRED)
  target_link_libraries(${projectName} PRIVATE \${OpenGL_LIBRARY})
else()
  find_package(OpenGL REQUIRED)
  target_link_libraries(${projectName} PRIVATE OpenGL::GL)
endif()
`;
}

function generateMainCpp() {
  const clear = hexToRgb(state.theme.windowBg);
  return `#include "ui_layout.h"
#include "image_loader.h"

#include "imgui.h"
#include "backends/imgui_impl_glfw.h"
#include "backends/imgui_impl_opengl3.h"

#include <cstdio>

#if defined(IMGUI_IMPL_OPENGL_ES2)
#include <GLES2/gl2.h>
#endif
#include <GLFW/glfw3.h>

static void glfw_error_callback(int error, const char* description)
{
    std::fprintf(stderr, "GLFW Error %d: %s\\n", error, description);
}

int main(int, char**)
{
    glfwSetErrorCallback(glfw_error_callback);
    if (!glfwInit())
        return 1;

    const char* glsl_version = "#version 130";
    glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
    glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 0);

    GLFWwindow* window = glfwCreateWindow(${state.windowWidth}, ${state.windowHeight}, ${cppString(state.windowTitle)}, nullptr, nullptr);
    if (window == nullptr)
        return 1;
    glfwMakeContextCurrent(window);
    glfwSwapInterval(1);

    IMGUI_CHECKVERSION();
    ImGui::CreateContext();
    ImGuiIO& io = ImGui::GetIO();
    (void)io;
    io.ConfigFlags |= ImGuiConfigFlags_NavEnableKeyboard;

    ImGui::StyleColorsDark();

    ImGui_ImplGlfw_InitForOpenGL(window, true);
    ImGui_ImplOpenGL3_Init(glsl_version);
    LoadGeneratedImages();

    while (!glfwWindowShouldClose(window))
    {
        glfwPollEvents();

        ImGui_ImplOpenGL3_NewFrame();
        ImGui_ImplGlfw_NewFrame();
        ImGui::NewFrame();

        RenderGeneratedLayout();

        ImGui::Render();
        int display_w, display_h;
        glfwGetFramebufferSize(window, &display_w, &display_h);
        glViewport(0, 0, display_w, display_h);
        glClearColor(${(clear.r / 255).toFixed(3)}f, ${(clear.g / 255).toFixed(3)}f, ${(clear.b / 255).toFixed(3)}f, 1.00f);
        glClear(GL_COLOR_BUFFER_BIT);
        ImGui_ImplOpenGL3_RenderDrawData(ImGui::GetDrawData());

        glfwSwapBuffers(window);
    }

    DestroyGeneratedImages();
    ImGui_ImplOpenGL3_Shutdown();
    ImGui_ImplGlfw_Shutdown();
    ImGui::DestroyContext();

    glfwDestroyWindow(window);
    glfwTerminate();
    return 0;
}
`;
}

function generateHeader() {
  return `#pragma once

void RenderGeneratedLayout();
`;
}

function generateImageLoaderHeader() {
  return `#pragma once

#include "imgui.h"

bool LoadGeneratedImages();
void DestroyGeneratedImages();
ImTextureID GetGeneratedImageTexture(const char* id);
`;
}

function generateImageLoaderCpp() {
  const images = imageItems();
  const entries = images.map((item) => `    { ${cppString(item.id)}, ${cppString(`assets/${imageAssetFile(item)}`)}, 0, 0, 0 }`).join(",\n");
  const arrayDecl = images.length ? entries : "    { nullptr, nullptr, 0, 0, 0 }";
  return `#include "image_loader.h"

#include "backends/imgui_impl_opengl3_loader.h"

#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"

#include <cstdint>
#include <cstring>

struct GeneratedImage
{
    const char* id;
    const char* path;
    GLuint texture;
    int width;
    int height;
};

static GeneratedImage g_images[] = {
${arrayDecl}
};
static const int g_image_count = ${images.length};

static bool LoadTextureFromFile(const char* path, GLuint* texture, int* width, int* height)
{
    int channels = 0;
    unsigned char* data = stbi_load(path, width, height, &channels, 4);
    if (data == nullptr)
        return false;

    glGenTextures(1, texture);
    glBindTexture(GL_TEXTURE_2D, *texture);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_LINEAR);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S, GL_CLAMP_TO_EDGE);
    glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T, GL_CLAMP_TO_EDGE);
    glPixelStorei(GL_UNPACK_ROW_LENGTH, 0);
    glTexImage2D(GL_TEXTURE_2D, 0, GL_RGBA, *width, *height, 0, GL_RGBA, GL_UNSIGNED_BYTE, data);

    stbi_image_free(data);
    return true;
}

bool LoadGeneratedImages()
{
    bool ok = true;
    for (int i = 0; i < g_image_count; ++i)
    {
        ok = LoadTextureFromFile(g_images[i].path, &g_images[i].texture, &g_images[i].width, &g_images[i].height) && ok;
    }
    return ok;
}

void DestroyGeneratedImages()
{
    for (int i = 0; i < g_image_count; ++i)
    {
        if (g_images[i].texture != 0)
            glDeleteTextures(1, &g_images[i].texture);
        g_images[i].texture = 0;
    }
}

ImTextureID GetGeneratedImageTexture(const char* id)
{
    for (int i = 0; i < g_image_count; ++i)
    {
        if (std::strcmp(g_images[i].id, id) == 0 && g_images[i].texture != 0)
            return (ImTextureID)(intptr_t)g_images[i].texture;
    }
    return (ImTextureID)0;
}
`;
}

function generateUiCpp() {
  const declarations = [];
  const body = [];
  for (const item of state.items.filter((item) => item.visible !== false)) {
    const name = variableName(item);
    if (item.type === "checkbox") {
      declarations.push(`static bool ${name} = ${item.value ? "true" : "false"};`);
    } else if (item.type === "slider") {
      declarations.push(`static float ${name} = ${Number(item.value ?? 0).toFixed(3)}f;`);
    } else if (item.type === "input") {
      declarations.push(`static char ${name}[256] = ${cppString(item.value ?? "")};`);
    } else if (item.type === "combo") {
      declarations.push(`static int ${name} = 0;`);
      declarations.push(`static const char* ${name}_items[] = { ${optionList(item).map(cppString).join(", ") || "\"Option\""} };`);
    } else if (item.type === "color") {
      const rgb = hexToRgb(item.value || item.fill || "#4fb477");
      declarations.push(`static float ${name}[4] = { ${(rgb.r / 255).toFixed(3)}f, ${(rgb.g / 255).toFixed(3)}f, ${(rgb.b / 255).toFixed(3)}f, ${alphaOf(item).toFixed(3)}f };`);
    } else if (item.type === "tabs") {
      declarations.push(`static int ${name} = ${clamp(Number(item.activeTab || 0), 0, Math.max(0, optionList(item).length - 1))};`);
    }
  }

  for (const item of state.items.filter((item) => item.visible !== false)) {
    body.push(...cppForItem(item));
  }

  return `#include "ui_layout.h"
#include "image_loader.h"

#include "imgui.h"

#include <cmath>
#include <cstring>

${declarations.length ? declarations.join("\n") : "// No persistent widget state is required yet."}

static float GeneratedAnimationValue(const char* id, const char* type, const char* trigger, float speed_ms, float delay_ms)
{
    ImGuiID anim_id = ImGui::GetID(id);
    float time = (float)ImGui::GetTime() * 1000.0f - delay_ms + (float)(anim_id % 997);
    if (speed_ms <= 1.0f)
        speed_ms = 1.0f;
    float phase = std::fmod(time / speed_ms, 1.0f);
    bool hovered = ImGui::IsItemHovered();
    bool active = ImGui::IsItemActive();
    if ((std::strcmp(trigger, "hover") == 0 && !hovered) || (std::strcmp(trigger, "active") == 0 && !active))
        return 0.0f;
    if (std::strcmp(type, "pulse") == 0 || std::strcmp(type, "fade") == 0 || std::strcmp(type, "hoverGlow") == 0)
        return 0.5f + 0.5f * std::sin(phase * 6.2831853f);
    if (std::strcmp(type, "shake") == 0)
        return std::sin(phase * 18.8495559f);
    if (std::strcmp(type, "slideIn") == 0)
        return 1.0f - std::pow(1.0f - phase, 3.0f);
    if (std::strcmp(type, "hoverLift") == 0)
        return hovered ? 1.0f : 0.0f;
    return 0.0f;
}

void RenderGeneratedLayout()
{
${cppWindowStylePush().join("\n")}
    ImGui::SetNextWindowPos(ImVec2(0.0f, 0.0f), ImGuiCond_Once);
${cppWindowSizeLine()}
    ImGui::Begin(${cppString(state.windowTitle)}, nullptr, ${cppWindowFlags()});

${body.length ? body.join("\n") : "    ImGui::TextUnformatted(\"Add widgets in LurkedAccounts Imgui Customization Tool.\");"}

    ImGui::End();
    ImGui::PopStyleColor(5);
    ImGui::PopStyleVar(4);
}
`;
}

function cppForItem(item) {
  const anim = normalizeAnimation(item.animation);
  const pos = animatedPosition(item);
  const lines = [`    ImGui::SetCursorPos(ImVec2(${pos.x}, ${pos.y}));`];
  const label = cppString(item.label || item.type);
  const name = variableName(item);
  const style = cppStylePush(item);
  if (item.type === "text") {
    lines.push(...style.push);
    lines.push(`    ImGui::TextUnformatted(${label});`);
    lines.push(...style.pop);
  } else if (item.type === "button") {
    lines.push(...style.push);
    lines.push(`    ImGui::Button(${label}, ImVec2(${item.w}.0f, ${item.h}.0f));`);
    lines.push(...style.pop);
  } else if (item.type === "checkbox") {
    lines.push(...style.push);
    lines.push(`    ImGui::Checkbox(${label}, &${name});`);
    lines.push(...style.pop);
  } else if (item.type === "slider") {
    lines.push(...style.push);
    lines.push(`    ImGui::SetNextItemWidth(${item.w}.0f);`);
    lines.push(`    ImGui::SliderFloat(${label}, &${name}, ${Number(item.min ?? 0).toFixed(3)}f, ${Number(item.max ?? 1).toFixed(3)}f);`);
    lines.push(...style.pop);
  } else if (item.type === "input") {
    lines.push(...style.push);
    lines.push(`    ImGui::SetNextItemWidth(${item.w}.0f);`);
    lines.push(`    ImGui::InputText(${label}, ${name}, IM_ARRAYSIZE(${name}));`);
    lines.push(...style.pop);
  } else if (item.type === "combo") {
    lines.push(...style.push);
    lines.push(`    ImGui::SetNextItemWidth(${item.w}.0f);`);
    lines.push(`    ImGui::Combo(${label}, &${name}, ${name}_items, IM_ARRAYSIZE(${name}_items));`);
    lines.push(...style.pop);
  } else if (item.type === "progress") {
    lines.push(...style.push);
    lines.push(`    ImGui::ProgressBar(${clamp(Number(item.value ?? 0), 0, 1).toFixed(3)}f, ImVec2(${item.w}.0f, ${item.h}.0f), ${label});`);
    lines.push(...style.pop);
  } else if (item.type === "color") {
    lines.push(...style.push);
    lines.push(`    ImGui::SetNextItemWidth(${item.w}.0f);`);
    lines.push(`    ImGui::ColorEdit4(${label}, ${name});`);
    lines.push(...style.pop);
  } else if (item.type === "separator") {
    lines.push(`    ImGui::SetNextItemWidth(${item.w}.0f);`);
    lines.push("    ImGui::Separator();");
  } else if (item.type === "tabs") {
    const tabs = optionList(item);
    lines.push(...style.push);
    lines.push(`    ImGui::BeginChild(${label}, ImVec2(${item.w}.0f, ${item.h}.0f), true);`);
    lines.push(`    if (ImGui::BeginTabBar(${cppString(`GeneratedTabs_${name}`)}))`);
    lines.push("    {");
    tabs.forEach((tab, index) => {
      lines.push(`        if (ImGui::BeginTabItem(${cppString(tab)}))`);
      lines.push("        {");
      lines.push(`            ${name} = ${index};`);
      lines.push(`            ImGui::TextUnformatted(${cppString(`${tab} content`)});`);
      lines.push("            ImGui::EndTabItem();");
      lines.push("        }");
    });
    lines.push("        ImGui::EndTabBar();");
    lines.push("    }");
    lines.push("    ImGui::EndChild();");
    lines.push(...style.pop);
  } else if (item.type === "table") {
    const rows = clamp(Number(item.rows || 3), 1, 20);
    const cols = clamp(Number(item.cols || 3), 1, 8);
    lines.push(...style.push);
    lines.push(`    if (ImGui::BeginTable(${label}, ${cols}, ImGuiTableFlags_Borders | ImGuiTableFlags_RowBg, ImVec2(${item.w}.0f, ${item.h}.0f)))`);
    lines.push("    {");
    for (let col = 0; col < cols; col++) {
      lines.push(`        ImGui::TableSetupColumn(${cppString(`Column ${col + 1}`)});`);
    }
    lines.push("        ImGui::TableHeadersRow();");
    for (let row = 0; row < rows; row++) {
      lines.push("        ImGui::TableNextRow();");
      for (let col = 0; col < cols; col++) {
        lines.push(`        ImGui::TableSetColumnIndex(${col});`);
        lines.push(`        ImGui::TextUnformatted(${cppString(`R${row + 1} C${col + 1}`)});`);
      }
    }
    lines.push("        ImGui::EndTable();");
    lines.push("    }");
    lines.push(...style.pop);
  } else if (item.type === "box") {
    const minName = `p_min_${name}`;
    const maxName = `p_max_${name}`;
    lines.push(`    ImVec2 ${minName} = ImGui::GetCursorScreenPos();`);
    lines.push(`    ImVec2 ${maxName}(${minName}.x + ${item.w}.0f, ${minName}.y + ${item.h}.0f);`);
    lines.push(drawRectCode(item, minName, maxName));
    if (item.border) {
      lines.push(`    ImGui::GetWindowDrawList()->AddRect(${minName}, ${maxName}, ${cppColorU32(item.border, alphaOf(item))}, ${Number(item.radius ?? 0).toFixed(1)}f, 0, ${Number(item.borderWidth ?? 1).toFixed(1)}f);`);
    }
    lines.push("    ImGui::PushStyleColor(ImGuiCol_ChildBg, ImVec4(0.0f, 0.0f, 0.0f, 0.0f));");
    lines.push(`    ImGui::BeginChild(${label}, ImVec2(${item.w}.0f, ${item.h}.0f), false, ImGuiWindowFlags_NoScrollbar | ImGuiWindowFlags_NoScrollWithMouse);`);
    lines.push(`    ImGui::PushStyleColor(ImGuiCol_Text, ${cppColorVec(item.textColor || "#cfd5dc", alphaOf(item))});`);
    lines.push(`    ImGui::TextUnformatted(${label});`);
    lines.push("    ImGui::PopStyleColor();");
    lines.push("    ImGui::EndChild();");
    lines.push("    ImGui::PopStyleColor();");
  } else if (item.type === "image") {
    const minName = `p_min_${name}`;
    const maxName = `p_max_${name}`;
    lines.push(`    ImVec2 ${minName} = ImGui::GetCursorScreenPos();`);
    lines.push(`    ImVec2 ${maxName}(${minName}.x + ${item.w}.0f, ${minName}.y + ${item.h}.0f);`);
    if (item.imageDataUrl) {
      const uv = imageUv(item);
      lines.push(`    ImTextureID texture_${name} = GetGeneratedImageTexture(${cppString(item.id)});`);
      lines.push(`    if (texture_${name})`);
      lines.push(`        ImGui::GetWindowDrawList()->AddImageRounded(texture_${name}, ${minName}, ${maxName}, ImVec2(${uv.u0.toFixed(3)}f, ${uv.v0.toFixed(3)}f), ImVec2(${uv.u1.toFixed(3)}f, ${uv.v1.toFixed(3)}f), ${cppColorU32(item.tint || "#ffffff", alphaOf(item))}, ${Number(item.radius ?? 0).toFixed(1)}f);`);
      lines.push("    else");
      lines.push(`        ${drawRectCode(item, minName, maxName).trim()}`);
    } else {
      lines.push(drawRectCode(item, minName, maxName));
      lines.push(`    ImGui::GetWindowDrawList()->AddText(ImVec2(${minName}.x + 8.0f, ${minName}.y + 8.0f), ${cppColorU32(item.textColor || "#d6dde5", alphaOf(item))}, ${label});`);
    }
    if (item.border) {
      lines.push(`    ImGui::GetWindowDrawList()->AddRect(${minName}, ${maxName}, ${cppColorU32(item.border, alphaOf(item))}, ${Number(item.radius ?? 0).toFixed(1)}f, 0, ${Number(item.borderWidth ?? 1).toFixed(1)}f);`);
    }
    lines.push(`    ImGui::InvisibleButton(${label}, ImVec2(${item.w}.0f, ${item.h}.0f));`);
  }
  lines.push(...cppAnimationAfterItem(item, name, anim));
  return lines;
}

function animatedPosition(item) {
  const anim = normalizeAnimation(item.animation);
  if (anim.type === "slideIn") {
    const name = variableName(item);
    return {
      x: `${item.x}.0f - (1.0f - GeneratedAnimationValue(${cppString(`${name}_slide`)}, "slideIn", ${cppString(anim.trigger)}, ${anim.speed.toFixed(1)}f, ${anim.delay.toFixed(1)}f)) * ${Math.abs(anim.distance).toFixed(1)}f`,
      y: `${item.y}.0f`
    };
  }
  if (anim.type === "shake") {
    const name = variableName(item);
    return {
      x: `${item.x}.0f + GeneratedAnimationValue(${cppString(`${name}_shake`)}, "shake", ${cppString(anim.trigger)}, ${anim.speed.toFixed(1)}f, ${anim.delay.toFixed(1)}f) * ${Math.abs(anim.distance).toFixed(1)}f`,
      y: `${item.y}.0f`
    };
  }
  if (anim.type === "hoverLift") {
    const name = variableName(item);
    return {
      x: `${item.x}.0f`,
      y: `${item.y}.0f + GeneratedAnimationValue(${cppString(`${name}_lift`)}, "hoverLift", ${cppString(anim.trigger)}, ${anim.speed.toFixed(1)}f, ${anim.delay.toFixed(1)}f) * ${anim.distance.toFixed(1)}f`
    };
  }
  return { x: `${item.x}.0f`, y: `${item.y}.0f` };
}

function cppAnimationAfterItem(item, name, anim) {
  if (!anim || anim.type === "none") return [];
  const lines = [];
  const alpha = clamp(Number(anim.intensity), 0, 100) / 100;
  if (anim.type === "hoverGlow" || anim.type === "pulse") {
    lines.push(`    if (ImGui::IsItemHovered() || std::strcmp(${cppString(anim.trigger)}, "always") == 0)`);
    lines.push("    {");
    lines.push(`        float anim_${name} = GeneratedAnimationValue(${cppString(`${name}_glow`)}, ${cppString(anim.type)}, ${cppString(anim.trigger)}, ${anim.speed.toFixed(1)}f, ${anim.delay.toFixed(1)}f);`);
    lines.push("        ImVec2 min = ImGui::GetItemRectMin();");
    lines.push("        ImVec2 max = ImGui::GetItemRectMax();");
    lines.push(`        ImGui::GetWindowDrawList()->AddRect(min, max, IM_COL32(98, 211, 141, (int)(anim_${name} * ${Math.round(180 * alpha)})), ${Number(item.radius ?? 0).toFixed(1)}f, 0, 2.0f);`);
    lines.push("    }");
  }
  if (anim.type === "fade") {
    lines.push(`    // Fade animation is represented in generated code through style alpha where practical; interactive widgets keep full input opacity.`);
  }
  return lines;
}

function cppStylePush(item) {
  const push = [];
  const pop = [];
  let colors = 0;
  let vars = 0;
  const alpha = alphaOf(item);
  const fontScale = Number(item.fontSize ?? 14) / 14;
  if (Math.abs(fontScale - 1) > 0.01 && !["box", "image"].includes(item.type)) {
    push.push(`    ImGui::SetWindowFontScale(${fontScale.toFixed(3)}f);`);
    pop.push("    ImGui::SetWindowFontScale(1.0f);");
  }
  if (alpha < 1) {
    push.push(`    ImGui::PushStyleVar(ImGuiStyleVar_Alpha, ${alpha.toFixed(3)}f);`);
    vars++;
  }
  if (Number(item.radius ?? 0) > 0 && ["button", "slider", "input", "combo", "color", "progress"].includes(item.type)) {
    push.push(`    ImGui::PushStyleVar(ImGuiStyleVar_FrameRounding, ${Number(item.radius).toFixed(1)}f);`);
    vars++;
  }
  if (item.textColor) {
    push.push(`    ImGui::PushStyleColor(ImGuiCol_Text, ${cppColorVec(item.textColor, alpha)});`);
    colors++;
  }
  if (item.fill && ["button", "slider", "input", "combo", "color"].includes(item.type)) {
    const fill = cppColorVec(item.fill, alpha);
    push.push(`    ImGui::PushStyleColor(ImGuiCol_FrameBg, ${fill});`);
    push.push(`    ImGui::PushStyleColor(ImGuiCol_Button, ${fill});`);
    colors += 2;
  }
  if (item.type === "progress" && item.fill2) {
    push.push(`    ImGui::PushStyleColor(ImGuiCol_PlotHistogram, ${cppColorVec(item.fill2, alpha)});`);
    colors++;
  }
  if (item.border && ["button", "slider", "input", "combo", "color", "progress"].includes(item.type)) {
    push.push(`    ImGui::PushStyleVar(ImGuiStyleVar_FrameBorderSize, ${Number(item.borderWidth ?? 1).toFixed(1)}f);`);
    push.push(`    ImGui::PushStyleColor(ImGuiCol_Border, ${cppColorVec(item.border, alpha)});`);
    vars++;
    colors++;
  }
  if (colors) pop.push(`    ImGui::PopStyleColor(${colors});`);
  if (vars) pop.push(`    ImGui::PopStyleVar(${vars});`);
  return { push, pop };
}

function cppWindowStylePush() {
  const colorAlpha = clamp(Number(state.theme.windowOpacity ?? 100), 0, 100) / 100;
  const styleAlpha = state.theme.glassEffect ? 1 : colorAlpha;
  return [
    `    ImGui::PushStyleVar(ImGuiStyleVar_WindowRounding, ${Number(state.theme.windowRadius || 0).toFixed(1)}f);`,
    `    ImGui::PushStyleVar(ImGuiStyleVar_WindowBorderSize, 1.0f);`,
    `    ImGui::PushStyleVar(ImGuiStyleVar_WindowPadding, ImVec2(${Number(state.theme.paddingX || 0).toFixed(1)}f, ${Number(state.theme.paddingY || 0).toFixed(1)}f));`,
    `    ImGui::PushStyleVar(ImGuiStyleVar_Alpha, ${styleAlpha.toFixed(3)}f);`,
    `    ImGui::PushStyleColor(ImGuiCol_WindowBg, ${cppColorVec(state.theme.windowBg, colorAlpha)});`,
    `    ImGui::PushStyleColor(ImGuiCol_TitleBg, ${cppColorVec(state.theme.titleBg, colorAlpha)});`,
    `    ImGui::PushStyleColor(ImGuiCol_TitleBgActive, ${cppColorVec(state.theme.titleBg, colorAlpha)});`,
    `    ImGui::PushStyleColor(ImGuiCol_Border, ${cppColorVec(state.theme.windowBorder, Math.max(colorAlpha, .65))});`,
    `    ImGui::PushStyleColor(ImGuiCol_Text, ${cppColorVec(state.theme.titleText, 1)});`
  ];
}

function cppWindowFlags() {
  const flags = [];
  if (state.flags.noTitleBar) flags.push("ImGuiWindowFlags_NoTitleBar");
  if (state.flags.noResize) flags.push("ImGuiWindowFlags_NoResize");
  if (state.flags.noScrollbar) flags.push("ImGuiWindowFlags_NoScrollbar");
  if (state.flags.alwaysAutoResize) flags.push("ImGuiWindowFlags_AlwaysAutoResize");
  return flags.length ? flags.join(" | ") : "0";
}

function cppWindowSizeLine() {
  if (state.flags.alwaysAutoResize) {
    return "    // AlwaysAutoResize controls the generated window size.";
  }
  return `    ImGui::SetNextWindowSize(ImVec2(${state.windowWidth}.0f, ${Math.max(120, state.windowHeight - 20)}.0f), ImGuiCond_Once);`;
}

function drawRectCode(item, minName, maxName) {
  const alpha = alphaOf(item);
  const fill = item.fill || "#20262d";
  const fill2 = item.fill2 || fill;
  const radius = Number(item.radius ?? 0).toFixed(1);
  if (item.gradient) {
    return drawGradientRectCode(item, minName, maxName, fill, fill2, alpha);
  }
  return `    ImGui::GetWindowDrawList()->AddRectFilled(${minName}, ${maxName}, ${cppColorU32(fill, alpha)}, ${radius}f);`;
}

function drawGradientRectCode(item, minName, maxName, fill, fill2, alpha) {
  const c1 = cppColorU32(fill, alpha);
  const c2 = cppColorU32(fill2, alpha);
  if (item.gradientDir === "horizontal") {
    return `    ImGui::GetWindowDrawList()->AddRectFilledMultiColor(${minName}, ${maxName}, ${c1}, ${c2}, ${c2}, ${c1});`;
  }
  if (item.gradientDir === "diagonal") {
    return `    ImGui::GetWindowDrawList()->AddRectFilledMultiColor(${minName}, ${maxName}, ${c1}, ${c2}, ${c1}, ${c2});`;
  }
  return `    ImGui::GetWindowDrawList()->AddRectFilledMultiColor(${minName}, ${maxName}, ${c1}, ${c1}, ${c2}, ${c2});`;
}

function generateReadme(projectName) {
  return `# ${projectName}

Generated by LurkedAccounts Imgui Customization Tool.

Author: ${state.projectAuthor}
Version: ${state.projectVersion}
Backend target: ${backendLabel(state.projectBackend)}

## Build

\`\`\`powershell
cmake -S . -B build
cmake --build build --config Release
.\build\\Release\\${projectName}.exe
\`\`\`

On non-Windows platforms, run the executable from the generated build directory. CMake fetches GLFW and Dear ImGui during configure.

The original visual layout is stored in \`layout.json\`. Project metadata is stored in \`project.json\`.
`;
}

function generateProjectManifest(projectName) {
  return {
    name: projectName,
    title: state.windowTitle,
    author: state.projectAuthor,
    version: state.projectVersion,
    backend: state.projectBackend,
    generatedBy: "LurkedAccounts Imgui Customization Tool",
    flags: state.flags
  };
}

function backendLabel(value) {
  if (value === "win32-dx11") return "Win32 DX11 scaffold";
  if (value === "sdl-opengl") return "SDL OpenGL scaffold";
  return "GLFW OpenGL";
}

function variableName(item) {
  const clean = (item.label || item.type).toLowerCase().replace(/[^a-z0-9]+/g, "_").replace(/^_+|_+$/g, "") || item.type;
  return `${clean}_${item.id.replace(/[^a-z0-9]/gi, "")}`;
}

function imageItems() {
  return state.items.filter((item) => item.type === "image" && item.imageDataUrl);
}

function imageAssetFile(item) {
  return `${item.id}_${safeAssetName(item.imageName || `${item.label || "image"}.png`)}`;
}

function alphaOf(item) {
  return clamp(Number(item.opacity ?? 100), 0, 100) / 100;
}

function hexToRgb(hex) {
  const clean = String(hex || "#ffffff").replace("#", "");
  const full = clean.length === 3 ? clean.split("").map((part) => part + part).join("") : clean.padEnd(6, "f").slice(0, 6);
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16)
  };
}

function cppColorVec(hex, alpha = 1) {
  const { r, g, b } = hexToRgb(hex);
  return `ImVec4(${(r / 255).toFixed(3)}f, ${(g / 255).toFixed(3)}f, ${(b / 255).toFixed(3)}f, ${alpha.toFixed(3)}f)`;
}

function cppColorU32(hex, alpha = 1) {
  const { r, g, b } = hexToRgb(hex);
  return `IM_COL32(${r}, ${g}, ${b}, ${Math.round(alpha * 255)})`;
}

function cppString(value) {
  return `"${String(value).replace(/\\/g, "\\\\").replace(/"/g, "\\\"").replace(/\n/g, "\\n")}"`;
}

function safeName(value) {
  return (value || "GeneratedImGuiApp").replace(/[^A-Za-z0-9_.-]/g, "_").replace(/^_+/, "") || "GeneratedImGuiApp";
}

function safeAssetName(value) {
  const fallback = `image_${uid()}.png`;
  const clean = (value || fallback).replace(/[^A-Za-z0-9_.-]/g, "_").replace(/^_+/, "");
  return clean || fallback;
}

function snap(value) {
  const size = clamp(Number(state.snapSize) || 8, 1, 64);
  return state.grid ? Math.round(value / size) * size : Math.round(value);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function setStatus(message) {
  els.status.textContent = message;
}

function isEditingText() {
  return ["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName);
}

function pushHistory() {
  if (suppressHistory) return;
  const snapshot = JSON.stringify(toLayout());
  if (undoStack[undoStack.length - 1] === snapshot) return;
  undoStack.push(snapshot);
  if (undoStack.length > 80) undoStack.shift();
  redoStack.length = 0;
}

function undo() {
  if (!undoStack.length) return;
  const current = JSON.stringify(toLayout());
  const previous = undoStack.pop();
  redoStack.push(current);
  restoreLayout(JSON.parse(previous));
}

function redo() {
  if (!redoStack.length) return;
  const current = JSON.stringify(toLayout());
  const next = redoStack.pop();
  undoStack.push(current);
  restoreLayout(JSON.parse(next));
}

function restoreLayout(layout) {
  suppressHistory = true;
  state.projectName = layout.projectName || state.projectName;
  state.windowTitle = layout.windowTitle || state.windowTitle;
  state.windowWidth = clamp(Number(layout.windowWidth) || state.windowWidth, 320, 1600);
  state.windowHeight = clamp(Number(layout.windowHeight) || state.windowHeight, 240, 1200);
  state.projectAuthor = layout.projectAuthor || state.projectAuthor;
  state.projectVersion = layout.projectVersion || state.projectVersion;
  state.projectBackend = layout.projectBackend || state.projectBackend;
  state.activeThemePreset = layout.activeThemePreset || state.activeThemePreset;
  state.snapSize = clamp(Number(layout.snapSize) || state.snapSize, 1, 64);
  state.theme = normalizeTheme(layout.theme || state.theme);
  state.flags = normalizeFlags(layout.flags || state.flags);
  state.stylePresets = Array.isArray(layout.stylePresets) ? layout.stylePresets : [];
  state.items = Array.isArray(layout.items) ? layout.items.map((item) => ({ ...item, id: item.id || uid() })) : [];
  state.selectedId = layout.selectedId || null;
  state.selectedIds = Array.isArray(layout.selectedIds) ? layout.selectedIds : (state.selectedId ? [state.selectedId] : []);
  suppressHistory = false;
  render();
}

function normalizeTheme(theme) {
  return {
    windowBg: theme.windowBg || "#2b3038",
    titleBg: theme.titleBg || "#20242a",
    titleText: theme.titleText || "#f4f5f6",
    windowBorder: theme.windowBorder || "#111316",
    windowRadius: clamp(Number(theme.windowRadius) || 0, 0, 40),
    windowOpacity: clamp(Number(theme.windowOpacity ?? 100), 0, 100),
    paddingX: clamp(Number(theme.paddingX) || 0, 0, 80),
    paddingY: clamp(Number(theme.paddingY) || 0, 0, 80),
    glassEffect: !!theme.glassEffect
  };
}

function normalizeFlags(flags) {
  return {
    noTitleBar: !!flags.noTitleBar,
    noResize: !!flags.noResize,
    noScrollbar: !!flags.noScrollbar,
    alwaysAutoResize: !!flags.alwaysAutoResize
  };
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("Could not read file."));
    reader.readAsDataURL(file);
  });
}

function dataUrlToBytes(dataUrl) {
  const base64 = String(dataUrl).split(",")[1] || "";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function escapeHtml(value) {
  const div = document.createElement("div");
  div.textContent = value;
  return div.innerHTML;
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
}

function makeZip(files) {
  const encoder = new TextEncoder();
  const chunks = [];
  const central = [];
  let offset = 0;
  for (const [name, content] of Object.entries(files)) {
    const nameBytes = encoder.encode(name);
    const data = content instanceof Uint8Array ? content : encoder.encode(String(content));
    const crc = crc32(data);
    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(6, 0, true);
    local.setUint16(8, 0, true);
    local.setUint16(10, 0, true);
    local.setUint16(12, 0, true);
    local.setUint32(14, crc, true);
    local.setUint32(18, data.length, true);
    local.setUint32(22, data.length, true);
    local.setUint16(26, nameBytes.length, true);
    local.setUint16(28, 0, true);
    chunks.push(local, nameBytes, data);

    const header = new DataView(new ArrayBuffer(46));
    header.setUint32(0, 0x02014b50, true);
    header.setUint16(4, 20, true);
    header.setUint16(6, 20, true);
    header.setUint16(8, 0, true);
    header.setUint16(10, 0, true);
    header.setUint16(12, 0, true);
    header.setUint16(14, 0, true);
    header.setUint32(16, crc, true);
    header.setUint32(20, data.length, true);
    header.setUint32(24, data.length, true);
    header.setUint16(28, nameBytes.length, true);
    header.setUint16(30, 0, true);
    header.setUint16(32, 0, true);
    header.setUint16(34, 0, true);
    header.setUint16(36, 0, true);
    header.setUint32(38, 0, true);
    header.setUint32(42, offset, true);
    central.push(header, nameBytes);
    offset += 30 + nameBytes.length + data.length;
  }

  const centralOffset = offset;
  const centralSize = central.reduce((sum, part) => sum + part.byteLength, 0);
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, Object.keys(files).length, true);
  end.setUint16(10, Object.keys(files).length, true);
  end.setUint32(12, centralSize, true);
  end.setUint32(16, centralOffset, true);
  chunks.push(...central, end);
  return new Blob(chunks, { type: "application/zip" });
}

const crcTable = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}


// made by qrs at LurkedAccounts
// https://discord.gg/BHA8AVe4E2
