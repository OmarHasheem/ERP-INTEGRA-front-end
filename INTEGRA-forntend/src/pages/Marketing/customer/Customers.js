import { json, useLoaderData } from 'react-router-dom';
import CustomersList from '../../../components/Marketing/customer/CustomersList';
import { getAuthToken } from '../../../hooks/auth';
import './Customers.scss';
const CustomersPage = () => {
  const { data: customers } = useLoaderData();
  return (
    <div className="customer">
      <h1> Marketing > Customers </h1>
      <CustomersList customers={customers} />
    </div>
  );
};

export default CustomersPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/customers', {
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not fetch Customers.' }, { status: 500 });
  } else {
    return response;
  }
}
