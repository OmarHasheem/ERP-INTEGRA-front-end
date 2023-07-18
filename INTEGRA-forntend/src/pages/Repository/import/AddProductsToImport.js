import { json, redirect, useLoaderData } from 'react-router-dom';
import { getAuthToken } from '../../../hooks/auth';
import './Imports.scss';
import ProductsToImport from '../../../components/Repository/import/ProductsToImport';
const AddProductsToImportPage = () => {
  const { data: products } = useLoaderData();

  return (
    <div className="imports">
      <ProductsToImport products={products} />
    </div>
  );
};

export default AddProductsToImportPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/repository/productDetails', {
    headers: {
      Authorization: 'bearer ' + token,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not fetch Products.' }, { status: 500 });
  } else {
    return response;
  }
}
