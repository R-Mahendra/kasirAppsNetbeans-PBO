// ========================================================================
// PRODUCT EDIT
// ========================================================================

let editingProductId = null;

// ========================================================================
// EDIT PRODUCT
// ========================================================================

function editProduct(id) {
  const products = loadCustomProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    showToast("Produk tidak ditemukan!", "danger");
    return;
  }

  editingProductId = id;

  // Isi form
  document.getElementById("nama").value = product.nama;
  document.getElementById("price").value = product.price;
  document.getElementById("category").value = product.category;
  document.getElementById("img").value = product.img;

  // Preview gambar
  const preview = document.getElementById("imgPreview");
  const placeholder = document.getElementById("imgPlaceholder");

  if (preview) {
    preview.src = product.img;
    preview.classList.remove("d-none");
  }

  if (placeholder) {
    placeholder.classList.add("d-none");
  }

  // Ganti tulisan tombol
  const btn = document.getElementById("btnAddProduct");

  if (btn) {
    btn.innerHTML = `
      Update Produk
      <i class="bi bi-pencil-square"></i>
    `;
  }

  // Scroll ke form
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ========================================================================
// UPDATE PRODUCT
// ========================================================================

function updateProduct(nama, price, img, category) {
  let products = loadCustomProducts();

  const index = products.findIndex(
    (p) => p.id === editingProductId
  );

  if (index === -1) {
    showToast("Produk tidak ditemukan!", "danger");
    return false;
  }

  // Cek duplikat selain produk yang sedang diedit
  const duplicate = products.some(
    (p) =>
      p.id !== editingProductId &&
      p.nama.toLowerCase() === nama.toLowerCase() &&
      p.category === category
  );

  if (duplicate) {
    showToast(
      `Produk "${nama}" sudah ada di kategori ${category}!`,
      "warning"
    );
    return false;
  }

  products[index] = {
    ...products[index],
    nama,
    price: Number(price),
    img: img || "/static/default.jpg",
    category,
  };

  saveCustomProducts(products);

  cancelEdit();

  renderProductTable();

  showToast(
    `Produk "${nama}" berhasil diperbarui!`,
    "success"
  );

  return true;
}

// ========================================================================
// CANCEL EDIT
// ========================================================================

function cancelEdit() {
  editingProductId = null;

  const form = document.getElementById("addProductForm");

  if (form) {
    form.reset();
  }

  const preview = document.getElementById("imgPreview");
  const placeholder = document.getElementById("imgPlaceholder");

  if (preview) {
    preview.classList.add("d-none");
    preview.src = "";
  }

  if (placeholder) {
    placeholder.classList.remove("d-none");
  }

  const btn = document.getElementById("btnAddProduct");

  if (btn) {
    btn.innerHTML = `
      Tambah Produk
      <i class="bi bi-plus-circle"></i>
    `;
  }
}