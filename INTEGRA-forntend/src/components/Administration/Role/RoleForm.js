import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './RoleForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';

const RoleForm = ({ method, role }) => {
  const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();
  console.log(role);
  console.log(role);
  const isSubmitting = navigation.state === 'submitting';

  const cancelHandler = () => {
    navigate('../' + role.id);
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
        <label htmlFor="name">Name :</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={role ? role.name : ''}
        />

        {/* <label htmlFor="guard_name">Guard Name :</label>
        <input
          id="guard_name"
          type="text"
          name="guard_name"
          required
          defaultValue={role ? role.guard_name : ''}
        /> */}

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

export default RoleForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const roleData = {
    name: data.get('name'),
    guard_name: data.get('guard_name'),
  };
  console.log(roleData);
  let url;

  if (method === 'PUT') {
    url = 'http://localhost:8000/userManagement/roles/' + params.roleId;
  } else {
    url = 'http://localhost:8000/userManagement/roles';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify(roleData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save Roles.' }, { status: 500 });
  }

  return redirect('/userManagement/roles');
}
