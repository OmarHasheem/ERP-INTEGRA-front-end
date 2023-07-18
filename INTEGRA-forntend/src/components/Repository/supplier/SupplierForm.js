import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './SupplierForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';

const SupplierForm = ({ method, supplier }) => {
  // const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
      <Form method={method} className={classes.form}>
        <div>
        <p>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            defaultValue={supplier ? supplier.name : ''}
          />
        </p>
        <p>
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            required
            defaultValue={supplier ? supplier.address : ''}
          />
        </p>
        <p>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            defaultValue={supplier ? supplier.email : ''}
          />
        </p>
        <p>
          <label htmlFor="phone_number">Phone Number</label>
          <input
            id="phone_number"
            type="number"
            name="phone_number"
            required
            defaultValue={supplier ? supplier.phone_number : ''}
          />
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

export default SupplierForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const supplierData = {
      name: data.get('name'),
      address: data.get('address'),
      email: data.get('email'),
      phone_number: data.get('phone_number'),
  };

  let url;

  if (method === 'PUT') {
    url =
      'http://localhost:8000/repository/suppliers/' + params.supplierId;
  } else {
    url = 'http://localhost:8000/repository/suppliers';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify(supplierData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save supplier.' }, { status: 500 });
  }

  return redirect('/repository/suppliers');
}
