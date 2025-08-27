// const emojiMap = {
//   smile: "😊",
//   wink: "😉",
//   heart: "😍",
//   cry: "😭",
// };

// // default to smile
// let selectedEmoji = emojiMap.smile;
// addButtonListeners();

// document.getElementById("extension-form").onsubmit = async (event) => {
//   event.preventDefault();
//   // Get the current selected Element
//   const el = await webflow.getSelectedElement();

//   // If styles can be set on the Element
//   if (el && el.styles && el.children) {
//     //Get current element's style
//     const currentStyle = await el.getStyles();

//     // Get style
//     const emojiStyle = await createOrUseStyle("emoji-style");

//     // Create a new element that will display the text-emoji
//     const labelElement = await el.append(webflow.elementPresets.DOM);
//     await labelElement.setTag("span");
//     await labelElement.setStyles([...currentStyle, emojiStyle]);
//     await labelElement.setTextContent(selectedEmoji);
//   } else {
//     alert("Please select a text element");
//   }
// };

// // Check if specified style exists. If not, create a new style
// async function createOrUseStyle(styleName) {
//   // Check if this style exists to avoid duplicate styles
//   const style = await webflow.getStyleByName(styleName);
//   if (style) {
//     // Return existing style
//     return style;
//   } else {
//     // Create a new style, return it
//     const emojiStyle = await webflow.createStyle(styleName);
//     await emojiStyle.setProperties({ "background-color": "#FF00FF" });
//     return emojiStyle;
//   }
// }

// function handleEmojiClick(emoji) {
//   selectedEmoji = emoji;
// }

// function addButtonListeners() {
//   document.getElementById("smile").onclick = () => {
//     handleEmojiClick(emojiMap.smile);
//   };

//   document.getElementById("wink").onclick = () => {
//     handleEmojiClick(emojiMap.wink);
//   };

//   document.getElementById("heart").onclick = () => {
//     handleEmojiClick(emojiMap.heart);
//   };

//   document.getElementById("cry").onclick = () => {
//     handleEmojiClick(emojiMap.cry);
//   };
// }








// // Preset shadows
// const shadowMap: Record<string, string> = {
//   soft: "0px 4px 10px rgba(0, 0, 0, 0.15)",
//   medium: "0px 6px 20px rgba(0, 0, 0, 0.25)",
//   strong: "0px 10px 30px rgba(0, 0, 0, 0.35)",
//   inner: "inset 0px 4px 6px rgba(0, 0, 0, 0.3)",
//   glowing: "0px 0px 20px rgba(0, 150, 255, 0.6)",
// };

// // Apply selected shadow to the chosen element
// async function applyShadow(shadow: string) {
//   const el = await webflow.getSelectedElement();

//   if (el && el.styles) {
//     const shadowStyle =
//       (await webflow.getStyleByName("box-shadow-style")) ||
//       (await webflow.createStyle("box-shadow-style"));

//     await shadowStyle.setProperties({
//       "box-shadow": shadow,
//     });

//     await el.setStyles([shadowStyle]);
//   } else {
//     showMessage("⚠️ Please select an element in Webflow first.");
//   }
// }

// // Show feedback message
// function showMessage(msg: string) {
//   const msgBox = document.getElementById("message");
//   if (msgBox) {
//     msgBox.innerText = msg;
//     msgBox.style.display = "block";
//     setTimeout(() => (msgBox.style.display = "none"), 3000);
//   } else {
//     alert(msg); // fallback
//   }
// }

// // Setup button listeners
// function setupListeners() {
//   Object.keys(shadowMap).forEach((key) => {
//     const btn = document.getElementById(key);
//     if (btn) btn.onclick = () => applyShadow(shadowMap[key]);
//   });
// }

// document.addEventListener("DOMContentLoaded", setupListeners);


















































// Prefix for newly created classes
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
        const wf = (window as any).webflow || (typeof (window as any).webflow !== "undefined" && (window as any).webflow);
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
    const wf = (window as any).webflow || (typeof (window as any).webflow !== "undefined" && (window as any).webflow);
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
    } catch (e) {
        // ignore
    }

    return null;
}

/**
 * Applies a box-shadow value to the selected element.
 * Prioritizes modifying an existing primary class.
 * If no classes are present, it attempts to create a new class.
 * If class creation fails, it falls back to applying the style as an inline style.
 */
