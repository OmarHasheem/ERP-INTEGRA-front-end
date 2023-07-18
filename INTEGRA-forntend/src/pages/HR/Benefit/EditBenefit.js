import BenefitForm from '../../../components/HR/Benefit/BenefitForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './editBenefit.module.scss';
const EditBenefitPage = () => {
  const { data: benefit } = useRouteLoaderData('benefit-detail');

  return (
    <div className={classes.editBenefit}>
      <h1> HR > Benefits > Edit {benefit.name} </h1>
      <BenefitForm method="put" benefit={benefit} />
    </div>
  );
};

export default EditBenefitPage;
