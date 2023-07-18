import EmployeeCertificateForm from '../../../components/HR/EmployeeCertificate/EmployeeCertificateForm';
import classes from './NewEmployeeCertificate.module.scss';
const NewEmployeeCertificatePage = () => {
  return (
    <div className={classes.NewEmployeeCertificatePage}>
      <h1> Add New Certificate</h1>
      <EmployeeCertificateForm method="post" />
    </div>
  );
};

export default NewEmployeeCertificatePage;
