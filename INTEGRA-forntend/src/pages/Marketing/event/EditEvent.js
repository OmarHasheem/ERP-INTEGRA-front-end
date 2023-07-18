import EventForm from '../../../components/Marketing/event/EventForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './editEvent.module.scss';
const EditEventPage = () => {
  const { data: event } = useRouteLoaderData('event-detail');

  return (
    <div className={classes.editEvent}>
      <h1> Marketing > Events > Edit {event.name} </h1>
      <EventForm method="put" event={event} />
    </div>
  );
};

export default EditEventPage;
