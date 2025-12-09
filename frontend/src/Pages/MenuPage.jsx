// eslint-disable-next-line no-unused-vars
import React from 'react';
import { useParams } from 'react-router-dom';
import MenuItemList from "../Components/MenuItemList";
import "../static/menu.css";

const MenuPage = () => {
  const { categoryId } = useParams();

  return (
    <div>
      <h1 className='text-center text-bg-success'>Menu Items</h1>
      <MenuItemList categoryId={categoryId} />
    </div>
  );
};

export default MenuPage;
