import { json, useLoaderData } from 'react-router-dom';
import ProductsList from '../../../components/Repository/product/ProductsList';
import { getAuthToken } from '../../../hooks/auth';
import './Products.scss';
const ProductsPage = () => {
  const { data : products } = useLoaderData();

  return (
    <div className="products">
      <h1>Repository > Products</h1>
      <ProductsList products={products} />
    </div>
  );
};

export default ProductsPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/repository/products', {
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not fetch products.' }, { status: 500 });
  } else {
    return response;
  }
}
