import { Link, useNavigate } from 'react-router-dom';
import classes from './SocialMediaList.module.scss';
const SocialMediasList = ({ socialMedia }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.socialMediaList}>
      <h1> Marketing > SocialMedia </h1>
      <table>
        <thead>
          <tr>
            <th>SocialMedia Id</th>
            <th>Blogger</th>
            <th>Type</th>
            <th>Way</th>
            <th>Cost</th>
            <th>Expected Revenue</th>
            <th>Actual Revenue</th>
            <th>Campaign id</th>
          </tr>
        </thead>
        <tbody>
          {socialMedia.map((socialMedia) => (
            <tr
              onClick={() =>
                navigate(
                  `/marketing/socialMedia/socialMedia-detail/${socialMedia.id}`
                )
              }
              key={socialMedia.id}
            >
              <td>{socialMedia.id}</td>
              <td>{socialMedia.blogger}</td>
              <td>{socialMedia.type}</td>
              <td>{socialMedia.way}</td>
              <td>{socialMedia.cost}</td>
              <td>{socialMedia.expected_revenue}</td>
              <td>{socialMedia.actual_revenue}</td>
              <td>
                <Link
                  className={classes.link}
                  to={`/marketing/campaigns/campaign-detail/${socialMedia.campaign_id}`}
                >
                  {socialMedia.campaign_id}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>SocialMedia Id</th>
            <th>Blogger</th>
            <th>Type</th>
            <th>Way</th>
            <th>Cost</th>
            <th>Expected Revenue</th>
            <th>Actual Revenue</th>
            <th>Campaign id</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default SocialMediasList;
