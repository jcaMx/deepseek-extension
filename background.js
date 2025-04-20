chrome.action.onClicked.addListener((tab) => {
    if (tab.url.includes("deepseek.com")) {
      chrome.tabs.sendMessage(tab.id, { action: "toggle_sidebar" });
    } else {
      chrome.tabs.sendMessage(tab.id, { action: "show_notification" });
    }
  });
  