import { Link, useSubmit } from 'react-router-dom';
import classes from './SupplierItem.module.scss';
import tableClasses from '../product/ProductsList.module.scss';
import { useEffect, useState } from 'react';
import { useProductsBySupplier } from '../../../hooks/useApi';
import ProductsTable from '../product/UI/ProductsTable';
import { Card } from '@mui/material';

const SupplierItem = ({ supplier }) => {
  const [products, setProducts] = useState([]);
  const submit = useSubmit();

  const productResponse = useProductsBySupplier(supplier.id);

  useEffect(() => {
    setProducts(productResponse);
  }, [productResponse]);

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?' +
      'Deleting a supplier will also delete all associated products');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  return (
    <div className={classes.supplierItem}>
      <h1>Repository > Suppliers > {supplier.name}</h1>
      <div className={classes.box}>
        <Card className={classes.card}>
          <div className={classes.cardItems}>
            <label>Name:</label>
            <p> {supplier.name} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Address:</label>
            <p> {supplier.address} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Email:</label>
            <p> {supplier.email} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Phone Number:</label>
            <p> {supplier.phone_number} </p>
          </div>
          <div className={classes.btn}>
            <Link
              className={classes.link}
              to={`/repository/suppliers/supplier-detail/edit/${supplier.id}`}
            >
              Edit
            </Link>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        </Card>
      </div>
      <div className={tableClasses.productsList}>
        <ProductsTable products={products} />
      </div>
    </div>
  );
};

export default SupplierItem;
