import { json, Link, redirect, useNavigate, useSubmit } from 'react-router-dom';
import classes from './ImportItem.module.scss';
import { useEffect, useState } from 'react';
import { Card } from '@mui/material';
import { useProductsofImport } from '../../../hooks/useApi';
import ProductsOfImport from './UI/ProductsOfImport';
import { getAuthToken } from '../../../hooks/auth';

const ImportItem = ({ importItem }) => {
    const [products, setProducts] = useState([]);
    const submit = useSubmit();
    const productResponse = useProductsofImport(importItem.id);

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
          const response = await fetch(`http://localhost:8000/pdfs/storeImport/${id}`, {
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
            link.download = importItem.name;
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
      <div className={classes.importItem}>
        <h1>Repository > Imports > {importItem.name}</h1>
        <div className={classes.box}>
          <Card className={classes.card}>
            <div className={classes.cardItems}>
              <label>Name:</label>
              <p> {importItem.name} </p>
            </div>
            <div className={classes.cardItems}>
              <label>Date:</label>
              <p> {importItem.date} </p>
            </div>
            <div className={classes.cardItems}>
              <label>Total amount:</label>
              <p> {importItem.total_amount} </p>
            </div>
            <div className={classes.cardItems}>
              <label>Supplier:</label>
              <p><Link className={classes.supplierLink}
                       to={`repository/suppliers/supplier-detail/${importItem.supplier_id}`}>{importItem.supplier}</Link>
              </p>
            </div>
            <div className={classes.cardItems}>
              <label>Employee:</label>
              <p> {importItem.employee} </p>
            </div>
            <div className={classes.btn}>
              <Link
                className={classes.link}
                to={`/repository/imports/import-detail/edit/${importItem.id}`}
              >
                Edit
              </Link>
              <Link
                className={classes.link}
                to={`/repository/imports/import-detail/${importItem.id}/addProducts`}
              >
                Add Product To Import
              </Link>
              <button onClick={() => {
                generatePdfHandler(importItem.id);
              }}>Generate PDF
              </button>
              <button onClick={deleteHandler}>Delete</button>
            </div>
          </Card>
        </div>
        {products.length > 0 && <div>
          <ProductsOfImport products={products} />
        </div>}
      </div>
    );
  }
;

export default ImportItem;

export async function action({ request, params, history }) {
  const id = params.productId;
  const importId = params.importId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/repository/prdoctsImports/' + id, {
      method: 'delete',
      headers: {
        Authorization: 'bearer' + token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
  );

  if (!response.ok) {
    throw json({ message: 'Could not delete Import.' }, { status: 500 });
  }

  return redirect(`/repository/imports/import-detail/${importId}`);
}

