import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import LeadItem from '../../../components/Marketing/lead/LeadItem';
import { getAuthToken } from '../../../hooks/auth';

const LeadDetailPage = () => {
  const { data: lead } = useRouteLoaderData('lead-detail');

  return <LeadItem lead={lead} />;
};

export default LeadDetailPage;

export async function loader({ request, params }) {
  const id = params.leadId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/leads/' + id, {
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected lead' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action({ request, params }) {
  const id = params.leadId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/leads' + id, {
    method: request.method,
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not delete Lead.' }, { status: 500 });
  }

  return redirect('/marketing/leads');
}
