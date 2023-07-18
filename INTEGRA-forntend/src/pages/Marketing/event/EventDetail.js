import { json, redirect, useRouteLoaderData } from 'react-router-dom';
import EventItem from '../../../components/Marketing/event/EventItem';
import { getAuthToken } from '../../../hooks/auth';

const EventDetailPage = () => {
  const { data:event } = useRouteLoaderData('event-detail');

  return <EventItem event={event} />;
};

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.eventId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/events/'+ id, {
    headers:{
      'Authorization': 'bearer' + token,
    }
  });

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected events' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}

export async function action ({request, params}) {
  const id = params.eventId;
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/marketing/events/' + id, {
    method: request.method,
    headers:{
      'Authorization' : 'bearer' + token,
    }
  });

  if(!response.ok) {
    throw json({message: "Could not delete Event."}, {status: 500});
  }

  return redirect('/marketing/events');
}