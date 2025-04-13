# 🔍 DeepSeek Assistant – Chrome Extension

A simple Chrome Extension that detects if you're on [DeepSeek.com](https://www.deepseek.com) and lets you send prompts directly into the chat interface via a popup assistant. Great for building custom workflows or AI automations.

---

## 📦 Features

- ✅ Detects if you're on `deepseek.com`
- 📝 Lets you enter a question from a popup window
- 🚀 Injects your prompt into the DeepSeek chat input
- ⏱ Automatically clicks the "Send" button for you
- 📡 Uses proper event dispatching & retries

---


---

## 🧠 How It Works

1. You open a tab on `deepseek.com`.
2. Click the extension icon and type a question in the popup.
3. The extension injects your question into DeepSeek's chat input (`#chat-input`).
4. It triggers the send button (`[data-testid="send-button"]`) just like a user would.
5. Your message is sent — just like magic! 🪄

---

## 🧪 How to Load in Developer Mode

1. Open **Chrome**.
2. Go to `chrome://extensions`.
3. Enable **Developer Mode** (top right).
4. Click **"Load unpacked"**.
5. Select the folder containing this extension.
6. Pin the extension for easy access!

---

## 🛡 Permissions

This extension uses:

- `"activeTab"` – to access the current tab.
- `"scripting"` – to inject JavaScript.
- `"tabs"` – to get tab info.

---

## 🔒 Privacy

This extension does **not collect any data**. It only interacts with the open DeepSeek.com tab locally on your browser.

See [privacy-policy.md](./privacy-policy.md) for more details.

---

## 🛠 Troubleshooting

- If you see ❌ `Prompt textarea not found`, make sure you're on the **DeepSeek chat page**, and that the input's `id` is still `#chat-input`.
- Always allow the extension to run on `deepseek.com` if prompted.
- Make sure Chrome is up-to-date.

---

## 📌 Credits

Built with ❤️ using JavaScript, Chrome Extensions API, and a little DOM wizardry.

---

## 📤 License

MIT License. Use freely, modify boldly.

