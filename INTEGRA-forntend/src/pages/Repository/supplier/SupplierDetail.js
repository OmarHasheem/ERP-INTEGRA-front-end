import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import SupplierItem from '../../../components/Repository/supplier/SupplierItem';
import { getAuthToken } from '../../../hooks/auth';

const SupplierDetailPage = () => {
  const { data } = useRouteLoaderData('supplier-detail');

  return <SupplierItem supplier={data} />;
};

export default SupplierDetailPage;

export async function loader({ request, params }) {
  const id = params.supplierId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/repository/suppliers/' + id,
    {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected suppliers' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.supplierId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/repository/suppliers/' + id,
    {
      method: request.method,
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json({ message: 'Could not delete Supplier.' }, { status: 500 });
  }

  return redirect('/repository/suppliers');
}
