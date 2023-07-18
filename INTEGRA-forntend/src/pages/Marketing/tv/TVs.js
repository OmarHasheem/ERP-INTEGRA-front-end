import { json, useLoaderData } from 'react-router-dom';
import TVsList from '../../../components/Marketing/tv/TVsList';
import { getAuthToken } from '../../../hooks/auth';
import classes from './tv.module.scss';
const TVsPage = () => {
  const data = useLoaderData();

  const tvs = data.data;
  return (
    <div className={classes.tv}>
      <TVsList tvs={tvs} />
    </div>
  );
};

export default TVsPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/tvs', {
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not fetch tvs.' }, { status: 500 });
  } else {
    return response;
  }
}
