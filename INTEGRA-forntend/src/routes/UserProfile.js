import ErrorPage from '../pages/Error';
import UserProfile, {
  loader as userProfileLoader,
} from '../components/UserProfile/userProfile';
import { checkAuthLoader, tokenLoader } from '../hooks/auth';
import UserProfileRoot from '../pages/UserProfileRoot';
export const userProfileRoute = {
  path: '/userProfile',
  element: <UserProfileRoot />,
  errorElement: <ErrorPage />,
  loader: tokenLoader,
  children: [
    {
      path: '/userProfile/user',
      element: <UserProfile />,
  //    loader: userProfileLoader,
    },
  ],
};
