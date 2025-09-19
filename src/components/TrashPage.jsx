// src/components/TrashPage.jsx
import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../firebaseconfig';
import { restoreFromTrash } from './trashFunctions';
import { Link } from 'react-router-dom';
import '../styles.css';
import '../index.css';

const TrashPage = () => {
    const [trashProducts, setTrashProducts] = useState([]);

    const fetchTrash = async () => {
        const q = query(collection(db, "productos"), where("deleted", "==", true));
        const snapshot = await getDocs(q);
        setTrashProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    useEffect(() => { fetchTrash(); }, []);

    const handleRestore = async (id) => { await restoreFromTrash(id); fetchTrash(); };

    return (
        <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">
            <h1 className="text-5xl font-extrabold text-center mb-8">Papelera</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {trashProducts.map(producto => (
                    <div key={producto.id} className="item-card">
                        <img src={producto.imagen} alt={producto.nombre} className="product-image" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{producto.nombre}</h3>
                        <p className="text-xl font-bold text-blue-700 mb-4">${producto.precio.toFixed(2)}</p>
                        <div className="flex justify-center gap-2">
                            <button
                                onClick={() => handleRestore(producto.id)}
                                className="details-button bg-green-500 hover:bg-green-600"
                            >
                                Restaurar
                            </button>
                            <Link to={`/item/${producto.id}`} className="details-button">Ver Detalles</Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mt-12">
                <Link to="/" className="back-button">Volver a la tienda</Link>
            </div>
        </div>
    );
};

export default TrashPage;
