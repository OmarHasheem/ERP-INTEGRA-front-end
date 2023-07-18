import { Link, useNavigate } from 'react-router-dom';
import classes from './TVsList.module.scss';
const TVsList = ({ tvs }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.tvList}>
      <h1> Marketing > TVs </h1>
      <table>
        <thead>
          <tr>
            <th>TV Id</th>
            <th>Channel</th>
            <th>Time</th>
            <th>Cost</th>
            <th>Advertising Period</th>
            <th>Expected Revenue</th>
            <th>Actual Revenue</th>
            <th>Campaign Id</th>
          </tr>
        </thead>
        <tbody>
          {tvs.map((tv) => (
            <tr
              onClick={() => navigate(`/marketing/tvs/tv-detail/${tv.id}`)}
              key={tv.id}
            >
              <td>{tv.id}</td>
              <td>{tv.channel}</td>
              <td>{tv.time}</td>
              <td>{tv.cost}</td>
              <td>{tv.advertising_period}</td>
              <td>{tv.expected_revenue}</td>
              <td>{tv.actual_revenue}</td>
              <td>
                <Link
                  className={classes.link}
                  to={`/marketing/campaigns/campaign-detail/${tv.campaign_id}`}
                >
                  {' '}
                  {tv.campaign_id}{' '}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>TV Id</th>
            <th>Channel</th>
            <th>Time</th>
            <th>Cost</th>
            <th>Advertising Period</th>
            <th>Expected Revenue</th>
            <th>Actual Revenue</th>
            <th>Campaign Id</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TVsList;
