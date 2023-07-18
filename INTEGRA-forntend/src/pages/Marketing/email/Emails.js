import { json, useLoaderData } from 'react-router-dom';
import EmailsList from '../../../components/Marketing/email/EmailsList';
import { getAuthToken } from '../../../hooks/auth';
import './Emails.scss';
const EmailsPage = () => {
  const { data: emails } = useLoaderData();
  return (
    <div className="email">
      <h1> Repository > Emails </h1>
      <EmailsList emails={emails} />
    </div>
  );
};

export default EmailsPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/emails', {
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not fetch Emails.' }, { status: 500 });
  } else {
    return response;
  }
}
