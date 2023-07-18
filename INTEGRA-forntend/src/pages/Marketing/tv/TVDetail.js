import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import TVItem from '../../../components/Marketing/tv/TVItem';
import { getAuthToken } from '../../../hooks/auth';


const TVDetailPage = () => {
  const data = useRouteLoaderData('tv-detail');

  return <TVItem tv={data.data} />;
};

export default TVDetailPage;

export async function loader({ request, params }) {
  const id = params.tvId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/tvs/'+ id, {
    headers:{
      'Authorization': 'bearer' + token,
    }
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected tvs' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action ({request, params}) {
  const id = params.tvId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/tvs/' + id, {
    method: request.method,
    headers:{
      'Authorization' : 'bearer' + token,
    }
  });

  if(!response.ok) {
    throw json({message: "Could not delete TV."}, {status: 500});
  }

  return redirect('/marketing/tvs');
}