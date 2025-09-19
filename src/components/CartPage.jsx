import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
    const { cartItems, clearCart, removeFromCart } = useCart();

    return (
        <div className="p-8">
            <h1 className="text-5xl font-extrabold mb-8 text-center animate-fade-in">Mi Carrito</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-xl text-gray-600 mt-10 animate-fade-in">El carrito está vacío</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map(item => (
                        <div key={item.id} className="cart-product-card animate-fade-in">
                            <div className="flex items-center gap-4 flex-grow">
                                <img src={item.imagen} alt={item.nombre} className="cart-product-image"/>
                                <div>
                                    <h3 className="text-xl font-bold">{item.nombre}</h3>
                                    <p className="text-gray-600">${item.precio.toFixed(2)} x {item.quantity}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="details-button red"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))}
                    <div className="cart-buttons-container animate-fade-in">
                        <button
                            onClick={clearCart}
                            className="details-button blue"
                        >
                            Vaciar Carrito
                        </button>
                        <Link to="/" className="details-button gray">Volver a la tienda</Link>
                        {/* Botón de Checkout ficticio */}
                        <button
                            className="details-button yellow"
                        >
                           Ir al Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;