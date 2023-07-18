import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './SocialMediaForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';

const SocialMediaForm = ({ method, socialMedia }) => {
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
        <label htmlFor="blogger">Blogger :</label>
        <input
          id="blogger"
          type="text"
          name="blogger"
          required
          defaultValue={socialMedia ? socialMedia.blogger : ''}
        />

        <label htmlFor="way">Way :</label>
        <input
          id="way"
          type="text"
          name="way"
          required
          defaultValue={socialMedia ? socialMedia.way : ''}
        />

        <label htmlFor="type">Type :</label>
        <select required name="type">
          <option value="Instagram" name="type">
            Instagram
          </option>
          <option value="Facebook" name="type">
            Facebook
          </option>
          <option value="Snapchat" name="type">
            Snapchat
          </option>
          <option value="Whatsapp" name="type">
            Whatsapp
          </option>
          <option value="Telegram" name="type">
            Telegram
          </option>
          <option value="TikTok" name="type">
            TikTok
          </option>
        </select>

        <label htmlFor="cost">Cost :</label>
        <input
          id="cost"
          type="number"
          name="cost"
          required
          defaultValue={socialMedia ? socialMedia.cost : ''}
        />
        <label>expected_revenue :</label>
        <input
          id="expected_revenue"
          type="text"
          name="expected_revenue"
          required
          defaultValue={socialMedia ? socialMedia.expected_revenue : ''}
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

export default SocialMediaForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();
  const campaignId = params.campaignId;

  const socialMediaData = {
    blogger: data.get('blogger'),
    type: data.get('type'),
    way: data.get('way'),
    cost: data.get('cost'),
    expected_revenue: data.get('expected_revenue'),
    campaign_id: campaignId,
  };

  let url;

  if (method === 'PUT') {
    url =
      'http://localhost:8000/marketing/socialMedia/' +
      params.socialMediaId;
  } else {
    url = 'http://localhost:8000/marketing/socialMedia';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify(socialMediaData),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save SocialMedia.' }, { status: 500 });
  }

  return redirect('/marketing/socialMedia');
}
