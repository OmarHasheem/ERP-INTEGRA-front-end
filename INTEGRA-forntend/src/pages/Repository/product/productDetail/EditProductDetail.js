import { json, useLoaderData } from 'react-router-dom';
import ProductDetailEditForm from '../../../../components/Repository/product/productDetail/ProductDetailEditForm';
import { getAuthToken } from '../../../../hooks/auth';
import classes from './EditProductDetail.module.scss'
const EditProductDetailPage = () => {
   const { data } = useLoaderData();
  return (
    <div className={classes.EditProductDetailPage}>
      <h1>Repository > Product > Edit Detail</h1>
      <ProductDetailEditForm method='put' detail={data}/>
    </div>
  );
};

export default EditProductDetailPage;


export async function loader({ request, params }) {
  const id = params.detailId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/repository/productDetails/' + id,
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