// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert } from "react-bootstrap";

/*-------------------------------- Service Files ----------------------------------------------*/
import { getUserAddresses } from "../services/userService";

/*-------------------------------- CSS Files ----------------------------------------------*/
import "../static/user.css" ; 

/*-------------------------------- Components ----------------------------------------------*/
import Footer from "../Components/Footer";



const AddressList = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const data = await getUserAddresses();
                setAddresses(data.addresses);
                
            } catch (err) {
                setError("Erreur lors du chargement des adresses.");
                console.error("Erreur :", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    return (
        <>
        <div className="container mt-4" id="addressList">
            <h2 className="mb-3">Liste des adresses</h2>
            {loading && <Spinner animation="border" role="status" />} 
            {error && <Alert variant="danger">{error}</Alert>}
            {!loading && !error && (
                <Table striped bordered hover>
                    <thead className="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Utilisateur</th>
                            <th>Rue</th>
                            <th>Ville</th>
                            <th>Code Postal</th>
                            <th>Pays</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {addresses.map((address) => (
                            <tr key={address.addressId}>
                                <td>{address.addressId}</td>
                                <td>{address.username}</td>
                                <td>{address.street}</td>
                                <td>{address.city}</td>
                                <td>{address.postal_code}</td>
                                <td>{address.country}</td>
                                <td>{address.address_type}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
        <Footer />
        </>
    );
};

export default AddressList;
