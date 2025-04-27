// content.js
(function () {
    const sidebarId = "deepseek-sidebar-container";
  
    function injectSidebar() {
      if (document.getElementById(sidebarId)) return; // avoid duplicates
  
      const sidebar = document.createElement("iframe");
      sidebar.id = sidebarId;
      sidebar.src = chrome.runtime.getURL("sidebar.html");
      sidebar.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        height: 100%;
        width: 320px;
        border: none;
        z-index: 9999;
        box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
      `;
      document.body.appendChild(sidebar);
    }
  
    if (window.location.hostname.includes("deepseek.com")) {
      injectSidebar();
    }
  })();
  