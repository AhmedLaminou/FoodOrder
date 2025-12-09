// eslint-disable-next-line no-unused-vars
import React from 'react';
import TableList from '../Components/TableList';
import AssignTable from '../Components/AssignTable';

/*------------------------- CSS Files ---------------------------------------*/
import '../static/table.css';

const TablesPage = () => {
    return (
        <div className="container my-5" id="tablesPage">
            <h1>Page des Tables</h1>
            <div className="row">
                <div className="col-md-6">
                    <h2 className='text-center'>Tables Dispos</h2>
                    <TableList />
                </div>
                <div className="col-md-6">
                    <h2>Assigner une Table à une Réservation</h2>
                    <AssignTable />
                </div>
            </div>
        </div>
    );
};

export default TablesPage;
