import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './TVForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';

const TVForm = ({ method, tv }) => {
  //const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <Form method={method} className={classes.form}>
      <div className={classes.box}>
        <label className={classes.label}>Channel Name :</label>
        <input
          id="channel"
          type="text"
          name="channel"
          required
          defaultValue={tv ? tv.channel : ''}
        />

        <label>Time :</label>
        <input
          id="time"
          name="time"
          type="time"
          required
          defaultValue={tv ? tv.time : ''}
        />

        <label>Cost :</label>
        <input
          id="cost"
          type="number"
          name="cost"
          required
          defaultValue={tv ? tv.cost : ''}
        />

        <label>Advertising Period :</label>
        <input
          id="advertising_period"
          type="number"
          name="advertising_period"
          required
          defaultValue={tv ? tv.advertising_period : ''}
        />
        <label>expected_revenue :</label>
        <input
          id="expected_revenue"
          type="text"
          name="expected_revenue"
          required
          defaultValue={tv ? tv.expected_revenue : ''}
        />
        <label>Actual Revenue :</label>
        <input
          id="actual_revenue  "
          type="text"
          name="actual_revenue"
          required
          defaultValue={tv ? tv.actual_revenue : ''}
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

export default TVForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();
  const campaignId = params.campaignId;

  const tvData = {
    channel: data.get('channel'),
    time: data.get('time'),
    cost: data.get('cost'),
    advertising_period: data.get('advertising_period'),
    expected_revenue: data.get('expected_revenue'),
    actual_revenue: data.get('actual_revenue'),
    campaign_id: campaignId,
  };

  let url;

  if (method === 'PUT') {
    url = 'http://localhost:8000/marketing/tvs/' + params.tvId;
  } else {
    url = 'http://localhost:8000/marketing/tvs';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify(tvData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save TV.' }, { status: 500 });
  }

  return redirect('/marketing/tvs');
}
