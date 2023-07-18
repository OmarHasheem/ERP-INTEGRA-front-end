import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './CategoryForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';

const CategoryForm = ({ method, category }) => {
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
            defaultValue={category ? category.name : ''}
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

export default CategoryForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const categoryData = {
    name: data.get('name'),
  };

  let url;

  if (method === 'PUT') {
    url =
      'http://localhost:8000/repository/categories/' + params.categoryId;
  } else {
    url = 'http://localhost:8000/repository/categories';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify(categoryData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save category.' }, { status: 500 });
  }

  return redirect('/repository/categories');
}
