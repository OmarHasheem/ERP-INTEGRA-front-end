import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation
} from 'react-router-dom';
import classes from './ExportForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';
import { useEffect, useState } from 'react';
import { useCustomers } from '../../../hooks/useApi';

const ExportForm = ({ method, exportItem }) => {
  const [customers, setCustomers] = useState([]);
  // const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';


  const customerResponse = useCustomers();

  useEffect(() => {
    setCustomers(customerResponse);
  }, [customerResponse]);
  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    
      <Form method={method} className={classes.form}>
        <div>
        <p>
          <label htmlFor='name'>Name</label>
          <input
            id='name'
            type='text'
            name='name'
            required
            defaultValue={exportItem ? exportItem.name : ''}
          />
        </p>
        <p>
          <label htmlFor='date'>Address</label>
          <input
            id='date'
            type='date'
            name='date'
            required
            defaultValue={exportItem ? exportItem.date : ''}
          />
        </p>
        <p>
          <label htmlFor='total_amount'>Total Amount</label>
          <input
            id='total_amount'
            type='number'
            name='total_amount'
            required
            defaultValue={exportItem ? exportItem.total_amount : ''}
          />
        </p>
        <p>
          <label htmlFor='customerId'> Customer </label>
          <select name='customerId' id='customerId'>
            <option value=''>--Choose an option--</option>
            {
              customers.map((customer) => (
                <option key={customer.id} value={customer.id}>{customer.name}</option>
              ))}
          </select>
        </p>
        <div className={classes.actions}>
          <button onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
    </div>
      </Form>
  );
};

export default ExportForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const exportData = {
    name: data.get('name'),
    customer_id: data.get('customerId'),
    total_amount: data.get('total_amount'),
    date: data.get('date')
  };

  console.log(exportData);

  let url;

  if (method === 'PUT') {
    url =
      'http://localhost:8000/repository/exports/' + params.exportId;
  } else {
    url = 'http://localhost:8000/repository/exports';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token
    },
    body: JSON.stringify(exportData)
  });

  if (!response.ok) {
    throw json({ message: 'Could not save export.' }, { status: 500 });
  }

  return redirect('/repository/exports');
}
