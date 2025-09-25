
document.addEventListener('DOMContentLoaded', function () {
  const productSelector = '.most-popular .col-lg-3.col-sm-6';
  const productCols = Array.from(document.querySelectorAll(productSelector));
  const sizeButtonsContainer = document.getElementById('sizeButtons');

  // Recopilar todas las tallas desde data-sizes
  const sizesSet = new Set();
  productCols.forEach(col => {
    const ds = (col.dataset.sizes || '').trim();
    if (!ds) return;
    ds.split(',').map(s => s.trim()).filter(Boolean).forEach(s => sizesSet.add(s));
  });

  // Helper: crear botón
  function createBtn(label, sizeValue) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'size-btn';
    btn.textContent = label;
    btn.dataset.size = sizeValue;
    return btn;
  }

  // Botón 'Todas'
  const allBtn = createBtn('Todas', 'all');
  allBtn.classList.add('active');
  sizeButtonsContainer.appendChild(allBtn);

  // Crear botones ordenados (numéricos si son números)
  const sizesArr = Array.from(sizesSet).sort((a,b) => {
    const na = Number(a), nb = Number(b);
    if (!isNaN(na) && !isNaN(nb)) return na - nb;
    return a.localeCompare(b);
  });
  sizesArr.forEach(s => sizeButtonsContainer.appendChild(createBtn(s, s)));

  // Filtrar función
  function filterBySize(size) {
    if (size === 'all') {
      productCols.forEach(c => c.classList.remove('d-none'));
      return;
    }
    productCols.forEach(c => {
      const ds = (c.dataset.sizes || '').split(',').map(x => x.trim());
      const match = ds.includes(size);
      if (match) c.classList.remove('d-none');
      else c.classList.add('d-none');
    });
  }

  // Delegación clicks en contenedor de botones
  sizeButtonsContainer.addEventListener('click', function (e) {
    const btn = e.target.closest('.size-btn');
    if (!btn) return;
    // togglear selección (single-select)
    const size = btn.dataset.size;
    // Si ya estaba activo y se clickea de nuevo, volver a 'all'
    if (btn.classList.contains('active')) {
      // reset a all
      Array.from(sizeButtonsContainer.querySelectorAll('.size-btn')).forEach(b => b.classList.remove('active'));
      allBtn.classList.add('active');
      filterBySize('all');
      return;
    }

    // marcar activo y desmarcar otros
    Array.from(sizeButtonsContainer.querySelectorAll('.size-btn')).forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // filtrar
    filterBySize(size);
  });

  // (Opcional) accesibilidad: filtrar con teclado (Enter / Space)
  sizeButtonsContainer.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') {
      const btn = e.target.closest('.size-btn');
      if (btn) {
        e.preventDefault();
        btn.click();
      }
    }
  });
});
