document.addEventListener("DOMContentLoaded", () => {
  const button = document.getElementById("sendBtn");
  const textarea = document.getElementById("chatInput");

  if (!button || !textarea) {
    console.error("Button or textarea not found in sidepanel.html");
    return;
  }

  button.addEventListener("click", async () => {
    const query = textarea.value.trim();
    if (!query) return;

    // Find or open DeepSeek tab
    let tabs = await chrome.tabs.query({});
    let targetTab = tabs.find(tab => tab.url && tab.url.includes("chat.deepseek.com"));

    if (!targetTab) {
      console.log("DeepSeek tab not found, opening a new tab...");
      targetTab = await chrome.tabs.create({ url: "https://chat.deepseek.com/", active: true });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for page load
    } else {
      await chrome.tabs.update(targetTab.id, { active: true }); // Focus existing tab
    }

    // Inject the script after a short delay
    setTimeout(() => {
      chrome.scripting.executeScript({
        target: { tabId: targetTab.id },
        args: [query, targetTab.url],
        func: async (userInput, tabUrl) => {
          if (tabUrl.includes("chat.deepseek.com")) {
            // 1. Find the textarea
            const inputField = document.querySelector('#chat-input');
            if (!inputField) {
              console.error("❌ DeepSeek input field not found");
              return;
            }

            // 2. Set the input value directly (for <textarea>)
            inputField.focus();
            inputField.value = userInput;

            // 3. Trigger input/change events (to ensure DeepSeek detects the text)
            inputField.dispatchEvent(new Event('input', { bubbles: true }));
            inputField.dispatchEvent(new Event('change', { bubbles: true }));

            // 4. Short delay before clicking send
            await new Promise(r => setTimeout(r, 300));

            // 5. Find and click the send button
            const sendBtn = document.querySelector('div._7436101[role="button"]');
            if (sendBtn) {
              sendBtn.click();
              console.log("✅ DeepSeek: Message sent from sidepanel!");
            } else {
              console.error("❌ Send button not found");
            }
          }
        }
      });
      textarea.value = ""; // Clear the sidebar input
    }, 300);
  });
});