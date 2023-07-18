import { Link, useSubmit } from 'react-router-dom';
import classes from './TVItem.module.scss';
import { Card } from '@mui/material';
import { useCampaign } from '../../../hooks/useApi';
import { useEffect, useState } from 'react';

const TVItem = ({ tv }) => {
  const [campaign, setCampaign] = useState({});
  const submit = useSubmit();

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  const campaignResponse = useCampaign(tv.campaign_id);

  useEffect(() => {
    setCampaign(campaignResponse);
  }, [campaignResponse]);

  return (
    <div className={classes.tvItem}>
      <h1> Marketing > TV Item > {tv.channel} </h1>
      <div className={classes.box}>
        <Card className={classes.card}>
          <div className={classes.cardItems}>
            <label>Channel of TV:</label>
            <p> {tv.channel} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Time to show on TV:</label>
            <p> {tv.time} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Cost:</label>
            <p> {tv.cost} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Advertising Period:</label>
            <p> {tv.advertising_period} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Expected Revenue of Event :</label>
            <p> {tv.expected_revenue} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Actual Revenue of Event :</label>
            <p> {tv.actual_revenue} </p>
          </div>
          <div className={classes.btn}>
            <Link
              className={classes.link}
              to={`/marketing/tvs/tv-detail/edit/${tv.id}`}
            >
              Edit
            </Link>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        </Card>
      </div>
        <Card className={classes.cardChildren}>
          <h1>Campaign: </h1>
          <div className={classes.cardItems}>
            <label>Name of Campaign :</label>
            <p> {campaign.name} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Description of Campaign :</label>
            <p> {campaign.description} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Start Date of Campaign :</label>
            <p> {campaign.start_date} </p>
          </div>
          <div className={classes.cardItems}>
            <label>End Date of Campaign :</label>
            <p> {campaign.end_date} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Budget of Campaign :</label>
            <p> {campaign.budget} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Expected Revenue of Campaign :</label>
            <p> {campaign.expected_revenue} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Actual Revenue of Campaign :</label>
            <p> {campaign.actual_revenue} </p>
          </div>
          <div className={classes.btn}>
            <Link
              className={classes.link}
              to={`/marketing/campaigns/campaign-detail/${campaign.id}`}
            >
              Go To Campaign
            </Link>
          </div>
        </Card>
    </div>
  );
};

export default TVItem;
