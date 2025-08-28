// const NEW_CLASS_PREFIX = "box-shadow-preset-";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// const shadowPresets: Record<string, string> = {
//     Soft: "0px 4px 10px rgba(0, 0, 0, 0.15)",
//     Medium: "0px 6px 20px rgba(0, 0, 0, 0.25)",
//     Strong: "0px 10px 30px rgba(0, 0, 0, 0.35)",
//     Inner: "inset 0px 4px 10px rgba(0, 0, 0, 0.2)",
//     Glowing: "0px 0px 12px rgba(0, 150, 255, 0.6)",
//     Float: "0px 8px 25px rgba(0, 0, 0, 0.12)",
//     Hover: "0px 12px 30px rgba(0, 0, 0, 0.18)"
// };
// function sleep(ms: number): Promise<void> {
//     return new Promise((r) => setTimeout(r, ms));
// }
// async function waitForWebflow(timeout = 5000, interval = 200): Promise<any | null> {
//     const start = Date.now();
//     while (Date.now() - start < timeout) {
//         const wf = (window as any).webflow;
//         if (wf) {
//             console.log("[box-shadow] webflow API found");
//             return wf;
//         }
//         await sleep(interval);
//     }
//     console.warn("[box-shadow] webflow API not found after wait");
//     return null;
// }
// async function getSelectedElement(): Promise<any | null> {
//     const wf = (window as any).webflow;
//     if (!wf) return null;
//     try {
//         if (typeof wf.getSelectedElement === "function") {
//             const el = await wf.getSelectedElement();
//             if (el) return el;
//         }
//     } catch (e) {
//         console.warn("[box-shadow] getSelectedElement failed", e);
//     }
//     try {
//         if (typeof wf.getSelectedElements === "function") {
//             const arr = await wf.getSelectedElements();
//             if (Array.isArray(arr) && arr.length) return arr[0];
//         }
//     } catch (e) {
//         console.warn("[box-shadow] getSelectedElements failed", e);
//     }
//     try {
//         if (wf.selection && typeof wf.selection.getSelected === "function") {
//             const arr = wf.selection.getSelected();
//             if (Array.isArray(arr) && arr.length) return arr[0];
//         }
//     } catch {
//         // ignore
//     }
//     return null;
// }
// /**
//  * Applies a box-shadow value to the selected element.
//  */
// async function applyShadowToElement(el: any, shadowValue: string): Promise<boolean> {
//     const wf = (window as any).webflow;
//     if (!wf) {
//         flashMessage("Error: Webflow API not available.", "error");
//         return false;
//     }
//     try {
//         // Try to apply shadow to the element's main class first.
//         const styles = await el.getStyles();
//         if (styles && styles.length > 0) {
//             const primaryStyle = styles[0];
//             if (primaryStyle && typeof primaryStyle.setProperties === 'function') {
//                 await primaryStyle.setProperties({ "box-shadow": shadowValue });
//                 const primaryStyleName = await primaryStyle.getName();
//                 flashMessage(`Shadow applied to "${primaryStyleName}" class!`, "success");
//                 return true;
//             }
//         }
//     } catch (err) {
//         console.warn("[box-shadow] Failed to apply to primary class, trying fallback.", err);
//     }
//     try {
//         // Fallback: Create a new class.
//         if (typeof wf.createStyle === "function" && typeof el.setStyles === "function") {
//             const newClassName = NEW_CLASS_PREFIX + Date.now();
//             const newStyle = await wf.createStyle(newClassName);
//             await newStyle.setProperties({ "box-shadow": shadowValue });
//             const currentStyles = (await el.getStyles()) || [];
//             const nextStyles = [...currentStyles, newStyle];
//             await el.setStyles(nextStyles);
//             flashMessage(`Shadow applied to a new class!`, "success");
//             return true;
//         }
//     } catch (err) {
//         console.warn("[box-shadow] Failed to create new class, trying fallback.", err);
//     }
//     try {
//         // Last resort: Apply as an inline style.
//         if (typeof el.setStyle === 'function') {
//             await el.setStyle('box-shadow', shadowValue);
//             flashMessage("Shadow applied as inline style!", "success");
//             return true;
//         }
//     } catch (err) {
//         console.error("[box-shadow] Failed to apply as inline style.", err);
//     }
//     // If all methods fail.
//     flashMessage("Error: Could not apply shadow to the element.", "error");
//     return false;
// }
// /**
//  * Clears the box-shadow value from the selected element.
//  */
// async function clearShadowFromElement(): Promise<void> {
//     const el = await getSelectedElement();
//     if (!el) {
//         flashMessage("Please select an element first.", "error");
//         return;
//     }
//     // First, try to remove the inline style.
//     try {
//         if (typeof el.removeProperty === 'function') {
//             await el.removeProperty('box-shadow');
//         }
//     } catch (err) {
//         console.warn("[box-shadow] Could not remove inline style.", err);
//     }
//     // Then, try to set the box-shadow property to none on the main class.
//     try {
//         const styles = await el.getStyles();
//         if (styles && styles.length > 0) {
//             const primaryStyle = styles[0];
//             if (primaryStyle && typeof primaryStyle.setProperties === 'function') {
//                 await primaryStyle.setProperties({ "box-shadow": "none" });
//                 flashMessage("Shadow removed!", "success");
//                 return;
//             }
//         }
//     } catch (err) {
//         console.warn("[box-shadow] Could not clear shadow from primary class.", err);
//     }
//     flashMessage("Shadow removed!", "success");
// }
// function showInitialState(): void {
//     const app = document.getElementById("app");
//     if (!app) return;
//     app.innerHTML = `
//         <div class="state no-element">
//             <div class="no-element-icon">✋</div>
//             <p class="no-element-title">Select an Element</p>
//             <p class="no-element-description">Please select an element in Webflow Designer to apply shadow effects</p>
//         </div>
//     `;
// }
// function showSelectedElementState(elementName: string): void {
//     const app = document.getElementById("app");
//     if (!app) return;
//     let presetsHtml = `
//         <div class="selected-element">
//             <span>Selected: </span>
//             <span class="element-name">${escapeHtml(elementName)}</span>
//         </div>
//         <div class="presets-grid" id="presets">
//     `;
//     for (const k in shadowPresets) {
//         if (Object.prototype.hasOwnProperty.call(shadowPresets, k)) {
//             const v = shadowPresets[k];
//             presetsHtml += `
//                 <div class="preset-card" data-key="${k}">
//                     <div class="shadow-preview" style="box-shadow: ${v};"></div>
//                     <div class="preset-name">${escapeHtml(k)}</div>
//                 </div>
//             `;
//         }
//     }
//     presetsHtml += `</div>
//         <button id="clear-shadow-btn" class="clear-btn">Clear Shadow</button>
//     `;
//     app.innerHTML = presetsHtml;
//     const container = document.getElementById("presets");
//     if (!container) return;
//     container.querySelectorAll(".preset-card").forEach((card) => {
//         card.addEventListener("click", async () => {
//             const key = (card as HTMLElement).getAttribute("data-key") || "";
//             const shadowValue = shadowPresets[key];
//             if (!shadowValue) return;
//             container.querySelectorAll(".preset-card").forEach((c) => c.classList.remove("active"));
//             (card as HTMLElement).classList.add("active");
//             const el = await getSelectedElement();
//             if (!el) {
//                 showInitialState();
//                 return;
//             }
//             await applyShadowToElement(el, shadowValue);
//         });
//     });
//     // Add event listener for the new "Clear Shadow" button
//     const clearBtn = document.getElementById("clear-shadow-btn");
//     if (clearBtn) {
//         clearBtn.addEventListener("click", clearShadowFromElement);
//     }
// }
// function flashMessage(text: string, type: "success" | "error" = "success"): void {
//     const app = document.getElementById("app");
//     if (!app) return;
//     const existingMsg = document.getElementById("bs-msg");
//     if (existingMsg) existingMsg.remove();
//     const msg = document.createElement("div");
//     msg.id = "bs-msg";
//     msg.className = `message ${type}`;
//     msg.textContent = text;
//     app.appendChild(msg);
//     setTimeout(() => {
//         if (msg.parentNode) {
//             msg.style.opacity = '0';
//             setTimeout(() => msg.remove(), 300);
//         }
//     }, 3000);
// }
// function escapeHtml(s: string): string {
//     return String(s).replace(/[&<>"']/g, (m) => ({ 
//         '&': '&amp;', 
//         '<': '&lt;', 
//         '>': '&gt;', 
//         '"': '&quot;', 
//         "'": '&#39;' 
//     }[m] as string));
// }
// async function updateUIBasedOnSelection(): Promise<void> {
//     try {
//         const el = await getSelectedElement();
//         if (!el) {
//             showInitialState();
//             return;
//         }
//         const elName = (el && (el.name || el.displayName || el.type || el.id)) || "Selected element";
//         showSelectedElementState(elName);
//     } catch (err) {
//         console.error("[box-shadow] UI update error", err);
//         showInitialState();
//     }
// }
// async function initApp(): Promise<void> {
//     const wf = await waitForWebflow(6000, 200);
//     if (!wf) {
//         showInitialState();
//         console.warn("[box-shadow] Webflow API not available — are you running inside Designer?");
//         return;
//     }
//     try {
//         if (typeof wf.on === 'function') {
//             try { wf.on('ready', updateUIBasedOnSelection); } catch { /* ignore */ }
//             try { wf.on('selectionchange', updateUIBasedOnSelection); } catch { /* ignore */ }
//         }
//     } catch { /* ignore */ }
//     const start = Date.now();
//     const maxPoll = 3000;
//     while (Date.now() - start < maxPoll) {
//         const el = await getSelectedElement();
//         if (el) break;
//         await sleep(200);
//     }
//     await updateUIBasedOnSelection();
//     setInterval(() => updateUIBasedOnSelection().catch((e) => console.error(e)), 1500);
// }
// document.addEventListener("DOMContentLoaded", () => { initApp(); });
// // 
// // Get the elements and check if they exist
// const distanceSlider = document.getElementById('distance-slider') as HTMLInputElement;
// const intensitySlider = document.getElementById('intensity-slider') as HTMLInputElement;
// const sharpnessSlider = document.getElementById('sharpness-slider') as HTMLInputElement;
// const colorPicker = document.getElementById('color-picker') as HTMLInputElement;
// const previewBox = document.getElementById('live-preview-box') as HTMLElement;
// const applyBtn = document.getElementById('apply-custom-btn') as HTMLElement;
// // A single function to update the preview shadow
// function updatePreview(): void {
//     // Check if any of the elements are null before continuing
//     if (!distanceSlider || !intensitySlider || !sharpnessSlider || !colorPicker || !previewBox) {
//         console.warn("One or more required elements not found. Cannot update preview.");
//         return;
//     }
//     const distance = Number(distanceSlider.value);
//     const intensity = Number(intensitySlider.value) / 100;
//     const sharpness = 100 - Number(sharpnessSlider.value);
//     // Ensure color value is a string and handle possible null
//     const color = colorPicker.value || "#000000";
//     const blur = sharpness / 2;
//     const spread = 0; 
//     // We need a helper to convert hex to RGBA
//     const hexToRgb = (hex: string) => {
//         const r = parseInt(hex.slice(1, 3), 16);
//         const g = parseInt(hex.slice(3, 5), 16);
//         const b = parseInt(hex.slice(5, 7), 16);
//         return `${r}, ${g}, ${b}`;
//     };
//     const rgbaColor = `rgba(${hexToRgb(color)}, ${intensity})`;
//     const shadowValue = `${distance}px ${distance}px ${blur}px ${spread}px ${rgbaColor}`;
//     previewBox.style.boxShadow = shadowValue;
// }
// // Add event listeners to the controls only if they exist
// if (distanceSlider) distanceSlider.addEventListener('input', updatePreview);
// if (intensitySlider) intensitySlider.addEventListener('input', updatePreview);
// if (sharpnessSlider) sharpnessSlider.addEventListener('input', updatePreview);
// if (colorPicker) colorPicker.addEventListener('input', updatePreview);
// // Add listener to the Apply button
// if (applyBtn) {
//     applyBtn.addEventListener('click', async () => {
//         const el = await getSelectedElement();
//         if (el) {
//             // Use the current box-shadow from the preview box
//             await applyShadowToElement(el, previewBox.style.boxShadow);
//         } else {
//             flashMessage("Please select an element first.", "error");
//         }
//     });
// }
// Constants for class prefixes and shadow definitions
const NEW_CLASS_PREFIX = "box-shadow-preset-";
const shadowPresets = {
    Soft: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    Medium: "0px 6px 20px rgba(0, 0, 0, 0.25)",
    Strong: "0px 10px 30px rgba(0, 0, 0, 0.35)",
    Inner: "inset 0px 4px 10px rgba(0, 0, 0, 0.2)",
    Glowing: "0px 0px 12px rgba(0, 150, 255, 0.6)",
    Float: "0px 8px 25px rgba(0, 0, 0, 0.12)",
    Hover: "0px 12px 30px rgba(0, 0, 0, 0.18)"
};
/**
 * Utility function to pause execution for a given number of milliseconds.
 * @param ms - The number of milliseconds to sleep.
 * @returns A Promise that resolves after the specified time.
 */
