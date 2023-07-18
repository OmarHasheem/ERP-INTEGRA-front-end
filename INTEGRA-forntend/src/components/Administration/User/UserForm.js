import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './UserForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';

const UserForm = ({ method, user }) => {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  console.log(user);
  console.log(user);
  const isSubmitting = navigation.state === 'submitting';

  const cancelHandler = () => {
    navigate('../' + user.id);
  };

  return (
    <Form method={method} className={classes.form}>
      <div>
        {/* {data && data.errors && (
              <ul>
                {Object.values(data.errors).map((err) => (
                  <li key={err}> {err} </li>
                ))}
              </ul>
            )} */}
        <label htmlFor="fullName">Fullname :</label>
        <input
          id="fullName"
          type="text"
          name="fullName"
          required
          defaultValue={user ? user.fullName : ''}
        />

        <label htmlFor="username">Username :</label>
        <input
          id="username"
          type="text"
          name="username"
          required
          defaultValue={user ? user.username : ''}
        />

        <label htmlFor="email">Email :</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          defaultValue={user ? user.email : ''}
        />

        <label htmlFor="password">Password :</label>
        <input
          id="password"
          type="password"
          name="password"
          required
          defaultValue={user ? user.password : ''}
        />

        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
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

export default UserForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const userData = {
    fullName: data.get('fullName'),
    username: data.get('username'),
    email: data.get('email'),
    password: data.get('password'),
    employee_id: data.get('employee_id'),
  };
  console.log(userData);
  let url;

  if (method === 'PUT') {
    url = 'http://localhost:8000/userManagement/users/' + params.userId;
  } else {
    url = 'http://localhost:8000/userManagement/users';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save Users.' }, { status: 500 });
  }

  return redirect('/userManagement/users');
}
