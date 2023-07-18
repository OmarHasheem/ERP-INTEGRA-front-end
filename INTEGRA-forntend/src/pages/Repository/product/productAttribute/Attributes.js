import AttributesList from '../../../../components/Repository/product/productAttribute/attribute/AttributesList';
import { getAuthToken } from '../../../../hooks/auth';
import { json, useLoaderData } from 'react-router-dom';

const AttributesPage = () => {
  const { data } = useLoaderData();
  return (
    <div>
      <h1>Attributes Of Product</h1>
      <AttributesList attributes={data}/>
    </div>
  )
};

export default AttributesPage;

export async function loader () {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/repository/products/attributes', {
    headers: {
      Authorization: 'bearer' + token,
    }
  });

  if(!response.ok) {
    throw (json({ message: 'Could not fetch attributes of products.'}, {status: 500}));
  } else {
    return response;
  }
}