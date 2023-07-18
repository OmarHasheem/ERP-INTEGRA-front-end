import { useRef, useState } from 'react';
import { json, Link, redirect, useNavigate, useParams } from 'react-router-dom';
import classes from './ProductsToImportList.module.scss';
import { getAuthToken } from '../../../hooks/auth';

const ProductsToImport = ({ products }) => {
  const navigate = useNavigate();
  const [columnsToRemove, setColumnsToRemove] = useState([]);
  const stockRefs = useRef({});
  const { importId } = useParams();

  const formattedDetails = (details) => {
    return JSON.stringify(details)
      .replace(/[{}"]/g, ' ')
      .replace(/,/g, '\n');
  };

  const handleSave = async (productId, price) => {
    const token = getAuthToken();
    const stock = parseInt(stockRefs.current[productId].value);

    if (stock <= 0) {
      return;
    }

    const totalAmount = stock * price;

    const importData = {
      import_id: importId,
      product_details_id: productId,
      quantity: stock,
      total_amount: totalAmount
    };

    console.log(importData);

    const response = await fetch('http://localhost:8000/repository/prdoctsImports', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'bearer' + token
      },
      body: JSON.stringify(importData)
    });

    if (!response.ok) {
      throw await json({ message: 'Could not save import.' }, { status: 500 });
    }

    setColumnsToRemove((prevColumns) => [...prevColumns, productId]);
  };

  return (
    <div className={classes.productsToImportList}>
      <h1> Repository > Imports > Add Product To Import </h1>
      <div className={classes.add_import}>
        <Link
          className={classes.finish_link}
          to={`/repository/imports/import-detail/${importId}`}
        >
          Add Finished
        </Link>
      </div>
      <table>
        <thead>
        <tr>
          <th>Import Id</th>
          <th>Product</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Details</th>
          <th>Enter Stock</th>
          <th>Save</th>
        </tr>
        </thead>
        <tbody>
        {products.map((product) => (
          !columnsToRemove.includes(product.id) && (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.stock}</td>
              <td>{product.price}</td>
              <td>
                <pre>{formattedDetails(product.details)}</pre>
              </td>
              <td><input type='number' ref={ref => stockRefs.current[product.id] = ref} name='quantity' /></td>
              <td>
                <div className={classes.actions}>
                  <button onClick={() => handleSave(product.id, product.stock, product.price)}>Save</button>
                </div>
              </td>
            </tr>
          )
        ))}
        </tbody>
        <tfoot>
        <tr>
          <th>Import Id</th>
          <th>Product</th>
          <th>Stock</th>
          <th>Price</th>
          <th>Details</th>
          <th>Enter Stock</th>
          <th>Save</th>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default ProductsToImport;