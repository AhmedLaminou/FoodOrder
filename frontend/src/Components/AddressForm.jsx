// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

/*----------------------- CSS Files ---------------------------*/
import "../static/order.css"
const AddressForm = ({ handleAddressSubmit }) => {
  const [address, setAddress] = useState('');

  const onSubmit = (e) => {
    e.preventDefault();
    handleAddressSubmit(address);
  };

  return (
    <div className="container" id="addressForm">
      <h2>Enter Delivery Address</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </div>
  );
};
AddressForm.propTypes = {
  handleAddressSubmit: PropTypes.func.isRequired,
};

export default AddressForm;

