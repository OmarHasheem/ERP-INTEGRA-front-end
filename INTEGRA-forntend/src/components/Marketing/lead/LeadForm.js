import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './LeadForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';

const LeadForm = ({ method, lead }) => {
  //const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <div className={classes.leadForm}>
      <Form method={method} className={classes.form}>
        <label htmlFor="type">Name :</label>
        <input
          id="type"
          type="text"
          name="type"
          required
          defaultValue={lead ? lead.type : ''}
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

export default LeadForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const eventData = {
    type: data.get('type'),
  };

  let url;

  if (method === 'PUT') {
    url = 'http://localhost:8000/marketing/leads/' + params.leadId;
  } else {
    url = 'http://localhost:8000/marketing/leads';
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
    throw json({ message: 'Could not save lead.' }, { status: 500 });
  }

  return redirect('/marketing/leads');
}
