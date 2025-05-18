(function () {
  // Create the badge
  const badge = document.createElement('div');
  badge.id = 'variant-badge';
  badge.style.position = 'absolute';
  badge.style.top = '10px';
  badge.style.left = '10px';
  badge.style.backgroundColor = 'rgba(0, 128, 0, 0.85)';
  badge.style.color = 'white';
  badge.style.padding = '5px 10px';
  badge.style.borderRadius = '5px';
  badge.style.fontWeight = 'bold';
  badge.style.zIndex = 9999;
  badge.style.transition = 'all 0.3s ease';
  badge.style.fontFamily = 'Arial, sans-serif';

  // Append badge to main product image container
  const interval = setInterval(() => {
    const container = document.querySelector('.product__media'); // Adjust if necessary
    if (container && !document.querySelector('#variant-badge')) {
      container.style.position = 'relative';
      container.appendChild(badge);
      updateBadge(); // Initial update
      clearInterval(interval);
    }
  }, 500);

  // Update badge content based on selected variant
  function updateBadge() {
    const selected = document.querySelector('.product-form__input input[type=radio]:checked');
    if (selected) {
      const variantName = selected.value.trim();
      badge.textContent = variantName;
      badge.style.display = 'block';
    } else {
      badge.style.display = 'none';
    }
  }

  // Observe DOM for variant changes
  const observer = new MutationObserver(updateBadge);
  observer.observe(document.body, { childList: true, subtree: true });
})();
