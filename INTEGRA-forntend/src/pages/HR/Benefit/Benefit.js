import { json, useLoaderData } from 'react-router-dom';
import BenefitsList from '../../../components/HR/Benefit/BenefitsList';
import { getAuthToken } from '../../../hooks/auth';
import classes from './Benefit.module.scss';
const BenefitsPage = () => {
  const { data } = useLoaderData();
  console.log(data);
  return (
    <div className={classes.benefit}>
      <BenefitsList benefits={data} />
    </div>
  );
};

export default BenefitsPage;

export async function loader() {
  const token = getAuthToken();

  const response = await fetch('http://localhost:8000/hr/benefits', {
    headers: {
      Authorization: 'bearer' + token,
    },
  });
  console.log(response);
  if (!response.ok) {
    throw json({ message: 'Could not fetch benefits.' }, { status: 500 });
  } else {
    return response;
  }
}