function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
}
/**
 * Waits for the Webflow API to become available within a timeout period.
 * @param timeout - Maximum time to wait in milliseconds.
 * @param interval - Interval between checks in milliseconds.
 * @returns The Webflow API object if found, otherwise null.
 */
function waitForWebflow() {
    return __awaiter(this, arguments, void 0, function* (timeout = 5000, interval = 200) {
        const start = Date.now();
        while (Date.now() - start < timeout) {
            const wf = window.webflow;
            if (wf) {
                console.log("[box-shadow] webflow API found");
                return wf;
            }
            yield sleep(interval);
        }
        console.warn("[box-shadow] webflow API not found after wait");
        return null;
    });
}
/**
 * Attempts to get the currently selected element in the Webflow Designer.
 * It tries multiple methods as the Webflow API might change or have different ways to access selection.
 * @returns The selected element object or null if none is found.
 */
function getSelectedElement() {
    return __awaiter(this, void 0, void 0, function* () {
        const wf = window.webflow;
        if (!wf)
            return null;
        try {
            if (typeof wf.getSelectedElement === "function") {
                const el = yield wf.getSelectedElement();
                if (el)
                    return el;
            }
        }
        catch (e) {
            console.warn("[box-shadow] getSelectedElement failed", e);
        }
        try {
            if (typeof wf.getSelectedElements === "function") {
                const arr = yield wf.getSelectedElements();
                if (Array.isArray(arr) && arr.length)
                    return arr[0];
            }
        }
        catch (e) {
            console.warn("[box-shadow] getSelectedElements failed", e);
        }
        try {
            if (wf.selection && typeof wf.selection.getSelected === "function") {
                const arr = wf.selection.getSelected();
                if (Array.isArray(arr) && arr.length)
                    return arr[0];
            }
        }
        catch (_a) {
            // ignore
        }
        return null;
    });
}
/**
 * Applies a box-shadow value to the selected element in Webflow.
 * It tries to apply the style by modifying an existing class, creating a new class, or as an inline style.
 * @param el - The selected Webflow element.
 * @param shadowValue - The CSS box-shadow string to apply.
 * @returns True if the style was applied successfully, false otherwise.
 */
