function injectQuestionAndSend(question) {
  try {
    const textarea = document.querySelector('#chat-input');
    const button = document.querySelector('div._7436101[role="button"]');

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
      if (
        !button.getAttribute('aria-disabled') ||
        button.getAttribute('aria-disabled') === 'false'
      ) {
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
    
    // run();
  