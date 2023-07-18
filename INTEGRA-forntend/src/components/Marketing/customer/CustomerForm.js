import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './CustomerForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';

const CustomerForm = ({ method, customer }) => {
  //const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <div className={classes.customerForm}>
      <Form method={method} className={classes.form}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={customer ? customer.name : ''}
        />
        <label htmlFor="gender">Gender:</label>
        <select name="gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <label htmlFor="age">Age:</label>
        <input
          id="age"
          type="number"
          name="age"
          required
          defaultValue={customer ? customer.age : ''}
        />
        <label htmlFor="address">Address:</label>
        <input
          id="address"
          type="text"
          name="address"
          required
          defaultValue={customer ? customer.address : ''}
        />
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          defaultValue={customer ? customer.email : ''}
        />
        <label htmlFor="phone">Phone Number:</label>
        <input
          id="phone"
          type="number"
          name="phone"
          required
          defaultValue={customer ? customer.phone : ''}
        />
        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default CustomerForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const eventData = {
    name: data.get('name'),
    gender: data.get('gender'),
    age: data.get('age'),
    address: data.get('address'),
    email: data.get('email'),
    phone: data.get('phone'),
  };

  let url;

  if (method === 'PUT') {
    url = 'http://localhost:8000/marketing/customers/' + params.customerId;
  } else {
    url = 'http://localhost:8000/marketing/customers';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save customer.' }, { status: 500 });
  }

  return redirect('/marketing/customers');
}
