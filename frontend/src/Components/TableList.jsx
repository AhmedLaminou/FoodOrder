import  { useEffect, useState } from 'react';
import '../static/table.css'; 
import reservationService from "../services/reservationService"

const TableList = () => {
    const [tables, setTables] = useState([]);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const date_time =  new Date().toISOString();
                const response = await reservationService.getAllTables(date_time);
                console.log("Réponse brute : ", response);
                console.log("Réponse data : ", response.data);

                if (!response.data || !Object.prototype.hasOwnProperty.call(response.data, 'available_tables') || !Array.isArray(response.data.available_tables)) {
                    throw new Error("La réponse de l'API n'est pas un JSON valide ou manque 'available_tables'");
                }

                setTables(response.available_tables || []);
            } catch (error) {
                alert('Erreur lors du chargement des tables.');
                console.error(error);
            }
        };
        fetchTables();
    }, []);

    return (
        <div className="container my-5" id="tableList">
            <h2>Liste des Tables</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Numéro</th>
                        <th scope="col">Capacité</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(tables) ? tables.map((table) => (
                        <tr key={table.id}>
                            <td>{table.id}</td>
                            <td>{table.table_number}</td>
                            <td>{table.seating_capacity}</td>
                        </tr>
                    )) : <tr><td colSpan="3">Aucune table disponible</td></tr>}
                </tbody>
            </table>
        </div>
    );
};

export default TableList;
