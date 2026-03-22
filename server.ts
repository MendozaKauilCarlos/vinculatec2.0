import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';

const app = express();
app.use(express.json());

// --- Backend Data ---
const products = [
  { id: 1, name: 'Laptop Pro 15"', price: 1200, discount: 10, image: 'https://picsum.photos/seed/laptop/200/200' },
  { id: 2, name: 'Mouse Inalámbrico', price: 45, discount: 0, image: 'https://picsum.photos/seed/mouse/200/200' },
  { id: 3, name: 'Teclado Mecánico', price: 150, discount: 15, image: 'https://picsum.photos/seed/keyboard/200/200' },
  { id: 4, name: 'Monitor 4K 27"', price: 400, discount: 5, image: 'https://picsum.photos/seed/monitor/200/200' },
  { id: 5, name: 'Auriculares con Cancelación de Ruido', price: 250, discount: 20, image: 'https://picsum.photos/seed/headphones/200/200' },
];

const customers = [
  { id: 1, name: 'Carlos Mendoza', email: 'mendozakauilcarloseduardo@gmail.com' }
];

let cart: { productId: number, quantity: number }[] = [];

// --- Backend Logic ---
const calculateTotal = () => {
  let subtotal = 0;
  let total = 0;
  const items = cart.map(cartItem => {
    const product = products.find(p => p.id === cartItem.productId);
    if (product) {
      const discountAmount = (product.price * product.discount) / 100;
      const finalPrice = product.price - discountAmount;
      subtotal += product.price * cartItem.quantity;
      total += finalPrice * cartItem.quantity;
      return { ...product, quantity: cartItem.quantity, finalPrice };
    }
    return null;
  }).filter(Boolean);
  
  return { items, subtotal, total, discount: subtotal - total };
};

// --- API Routes ---
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/customers', (req, res) => {
  res.json(customers);
});

app.get('/api/cart', (req, res) => {
  res.json(calculateTotal());
});

app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  const existing = cart.find(item => item.productId === productId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }
  res.json(calculateTotal());
});

app.delete('/api/cart/:productId', (req, res) => {
  const productId = parseInt(req.params.productId);
  cart = cart.filter(item => item.productId !== productId);
  res.json(calculateTotal());
});

app.post('/api/cart/clear', (req, res) => {
  cart = [];
  res.json(calculateTotal());
});

app.post('/api/checkout', (req, res) => {
  const { cardNumber } = req.body;
  
  // Simulated card validation (Backend)
  const cleanCardNumber = cardNumber ? cardNumber.replace(/\D/g, '') : '';
  const isValidLength = cleanCardNumber.length === 16;
  const isVisaOrMastercard = cleanCardNumber.startsWith('4') || cleanCardNumber.startsWith('5');
  
  if (!isValidLength || !isVisaOrMastercard) {
    return res.status(400).json({ 
      success: false, 
      message: 'Número de tarjeta inválido. Debe tener 16 dígitos y empezar con 4 (Visa) o 5 (Mastercard).' 
    });
  }
  
  if (cart.length === 0) {
    return res.status(400).json({ success: false, message: 'El carrito está vacío.' });
  }
  
  // Clear cart on success
  cart = [];
  res.json({ success: true, message: '¡Compra realizada con éxito!' });
});

// --- Vite Middleware ---
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
