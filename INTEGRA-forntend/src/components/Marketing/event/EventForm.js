import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './EventForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';

const EventForm = ({ method, event }) => {
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
          defaultValue={event ? event.name : ''}
        />

        <label htmlFor="description">Description :</label>
        <textarea
          id="description"
          name="description"
          rows="5"
          required
          defaultValue={event ? event.description : ''}
        />

        <label htmlFor="place">Place :</label>
        <input
          id="place"
          type="text"
          name="place"
          required
          defaultValue={event ? event.place : ''}
        />

        <label htmlFor="type">Type :</label>
        <input
          id="type"
          type="text"
          name="type"
          required
          defaultValue={event ? event.type : ''}
        />

        <label htmlFor="cost">Cost :</label>
        <input
          id="cost"
          type="number"
          name="cost"
          required
          defaultValue={event ? event.cost : ''}
        />
        <label>expected_revenue :</label>
        <input
          id="expected_revenue"
          type="text"
          name="expected_revenue"
          required
          defaultValue={event ? event.expected_revenue : ''}
        />
        <label>Actual Revenue :</label>
        <input
          id="actual_revenue  "
          type="text"
          name="actual_revenue"
          required
          defaultValue={event ? event.actual_revenue : ''}
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

export default EventForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();
  const campaignId = params.campaignId;


  const eventData = {
    name: data.get('name'),
    description: data.get('description'),
    cost: data.get('cost'),
    type: data.get('type'),
    place: data.get('place'),
    expected_revenue: data.get('expected_revenue'),
    actual_revenue: data.get('actual_revenue'),
    campaign_id: campaignId,
  };

  let url;

  if (method === 'PUT') {
    url = 'http://localhost:8000/marketing/events/' + params.eventId;
  } else {
    url = 'http://localhost:8000/marketing/events';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save event.' }, { status: 500 });
  }

  return redirect('/marketing/events');
}
