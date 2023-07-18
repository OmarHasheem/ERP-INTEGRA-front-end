import { json, useLoaderData } from 'react-router-dom';
import LeadsList from '../../../components/Marketing/lead/LeadsList';
import { getAuthToken } from '../../../hooks/auth';
import './Leads.scss';
const LeadsPage = () => {
  const { data: leads } = useLoaderData();

  return (
    <div className="lead">
      <LeadsList leads={leads} />
    </div>
  );
};

export default LeadsPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/leads', {
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not fetch Leads.' }, { status: 500 });
  } else {
    return response;
  }
}
