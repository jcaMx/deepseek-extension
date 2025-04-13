function injectQuestionAndSend(question) {
    const waitForElement = (selector, maxAttempts = 10, delay = 500) => {
      return new Promise((resolve, reject) => {
        let attempts = 0;
        const interval = setInterval(() => {
          const el = document.querySelector(selector);
          if (el) {
            clearInterval(interval);
            resolve(el);
          } else if (++attempts >= maxAttempts) {
            clearInterval(interval);
            reject(new Error(`Element not found: ${selector}`));
          }
        }, delay);
      });
    };
  
    async function run() {
      try {
        const textarea = await waitForElement('#chat-input');
        const button = await waitForElement('[data-testid="send-button"]');
  
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
        nativeInputValueSetter.call(textarea, question);
        textarea.dispatchEvent(new Event('input', { bubbles: true }));
  
        let attempts = 0;
        const maxAttempts = 10;
  
        const tryClick = () => {
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
        };
  
        return tryClick();
      } catch (err) {
        console.error("Error in injected script:", err);
        return { success: false, error: err.message };
      }
    }
  
    run();
  }
  