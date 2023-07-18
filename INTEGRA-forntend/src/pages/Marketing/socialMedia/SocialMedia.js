import { json, useLoaderData } from 'react-router-dom';
import SocialMediaList from '../../../components/Marketing/socialMedia/SocialMediaList';
import { getAuthToken } from '../../../hooks/auth';
import classes from './Socialmedia.module.scss';
const SocialMediaPage = () => {
  const { data: socialMedia } = useLoaderData();

  return (
    <div className={classes.socialmedia}>
      <SocialMediaList socialMedia={socialMedia} />
    </div>
  );
};

export default SocialMediaPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/socialMedia', {
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not fetch SocialMedia.' }, { status: 500 });
  } else {
    return response;
  }
}
