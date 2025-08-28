const NEW_CLASS_PREFIX = "box-shadow-preset-";

const shadowPresets: Record<string, string> = {
    Soft: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    Medium: "0px 6px 20px rgba(0, 0, 0, 0.25)",
    Strong: "0px 10px 30px rgba(0, 0, 0, 0.35)",
    Inner: "inset 0px 4px 10px rgba(0, 0, 0, 0.2)",
    Glowing: "0px 0px 12px rgba(0, 150, 255, 0.6)",
    Float: "0px 8px 25px rgba(0, 0, 0, 0.12)",
    Hover: "0px 12px 30px rgba(0, 0, 0, 0.18)"
};

function sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
}

async function waitForWebflow(timeout = 5000, interval = 200): Promise<any | null> {
    const start = Date.now();
    while (Date.now() - start < timeout) {
        const wf = (window as any).webflow;
        if (wf) {
            console.log("[box-shadow] webflow API found");
            return wf;
        }
        await sleep(interval);
    }
    console.warn("[box-shadow] webflow API not found after wait");
    return null;
}

async function getSelectedElement(): Promise<any | null> {
    const wf = (window as any).webflow;
    if (!wf) return null;

    try {
        if (typeof wf.getSelectedElement === "function") {
            const el = await wf.getSelectedElement();
            if (el) return el;
        }
    } catch (e) {
        console.warn("[box-shadow] getSelectedElement failed", e);
    }

    try {
        if (typeof wf.getSelectedElements === "function") {
            const arr = await wf.getSelectedElements();
            if (Array.isArray(arr) && arr.length) return arr[0];
        }
    } catch (e) {
        console.warn("[box-shadow] getSelectedElements failed", e);
    }

    try {
        if (wf.selection && typeof wf.selection.getSelected === "function") {
            const arr = wf.selection.getSelected();
            if (Array.isArray(arr) && arr.length) return arr[0];
        }
    } catch {
        // ignore
    }

    return null;
}

/**
 * Applies a box-shadow value to the selected element.
 */
async function applyShadowToElement(el: any, shadowValue: string): Promise<boolean> {
    const wf = (window as any).webflow;
    if (!wf) {
        flashMessage("Error: Webflow API not available.", "error");
        return false;
    }

    try {
        // Try to apply shadow to the element's main class first.
        const styles = await el.getStyles();
        if (styles && styles.length > 0) {
            const primaryStyle = styles[0];
            if (primaryStyle && typeof primaryStyle.setProperties === 'function') {
                await primaryStyle.setProperties({ "box-shadow": shadowValue });
                const primaryStyleName = await primaryStyle.getName();
                flashMessage(`Shadow applied to "${primaryStyleName}" class!`, "success");
                return true;
            }
        }
    } catch (err) {
        console.warn("[box-shadow] Failed to apply to primary class, trying fallback.", err);
    }

    try {
        // Fallback: Create a new class.
        if (typeof wf.createStyle === "function" && typeof el.setStyles === "function") {
            const newClassName = NEW_CLASS_PREFIX + Date.now();
            const newStyle = await wf.createStyle(newClassName);
            await newStyle.setProperties({ "box-shadow": shadowValue });
            
            const currentStyles = (await el.getStyles()) || [];
            const nextStyles = [...currentStyles, newStyle];
            await el.setStyles(nextStyles);

            flashMessage(`Shadow applied to a new class!`, "success");
            return true;
        }
    } catch (err) {
        console.warn("[box-shadow] Failed to create new class, trying fallback.", err);
    }

    try {
        // Last resort: Apply as an inline style.
        if (typeof el.setStyle === 'function') {
            await el.setStyle('box-shadow', shadowValue);
            flashMessage("Shadow applied as inline style!", "success");
            return true;
        }
    } catch (err) {
        console.error("[box-shadow] Failed to apply as inline style.", err);
    }

    // If all methods fail.
    flashMessage("Error: Could not apply shadow to the element.", "error");
    return false;
}

/**
 * Clears the box-shadow value from the selected element.
 */
async function clearShadowFromElement(): Promise<void> {
    const el = await getSelectedElement();
    if (!el) {
        flashMessage("Please select an element first.", "error");
        return;
    }
    
    // First, try to remove the inline style.
    try {
        if (typeof el.removeProperty === 'function') {
            await el.removeProperty('box-shadow');
        }
    } catch (err) {
        console.warn("[box-shadow] Could not remove inline style.", err);
    }

    // Then, try to set the box-shadow property to none on the main class.
    try {
        const styles = await el.getStyles();
        if (styles && styles.length > 0) {
            const primaryStyle = styles[0];
            if (primaryStyle && typeof primaryStyle.setProperties === 'function') {
                await primaryStyle.setProperties({ "box-shadow": "none" });
                flashMessage("Shadow removed!", "success");
                return;
            }
        }
    } catch (err) {
        console.warn("[box-shadow] Could not clear shadow from primary class.", err);
    }

    flashMessage("Shadow removed!", "success");
}

function showInitialState(): void {
    const app = document.getElementById("app");
    if (!app) return;
    app.innerHTML = `
        <div class="state no-element">
            <div class="no-element-icon">✋</div>
            <p class="no-element-title">Select an Element</p>
            <p class="no-element-description">Please select an element in Webflow Designer to apply shadow effects</p>
        </div>
    `;
}

