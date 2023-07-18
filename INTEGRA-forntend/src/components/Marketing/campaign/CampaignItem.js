import { Link, useSubmit, json } from 'react-router-dom';
import classes from './CampaignItem.module.scss';
import { Card } from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import { getAuthToken } from '../../../hooks/auth';
import {
  useEvents,
  useLeadsOfCampaign,
  useSocialMedia,
  useTvs
} from '../../../hooks/useApi';
import UpdateLeadsOfCampaign from './UI/UpdateLeadsOfCampaign';


const CampaignItem = ({ campaign }) => {
  const [campaignDetail, setCampaignDetail] = useState({
    events: [],
    tvs: [],
    socialMedia: [],
    leads: []
  });

  const [editLeadCampaign, setEditLeadCampaign] = useState(false);

  const submit = useSubmit();

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  const updateLeadHandler = () => {
    setEditLeadCampaign(!editLeadCampaign);
  };

  const eventResponse = useEvents(campaign.id);
  const tvResponse = useTvs(campaign.id);
  const socialMediaResponse = useSocialMedia(campaign.id);
  const leadResponse = useLeadsOfCampaign(campaign.id);

  useEffect(() => {
    setCampaignDetail({ ...campaignDetail, events: eventResponse });
  }, [eventResponse]);

  useEffect(() => {
    setCampaignDetail({ ...campaignDetail, tvs: tvResponse });
  }, [tvResponse]);

  useEffect(() => {
    setCampaignDetail({ ...campaignDetail, socialMedia: socialMediaResponse });
  }, [socialMediaResponse]);

  useEffect(() => {
    setCampaignDetail({ ...campaignDetail, leads: leadResponse });
  }, [leadResponse]);

  const generatePdfHandler = async (id) => {
    try {
      const proceed = window.confirm('Are you sure to generate pdf?');
      if (proceed) {
        const token = getAuthToken();
        const response = await fetch(`http://localhost:8000/pdfs/storeCampaign/${id}`, {
          method: 'post',
          headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/pdf',
            'Accept': 'application/pdf'
          }
        });
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = campaign.name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }
    } catch {
    }
  };

  return (
    <div className={classes.campaignItem}>
      <h1> Marketing > Campaign Item > {campaign.name}:</h1>
      <div className={classes.box}>
        <Card className={classes.card}>
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
          <div className={classes.cardItems}>
            <label>Leads of Campaign :</label>
            <p>
              {campaignDetail.leads.length > 0 && campaignDetail.leads.map((lead, index) => (
                <Fragment key={lead.id}>
                  {index > 0 && ' - '}
                  <Link className={classes.leadLink} to={`/marketing/leads/lead-detail/${lead.id}`}>{lead.type}</Link>
                </Fragment>
              ))}
            </p>
          </div>
          <div className={classes.btn}>
            <button onClick={updateLeadHandler}>
              {!editLeadCampaign && <>Update leads</>}
              {editLeadCampaign && <>Go back to Details</>}
            </button>
            <Link
              className={classes.link}
              to={`/marketing/campaigns/campaign-detail/edit/${campaign.id}`}
            >
              Edit
            </Link>
            <button onClick={() => {
              generatePdfHandler(campaign.id);
            }}>Generate PDF
            </button>
            <button onClick={deleteHandler}>Delete</button>
          </div>
        </Card>

        {!editLeadCampaign && (
          <div className={classes.cardBox}>
            <Card className={classes.cardChildren}>
              <h2> Events:</h2>
              <div className={classes.btn}>
                <Link
                  className={classes.linkBranch}
                  to={`/marketing/campaigns/new/branch/event/${campaign.id}`}
                >
                  Create New Event
                </Link>
              </div>
              {campaignDetail.events.map((event) => (
                <Card className={classes.cardChildren} key={event.id}>
                  <label>Name of Event</label>
                  <p> {event.name} </p>
                  <label>Description of Event</label>
                  <p> {event.description} </p>
                  <label>Place of Event :</label>
                  <p> {event.place} </p>
                  <label>Type of Event :</label>
                  <p> {event.type} </p>
                  <label>Cost of Event :</label>
                  <p> {event.cost} </p>
                  <label>Expected Revenue of Event:</label>
                  <p> {event.expected_revenue} </p>
                  <label>Actual Revenue of Event:</label>
                  <p> {event.actual_revenue} </p>
                  <div className={classes.btn}>
                    <Link
                      className={classes.link}
                      to={`/marketing/events/event-detail/edit/${event.id}`}
                    >
                      Edit
                    </Link>
                    <button onClick={deleteHandler}>Delete</button>
                  </div>
                </Card>
              ))}
            </Card>

            <Card className={classes.cardChildren}>
              <h2> TVs :</h2>
              <div className={classes.btn}>
                <Link
                  className={classes.linkBranch}
                  to={`/marketing/campaigns/new/branch/tv/${campaign.id}`}
                >
                  Create New TV
                </Link>
              </div>
              {campaignDetail.tvs.map((tv) => (
                <Card className={classes.cardChildren} key={tv.id}>
                  <label>Channel of TV:</label>
                  <p> {tv.channel} </p>
                  <label>Time to show on TV</label>
                  <p> {tv.time} </p>
                  <label>Cost:</label>
                  <p> {tv.cost} </p>
                  <label>Advertising Period:</label>
                  <p> {tv.advertising_period} </p>
                  <label>Expected Revenue of TV:</label>
                  <p> {tv.expected_revenue} </p>
                  <label>Actual Revenue of Tv:</label>
                  <p> {tv.actual_revenue} </p>
                  <div className={classes.btn}>
                    <Link
                      className={classes.link}
                      to={`/marketing/campaigns/campaign-detail/edit/${campaign.id}`}
                    >
                      Edit
                    </Link>
                    <button onClick={deleteHandler}>Delete</button>
                  </div>
                </Card>
              ))}
            </Card>

            <Card className={classes.cardChildren}>
              <h2> SocialMedia: </h2>
              <div className={classes.btn}>
                <Link
                  className={classes.linkBranch}
                  to={`/marketing/campaigns/new/branch/socialMedia/${campaign.id}`}
                >
                  Create New Social Media
                </Link>
              </div>
              {campaignDetail.socialMedia.map((socialmedia) => (
                <Card className={classes.cardChildren} key={socialmedia.id}>
                  <label>Type:</label>
                  <p> {socialmedia.type} </p>
                  <label>way of SocialMedia:</label>
                  <p> {socialmedia.way} </p>
                  <label>Cost of SocialMedia:</label>
                  <p> {socialmedia.cost} </p>
                  <label>Expected Revenue of SocialMedia:</label>
                  <p> {socialmedia.expected_revenue} </p>
                  <label>Actual Revenue of SocialMedia:</label>
                  <p> {socialmedia.actual_revenue} </p>
                  <div className={classes.btn}>
                    <Link
                      className={classes.link}
                      to={`/marketing/campaigns/campaign-detail/edit/${campaign.id}`}
                    >
                      Edit
                    </Link>
                    <button onClick={deleteHandler}>Delete</button>
                  </div>
                </Card>
              ))}
            </Card>
          </div>
        )}
        {editLeadCampaign && (
          <UpdateLeadsOfCampaign leadsOfCampaign={campaignDetail.leads} />
        )}
      </div>
    </div>
  );
};

export default CampaignItem;
