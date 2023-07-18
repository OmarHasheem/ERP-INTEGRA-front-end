import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import EmailItem from '../../../components/Marketing/email/EmailItem';
import { getAuthToken } from '../../../hooks/auth';

const EmailDetailPage = () => {
  const {data:email} = useRouteLoaderData('email-detail');

  return <EmailItem email={email} />;
};

export default EmailDetailPage;

export async function loader({ request, params }) {
  const id = params.emailId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/emails'+ id, {
    headers:{
      'Authorization': 'bearer' + token,
    }
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected email' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action ({request, params}) {
  const id = params.emailId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/emails' + id, {
    method: request.method,
    headers:{
      'Authorization' : 'bearer' + token,
    }
  });

  if(!response.ok) {
    throw json({message: "Could not delete Email."}, {status: 500});
  }

  return redirect('/marketing/emails');
}