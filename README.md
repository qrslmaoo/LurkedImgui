# LurkedAccounts Imgui Customization Tool

A local browser app for sketching a Dear ImGui window visually and generating a CMake-based C++ project from it.

Open `index.html` in a Chromium-based browser. Use **Write Project Directory** to choose a folder and create the generated project there. If the browser does not support directory writes, use **Download Zip**.

The editor supports click-to-place widgets, multi-select, group dragging, drag/resize, undo/redo, arrow-key nudging, configurable snap size, smart snap guides, stacking controls, layers, validation, property search, alignment tools, theme presets, style presets, animation presets, project metadata, ImGui window flags, window/theme styling, rounded corners, fills, borders, border width, opacity, font size, alignment, gradient direction, visibility, locking, image fit, image tint/crop/zoom, and image selection.

Animation presets include hover lift, hover glow, pulse, slide in, shake, and fade. Each selected widget can customize animation trigger, speed, distance, intensity, and delay.

Supported widgets include text, buttons, checkboxes, sliders, inputs, boxes, images, combo boxes, progress bars, color editors, separators, tabs, and tables. Selected images are exported into the generated project's `assets/` folder and loaded as OpenGL textures.

Generated projects contain:

- `CMakeLists.txt`
- `src/main.cpp`
- `src/ui_layout.h`
- `src/ui_layout.cpp`
- `src/image_loader.h`
- `src/image_loader.cpp`
- `project.json`
- `layout.json`
- `assets/` when image widgets are used

The generated CMake project fetches Dear ImGui, GLFW, and stb during configure.
