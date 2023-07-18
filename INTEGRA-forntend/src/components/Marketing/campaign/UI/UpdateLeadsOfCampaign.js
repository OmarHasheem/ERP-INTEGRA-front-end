import { useEffect, useMemo, useState } from 'react';
import { useLeads } from '../../../../hooks/useApi';
import classes from '../../lead/LeadsList.module.scss';
import { getAuthToken } from '../../../../hooks/auth';
import { json, useNavigate, useParams } from 'react-router-dom';

const UpdateLeadsOfCampaign = ({ leadsOfCampaign }) => {
  const [leads, setLeads] = useState([]);
  const [editLead, setEditLead] = useState({ id: 0, type: '' });

  const { campaignId } = useParams('campaignId');
  const responseLead = useLeads();
  const navigate = useNavigate();

  useEffect(() => {
    setLeads(responseLead);
  }, [responseLead]);

  const removeById = (arr, id) => {
    const requiredIndex = arr.findIndex(el => {
      return el.id == id;
    });
    if(requiredIndex === -1){
      return false;
    };
    return !!arr.splice(requiredIndex, 1);
  };

  const addById = (arr, id) => {
    leads.map((lead) => {
      if (lead.id == id) {
        arr.push(lead);
        return;
      }
    })
  }

  const checkHandler = (event) => {
    if (event.target.checked) {
      addById(leadsOfCampaign, event.target.value);
      setEditLead({ id: event.target.value, type: 'attach' });
    } else {
      removeById(leadsOfCampaign, event.target.value);
      setEditLead({ id: event.target.value, type: 'detach' });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();
        const campaignData = {
          lead_id: editLead.id
        };

        let url;
        if (editLead.type == 'attach') {
          url = 'http://localhost:8000/marketing/campaigns/attachCampaignToLead/' + campaignId;
        } else {
          url = 'http://localhost:8000/marketing/campaigns/detachCampaignToLead/' + campaignId;
        }

        const response = await fetch(url, {
            method: 'post',
            headers: {
              Authorization: 'bearer ' + token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(campaignData),
          });

        if (!response.ok)
          throw json(
            { message: 'Could not add lead to campaign.' },
            { status: 500 }
          );
      } catch (error) {
        console.error(error);
      }
    };
    if (editLead.id > 0)
      fetchData();
  }, [editLead]);

  return (
    <div className={classes.leadsList}>
      <table>
        <thead>
        <tr>
          <th>Lead Id</th>
          <th>Name</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {leads.map((lead) => (
          <tr key={lead.id}
              onClick={() =>
                navigate(`/marketing/leads/lead-detail/${lead.id}`)
              }
          >
            <td>{lead.id}</td>
            <td>{lead.type}</td>
            <td style={{cursor: 'auto'}} onClick={(event) => event.stopPropagation()}><input type='checkbox' value={lead.id}
                       checked={JSON.stringify(leadsOfCampaign).includes(JSON.stringify(lead))}
                       onChange={checkHandler}
            />
            </td>
          </tr>
        ))}
        </tbody>
        <tfoot>
        <tr>
          <th>Lead Id</th>
          <th>Name</th>
          <th></th>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default UpdateLeadsOfCampaign;