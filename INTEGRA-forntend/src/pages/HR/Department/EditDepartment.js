import DepartmentForm from '../../../components/HR/Department/DepartmentForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './EditDepartment.module.scss';
const EditDepartmentPage = () => {
  const { data: department } = useRouteLoaderData('department-detail');

  return (
    <div className={classes.editDepartment}>
      <h1> HR > Department > Edit {department.name} </h1>
      <DepartmentForm method="put" department={department} />
    </div>
  );
};

export default EditDepartmentPage;
