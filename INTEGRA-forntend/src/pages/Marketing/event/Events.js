import { json, useLoaderData } from 'react-router-dom';
import EventsList from '../../../components/Marketing/event/EventsList';
import { getAuthToken } from '../../../hooks/auth';
import classes from './Event.module.scss';
const EventsPage = () => {
  const { data: events } = useLoaderData();

  return (
    <div className={classes.Events}>
      <EventsList events={events} />
    </div>
  );
};

export default EventsPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/events', {
    headers: {
      Authorization: 'bearer' + token,
    },
  });

  if (!response.ok) {
    throw json({ message: 'Could not fetch events.' }, { status: 500 });
  } else {
    return response;
  }
}
