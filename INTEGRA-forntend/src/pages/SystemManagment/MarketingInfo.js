import MarketingGragh from '../../components/SystemManagment/MarketingGragh';
import classes from './MarketingInfo.module.scss';
import { getAuthToken } from '../../hooks/auth';
import { json, useLoaderData } from 'react-router-dom';
const MarketingInfo = () => {
  return (
    <div className={classes.MarketingInfo}>
      <h1> Marketing gragh Information </h1>
      <MarketingGragh />
    </div>
  );
};

export default MarketingInfo;
