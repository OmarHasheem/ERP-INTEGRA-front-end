import { json, Link, redirect, useSubmit } from 'react-router-dom';
import classes from './ExportItem.module.scss';
import tableClasses from '../product/ProductsList.module.scss';
import { useEffect, useState } from 'react';
import { useProductsOfExport } from '../../../hooks/useApi';
import { Card } from '@mui/material';
import { getAuthToken } from '../../../hooks/auth';
import ProductsOfExport from '../export/UI/ProductsOfExport';

const ExportItem = ({ exportItem }) => {
  const [products, setProducts] = useState([]);
  const submit = useSubmit();

  const productResponse = useProductsOfExport(exportItem.id);

  useEffect(() => {
    setProducts(productResponse);
  }, [productResponse]);

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  const generatePdfHandler = async (id) => {
    try {
      const proceed = window.confirm('Are you sure to generate pdf?');
      if (proceed) {
        const token = getAuthToken();

        const response = await fetch(`http://localhost:8000/pdfs/storeExport/${id}`, {
          method: 'post',
          headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/pdf',
            'Accept': 'application/pdf'
          }
        });
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = exportItem.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }
    } catch {
    }
  };

  return (
    <div className={classes.exportItem}>
      <h1>Repository > Exports > {exportItem.name}</h1>
      <div className={classes.box}>
        <Card className={classes.card}>
          <div className={classes.cardItems}>
            <label>Name:</label>
            <p> {exportItem.name} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Date:</label>
            <p> {exportItem.date} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Total amount:</label>
            <p> {exportItem.total_amount} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Customer:</label>
            <p><Link className={classes.customerLink}
                     to={`repository/cutomers/customer-detail/${exportItem.customer_id}`}>{exportItem.customer}</Link>
            </p>
          </div>
          <div className={classes.cardItems}>
            <label>Employee:</label>
            <p> {exportItem.employee} </p>
          </div>
          <div className={classes.btn}>
            <Link
              className={classes.link}
              to={`/repository/exports/export-detail/edit/${exportItem.id}`}
            >
              Edit
            </Link>
            <Link
              className={classes.link}
              to={`/repository/exports/export-detail/${exportItem.id}/addProducts`}
            >
              Add Product To Export
            </Link>
            <button onClick={() => {
              generatePdfHandler(exportItem.id);
            }}>Generate PDF
            </button>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        </Card>
      </div>
      {products.length > 0 && <div>
        <ProductsOfExport products={products} />
      </div>}
    </div>
  );
};

export default ExportItem;

export async function action({ request, params }) {
  const id = params.productId;
  const exportId = params.exportId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/repository/prdoctsExports/' + id, {
      method: 'delete',
      headers: {
        Authorization: 'bearer' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw json({ message: 'Could not delete Export.' }, { status: 500 });
  }

  return redirect(`/repository/exports/export-detail/${exportId}`);
}