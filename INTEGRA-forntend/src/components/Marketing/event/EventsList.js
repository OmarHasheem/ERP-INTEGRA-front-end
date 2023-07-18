import { Link, useNavigate } from 'react-router-dom';
import classes from './EventsList.module.scss';
const EventsList = ({ events }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.eventList}>
      <h1>Marketing > Events</h1>
      <table>
        <thead>
          <tr>
            <th>Event Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Place</th>
            <th>Cost</th>
            <th>Type</th>
            <th>Expected Revenue</th>
            <th>Actual Revenue</th>
            <th>Campaign Id</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr
              onClick={() =>
                navigate(`/marketing/events/event-detail/${event.id}`)
              }
              key={event.id}
            >
              <td>{event.id}</td>
              <td>{event.name}</td>
              <td>{event.description}</td>
              <td>{event.place}</td>
              <td>{event.cost}</td>
              <td>{event.type}</td>
              <td>{event.expected_revenue}</td>
              <td>{event.actual_revenue}</td>
              <td>
                <Link
                  className={classes.link}
                  to={`/marketing/campaigns/campaign-detail/${event.campaign_id}`}
                >
                  {event.campaign_id}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Event Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Place</th>
            <th>Cost</th>
            <th>Type</th>
            <th>Expected Revenue</th>
            <th>Actual Revenue</th>
            <th>Campaign Id</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default EventsList;
