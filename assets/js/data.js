// assets/js/data.js
// Full default data with stock quantity

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify([
    {
      id: 1,
      name: "Admin",
      email: "admin@shop.com",
      password: "admin123",
      role: "admin"
    }
  ]));
}

if (!localStorage.getItem('products')) {
  localStorage.setItem('products', JSON.stringify([
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 89.99,
      description: "Premium noise-cancelling wireless earbuds with 30h battery",
      image: "https://placehold.co/600x400/6a11cb/white?text=Wireless+Earbuds&fontsize=24",
      stock: 15
    },
    {
      id: 2,
      name: "Smart Watch",
      price: 199.00,
      description: "Fitness tracker with heart rate, GPS and notifications",
      image: "https://placehold.co/600x400/2575fc/white?text=Smart+Watch&fontsize=24",
      stock: 8
    },
    {
      id: 3,
      name: "Fast Phone Charger",
      price: 29.99,
      description: "65W USB-C PD fast charger",
      image: "https://placehold.co/600x400/9c27b0/white?text=Fast+Charger&fontsize=24",
      stock: 25
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 79.99,
      description: "Portable waterproof speaker with deep bass",
      image: "https://placehold.co/600x400/dc3545/white?text=Speaker&fontsize=24",
      stock: 12
    },
    {
      id: 5,
      name: "Laptop Stand",
      price: 49.99,
      description: "Ergonomic aluminum stand for 13-17 inch laptops",
      image: "https://placehold.co/600x400/198754/white?text=Laptop+Stand&fontsize=24",
      stock: 20
    },
    {
      id: 6,
      name: "Webcam 4K",
      price: 129.99,
      description: "Ultra HD webcam with autofocus and privacy cover",
      image: "https://placehold.co/600x400/0d6efd/white?text=4K+Webcam&fontsize=24",
      stock: 5
    }
  ]));
}

if (!localStorage.getItem('cart')) {
  localStorage.setItem('cart', JSON.stringify([]));
}

if (!localStorage.getItem('orders')) {
  localStorage.setItem('orders', JSON.stringify([]));
}

console.log("ShopHub initialized – stock, orders, and images ready!");