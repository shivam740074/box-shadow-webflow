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









// Preset shadows
const shadowMap = {
  soft: "0px 4px 10px rgba(0, 0, 0, 0.15)",
  medium: "0px 6px 20px rgba(0, 0, 0, 0.25)",
  strong: "0px 10px 30px rgba(0, 0, 0, 0.35)",
};

let selectedShadow = shadowMap.soft;

function setupListeners() {
  const softBtn = document.getElementById("soft");
  const medBtn = document.getElementById("medium");
  const strongBtn = document.getElementById("strong");
  const form = document.getElementById("extension-form");

  if (softBtn) softBtn.onclick = () => (selectedShadow = shadowMap.soft);
  if (medBtn) medBtn.onclick = () => (selectedShadow = shadowMap.medium);
  if (strongBtn) strongBtn.onclick = () => (selectedShadow = shadowMap.strong);

  if (form) {
    form.onsubmit = async (event) => {
      event.preventDefault();

      const el = await webflow.getSelectedElement();

      if (el && el.styles) {
        const shadowStyle =
          (await webflow.getStyleByName("box-shadow-style")) ||
          (await webflow.createStyle("box-shadow-style"));

        await shadowStyle.setProperties({
          "box-shadow": selectedShadow,
        });

        await el.setStyles([shadowStyle]);

        alert("✅ Box shadow applied!");
      } else {
        alert("⚠️ Please select an element that supports styles.");
      }
    };
  }
}

document.addEventListener("DOMContentLoaded", setupListeners);
