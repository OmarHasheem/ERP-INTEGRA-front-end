import { Card } from '@mui/material';
import classes from './EmployeeInfoShow.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
const EmployeeInfoShow = ({ employeesInfo }) => {
  // let [certificatesCounter, setCertificatesCounter] = useState(1);
  // let [educationsCounter, setEducationsCounter] = useState(1);
  // let [performancesCounter, setPerformancesCounter] = useState(1);
  // let [vacationsCounter, setVacationsCounter] = useState(1);

  // const handleCertificatesCounter = () => {
  //   setCertificatesCounter(++certificatesCounter);
  // };
  let certificatesCounter = 1;
  let educationsCounter = 1;
  let performancesCounter = 1;
  let vacationsCounter = 1;
  const handleCertificatesCounter = () => {
    certificatesCounter++;
  };
  const handleEducationsCounter = () => {
    educationsCounter++;
  };

  const handlePerformancesCounter = () => {
    performancesCounter++;
  };

  const handleVacationsCounter = () => {
    vacationsCounter++;
  };
  console.log(employeesInfo);

  return (
    <div className={classes.EmployeeInfoShow}>
      <div className={classes.box}>
        <label>Certificate Info :</label>
        <Card className={classes.card}>
          {employeesInfo.certificates.map((employeeInfo) => (
            <Card className={classes.childCard}>
              <label>Number Of Certificates :{certificatesCounter} </label>
              <div
                onLoad={handleCertificatesCounter()}
                className={classes.cardItems}
              >
                <label>Certificates Name :</label>
                <p>{employeeInfo.name}</p>
              </div>
              <div className={classes.cardItems}>
                <label>Certificates Level :</label>
                <p>{employeeInfo.level}</p>
              </div>
            </Card>
          ))}
        </Card>

        <label>Educations Info :</label>
        {employeesInfo.educations.map((employeeInfo) => (
          <Card className={classes.childCard}>
            <label>Number Of Educations : {educationsCounter}</label>
            <div className={classes.cardItems}>
              <label>Educations Degree :</label>
              <p>{employeeInfo.degree}</p>
            </div>
            <div className={classes.cardItems}>
              <label>Educations Graduation Date :</label>
              <p>{employeeInfo.graduationDate}</p>
            </div>
            <div
              onLoad={handleEducationsCounter()}
              className={classes.cardItems}
            >
              <label>Educations Granting By :</label>
              <p>{employeeInfo.grantingBy}</p>
            </div>
            <div className={classes.cardItems}>
              <label>Educations Specialization :</label>
              <p>{employeeInfo.specialization}</p>
            </div>
          </Card>
        ))}

        <label>Performances Info :</label>
        {employeesInfo.performances.map((employeeInfo) => (
          <Card className={classes.childCard}>
            <label>Number Of Performances :{performancesCounter} </label>
            <div className={classes.cardItems}>
              <label>Performances Rating :</label>
              <p>{employeeInfo.performanceRating}</p>
            </div>
            <div
              onLoad={handlePerformancesCounter()}
              className={classes.cardItems}
            >
              <label>Performances Review Date :</label>
              <p>{employeeInfo.reviewDate}</p>
            </div>
            <div className={classes.cardItems}>
              <label>Performances Comments :</label>
              <p>{employeeInfo.comments}</p>
            </div>
          </Card>
        ))}

        <label>Vacations Info :</label>
        {employeesInfo.vacations.map((employeeInfo) => (
          <Card className={classes.childCard}>
            <label>Number Of Vacations : {vacationsCounter}</label>
            <div className={classes.cardItems}>
              <label>Vacations Status :</label>
              <p>{employeeInfo.status}</p>
            </div>
            <div className={classes.cardItems}>
              <label>Vacations Type :</label>
              <p>{employeeInfo.typeOfVacation}</p>
            </div>
            <div className={classes.cardItems}>
              <label>Vacations Start Date :</label>
              <p>{employeeInfo.startDate}</p>
            </div>
            <div onLoad={handleVacationsCounter} className={classes.cardItems}>
              <label>Vacations End Date :</label>
              <p>{employeeInfo.endDate}</p>
            </div>
            <div className={classes.cardItems}>
              <label>Vacations Reason :</label>
              <p>{employeeInfo.reasonOfVacation}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

{
  /* <div className={classes.cardItems}>
            <label>First name :</label>
            <p>{employeesInfo.firstName}</p>
          <div>
          <div className={classes.cardItems}>
            <label>Last name :</label>
            <p>{employeesInfo.lastName}</p>
          </div> */
}

{
  /* <div className={classes.cardItems}>
            <label>Certificates Name :</label>
            <p>{employeesInfo.certificates.name}</p>
          </div>
          <div className={classes.cardItems}>
            <label>Certificates Level :</label>
            <p>{employeesInfo.certificates.level}</p>
          </div>
          <div className={classes.cardItems}>
            <label>Educations Degree :</label>
            <p>{employeesInfo.educations.degree}</p>
          </div>
          <div className={classes.cardItems}>
            <label>Educations Graduation Date :</label>
            <p>{employeesInfo.educations.graduationDate}</p>
          </div>
          <div className={classes.cardItems}>
            <label>Educations Granting By :</label>
            <p>{employeesInfo.educations.grantingBy}</p>
          </div>
          <div className={classes.cardItems}>
            <label>Educations Specialization :</label>
            <p>{employeesInfo.educations.specialization}</p>
          </div>
          <div className={classes.cardItems}>
            <label>performance:</label>
            <p>{employeesInfo.performances.performanceRating}</p>
          </div>
          <div className={classes.cardItems}>
            <label>Comments:</label>
            <p>{employeesInfo.performances.comments}</p>
          </div>
          <div className={classes.cardItems}>
            <label>Review Date:</label>
            <p>{employeesInfo.performances.reviewDate}</p>
          </div>
          <div className={classes.cardItems}>
            <label>Review Date:</label>
            <p>{employeesInfo.performances.reviewDate}</p>
          </div> */
}

export default EmployeeInfoShow;
