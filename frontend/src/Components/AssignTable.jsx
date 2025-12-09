import { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

/*--------------------- CSS Files ---------------------------------*/
import '../static/table.css';

/*------------------------------- Services ------------------------------------*/


const AssignTable = ({ reservationId }) => {
    const [tableId, setTableId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`/api/assign-table/${reservationId}/${tableId}/`);
            alert('Table assignée avec succès!');
        } catch (error) {
            alert('Erreur lors de l\'assignation de la table.');
            console.error('Erreur:', error);
        }
    };

    return (
        <div className="container my-5" id="assignTable">
            
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="tableId" className="form-label">ID de la Table</label>
                    <input
                        type="text"
                        className="form-control"
                        id="tableId"
                        value={tableId}
                        onChange={(e) => setTableId(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Assigner</button>
            </form>
        </div>
    );
};

AssignTable.propTypes = {
    reservationId: PropTypes.string.isRequired,
};

export default AssignTable;
