import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

import NavBar from './components/NavBar.jsx';
import ItemListContainer from './components/ItemListContainer.jsx';
import ItemDetailContainer from './components/ItemDetailContainer.jsx';
import CartPage from './components/CartPage.jsx';
import './index.css';
import './styles.css';

const App = () => {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="bg-gray-100 min-h-screen font-sans antialiased app-container">
          <NavBar />
          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<ItemListContainer greeting="Bienvenido a nuestra tienda online" />} />
              <Route path="/categoria/:categoriaId" element={<ItemListContainer greeting="Productos por Categoría" />} />
              <Route path="/item/:id" element={<ItemDetailContainer />} />
              <Route path="/carrito" element={<CartPage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </CartProvider>
  );
};

export default App;
