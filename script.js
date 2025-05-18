(function () {
  // Utility to create or update the badge
  function updateBadge(variantName) {
    let badge = document.getElementById('variant-badge');
    if (!badge) {
      badge = document.createElement('div');
      badge.id = 'variant-badge';
      badge.style.position = 'absolute';
      badge.style.top = '10px';
      badge.style.left = '10px';
      badge.style.background = 'rgba(0, 0, 0, 0.7)';
      badge.style.color = '#fff';
      badge.style.padding = '6px 12px';
      badge.style.borderRadius = '12px';
      badge.style.fontSize = '14px';
      badge.style.fontWeight = 'bold';
      badge.style.zIndex = '1000';
      badge.style.transition = 'all 0.3s ease';
      badge.style.pointerEvents = 'none';

      // Find main image wrapper
      const imageWrapper = document.querySelector('[class*="product__media"]') || document.querySelector('img[src*="/products/"]')?.parentElement;
      if (imageWrapper) {
        imageWrapper.style.position = 'relative'; // Ensure the container is positioned
        imageWrapper.appendChild(badge);
      }
    }

    badge.textContent = variantName;
    badge.style.opacity = '0';
    setTimeout(() => (badge.style.opacity = '1'), 50); // smooth fade-in
  }

  // Get the current selected variant name
  function getSelectedVariantName() {
    const activeButton = document.querySelector('[data-product-attribute="option1"] .is-selected') ||
                         document.querySelector('input[type="radio"]:checked + label') ||
                         document.querySelector('.variant-input input:checked + label');
    return activeButton ? activeButton.innerText.trim() : 'Default';
  }

  // Observe changes to variant buttons
  function initObserver() {
    const observer = new MutationObserver(() => {
      const name = getSelectedVariantName();
      updateBadge(name);
    });

    const config = { childList: true, subtree: true };

    const variantOptions = document.querySelector('[data-product-attribute="option1"]') || document.querySelector('.product-form__input');
    if (variantOptions) {
      observer.observe(variantOptions, config);
    }

    // Initial run
    const initialVariant = getSelectedVariantName();
    updateBadge(initialVariant);
  }

  // Wait for page content to load
  if (document.readyState === 'complete') {
    initObserver();
  } else {
    window.addEventListener('load', initObserver);
  }
})();
