// Check if we are on the DeepSeek page and insert the sidebar
if (window.location.href.includes('deepseek.com')) {
    const iframe = document.createElement('iframe');
    iframe.src = chrome.runtime.getURL('sidebar.html');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.top = '0';
    iframe.style.width = '300px';
    iframe.style.height = '100%';
    iframe.style.border = 'none';
    iframe.style.zIndex = '10000';
    document.body.appendChild(iframe);
}
