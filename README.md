#  DeepSeek Assistant – Chrome Extension

A simple Chrome Extension that detects if you're on [DeepSeek.com](https://www.deepseek.com) and lets you send prompts directly into the chat interface via a sidebar assistant. Great for building custom workflows or AI automations.

---

##  Features

- **Sidebar Integration**: A persistent sidebar that allows users to interact with Deepseek directly from the extension.
- **Automatic Claude Tab Opening**: If Deepseek is not open, the extension will automatically open a new tab with `https://chat.deepseek.com/`.
- **Message Sending**: Send queries to Deepseek directly from the sidebar.
- **Textarea Clearing**: Clears the text input area after sending the question.
- **Automatic Focus on Input**: Focuses on Deepseek’s text input area and simulates entering text.
- **Error Handling through Console**: Displays relevant error messages if the Deepseek input editor or send button is not found.


---


## Installation

1. Download or clone this repository
2. Open Chrome and navigate to chrome://extensions/
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the extension directory

---

## Usage
1. Click the Google extension icon 
2. Click the three buttons in the right and click "Open side panel"
3. Type your question in the sidebar. If you don't have a Deepseek tab open, it will open one for you
4. Click "Send" to submit your question to Deepseek
5. Continue the conversation in the main Deepseek interface

---

##  Privacy

This extension does **not collect any data**. It only interacts with the open DeepSeek.com tab locally on your browser.

See [privacy-policy.md](./privacy-policy.md) for more details.

---

## Troubleshooting

- If you see ❌ `Prompt textarea not found`, make sure you're on the **DeepSeek chat page**, and that the input's `id` is still `#chat-input`.
- Always allow the extension to run on `deepseek.com` if prompted.
- Make sure Chrome is up-to-date.

---
## 🎯 Quick Selector Guide

| Feature       | DeepSeek Chat          | Claude.ai               |
|--------------|------------------------|-------------------------|
| **Input**    | `#chat-input` (textarea) | `div[aria-label="Write..."]` (contenteditable) |
| **Send**     | `div._7436101[role="button"]` | `button[aria-label="Send message"]` |

### 💡 Key Differences
- **DeepSeek**: Simple `<textarea>` → set `.value` directly.
- **Claude**: Fancy editor → simulate typing with `innerHTML`.

"DeepSeek: #chat-input + div._7436101 | Claude: contenteditable div + Send button"

### ⚠️ Watch Out!
- DeepSeek’s send button selector changes often!
- Claude needs fake keystrokes (`keydown` events).

Pro Tip: Always check selectors in DevTools (F12)!