async function applyShadowToElement(el: any, shadowValue: string): Promise<boolean> {
    const wf = (window as any).webflow || (typeof (window as any).webflow !== "undefined" && (window as any).webflow);
    if (!wf) {
        console.warn("[box-shadow] Webflow API not available, cannot apply style.");
        flashMessage("Error: Webflow API not available.", "error");
        return false;
    }

    try {
        let styleOperationSuccess = false;
        let specificErrorMessage = "";

        console.log("[box-shadow] --- Starting applyShadowToElement ---");
        console.log("[box-shadow] Selected Element (el):", el);
        console.log("[box-shadow] Shadow Value to apply:", shadowValue);
        console.log("[box-shadow] Checking for el.getStyles method:", typeof el.getStyles);

        // 1. Attempt to find and modify an existing primary class
        if (typeof el.getStyles === 'function') {
            const styles = await el.getStyles();
            console.log("[box-shadow] Styles retrieved from element:", styles);

            if (styles && styles.length > 0) {
                const targetStyle = styles[0];
                console.log("[box-shadow] Primary style object found:", targetStyle);
                console.log("[box-shadow] Type of targetStyle.setProperties:", typeof targetStyle.setProperties);

                if (targetStyle && typeof targetStyle.setProperties === 'function') {
                    const primaryStyleName = await targetStyle.getName();
                    console.log(`[box-shadow] Attempting to update existing class: "${primaryStyleName}" with shadow: "${shadowValue}"`);
                    await targetStyle.setProperties({ "box-shadow": shadowValue });
                    console.log(`[box-shadow] Successfully updated class "${primaryStyleName}" with new shadow.`);
                    flashMessage(`Shadow applied to "${primaryStyleName}" class!`, "success"); 
                    styleOperationSuccess = true;
                } else {
                    console.warn(`[box-shadow] Primary style object is invalid or does not support setProperties. targetStyle:`, targetStyle);
                    specificErrorMessage = "Error: Selected element's primary class is unmodifiable. Attempting to create new class.";
                }
            } else {
                console.log("[box-shadow] Element has no classes. Proceeding to attempt creating a new class.");
            }
        } else {
            console.log("[box-shadow] Element does not support getStyles. Proceeding to attempt creating a new class.");
            specificErrorMessage = "Error: Element does not expose 'getStyles' method. Attempting to create new class.";
        }

        // 2. If no existing class was successfully modified, attempt to create a new class
        if (!styleOperationSuccess) {
            console.log("[box-shadow] Attempting to create and apply a new class.");
            if (typeof wf.createStyle === 'function' && typeof el.addStyles === 'function') {
                const newClassName = NEW_CLASS_PREFIX + Date.now(); // Generate a unique class name
                console.log(`[box-shadow] Generated new class name: "${newClassName}"`);
                
                try {
                    const newStyle = await wf.createStyle(newClassName);
                    console.log("[box-shadow] createStyle result:", newStyle);

                    if (newStyle && typeof newStyle.setProperties === 'function') {
                        await newStyle.setProperties({ "box-shadow": shadowValue });
                        console.log(`[box-shadow] Set properties on new style "${newClassName}".`);
                        
                        try {
                            await el.addStyles([newStyle]); // Add the newly created class to the element
                            console.log(`[box-shadow] Successfully created and applied new class "${newClassName}".`);
                            flashMessage(`Shadow applied to new class "${newClassName}"!`, "success");
                            styleOperationSuccess = true;
                        } catch (addStylesError) {
                            console.error(`[box-shadow] Failed to add new class "${newClassName}" to element:`, addStylesError);
                            specificErrorMessage = `Error: Failed to add new class to element. This might be due to Webflow API permissions.`;
                        }
                    } else {
                        console.warn("[box-shadow] Failed to create or set properties on new style object. newStyle:", newStyle);
                        specificErrorMessage = "Error: Failed to create new style properties.";
                    }
                } catch (createStyleError) {
                    console.error(`[box-shadow] Failed to create new style "${newClassName}":`, createStyleError);
                    specificErrorMessage = `Error: Failed to create new class. This is likely due to Webflow API limitations.`;
                }
            } else {
                console.warn("[box-shadow] Webflow API does not support createStyle or element does not support addStyles. This is required for creating new classes.");
                specificErrorMessage = "Error: Webflow API does not support creating new classes or adding them to elements.";
            }
        }

        // 3. Final Fallback: If neither class modification nor creation worked, try inline styling
        if (!styleOperationSuccess) {
            console.log("[box-shadow] Neither class modification nor creation worked. Falling back to apply inline style.");
            if (typeof el.setStyle === 'function') {
                await el.setStyle('box-shadow', shadowValue);
                console.log("[box-shadow] Successfully applied inline style via setStyle as a last resort.");
                flashMessage("Shadow applied as inline style!", "success");
                styleOperationSuccess = true;
            } else if (typeof el.setProperty === 'function') {
                await el.setProperty('box-shadow', shadowValue);
                console.log("[box-shadow] Successfully applied inline style via setProperty as a last resort.");
                flashMessage("Shadow applied as inline style!", "success");
                styleOperationSuccess = true;
            } else {
                console.warn("[box-shadow] Element does not support setStyle or setProperty for inline styling.");
                specificErrorMessage = "Error: Element does not support any known styling methods (class or inline). Please select a Div Block or similar element.";
            }
        }


        if (styleOperationSuccess) {
            console.log("[box-shadow] --- applyShadowToElement finished successfully ---");
            return true;
        } else {
            if (!specificErrorMessage) {
                specificErrorMessage = "Error: Could not apply shadow. Element must have a class or support inline styling.";
            }
            console.warn("[box-shadow] --- applyShadowToElement failed ---");
            console.warn("[box-shadow] Final failure: No suitable method found to apply box-shadow. Element:", el, "Message:", specificErrorMessage);
            flashMessage(specificErrorMessage, "error");
            return false;
        }
    } catch (err) {
        console.error("[box-shadow] applyShadow general error (caught outside specific blocks):", err);
        flashMessage("Error applying shadow. Check console for details.", "error");
        return false;
    }
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
    
    Object.keys(shadowPresets).forEach((k) => {
        const v = shadowPresets[k];
        presetsHtml += `
            <div class="preset-card" data-key="${k}">
                <div class="shadow-preview" style="box-shadow: ${v};"></div>
                <div class="preset-name">${escapeHtml(k)}</div>
            </div>
        `;
    });
    
    presetsHtml += `</div>`;
    app.innerHTML = presetsHtml;
    
    const container = document.getElementById("presets");
    if (!container) return;
    
    container.querySelectorAll(".preset-card").forEach((card) => {
        card.addEventListener("click", async (ev) => {
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
            
            const ok = await applyShadowToElement(el, shadowValue);
            console.log(`[box-shadow] apply result for "${key}":`, ok);
            
            if (!ok) {
                // flashMessage is already called inside applyShadowToElement if it fails
            } else {
                // flashMessage is called inside applyShadowToElement on success
            }
        });
    });
}

