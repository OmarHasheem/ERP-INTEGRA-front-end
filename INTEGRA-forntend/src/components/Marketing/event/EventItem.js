import { Link, useSubmit } from 'react-router-dom';
import { Card } from '@mui/material';
import classes from './EventItem.module.scss';
import { useEffect, useState } from 'react';
import { useCampaign } from '../../../hooks/useApi';

const EventItem = ({ event }) => {
  const [campaign, setCampaign] = useState({});
  const submit = useSubmit();

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  const campaignResponse = useCampaign(event.campaign_id);

  useEffect(() => {
    setCampaign(campaignResponse);
  }, [campaignResponse]);

  return (
    <div className={classes.eventItem}>
      <h1> Marketing > Event Item > {event.name}</h1>
      <div className={classes.box}>
        <Card className={classes.card}>
          <div className={classes.cardItems}>
            <label>Name of Event</label>
            <p> {event.name} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Description of Event</label>
            <p> {event.description} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Place of Event :</label>
            <p> {event.place} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Type of Event :</label>
            <p> {event.type} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Cost of Event :</label>
            <p> {event.cost} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Expected Revenue of Event :</label>
            <p> {event.expected_revenue} </p>
          </div>
          <div className={classes.cardItems}>
            <label>Actual Revenue of Event :</label>
            <p> {event.actual_revenue} </p>
          </div>
          <div className={classes.btn}>
            <Link
              className={classes.linkbtn}
              to={`/marketing/events/event-detail/edit/${event.id}`}
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
            className={classes.linkbtn}
            to={`/marketing/campaigns/campaign-detail/${campaign.id}`}
          >
            Go To Campaign
          </Link>
        </div>
      </Card>
    </div>
  );
};

export default EventItem;
