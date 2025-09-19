import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebaseconfig';
import '../styles.css';
import '../index.css';
import { useCart } from '../context/CartContext';

const ItemDetailContainer = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        setLoading(true);
        const docRef = doc(db, "productos", id);

        getDoc(docRef)
            .then(resp => {
                if (resp.exists()) {
                    setProducto({ id: resp.id, ...resp.data() });
                } else {
                    setProducto(null);
                }
            })
            .catch(err => { console.error(err); setProducto(null); })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div className="p-8 text-center text-xl text-gray-600 animate-pulse">Cargando producto...</div>;
    if (!producto) return <div className="p-8 text-center text-xl text-red-600">¡Ups! Producto no encontrado.</div>;

    return (
        <div className="p-8 bg-white rounded-2xl shadow-3xl max-w-4xl mx-auto mt-16 transform scale-98 hover:scale-100 transition-transform duration-500 ease-in-out flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-12">
            <div className="md:w-1/2 flex justify-center">
                <img src={producto.imagen} alt={producto.nombre} className="detail-image" />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
                <h2 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">{producto.nombre}</h2>
                <p className="text-gray-700 mb-3 text-xl">Categoría: <span className="font-semibold text-indigo-600">{producto.categoria.charAt(0).toUpperCase() + producto.categoria.slice(1)}</span></p>
                <p className="text-4xl font-bold text-blue-700 mb-6">${producto.precio.toFixed(2)}</p>
                <p className="text-gray-800 leading-relaxed text-lg mb-8">{producto.descripcion}</p>
                <div className="flex gap-2 justify-center md:justify-start">
                    <button
                        onClick={() => addToCart(producto)}
                        className="details-button bg-yellow-500 hover:bg-yellow-600"
                    >
                        Agregar al carrito
                    </button>
                    <Link to="/" className="back-button">Volver a la tienda</Link>
                </div>
            </div>
        </div>
    );
};

export default ItemDetailContainer;
