import MarketingInfo from '../pages/SystemManagment/MarketingInfo';
import RootLayout from '../pages/Root';
import ErrorPage from '../pages/Error';
import { userManagementLoader } from '../util/utils';

export const systemManagementRoute = {
  path: '/systemManagement',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  loader: userManagementLoader,
  children: [
    {
      path: '/systemManagement/marketing',
      element: <MarketingInfo />,
      // loader:,
    },
  ],
};
