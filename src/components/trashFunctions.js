// src/components/trashFunctions.js
import { db } from '../firebaseconfig';
import { doc, updateDoc } from "firebase/firestore";

export const deleteToTrash = async (productId) => {
  try {
    const productRef = doc(db, "productos", productId);
    await updateDoc(productRef, { deleted: true });
  } catch (error) {
    console.error("Error al mover a la papelera:", error);
  }
};

export const restoreFromTrash = async (productId) => {
  try {
    const productRef = doc(db, "productos", productId);
    await updateDoc(productRef, { deleted: false });
  } catch (error) {
    console.error("Error al restaurar:", error);
  }
};
