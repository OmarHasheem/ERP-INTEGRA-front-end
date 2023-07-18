import CampaignForm from '../../../components/Marketing/campaign/CampaignForm';
import classes from './newCampaign.module.scss';
const NewCampaignPage = () => {
  return (
    <div className={classes.newCampaign}>
      <h1>Marketing > Campaigns > Create New Campaign </h1>
      <CampaignForm method="post" />
    </div>
  );
};

export default NewCampaignPage;
