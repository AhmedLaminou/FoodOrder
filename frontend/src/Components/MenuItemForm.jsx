import  { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
/*--------------------------- CSS Files ----------------------------------------*/
import "../static/menu.css"
/*--------------------------- Services ---------------------------------------------*/
import { createMenuItem } from '../services/menuService';

const MenuItemForm = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [alertMessage, setAlertMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // eslint-disable-next-line no-unused-vars
            const response = await createMenuItem({ name, description, price });
            setAlertMessage({ type: 'success', message: 'Élément ajouté au menu avec succès !' });
        } catch (error) {
            setAlertMessage({ type: 'error', message: 'Erreur lors de l\'ajout de l\'élément au menu.' });
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="container my-5" id="menuItemForm">
            <h2>Ajouter un Élement au Menu</h2>
            {alertMessage && (
                <div className={`alert ${alertMessage.type === 'error' ? 'alert-danger' : 'alert-success'}`}>
                    {alertMessage.message}
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nom</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nom de l'élément"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Décrivez l'élément"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Prix</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Prix de l'élément"
                    />
                </div>
                <button type="submit" className="btn">Ajouter</button>
            </form>
        </div>
    );
};

export default MenuItemForm;