function showSelectedElementState(elementName: string): void {
    const app = document.getElementById("app");
    if (!app) return;
    
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
    app.innerHTML = presetsHtml;
    
    const container = document.getElementById("presets");
    if (!container) return;
    
    container.querySelectorAll(".preset-card").forEach((card) => {
        card.addEventListener("click", async () => {
            const key = (card as HTMLElement).getAttribute("data-key") || "";
            const shadowValue = shadowPresets[key];
            if (!shadowValue) return;
            
            container.querySelectorAll(".preset-card").forEach((c) => c.classList.remove("active"));
            (card as HTMLElement).classList.add("active");
            
            const el = await getSelectedElement();
            if (!el) {
                showInitialState();
                return;
            }
            
            await applyShadowToElement(el, shadowValue);
        });
    });

    // Add event listener for the new "Clear Shadow" button
    const clearBtn = document.getElementById("clear-shadow-btn");
    if (clearBtn) {
        clearBtn.addEventListener("click", clearShadowFromElement);
    }
}

function flashMessage(text: string, type: "success" | "error" = "success"): void {
    const app = document.getElementById("app");
    if (!app) return;
    
    const existingMsg = document.getElementById("bs-msg");
    if (existingMsg) existingMsg.remove();
    
    const msg = document.createElement("div");
    msg.id = "bs-msg";
    msg.className = `message ${type}`;
    msg.textContent = text;
    
    app.appendChild(msg);
    
    setTimeout(() => {
        if (msg.parentNode) {
            msg.style.opacity = '0';
            setTimeout(() => msg.remove(), 300);
        }
    }, 3000);
}

function escapeHtml(s: string): string {
    return String(s).replace(/[&<>"']/g, (m) => ({ 
        '&': '&amp;', 
        '<': '&lt;', 
        '>': '&gt;', 
        '"': '&quot;', 
        "'": '&#39;' 
    }[m] as string));
}

async function updateUIBasedOnSelection(): Promise<void> {
    try {
        const el = await getSelectedElement();
        if (!el) {
            showInitialState();
            return;
        }
        const elName = (el && (el.name || el.displayName || el.type || el.id)) || "Selected element";
        showSelectedElementState(elName);
    } catch (err) {
        console.error("[box-shadow] UI update error", err);
        showInitialState();
    }
}

async function initApp(): Promise<void> {
    const wf = await waitForWebflow(6000, 200);
    if (!wf) {
        showInitialState();
        console.warn("[box-shadow] Webflow API not available — are you running inside Designer?");
        return;
    }

    try {
        if (typeof wf.on === 'function') {
            try { wf.on('ready', updateUIBasedOnSelection); } catch { /* ignore */ }
            try { wf.on('selectionchange', updateUIBasedOnSelection); } catch { /* ignore */ }
        }
    } catch { /* ignore */ }

    const start = Date.now();
    const maxPoll = 3000;
    while (Date.now() - start < maxPoll) {
        const el = await getSelectedElement();
        if (el) break;
        await sleep(200);
    }

    await updateUIBasedOnSelection();
    setInterval(() => updateUIBasedOnSelection().catch((e) => console.error(e)), 1500);
}

document.addEventListener("DOMContentLoaded", () => { initApp(); });



// 


// Get the elements and check if they exist
const distanceSlider = document.getElementById('distance-slider') as HTMLInputElement;
const intensitySlider = document.getElementById('intensity-slider') as HTMLInputElement;
const sharpnessSlider = document.getElementById('sharpness-slider') as HTMLInputElement;
const colorPicker = document.getElementById('color-picker') as HTMLInputElement;
const previewBox = document.getElementById('live-preview-box') as HTMLElement;
const applyBtn = document.getElementById('apply-custom-btn') as HTMLElement;

// A single function to update the preview shadow
function updatePreview(): void {
    // Check if any of the elements are null before continuing
    if (!distanceSlider || !intensitySlider || !sharpnessSlider || !colorPicker || !previewBox) {
        console.warn("One or more required elements not found. Cannot update preview.");
        return;
    }

    const distance = Number(distanceSlider.value);
    const intensity = Number(intensitySlider.value) / 100;
    const sharpness = 100 - Number(sharpnessSlider.value);

    // Ensure color value is a string and handle possible null
    const color = colorPicker.value || "#000000";

    const blur = sharpness / 2;
    const spread = 0; 
    
    // We need a helper to convert hex to RGBA
    const hexToRgb = (hex: string) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `${r}, ${g}, ${b}`;
    };

    const rgbaColor = `rgba(${hexToRgb(color)}, ${intensity})`;
    const shadowValue = `${distance}px ${distance}px ${blur}px ${spread}px ${rgbaColor}`;

    previewBox.style.boxShadow = shadowValue;
}

// Add event listeners to the controls only if they exist
if (distanceSlider) distanceSlider.addEventListener('input', updatePreview);
if (intensitySlider) intensitySlider.addEventListener('input', updatePreview);
if (sharpnessSlider) sharpnessSlider.addEventListener('input', updatePreview);
if (colorPicker) colorPicker.addEventListener('input', updatePreview);

// Add listener to the Apply button
if (applyBtn) {
    applyBtn.addEventListener('click', async () => {
        const el = await getSelectedElement();
        if (el) {
            // Use the current box-shadow from the preview box
            await applyShadowToElement(el, previewBox.style.boxShadow);
        } else {
            flashMessage("Please select an element first.", "error");
        }
    });
}