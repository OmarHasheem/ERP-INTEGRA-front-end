import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import CustomerItem from '../../../components/Marketing/customer/CustomerItem';
import { getAuthToken } from '../../../hooks/auth';

const CustomerDetailPage = () => {
  const {data:customer} = useRouteLoaderData('customer-detail');

    return <CustomerItem customer={customer} />;
};

export default CustomerDetailPage;

export async function loader({ request, params }) {
  const id = params.customerId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/customers/'+ id, {
    headers:{
      'Authorization': 'bearer' + token,
    }
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected customer' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action ({request, params}) {
  const id = params.customerId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/customers' + id, {
    method: request.method,
    headers:{
      'Authorization' : 'bearer' + token,
    }
  });

  if(!response.ok) {
    throw json({message: "Could not delete Customer."}, {status: 500});
  }

  return redirect('/marketing/customers');
}