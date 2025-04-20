let sidebarInitialized = false;
let sidebarVisible = false;

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "toggle_sidebar") {
    if (!sidebarInitialized) {
      initSidebar();
    } else {
      toggleSidebar();
    }
  }

  if (message.action === "show_notification") {
    alert("DeepSeek Assistant Sidebar only works on deepseek.com");
  }
});

function initSidebar() {
  const sidebarContainer = document.createElement('div');
  sidebarContainer.id = 'claude-sidebar-container';
  sidebarContainer.className = 'claude-sidebar';

  sidebarContainer.innerHTML = `
    <div class="claude-sidebar-header">
      <h3>Ask Deepseek ChatGPT a question</h3>
      <button id="claude-sidebar-close">&times;</button>
    </div>
    <div class="claude-sidebar-content">
      <textarea id="claude-question-input" placeholder="Type your question here..."></textarea>
      <button id="claude-submit-question" class="claude-submit-btn">Get Answer</button>
    </div>
  `;

  document.body.appendChild(sidebarContainer);

  document.getElementById('claude-sidebar-close').addEventListener('click', toggleSidebar);
  document.getElementById('claude-submit-question').addEventListener('click', submitQuestion);

  sidebarInitialized = true;
  sidebarVisible = true;
  sidebarContainer.classList.add('sidebar-visible');
}

function toggleSidebar() {
  const sidebar = document.getElementById('claude-sidebar-container');
  if (sidebar) {
    sidebarVisible = !sidebarVisible;
    sidebar.classList.toggle('sidebar-visible', sidebarVisible);
  }
}

function setReactTextareaValue(element, value) {
  const setter = Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set;
  setter.call(element, value);
  element.dispatchEvent(new Event('input', { bubbles: true }));
  element.focus();
}

async function clickWhenEnabled(button, maxAttempts = 5) {
  let attempts = 0;

  const attemptClick = async () => {
    attempts++;
    const disabled = button.disabled || button.getAttribute('aria-disabled') === 'true' || button.classList.contains('disabled');

    if (!disabled) {
      try {
        button.click();
        return true;
      } catch (e) {
        button.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        button.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        return true;
      }
    } else if (attempts < maxAttempts) {
      await new Promise(r => setTimeout(r, 500));
      return attemptClick();
    } else {
      return false;
    }
  };

  return attemptClick();
}

async function submitQuestion() {
  const text = document.getElementById('claude-question-input').value.trim();
  if (!text) return alert("Please enter a question.");

  const textarea = document.querySelector('#chat-input');
  const sendButton = document.querySelector('div[role="button"].\_7436101');

  if (!textarea || !sendButton) {
    return alert("Input field or send button not found.");
  }

  setReactTextareaValue(textarea, text);
  const clicked = await clickWhenEnabled(sendButton);

  if (clicked) {
    document.getElementById('claude-question-input').value = '';
  } else {
    alert("Could not click the send button.");
  }
}