import { Link, redirect, useNavigate } from 'react-router-dom';
import classes from './CampaignsList.module.scss';
const CampaignsList = ({ campaigns }) => {
  const navigate = useNavigate();

  return (
    <div className={classes.campaignsList}>
      <h1>Marketing > Campaigns</h1>
      <div className={classes.add_campaign}>
        <Link
          className={classes.add_campaign_link}
          to="/marketing/campaigns/new"
        >
          Add New Campaign
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Campaign Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Expected Revenue</th>
            <th>Actual Revenue</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr
              key={campaign.id}
              onClick={() =>
                navigate(`/marketing/campaigns/campaign-detail/${campaign.id}`)
              }
            >
              <td>{campaign.id}</td>
              <td>{campaign.name}</td>
              <td>{campaign.description}</td>
              <td>{campaign.start_date}</td>
              <td>{campaign.end_date}</td>
              <td>{campaign.budget}</td>
              <td>{campaign.status}</td>
              <td>{campaign.expected_revenue}</td>
              <td>{campaign.actual_revenue}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Campaign Id</th>
            <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Expected Revenue</th>
            <th>Actual Revenue</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default CampaignsList;
