import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './GroupForm.module.scss';
import { getAuthToken } from '../../../../../hooks/auth';

const GroupForm = ({ method, group }) => {
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
        <label htmlFor="name">Name :</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={group ? group.name : ''}
        />
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

export default GroupForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const groupData = {
    name: data.get('name'),
  };

  let url;

  if (method === 'PUT') {
    url =
      'http://localhost:8000/repository/products/attributeGroups/' + params.groupId;
  } else {
    url = 'http://localhost:8000/repository/products/attributeGroups';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify(groupData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save group.' }, { status: 500 });
  }

  return redirect('/repository/products/attributes/groups');
};
