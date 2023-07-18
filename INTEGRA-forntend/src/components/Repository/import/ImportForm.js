import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation
} from 'react-router-dom';
import classes from './ImportForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';
import { useEffect, useState } from 'react';
import { useSuppliers } from '../../../hooks/useApi';

const ImportForm = ({ method, importItem }) => {
  const [suppliers, setSuppliers] = useState([]);
  // const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';


  const supplierResponse = useSuppliers();

  useEffect(() => {
    setSuppliers(supplierResponse);
  }, [supplierResponse]);
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
            defaultValue={importItem ? importItem.name : ''}
          />
        </p>
        <p>
          <label htmlFor='date'>Address</label>
          <input
            id='date'
            type='date'
            name='date'
            required
            defaultValue={importItem ? importItem.date : ''}
          />
        </p>
        <p>
          <label htmlFor='total_amount'>Total Amount</label>
          <input
            id='total_amount'
            type='number'
            name='total_amount'
            required
            defaultValue={importItem ? importItem.total_amount : ''}
          />
        </p>
        <p>
          <label htmlFor='supplierId'> Supplier </label>
          <select name='supplierId' id='supplierId'>
            <option value=''>--Choose an option--</option>
            {
              suppliers.map((supplier) => (
                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
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

export default ImportForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const importData = {
    name: data.get('name'),
    supplier_id: data.get('supplierId'),
    total_amount: data.get('total_amount'),
    date: data.get('date')
  };

  console.log(importData);

  let url;

  if (method === 'PUT') {
    url =
      'http://localhost:8000/repository/imports/' + params.importId;
  } else {
    url = 'http://localhost:8000/repository/imports';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token
    },
    body: JSON.stringify(importData)
  });

  if (!response.ok) {
    throw json({ message: 'Could not save import.' }, { status: 500 });
  }

  return redirect('/repository/imports');
}
