(function () {
    'use strict';

    const selector = '.listItem-bottomoverview.secondary';

    // CSS for expanded state
    const expandCSS = `
        .jf-expanded-overview {
            max-height: none !important;
            overflow: visible !important;
            -webkit-line-clamp: unset !important;
            text-overflow: initial !important;
        }
    `;

    function injectCSS() {
        if (document.getElementById('jf-expand-overview-style')) return;
        const styleElem = document.createElement('style');
        styleElem.id = 'jf-expand-overview-style';
        styleElem.textContent = expandCSS;
        document.head.appendChild(styleElem);
    }

    function applyClamp() {
        const nodes = document.querySelectorAll(selector);
        if (!nodes.length) return false;

        injectCSS();

        nodes.forEach(el => {
            if (el.dataset.jfClampApplied === "1") return;

            // Force your desired clamp styling
            el.style.maxHeight = "46.7598px";
            el.style.overflow = "hidden";
            el.style.textOverflow = "ellipsis";
            el.style.display = "-webkit-box";
            el.style.webkitBoxOrient = "vertical";
            el.style.webkitLineClamp = "3";

            // Toggle expansion on click
            el.addEventListener("click", function () {
                this.classList.toggle("jf-expanded-overview");
            });

            el.dataset.jfClampApplied = "1";
        });

        return true;
    }

    // Try immediately
    applyClamp();

    // Retry during dynamic page loads
    let attempts = 0;
    const maxAttempts = 200;
    const interval = setInterval(() => {
        attempts++;
        applyClamp();
        if (attempts >= maxAttempts) clearInterval(interval);
    }, 300);
})();
