import BenefitForm from '../../../components/HR/Benefit/BenefitForm';
import classes from './NewBenefit.module.scss';
const NewBenefitPage = () => {
  return (
    <div className={classes.NewBenefitPage}>
      <h1> Add New Benefit</h1>
      <BenefitForm method="post" />
    </div>
  );
};

export default NewBenefitPage;
