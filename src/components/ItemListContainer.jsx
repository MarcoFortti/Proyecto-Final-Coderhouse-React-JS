import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebaseconfig';
import '../styles.css';
import '../index.css';
import { useCart } from '../context/CartContext';

const ItemListContainer = ({ greeting }) => {
    const { categoriaId } = useParams();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        setLoading(true);
        const productosRef = collection(db, "productos");
        const q = categoriaId ? query(productosRef, where("categoria", "==", categoriaId)) : productosRef;

        getDocs(q)
            .then((resp) => {
                const productosDB = resp.docs
                    .map(doc => ({ id: doc.id, ...doc.data() }))
                    .filter(p => !p.deleted);
                setProductos(productosDB);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [categoriaId]);

    if (loading) return <div className="p-8 text-center text-xl text-gray-600 animate-pulse">Cargando productos...</div>;

    return (
        <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
            <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">{greeting}</h1>
                {categoriaId && (
                    <p className="text-xl text-gray-700 mt-4">
                        Explora nuestra colección exclusiva de <span className="font-bold text-blue-700">{categoriaId.charAt(0).toUpperCase() + categoriaId.slice(1)}</span>
                    </p>
                )}
            </div>
            {productos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                    {productos.map(producto => (
                        <div key={producto.id} className="item-card animate-fade-in">
                            <img src={producto.imagen} alt={producto.nombre} className="product-image" />
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{producto.nombre}</h3>
                            <p className="text-xl font-bold text-blue-700 mb-4">${producto.precio.toFixed(2)}</p>
                            <div className="flex justify-center gap-2">
                                <Link to={`/item/${producto.id}`} className="details-button blue">Ver Detalles</Link>
                                <button
                                    onClick={() => addToCart(producto)}
                                    className="details-button yellow"
                                >
                                    Agregar al carrito
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex-center flex-col text-xl text-gray-600 mt-20 animate-fade-in">
                    <p>No hay productos disponibles en esta categoría.</p>
                    <Link to="/" className="details-button blue mt-4">Volver a la tienda</Link>
                </div>
            )}
        </div>
    );
};

export default ItemListContainer;