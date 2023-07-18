import { Link, useNavigate } from 'react-router-dom';
import classes from './LeadsList.module.scss';
const LeadsList = ({ leads }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.leadsList}>
      <h1> Marketing > Leads </h1>
      <div className={classes.add_lead}>
        <Link className={classes.add_lead_link} to="/marketing/leads/new">
          Add New Lead
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Lead Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              onClick={() => navigate(`/marketing/leads/lead-detail/${lead.id}`)}
            >
              <td>{lead.id}</td>
              <td>{lead.type}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Lead Id</th>
            <th>Name</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default LeadsList;