function applyShadowToElement(el, shadowValue) {
    return __awaiter(this, void 0, void 0, function* () {
        const wf = window.webflow;
        if (!wf) {
            flashMessage("Error: Webflow API not available.", "error");
            return false;
        }
        try {
            // 1. Try modifying existing class
            const styles = yield el.getStyles();
            if (styles && styles.length > 0) {
                const primaryStyle = styles[0];
                if (primaryStyle && typeof primaryStyle.setProperties === 'function') {
                    yield primaryStyle.setProperties({ "box-shadow": shadowValue });
                    const primaryStyleName = yield primaryStyle.getName();
                    flashMessage(`Shadow applied to "${primaryStyleName}" class!`, "success");
                    return true;
                }
            }
        }
        catch (err) {
            console.warn("[box-shadow] Failed to apply to primary class, trying fallback.", err);
        }
        try {
            // 2. Fallback: Create a new class
            if (typeof wf.createStyle === "function" && typeof el.setStyles === "function") {
                const newClassName = NEW_CLASS_PREFIX + Date.now();
                const newStyle = yield wf.createStyle(newClassName);
                yield newStyle.setProperties({ "box-shadow": shadowValue });
                const currentStyles = (yield el.getStyles()) || [];
                const nextStyles = [...currentStyles, newStyle];
                yield el.setStyles(nextStyles);
                flashMessage(`Shadow applied to a new class!`, "success");
                return true;
            }
        }
        catch (err) {
            console.warn("[box-shadow] Failed to create new class, trying fallback.", err);
        }
        try {
            // 3. Last resort: Apply as an inline style
            if (typeof el.setStyle === 'function') {
                yield el.setStyle('box-shadow', shadowValue);
                flashMessage("Shadow applied as inline style!", "success");
                return true;
            }
        }
        catch (err) {
            console.error("[box-shadow] Failed to apply as inline style.", err);
        }
        // If all methods fail
        flashMessage("Error: Could not apply shadow to the element.", "error");
        return false;
    });
}
/**
 * Clears the box-shadow value from the selected element.
 * It attempts to remove inline style first, then set primary class box-shadow to 'none'.
 */
