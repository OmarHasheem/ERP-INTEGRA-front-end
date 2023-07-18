import React from 'react';

import RootLayout from '../pages/Root';

import ErrorPage from '../pages/Error';
import { checkAuthLoader, tokenLoader } from '../hooks/auth';

import CampaignsPage, {
  loader as CampaignsLoader,
} from '../pages/Marketing/campaign/Campaigns';
import NewCampaignPage from '../pages/Marketing/campaign/NewCampaign';
import CampaignDetailPage, {
  loader as CampaignDetailLoader,
  action as deleteCampaignAction,
} from '../pages/Marketing/campaign/CampaignDetail';
import EditCampaignPage from '../pages/Marketing/campaign/EditCampaign';
import { action as manipulateCampaignAction } from '../components/Marketing/campaign/CampaignForm';
import NavBar from '../components/layout/NavBar';

import TVsPage, { loader as TVsLoader } from '../pages/Marketing/tv/TVs';
import NewTVPage from '../pages/Marketing/tv/NewTV';
import TVDetailPage, {
  loader as TVDetailLoader,
  action as deleteTVAction,
} from '../pages/Marketing/tv/TVDetail';
import EditTVPage from '../pages/Marketing/tv/EditTV';
import { action as manipulateTVAction } from '../components/Marketing/tv/TVForm';

import SocialMediaPage, {
  loader as SocialMediaLoader,
} from '../pages/Marketing/socialMedia/SocialMedia';
import NewSocialMediaPage from '../pages/Marketing/socialMedia/NewSocialMedia';
import SocialMediaDetailPage, {
  loader as SocialMediaDetailLoader,
  action as deleteSocialMediaAction,
} from '../pages/Marketing/socialMedia/SocialMediaDetail';
import EditSocialMediaPage from '../pages/Marketing/socialMedia/EditSocialMedia';
import { action as manipulateSocialMediaAction } from '../components/Marketing/socialMedia/SocialMediaForm';

import EventsPage, {
  loader as EventsLoader,
} from '../pages/Marketing/event/Events';
import NewEventPage from '../pages/Marketing/event/NewEvent';
import EventDetailPage, {
  loader as EventDetailLoader,
  action as deleteEventAction,
} from '../pages/Marketing/event/EventDetail';
import EditEventPage from '../pages/Marketing/event/EditEvent';
import { action as manipulateEventAction } from '../components/Marketing/event/EventForm';

import PDFsPage, { loader as PDFsLoader } from '../pages/PDF/PDFs';

import LeadsPage, {
  loader as LeadsLoader,
} from '../pages/Marketing/lead/Leads';
import NewLeadPage from '../pages/Marketing/lead/NewLead';
import LeadDetailPage, {
  loader as LeadDetailLoader,
  action as deleteLeadAction,
} from '../pages/Marketing/lead/LeadDetail';
import EditLeadPage from '../pages/Marketing/lead/EditLead';
import { action as manipulateLeadAction } from '../components/Marketing/lead/LeadForm';

import EmailsPage, {
  loader as EmailsLoader,
} from '../pages/Marketing/email/Emails';
import NewEmailPage from '../pages/Marketing/email/NewEmail';
import EmailDetailPage, {
  loader as EmailDetailLoader,
  action as deleteEmailAction,
} from '../pages/Marketing/email/EmailDetail';
import EditEmailPage from '../pages/Marketing/email/EditEmail';
import { action as manipulateEmailAction } from '../components/Marketing/email/EmailForm';

import CustomersPage, {
  loader as CustomersLoader,
} from '../pages/Marketing/customer/Customers';
import NewCustomerPage from '../pages/Marketing/customer/NewCustomer';
import CustomerDetailPage, {
  loader as CustomerDetailLoader,
  action as deleteCustomerAction,
} from '../pages/Marketing/customer/CustomerDetail';
import EditCustomerPage from '../pages/Marketing/customer/EditCustomer';
import { action as manipulateCustomerAction } from '../components/Marketing/customer/CustomerForm';
import { marketingLoader } from '../util/utils';

