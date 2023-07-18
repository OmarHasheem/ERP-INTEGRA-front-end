import EmployeeEducationForm from '../../../components/HR/EmployeeEducationController/EmployeeEducationForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './EditEmployeeEducation.module.scss';
const EditEmployeeEducationPage = () => {
  const { data: employeeEducation } = useRouteLoaderData(
    'employeeEducation-detail'
  );

  return (
    <div className={classes.EditEmployeeEducation}>
      <h1> HR > Employee Education > Edit {employeeEducation.name} </h1>
      <EmployeeEducationForm
        method="put"
        employeeEducation={employeeEducation}
      />
    </div>
  );
};

export default EditEmployeeEducationPage;
