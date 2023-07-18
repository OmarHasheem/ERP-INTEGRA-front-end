import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './EmailForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';

const EmailForm = ({ method, email }) => {
  //const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <Form method={method} className={classes.emailForm}>
      <div>
        <label htmlFor="type">Name :</label>
        <input
          id="type"
          type="text"
          name="type"
          required
          defaultValue={email ? email.type : ''}
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

export default EmailForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const eventData = {
    type: data.get('type'),
  };

  let url;

  if (method === 'PUT') {
    url = 'http://localhost:8000/marketing/emails/' + params.emailId;
  } else {
    url = 'http://localhost:8000/marketing/emails';
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
    throw json({ message: 'Could not save email.' }, { status: 500 });
  }

  return redirect('/marketing/emails');
}
