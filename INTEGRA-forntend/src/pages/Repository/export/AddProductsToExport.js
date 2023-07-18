import { json, redirect, useLoaderData } from 'react-router-dom';
import { getAuthToken } from '../../../hooks/auth';
import './Exports.scss';
import ProductsToExport from '../../../components/Repository/export/ProductsToExport';
const AddProductsToExportPage = () => {
  const { data: products } = useLoaderData();

  return (
    <div className="exports">
      <ProductsToExport products={products} />
    </div>
  );
};

export default AddProductsToExportPage;

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
