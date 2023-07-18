import { Accordion, AccordionDetails, AccordionSummary, Card, Typography } from '@mui/material';
import classes from './UserProfile.module.scss';
// import CountUp from 'react-countup';
import { Chart } from 'react-google-charts';
import { getAuthToken } from '../../hooks/auth';
import React, { Component, useEffect, useState } from 'react';
import { json, Link } from 'react-router-dom';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loader from '../layout/Loaders/UserProfileLoader';
import { ExpandMoreIcon } from '@mui/icons-material';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  const getInfo = async () => {
    const token = getAuthToken();
    const data = await fetch('http://localhost:8000/userManagement/getMe', {
      headers: {
        Authorization: 'bearer ' + token,
      },
    });
    return data.json();
  };
  const { data, isLoading } = useQuery('getMe', getInfo);

  console.log(data)
  useEffect(() => {
    if (data) setUserInfo(data[0]);
  }, [data]);

  return (<>
    
      {isLoading && <Loader/>}
      {!isLoading  && (<div className={classes.UserProfile}>
        <Card className={classes.sidebar}>
          <div className={classes.box}>
        <label>Email</label>
        <p>{userInfo.email}</p>
        <label>Gender</label>
        <p>{userInfo.gender}</p>
        <label>Address</label>
        <p>{userInfo.address}</p>
        <label>Phone</label>
        <p>{userInfo.phone}</p>
        <label>Salary</label>
        <p>{userInfo.salary}</p>
        <label>Status</label>
        <p>{userInfo.status}</p>
        <label>Date Of Brith</label>
        <p>{userInfo.dateOfBrith}</p>
        <label>Date Of Hire</label>
        <p>{userInfo.dateOfHire}</p>
        <label>Department</label>
        <p>{userInfo.department}</p>
        </div>
        <p className={classes.adv}>Increase in salary...work hard😉</p>
        </Card>

        <div className={classes.content}>
        <h1>
        User profile > {userInfo.firstName + ' ' + userInfo.lastName}
        </h1>
        <div className={classes.button}>
          
<button onClick={()=>{navigate(-1)}}>Go Back</button>
</div>
<div className={classes.wrapper}>
  <div className={classes.accordionBox}>
<Accordion className={classes.accordion}>
  <AccordionSummary >
    <Typography className={classes.label}>Certificate Info </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography className={classes.info}>
         {userInfo.certificates && userInfo.certificates.map((Info, index) => (
                    <div>
                    <label>Number Of Certificates : {index + 1} </label>
                    <div className={classes.cardItems}>
                      <label>Certificates Name :</label>
                      <p>{Info.name}</p>
                    </div>
                    <div className={classes.cardItems}>
                      <label>Certificates Level :</label>
                      <p>{Info.level}</p>
                    </div>
                    </div>
                ))}
                </Typography>
  </AccordionDetails>
</Accordion>

<Accordion className={classes.accordion}>
  <AccordionSummary >
    <Typography className={classes.label}>Educations Info</Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography className={classes.info}>
  {userInfo.educations &&
                userInfo.educations.map((Info, index) => (
                  <div>
                    <label>Number Of Educations : {index + 1}</label>
                    <div className={classes.cardItems}>
                      <label>Educations Degree :</label>
                      <p>{Info.degree}</p>
                    </div>
                    <div className={classes.cardItems}>
                      <label>Educations Graduation Date :</label>
                      <p>{Info.graduationDate}</p>
                    </div>
                    <div className={classes.cardItems}>
                      <label>Educations Granting By :</label>
                      <p>{Info.grantingBy}</p>
                    </div>
                    <div className={classes.cardItems}>
                      <label>Educations Specialization :</label>
                      <p>{Info.specialization}</p>
                    </div>
                    </div>
                ))} 
                  </Typography>
  </AccordionDetails>
</Accordion>

  <Accordion className={classes.accordion}>
  <AccordionSummary >
    <Typography className={classes.label}>Performances Info </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography className={classes.info}>
  {userInfo.performances &&
                userInfo.performances.map((Info, index) => (
                    <div>
                    <label>Number Of Performances : {index + 1} </label>
                    <div className={classes.cardItems}>
                      <label>Performances Rating :</label>
                      <p>{Info.performanceRating}</p>
                    </div>
                    <div className={classes.cardItems}>
                      <label>Performances Review Date :</label>
                      <p>{Info.reviewDate}</p>
                    </div>
                    <div className={classes.cardItems}>
                      <label>Performances Comments :</label>
                      <p>{Info.comments}</p>
                    </div>
                    </div>
                ))} 
                  </Typography>
  </AccordionDetails>
</Accordion>

<Accordion className={classes.accordion}>
  <AccordionSummary >
    <Typography className={classes.label}>Vacations Info  </Typography>
  </AccordionSummary>
  <AccordionDetails>
    <Typography className={classes.info}>
  {userInfo.vacations &&
                userInfo.vacations.map((Info, index) => (
                  <div>
                    <label>Number Of Vacations : {index + 1}</label>
                    <div className={classes.cardItems}>
                      <label>Vacations Status :</label>
                      <p>{Info.status}</p>
                    </div>
                    <div className={classes.cardItems}>
                      <label>Vacations Type :</label>
                      <p>{Info.typeOfVacation}</p>
                    </div>
                    <div className={classes.cardItems}>
                      <label>Vacations Start Date :</label>
                      <p>{Info.startDate}</p>
                    </div>
                    <div className={classes.cardItems}>
                      <label>Vacations End Date :</label>
                      <p>{Info.endDate}</p>
                    </div>
                    <div className={classes.cardItems}>
                      <label>Vacations Reason :</label>
                      <p>{Info.reasonOfVacation}</p>
                    </div>
                    </div>
                ))} 
                </Typography>         
  </AccordionDetails>
</Accordion>
</div>
</div>
        </div>
        </div>
        )}
    </>);
  };

  export default UserProfile;