export const marketingRoute = {
  path: '/marketing',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  loader: marketingLoader,
  children: [
    {
      path: '/marketing/campaigns',
      children: [
        {
          index: true,
          element: <CampaignsPage />,
          loader: CampaignsLoader,
        },
        {
          path: '/marketing/campaigns/new',
          children: [
            {
              index: true,
              element: <NewCampaignPage />,
              action: manipulateCampaignAction,
              loader: checkAuthLoader,
            },
            {
              path: '/marketing/campaigns/new/branch',
              element: <NavBar />,
              children: [
                {
                  path: '/marketing/campaigns/new/branch/tv/:campaignId',
                  element: <NewTVPage />,
                  action: manipulateTVAction,
                  loader: checkAuthLoader,
                },
                {
                  path: '/marketing/campaigns/new/branch/socialMedia/:campaignId',
                  element: <NewSocialMediaPage />,
                  action: manipulateSocialMediaAction,
                  loader: checkAuthLoader,
                },
                {
                  path: '/marketing/campaigns/new/branch/event/:campaignId',
                  element: <NewEventPage />,
                  action: manipulateEventAction,
                  loader: checkAuthLoader,
                },
              ],
            },
          ],
        },
        {
          path: '/marketing/campaigns/campaign-detail',
          id: 'campaign-detail',
          loader: CampaignDetailLoader,
          children: [
            {
              path: '/marketing/campaigns/campaign-detail/:campaignId',
              element: <CampaignDetailPage />,
              action: deleteCampaignAction,
              loader: checkAuthLoader,
            },
            {
              path: '/marketing/campaigns/campaign-detail/edit/:campaignId',
              element: <EditCampaignPage />,
              action: manipulateCampaignAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/marketing/tvs',
      children: [
        {
          index: true,
          element: <TVsPage />,
          loader: TVsLoader,
        },
        {
          path: '/marketing/tvs/tv-detail',
          id: 'tv-detail',
          loader: TVDetailLoader,
          children: [
            {
              path: '/marketing/tvs/tv-detail/:tvId',
              element: <TVDetailPage />,
              action: deleteTVAction,
              loader: checkAuthLoader,
            },
            {
              path: '/marketing/tvs/tv-detail/edit/:tvId',
              element: <EditTVPage />,
              action: manipulateTVAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/marketing/socialMedia',
      children: [
        {
          index: true,
          element: <SocialMediaPage />,
          loader: SocialMediaLoader,
        },
        {
          path: '/marketing/socialMedia/socialMedia-detail',
          id: 'socialMedia-detail',
          loader: SocialMediaDetailLoader,
          children: [
            {
              path: '/marketing/socialMedia/socialMedia-detail/:socialMediaId',
              element: <SocialMediaDetailPage />,
              action: deleteSocialMediaAction,
              loader: checkAuthLoader,
            },
            {
              path: '/marketing/socialMedia/socialMedia-detail/edit/:socialMediaId',
              element: <EditSocialMediaPage />,
              action: manipulateSocialMediaAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/marketing/events',
      children: [
        {
          index: true,
          element: <EventsPage />,
          loader: EventsLoader,
        },
        {
          path: '/marketing/events/event-detail',
          id: 'event-detail',
          loader: EventDetailLoader,
          children: [
            {
              path: '/marketing/events/event-detail/:eventId',
              element: <EventDetailPage />,
              action: deleteEventAction,
              loader: checkAuthLoader,
            },
            {
              path: '/marketing/events/event-detail/edit/:eventId',
              element: <EditEventPage />,
              action: manipulateEventAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/marketing/pdfs',
      children: [
        {
          index: true,
          element: <PDFsPage />,
          loader: PDFsLoader,
        },
      ],
    },
    {
      path: '/marketing/leads',
      children: [
        {
          index: true,
          element: <LeadsPage />,
          loader: LeadsLoader,
        },
        {
          path: '/marketing/leads/new',
          children: [
            {
              index: true,
              element: <NewLeadPage />,
              action: manipulateLeadAction,
              loader: checkAuthLoader,
            },
          ],
        },
        {
          path: '/marketing/leads/lead-detail',
          id: 'lead-detail',
          loader: LeadDetailLoader,
          children: [
            {
              path: '/marketing/leads/lead-detail/:leadId',
              element: <LeadDetailPage />,
              action: deleteLeadAction,
              loader: checkAuthLoader,
            },
            {
              path: '/marketing/leads/lead-detail/edit/:leadId',
              element: <EditLeadPage />,
              action: manipulateLeadAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/marketing/emails',
      children: [
        {
          index: true,
          element: <EmailsPage />,
          loader: EmailsLoader,
        },
        {
          path: '/marketing/emails/new',
          children: [
            {
              index: true,
              element: <NewEmailPage />,
              action: manipulateEmailAction,
              loader: checkAuthLoader,
            },
          ],
        },
        {
          path: '/marketing/emails/email-detail',
          id: 'email-detail',
          loader: EmailDetailLoader,
          children: [
            {
              path: '/marketing/emails/email-detail/:emailId',
              element: <EmailDetailPage />,
              action: deleteEmailAction,
              loader: checkAuthLoader,
            },
            {
              path: '/marketing/emails/email-detail/edit/:emailId',
              element: <EditEmailPage />,
              action: manipulateEmailAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },

    {
      path: '/marketing/customers',
      children: [
        {
          index: true,
          element: <CustomersPage />,
          loader: CustomersLoader,
        },
        {
          path: '/marketing/customers/new',
          children: [
            {
              index: true,
              element: <NewCustomerPage />,
              action: manipulateCustomerAction,
              loader: checkAuthLoader,
            },
          ],
        },
        {
          path: '/marketing/customers/customer-detail',
          id: 'customer-detail',
          loader: CustomerDetailLoader,
          children: [
            {
              path: '/marketing/customers/customer-detail/:customerId',
              element: <CustomerDetailPage />,
              action: deleteCustomerAction,
              loader: checkAuthLoader,
            },
            {
              path: '/marketing/customers/customer-detail/edit/:customerId',
              element: <EditCustomerPage />,
              action: manipulateCustomerAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
  ],
};
