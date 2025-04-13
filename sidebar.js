document.getElementById('submit-question').addEventListener('click', function() {
    const question = document.getElementById('question').value;
    const textarea = document.querySelector('#prompt-textarea');
    setReactTextareaValue(textarea, question);
    clickWhenEnabled('[data-testid="send-button"]');
});

function setReactTextareaValue(textarea, value) {
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, "value").set;
    nativeInputValueSetter.call(textarea, value);
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
}

function clickWhenEnabled(selector, maxAttempts = 10, delay = 500) {
    let attempts = 0;
    const tryClick = () => {
        const button = document.querySelector(selector);
        if (button && !button.disabled && button.getAttribute('aria-disabled') !== 'true') {
            button.click();
        } else if (attempts < maxAttempts) {
            attempts++;
            setTimeout(tryClick, delay);
        } else {
            console.error('Send button not enabled after retries.');
        }
    };
    tryClick();
}
