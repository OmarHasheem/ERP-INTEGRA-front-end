import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import SocialMediaItem from '../../../components/Marketing/socialMedia/SocialMediaItem';
import { getAuthToken } from '../../../hooks/auth';

const SocialMediaDetailPage = () => {
  const {data:socialMedia} = useRouteLoaderData('socialMedia-detail');

  return <SocialMediaItem socialMedia={socialMedia} />;
};

export default SocialMediaDetailPage;

export async function loader({ request, params }) {
  const id = params.socialMediaId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/socialMedia/'+ id, {
    headers:{
      'Authorization': 'bearer' + token,
    }
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected socialMedia' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action ({request, params}) {
  const id = params.socialMediaId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/socialMedia/' + id, {
    method: request.method,
    headers:{
      'Authorization' : 'bearer' + token,
    }
  });

  if(!response.ok) {
    throw json({message: "Could not delete SocialMedia."}, {status: 500});
  }

  return redirect('/marketing/socialMedia');
}