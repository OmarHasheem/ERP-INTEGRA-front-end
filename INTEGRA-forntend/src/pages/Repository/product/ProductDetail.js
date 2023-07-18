import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import ProductItem from '../../../components/Repository/product/ProductItem';
import { getAuthToken } from '../../../hooks/auth';

const ProductDetailPage = () => {
  const { data } = useRouteLoaderData('product-detail');

  return <ProductItem product={data} />;
};

export default ProductDetailPage;

export async function loader({ request, params }) {
  const id = params.productId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/repository/products/' + id,
    {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected product' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.productId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/repository/products/' + id,
    {
      method: request.method,
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json({ message: 'Could not delete Product.' }, { status: 500 });
  }

  return redirect('/repository/products');
}
