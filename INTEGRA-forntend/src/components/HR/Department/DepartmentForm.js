import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './DepartmentForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';

const DepartmentForm = ({ method, department }) => {
  //const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <Form method={method} className={classes.form}>
      <div>
        <label htmlFor="name">Name :</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={department ? department.name : ''}
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

export default DepartmentForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const departmentData = {
    name: data.get('name'),
  };
  console.log(departmentData);
  let url;

  if (method === 'PUT') {
    url = 'http://localhost:8000/hr/departments/' + params.departmentId;
  } else {
    url = 'http://localhost:8000/hr/departments';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify(departmentData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save Departments.' }, { status: 500 });
  }

  return redirect('/hr/departments');
}
