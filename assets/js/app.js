// assets/js/app.js
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

function loadNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  nav.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow fixed-top">
      <div class="container">
        <a class="navbar-brand fw-bold" href="index.html">ShopHub</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="nav">
          <ul class="navbar-nav ms-auto align-items-center">
            <li class="nav-item"><a class="nav-link" href="index.html">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="products.html">Products</a></li>
            <li class="nav-item"><a class="nav-link" href="cart.html">Cart (<span id="cart-count">0</span>)</a></li>

            <!-- My Orders Link - Only for logged in users -->
            ${currentUser ? `<li class="nav-item"><a class="nav-link" href="orders.html">My Orders</a></li>` : ''}

            <!-- Admin: Add Product -->
            ${currentUser?.role === 'admin' ? '<li class="nav-item"><a class="nav-link" href="add-product.html">Add Product</a></li>' : ''}

            <!-- Login / Logout -->
            ${currentUser ? 
              `<li class="nav-item dropdown">
                 <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                   Hi, ${currentUser.name}
                 </a>
                 <ul class="dropdown-menu">
                   <li><a class="dropdown-item" href="orders.html">My Orders</a></li>
                   <li><hr class="dropdown-divider"></li>
                   <li><a class="dropdown-item text-danger" href="#" onclick="logout()">Logout</a></li>
                 </ul>
               </li>` :
              `<li class="nav-item"><a class="nav-link" href="login.html">Login</a></li>`
            }
          </ul>
        </div>
      </div>
    </nav>
    <div style="height: 70px;"></div> <!-- Spacer for fixed navbar -->
  `;
  updateCartCount();
}

function updateCartCount() {
  const el = document.getElementById('cart-count');
  if (el) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    el.textContent = totalItems;
  }
}

function logout() {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('currentUser');
    currentUser = null;
    location.href = 'index.html';
  }
}

// ==================== AUTH ====================
function login(e) {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    location.href = 'index.html';
  } else {
    alert('Wrong email or password!');
  }
}

function register(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if (users.find(u => u.email === email)) {
    return alert('Email already exists!');
  }

  users.push({
    id: Date.now(),
    name,
    email,
    password,
    role: 'user'
  });

  localStorage.setItem('users', JSON.stringify(users));
  alert('Registration successful! Please login.');
  location.href = 'login.html';
}

// ==================== PRODUCTS ====================
function renderFeatured() {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const container = document.getElementById('featured-products');
  if (!container) return;

  container.innerHTML = products.slice(0, 6).map(p => `
    <div class="col-md-4 mb-4">
      <div class="card h-100 shadow-sm border-0">
        <img src="${p.image}" class="card-img-top product-img" alt="${p.name}">
        <div class="card-body text-center d-flex flex-column">
          <h5 class="card-title">${p.name}</h5>
          <p class="text-muted small">Stock: ${p.stock}</p>
          <p class="text-primary fw-bold fs-4">$${p.price}</p>
          <button class="btn btn-primary mt-auto" onclick="addToCart(${p.id})">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

function renderProducts() {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const container = document.getElementById('product-list') || document.getElementById('featured-products');
  if (!container) return;

  container.innerHTML = products.map(p => `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="card h-100 shadow-sm">
        <img src="${p.image}" class="card-img-top product-img">
        <div class="card-body d-flex flex-column">
          <h5>${p.name}</h5>
          <p class="text-muted small">In stock: <strong>${p.stock}</strong></p>
          <p class="text-muted">${p.description}</p>
          <h4 class="text-primary">$${p.price}</h4>
          <button class="btn btn-outline-primary mt-auto" onclick="addToCart(${p.id})" ${p.stock === 0 ? 'disabled' : ''}>
            ${p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
          ${currentUser?.role === 'admin' ? `
            <div class="mt-3">
              <a href="add-product.html?id=${p.id}" class="btn btn-sm btn-warning">Edit</a>
              <button onclick="deleteProduct(${p.id})" class="btn btn-sm btn-danger ms-2">Delete</button>
            </div>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const products = JSON.parse(localStorage.getItem('products') || '[]');
  const product = products.find(p => p.id === id);
  if (product.stock <= 0) return alert('Out of stock!');

  let cart = JSON.parse(localStorage.getItem('cart') || '[]');
  const item = cart.find(i => i.id === id);

  if (item) {
    if (item.qty >= product.stock) {
      alert(`Only ${product.stock} items available!`);
      return;
    }
    item.qty++;
  } else {
    cart.push({ id, qty: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  alert('Added to cart!');
}

function deleteProduct(id) {
  if (!confirm('Delete this product permanently?')) return;
  let products = JSON.parse(localStorage.getItem('products') || '[]');
  products = products.filter(p => p.id !== id);
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}

// ==================== CART ====================
function renderCart() { /* ... your existing renderCart from cart.html works fine ... */ }
function removeFromCart(id) { /* ... already in cart.html ... */ }

// Don't need to redefine functions that live only in specific pages (like in checkout.html/orders.html)

// Run on every page
document.addEventListener('DOMContentLoaded', () => {
  loadNavbar();

  // Auto-run page-specific functions if they exist
  if (typeof renderFeatured === 'function' && document.getElementById('featured-products')) renderFeatured();
  if (typeof renderProducts === 'function') renderProducts();
  if (typeof renderCart === 'function') renderCart();
});