function clearShadowFromElement() {
    return __awaiter(this, void 0, void 0, function* () {
        const el = yield getSelectedElement();
        if (!el) {
            flashMessage("Please select an element first.", "error");
            return;
        }
        // First, try to remove the inline style.
        try {
            if (typeof el.removeProperty === 'function') {
                yield el.removeProperty('box-shadow');
            }
        }
        catch (err) {
            console.warn("[box-shadow] Could not remove inline style.", err);
        }
        // Then, try to set the box-shadow property to none on the main class.
        try {
            const styles = yield el.getStyles();
            if (styles && styles.length > 0) {
                const primaryStyle = styles[0];
                if (primaryStyle && typeof primaryStyle.setProperties === 'function') {
                    yield primaryStyle.setProperties({ "box-shadow": "none" });
                    flashMessage("Shadow removed!", "success");
                    return;
                }
            }
        }
        catch (err) {
            console.warn("[box-shadow] Could not clear shadow from primary class.", err);
        }
        flashMessage("Shadow removed!", "success");
    });
}
// --- UI Management Functions for Presets Section ---
/**
 * Displays the initial state in the #app div (inside presets-section) when no element is selected.
 */
function showInitialState() {
    const appDiv = document.getElementById("app"); // This #app is now inside #presets-section
    if (!appDiv)
        return;
    appDiv.innerHTML = `
        <div class="state no-element">
            <div class="no-element-icon">✋</div>
            <p class="no-element-title">Select an Element</p>
            <p class="no-element-description">Please select an element in Webflow Designer to apply shadow effects</p>
        </div>
    `;
    console.log("[box-shadow] 'Select an Element' state shown in presets panel.");
}
/**
 * Displays the preset cards in the #app div (inside presets-section) when an element is selected.
 * @param elementName - The name of the currently selected element.
 */
