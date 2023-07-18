import EmployeeCertificateForm from '../../../components/HR/EmployeeCertificate/EmployeeCertificateForm';
import { useRouteLoaderData } from 'react-router-dom';
import classes from './EditEmployeeCertificate.module.scss';
const EditEmployeeCertificatePage = () => {
  const { data: employeeCertificate } = useRouteLoaderData(
    'employeeCertificate-detail'
  );

  return (
    <div className={classes.EditEmployeeCertificate}>
      <h1> HR > Employee Certificate > Edit {employeeCertificate.name} </h1>
      <EmployeeCertificateForm
        method="put"
        employeeCertificate={employeeCertificate}
      />
    </div>
  );
};

export default EditEmployeeCertificatePage;
