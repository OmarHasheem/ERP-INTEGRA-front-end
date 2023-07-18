import LeadForm from '../../../components/Marketing/lead/LeadForm';
import classes from './newLead.module.scss';
const NewLeadPage = () => {
  return (
    <div className={classes.newLead}>
      <h1> Marketing > Leads > Create New Lead </h1>
      <LeadForm method="post" />
    </div>
  );
};

export default NewLeadPage;