function showSelectedElementState(elementName) {
    const appDiv = document.getElementById("app"); // This #app is now inside #presets-section
    if (!appDiv)
        return;
    let presetsHtml = `
        <div class="selected-element">
            <span>Selected: </span>
            <span class="element-name">${escapeHtml(elementName)}</span>
        </div>
        <div class="presets-grid" id="presets">
    `;
    for (const k in shadowPresets) {
        if (Object.prototype.hasOwnProperty.call(shadowPresets, k)) {
            const v = shadowPresets[k];
            presetsHtml += `
                <div class="preset-card" data-key="${k}">
                    <div class="shadow-preview" style="box-shadow: ${v};"></div>
                    <div class="preset-name">${escapeHtml(k)}</div>
                </div>
            `;
        }
    }
    presetsHtml += `</div>
        <button id="clear-shadow-btn" class="clear-btn">Clear Shadow</button>
    `;
    appDiv.innerHTML = presetsHtml;
    const container = document.getElementById("presets");
    if (!container)
        return;
    // Attach event listeners to preset cards
    container.querySelectorAll(".preset-card").forEach((card) => {
        card.addEventListener("click", () => __awaiter(this, void 0, void 0, function* () {
            const key = card.getAttribute("data-key") || "";
            const shadowValue = shadowPresets[key];
            if (!shadowValue)
                return;
            container.querySelectorAll(".preset-card").forEach((c) => c.classList.remove("active"));
            card.classList.add("active");
            const el = yield getSelectedElement();
            if (!el) {
                showInitialState(); // Revert to initial state if element is deselected
                return;
            }
            yield applyShadowToElement(el, shadowValue);
        }));
    });
    // Attach event listener for the "Clear Shadow" button
    const clearBtn = document.getElementById("clear-shadow-btn");
    if (clearBtn) {
        clearBtn.addEventListener("click", clearShadowFromElement);
    }
    console.log(`[box-shadow] Presets shown for element: ${elementName}`);
}
/**
 * Displays a temporary message to the user (success or error).
 * @param text - The message content.
 * @param type - The type of message ('success' or 'error').
 */
