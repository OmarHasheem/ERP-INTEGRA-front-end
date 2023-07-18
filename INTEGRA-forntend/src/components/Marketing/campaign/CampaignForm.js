import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './CampaignForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';

const CampaignForm = ({ method, campaign }) => {
  // const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <div className={classes.campaignForm}>
      <Form method={method} className={classes.form}>
        <p>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            required
            defaultValue={campaign ? campaign.name : ''}
          />
        </p>
        <p>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            rows="5"
            required
            defaultValue={campaign ? campaign.description : ''}
          />
        </p>
        <p>
          <label htmlFor="start_date">Start Date</label>
          <input
            id="start_date"
            type="date"
            name="start_date"
            required
            defaultValue={campaign ? campaign.start_date : ''}
          />
        </p>
        <p>
          <label htmlFor="end_date">End Date</label>
          <input
            id="end_date"
            type="date"
            name="end_date"
            required
            defaultValue={campaign ? campaign.end_date : ''}
          />
        </p>
        <p>
          <label htmlFor="budget">Budget</label>
          <input
            id="budget"
            type="number"
            name="budget"
            required
            defaultValue={campaign ? campaign.budget : ''}
          />
        </p>
        <p>
          <label htmlFor="expected_revenue">Expected Revenue</label>
          <input
            id="expected_revenue"
            type="text"
            name="expected_revenue"
            required
            defaultValue={campaign ? campaign.expected_revenue : ''}
          />
        </p>
        <p>
          <label htmlFor="actual_revenue">Actual Revenue</label>
          <input
            id="actual_revenue"
            type="text"
            name="actual_revenue"
            required
            defaultValue={campaign ? campaign.actual_revenue : ''}
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
      </Form>
    </div>
  );
};

export default CampaignForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const campaignData = {
    name: data.get('name'),
    description: data.get('description'),
    start_date: data.get('start_date'),
    end_date: data.get('end_date'),
    budget: data.get('budget'),
    expected_revenue: data.get('expected_revenue'),
    actual_revenue: data.get('actual_revenue'),
  };

  let url;

  if (method === 'PUT') {
    url =
      'http://localhost:8000/marketing/campaigns/' + params.campaignId;
  } else {
    url = 'http://localhost:8000/marketing/campaigns';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify(campaignData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save campaign.' }, { status: 500 });
  }

  return redirect('/marketing/campaigns');
}
