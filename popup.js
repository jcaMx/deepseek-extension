document.getElementById('submit-question').addEventListener('click', async () => {
    const statusEl = document.getElementById('status');
    const question = document.getElementById('question').value.trim();
  
    if (!question) {
      statusEl.textContent = "Please enter a question.";
      statusEl.className = "status error";
      return;
    }
  
    statusEl.textContent = "Trying to send your question...";
    statusEl.className = "status";
  
    try {
      // Correctly use async/await here
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
      if (!tab || !tab.url.includes("deepseek.com")) {
        statusEl.textContent = "This extension only works on deepseek.com.";
        statusEl.className = "status error";
        return;
      }
  
      // Delay a bit to allow UI to load
      setTimeout(() => {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: injectQuestionAndSend,
          args: [question],
        }, (results) => {
          if (chrome.runtime.lastError) {
            statusEl.textContent = "Error injecting script: " + chrome.runtime.lastError.message;
            statusEl.className = "status error";
            return;
          }
  
          const result = results && results[0]?.result;
          if (result?.success) {
            statusEl.textContent = "✅ Question sent successfully!";
            statusEl.className = "status success";
          } else {
            statusEl.textContent = "❌ Failed to send. " + (result?.error || "Unknown error");
            statusEl.className = "status error";
          }
        });
      }, 300);
    } catch (err) {
      console.error(err);
      statusEl.textContent = "Unexpected error: " + err.message;
      statusEl.className = "status error";
    }
  });
  

  
  function injectQuestionAndSend(question) {
    try {
      const textarea = document.querySelector('#prompt-textarea');
      const button = document.querySelector('[data-testid="send-button"]');
  
      if (!textarea) {
        return { success: false, error: "Prompt textarea not found." };
      }
  
      if (!button) {
        return { success: false, error: "Send button not found." };
      }
  
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
      nativeInputValueSetter.call(textarea, question);
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
  
      let attempts = 0;
      const maxAttempts = 10;
  
      function tryClick() {
        if (!button.disabled && button.getAttribute('aria-disabled') !== 'true') {
          button.click();
          return { success: true };
        } else if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryClick, 300);
        } else {
          console.error("Button found but still disabled after retries.");
          return { success: false, error: "Send button is disabled after retries." };
        }
      }
  
      return tryClick();
  
    } catch (err) {
      console.error("Error in injected script:", err);
      return { success: false, error: err.message };
    }
  }
  