function flashMessage(text: string, type: "success" | "error" = "success"): void {
    const app = document.getElementById("app");
    if (!app) return;
    
    const existingMsg = document.getElementById("bs-msg");
    if (existingMsg) {
        existingMsg.remove();
    }
    
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
        console.log("[box-shadow] current selected element:", el);
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
            try {
                wf.on('ready', () => {
                    console.log("[box-shadow] Webflow ready event triggered");
                    updateUIBasedOnSelection();
                });
            } catch (e) { /* ignore */ }
            try {
                wf.on('selectionchange', () => {
                    console.log("[box-shadow] Selection change event triggered");
                    updateUIBasedOnSelection();
                });
            } catch (e) { /* ignore */ }
        }
    } catch (e) { /* ignore */ }

    const start = Date.now(); // Corrected: Date.now()
    const maxPoll = 3000;
    let picked = false;
    while (Date.now() - start < maxPoll) { // Corrected: Date.now()
        const el = await getSelectedElement();
        if (el) {
            picked = true;
            break;
        }
        await sleep(200);
    }

    await updateUIBasedOnSelection();

    setInterval(() => updateUIBasedOnSelection().catch((e) => console.error(e)), 1500);
}

document.addEventListener("DOMContentLoaded", async () => {
    initApp();
});
