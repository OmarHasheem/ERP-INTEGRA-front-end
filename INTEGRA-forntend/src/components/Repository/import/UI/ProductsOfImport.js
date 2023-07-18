import React, { useState } from 'react';
import classes from '../ProductsToImportList.module.scss';
import { Link, useParams, useSubmit } from 'react-router-dom';

const ProductsOfImport = ({ products }) => {
  const submit = useSubmit();
  const formattedDetails = (details) => {
    return JSON.stringify(details)
      .replace(/[{}"]/g, ' ')
      .replace(/,/g, '\n')
      .replaceAll('\\', '');
  };

  const { importId } = useParams('importId');
  const [updatedProducts, setUpdatedProducts] = useState(products);

  const deleteHandler = (id) => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete', action:  `/repository/imports/import-detail/${importId}/${id}` });

      // Remove the deleted product from the updatedProducts array
      const updatedList = updatedProducts.filter((product) => product.id !== id);
      setUpdatedProducts(updatedList);
    }
  };

  return (
    <div className={classes.productsToImportList}>
      <table>
        <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Details</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        {updatedProducts.map((product) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.quantity}</td>
            <td>{product.price}</td>
            <td>
              <pre>{formattedDetails(product.details)}</pre>
            </td>
            <td>
              <button onClick={() => {deleteHandler(product.id)}} className={classes.finish_link}>Delete</button>
            </td>
          </tr>
        ))}
        </tbody>
        <tfoot>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Details</th>
          <th>Delete</th>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ProductsOfImport;
