import { Fragment, useEffect } from 'react';
import {
  Outlet,
  redirect,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import Header from '../components/layout/Header';
import SideBar from '../components/layout/SideBar';
import { getTokenDuration } from '../hooks/auth';
import classes from './UserProfileRoot.module.scss';
import Loader from '../components/layout/Loaders/Loader'
const UserProfileRoot = () => {
  //   const token = useLoaderData();
  //   const submit = useSubmit();

  //   useEffect(() => {
  //     if (!token) {
  //       return;
  //     }

  //     if (token === 'EXPIRED') {
  //       submit(null, { action: '/logout', method: 'post' });
  //       return;
  //     }

  //     const tokenDuration = getTokenDuration();
  //     console.log(tokenDuration);

  //     setTimeout(() => {
  //       submit(null, { action: '/logout', method: 'post' });
  //     }, tokenDuration);
  //   }, []);
  const nav = useNavigation();
  return (
    <>
      <div className={classes.wrapper}>
         <Header />        
          <Outlet />
      </div>
    </>
  );
};

export default UserProfileRoot;

// export function loader () {
//   return redirect('/login');
// }
