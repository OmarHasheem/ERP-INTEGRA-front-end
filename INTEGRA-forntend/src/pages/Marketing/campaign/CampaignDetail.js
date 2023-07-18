import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import CampaignItem from '../../../components/Marketing/campaign/CampaignItem';
import { getAuthToken } from '../../../hooks/auth';

const CampaignDetailPage = () => {
  const { data } = useRouteLoaderData('campaign-detail');

  return <CampaignItem campaign={data} />;
};

export default CampaignDetailPage;

export async function loader({ request, params }) {
  const id = params.campaignId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/marketing/campaigns/' + id,
    {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected campaigns' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.campaignId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/marketing/campaigns/' + id,
    {
      method: request.method,
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json({ message: 'Could not delete Campaign.' }, { status: 500 });
  }

  return redirect('/marketing/campaigns');
}
