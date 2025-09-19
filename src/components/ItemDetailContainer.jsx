import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useCart } from '../context/CartContext';
import '../styles.css'; // Asegúrate de que esta línea esté presente

const ItemDetail = () => {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const db = getFirestore();
    const productoRef = doc(db, "productos", id);

    getDoc(productoRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProducto({ id: snapshot.id, ...snapshot.data() });
        } else {
          console.log("No se encontró el producto.");
        }
      })
      .catch((error) => {
        console.error("Error al obtener el documento:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="p-8 text-center text-xl text-gray-600 animate-pulse">Cargando detalles del producto...</div>;
  }

  if (!producto) {
    return <div className="text-center text-xl text-gray-600 mt-10">Producto no encontrado.</div>;
  }

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="flex-center flex-col item-detail-container animate-fade-in">
        <h1 className="text-4xl font-bold mb-4">{producto.nombre}</h1>
        <img src={producto.imagen} alt={producto.nombre} className="product-image mb-6" />
        <p className="text-gray-700 text-lg mb-4">{producto.descripcion}</p>
        <p className="text-2xl font-bold text-blue-700 mb-6">${producto.precio.toFixed(2)}</p>
        
        <div className="flex justify-center gap-4">
          <button
            onClick={() => addToCart(producto)}
            className="details-button yellow"
          >
            Agregar al carrito
          </button>
          <Link to="/" className="details-button blue">Volver a la tienda</Link>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;