function flashMessage(text, type = "success") {
    const appContainer = document.querySelector(".app-container"); // Append to the main app container for consistent positioning
    if (!appContainer)
        return;
    const existingMsg = document.getElementById("bs-msg");
    if (existingMsg)
        existingMsg.remove();
    const msg = document.createElement("div");
    msg.id = "bs-msg";
    msg.className = `message ${type}`;
    msg.textContent = text;
    appContainer.appendChild(msg);
    setTimeout(() => {
        if (msg.parentNode) {
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 300);
        }
    }, 3000);
}
/**
 * Safely escapes HTML special characters to prevent XSS.
 * @param s - The string to escape.
 * @returns The escaped string.
 */
function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (m) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    }[m]));
}
/**
 * Updates the UI (specifically the presets section) based on the current Webflow element selection.
 * This function is typically called when the presets panel is shown or on selection changes.
 */
function updateUIBasedOnSelection() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[box-shadow] Checking element selection for presets panel...");
        try {
            const el = yield getSelectedElement();
            if (!el) {
                showInitialState();
                return;
            }
            const elName = (el && (el.name || el.displayName || el.type || el.id)) || "Selected element";
            showSelectedElementState(elName);
        }
        catch (err) {
            console.error("[box-shadow] UI update error", err);
            showInitialState();
        }
    });
}
// --- Custom Builder Control Logic ---
// Get DOM elements for the custom builder controls, asserting their types for TypeScript
const distanceSlider = document.getElementById('distance-slider');
const intensitySlider = document.getElementById('intensity-slider');
const sharpnessSlider = document.getElementById('sharpness-slider');
const colorPicker = document.getElementById('color-picker');
const livePreviewBox = document.getElementById('live-preview-box');
const applyCustomBtn = document.getElementById('apply-custom-btn');
/**
 * Helper function to convert a hex color string to an RGB string.
 * @param hex - Hex color string (e.g., "#RRGGBB").
 * @returns RGB string (e.g., "R, G, B").
 */
function hexToRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r}, ${g}, ${b}`;
}
/**
 * Updates the live preview box's box-shadow based on current slider and color picker values.
 */
function updatePreview() {
    // Ensure all required elements are present before attempting to update
    if (!distanceSlider || !intensitySlider || !sharpnessSlider || !colorPicker || !livePreviewBox) {
        console.warn("One or more custom builder elements not found. Cannot update preview.");
        return;
    }
    const distance = Number(distanceSlider.value);
    const intensity = Number(intensitySlider.value) / 100; // 0-1 range for opacity
    const sharpness = 100 - Number(sharpnessSlider.value); // Invert sharpness for blur: 100=sharp, 0=blurry
    const color = colorPicker.value || "#000000"; // Default to black if color value is somehow empty
    const blur = sharpness / 2; // Map sharpness to blur radius
    const spread = 0; // Keeping spread simple for now
    const rgbaColor = `rgba(${hexToRgb(color)}, ${intensity})`;
    const shadowValue = `${distance}px ${distance}px ${blur}px ${spread}px ${rgbaColor}`;
    livePreviewBox.style.boxShadow = shadowValue;
}
// --- Panel Toggle Logic ---
// Get references to the main sections and toggle buttons
const controlsSection = document.getElementById('controls-section');
const presetsSection = document.getElementById('presets-section');
const showPresetsBtn = document.getElementById('toggle-presets-btn');
const backToControlsBtn = document.getElementById('back-to-controls-btn');
/**
 * Shows the custom controls panel and hides the presets panel.
 */
function showControlsPanel() {
    if (controlsSection && presetsSection) {
        controlsSection.style.display = 'block';
        presetsSection.style.display = 'none';
        // Ensure the custom builder preview is initialized or updated when controls are shown
        updatePreview();
        console.log("[box-shadow] Controls panel is now visible.");
    }
    else {
        console.warn("[box-shadow] Controls or Presets section not found, cannot show controls panel.");
    }
}
/**
 * Shows the presets panel and hides the custom controls panel.
 */
function showPresetsPanel() {
    return __awaiter(this, void 0, void 0, function* () {
        if (controlsSection && presetsSection) {
            controlsSection.style.display = 'none';
            presetsSection.style.display = 'block';
            // Immediately update the presets panel based on current selection when shown
            yield updateUIBasedOnSelection();
            console.log("[box-shadow] Presets panel is now visible.");
        }
        else {
            console.warn("[box-shadow] Controls or Presets section not found, cannot show presets panel.");
        }
    });
}
// --- App Initialization ---
/**
 * Initializes the entire application.
 * Waits for Webflow, sets up all event listeners, and sets the initial UI state.
 */
function initApp() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("[box-shadow] Initializing app...");
        const wf = yield waitForWebflow(6000, 200);
        if (!wf) {
            console.warn("[box-shadow] Webflow API not available — are you running inside Designer?");
            // If Webflow API isn't available, we still show the controls, but flash an error.
            showInitialState(); // Populates the #app div (inside presets-section) with the "Select an Element" message
            showControlsPanel(); // Ensure controls are still shown, but app might be non-functional without WF
            flashMessage("Webflow Designer not found. App functionality limited.", "error");
            return; // Exit here as Webflow interaction is not possible
        }
        // Set up initial custom builder preview
        updatePreview();
        console.log("[box-shadow] Custom builder preview initialized.");
        // Attach event listeners for custom builder controls
        if (distanceSlider)
            distanceSlider.addEventListener('input', updatePreview);
        if (intensitySlider)
            intensitySlider.addEventListener('input', updatePreview);
        if (sharpnessSlider)
            sharpnessSlider.addEventListener('input', updatePreview);
        if (colorPicker)
            colorPicker.addEventListener('input', updatePreview);
        console.log("[box-shadow] Custom builder control listeners attached.");
        // Attach event listener for "Apply Custom Shadow" button
        if (applyCustomBtn) {
            applyCustomBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                const el = yield getSelectedElement();
                if (el && livePreviewBox) {
                    yield applyShadowToElement(el, livePreviewBox.style.boxShadow);
                }
                else if (!el) {
                    flashMessage("Please select an element first.", "error");
                }
                else {
                    flashMessage("Live preview box not found.", "error");
                }
            }));
            console.log("[box-shadow] Apply Custom Shadow button listener attached.");
        }
        // Attach event listeners for panel toggling
        if (showPresetsBtn) {
            showPresetsBtn.addEventListener('click', showPresetsPanel);
            console.log("[box-shadow] 'Show Presets' button listener attached.");
        }
        else {
            console.warn("[box-shadow] 'Show Presets' button not found!");
        }
        if (backToControlsBtn) {
            backToControlsBtn.addEventListener('click', showControlsPanel);
            console.log("[box-shadow] 'Back to Controls' button listener attached.");
        }
        else {
            console.warn("[box-shadow] 'Back to Controls' button not found!");
        }
        // --- NEW LOGIC FOR INITIAL PANEL DISPLAY ---
        // Check for selected element initially to decide which panel to show first
        const initialElement = yield getSelectedElement();
        if (initialElement) {
            // If an element is selected, show the custom controls panel
            showControlsPanel();
            console.log("[box-shadow] Initial UI set to controls panel because an element is selected.");
        }
        else {
            // If no element is selected, show the presets panel with the "select an element" message
            showPresetsPanel(); // This will call updateUIBasedOnSelection() which handles showInitialState()
            console.log("[box-shadow] Initial UI set to presets panel because no element is selected.");
        }
        // --- END NEW LOGIC ---
        // Set up Webflow event listeners for selection changes to update the presets panel
        try {
            if (typeof wf.on === 'function') {
                try {
                    wf.on('ready', updateUIBasedOnSelection);
                    console.log("[box-shadow] Webflow 'ready' listener attached.");
                }
                catch (e) {
                    console.error("[box-shadow] Failed to attach 'ready' listener", e);
                }
                try {
                    wf.on('selectionchange', updateUIBasedOnSelection);
                    console.log("[box-shadow] Webflow 'selectionchange' listener attached.");
                }
                catch (e) {
                    console.error("[box-shadow] Failed to attach 'selectionchange' listener", e);
                }
            }
        }
        catch (e) {
            console.error("[box-shadow] Error attaching Webflow event listeners", e);
        }
        // Add a polling mechanism as a fallback for selection changes (Webflow events can sometimes be unreliable)
        setInterval(() => {
            updateUIBasedOnSelection().catch((e) => console.error("[box-shadow] Polling UI update error:", e));
        }, 1500);
        console.log("[box-shadow] Polling for UI selection changes started.");
    });
}
// Start the application once the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => { initApp(); });
