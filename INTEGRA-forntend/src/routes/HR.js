import BenefitsPage, {
  loader as BenefitLoader,
} from '../pages/HR/Benefit/Benefit';

import DepartmentsPage, {
  loader as DepartmentLoader,
} from '../pages/HR/Department/Department';

import EmployeeCertificatesPage, {
  loader as EmployeeCertificateLoader,
} from '../pages/HR/EmployeeCertificate/EmployeeCertificate';

import EmployeeControllersPage, {
  loader as EmployeeControllerLoader,
} from '../pages/HR/EmployeeController/EmployeeController';

import EmployeeEducationControllersPage, {
  loader as EmployeeEducationControllerLoader,
} from '../pages/HR/EmployeeEducationController/EmployeeEducationController';

import EmployeePerformanceControllersPage, {
  loader as EmployeePerformanceControllerLoader,
} from '../pages/HR/EmployeePerformance/EmployeePerformanceController';

import EmployeeVacationControllersPage, {
  loader as EmployeeVacationControllerLoader,
} from '../pages/HR/EmployeeVacation/EmployeeVacationController';

import NewDepartmentPage from '../pages/HR/Department/NewDeparment';
import NewBenefitPage from '../pages/HR/Benefit/NewBenefit';

import { action as manipulateBenefitAction } from '../components/HR/Benefit/BenefitForm';
import { action as manipulateDepartmentAction } from '../components/HR/Department/DepartmentForm';
import { action as manipulateEmployeeCertificateAction } from '../components/HR/EmployeeCertificate/EmployeeCertificateForm';

import NewEmployeeCertificatePage from '../pages/HR/EmployeeCertificate/NewEmployeeCertificate';
import NewEmployeeControllerPage from '../pages/HR/EmployeeController/NewEmployeeController';

import { action as manipulateEmployeeControllerAction } from '../components/HR/EmployeeController/EmployeeControllerForm';

import NewEmployeeEducationPage from '../pages/HR/EmployeeEducationController/NewEmployeeEducationController';

import { action as manipulateEmployeeEducationAction } from '../components/HR/EmployeeEducationController/EmployeeEducationForm';

import NewEmployeePerformancePage from '../pages/HR/EmployeePerformance/NewEmployeePerformance';

import { action as manipulateEmployeePerformanceAction } from '../components/HR/EmployeePerformanceController/EmployeePerformanceForm';

import NewEmployeeVacationPage from '../pages/HR/EmployeeVacation/NewEmployeeVacation';

import EditBenefitPage from '../pages/HR/Benefit/EditBenefit';
import EditDepartmentPage from '../pages/HR/Department/EditDepartment';
import EditEmployeeCertificatePage from '../pages/HR/EmployeeCertificate/EditEmployeeCertificate';
import EditEmployeePage from '../pages/HR/EmployeeController/EditEmployee';
import EditEmployeeEducationPage from '../pages/HR/EmployeeEducationController/EditEmployeeEducation';

import EditEmployeePerformancePage from '../pages/HR/EmployeePerformance/EditEmployeePerformance';

import EditEmployeeVacationPage from '../pages/HR/EmployeeVacation/EditEmployeeVacation';

import { action as manipulateEmployeeVacationAction } from '../components/HR/EmployeeVacationController/EmployeeVacationForm';

import BenefitDetailPage, {
  loader as BenefitsDetailLoader,
} from '../pages/HR/Benefit/BenefitDetail';

import { action as deleteBenafitAction } from '../pages/HR/Benefit/BenefitDetail';

import DepartmentDetailPage, {
  loader as DepartmentsDetailLoader,
} from '../pages/HR/Department/DepartmentDetail';

import { action as deleteDepartmentAction } from '../pages/HR/Department/DepartmentDetail';

import EmployeeCertificateDetailPage, {
  loader as EmployeeCertificatesDetailLoader,
} from '../pages/HR/EmployeeCertificate/EmployeeCertificateDetail';

import { action as deleteEmployeeCertificateAction } from '../pages/HR/EmployeeCertificate/EmployeeCertificateDetail';

import EmployeeDetailPage, {
  loader as EmployeesDetailLoader,
} from '../pages/HR/EmployeeController/EmployeeDetail';

import { action as deleteEmployeeAction } from '../pages/HR/EmployeeController/EmployeeDetail';

import EmployeeEducationDetailPage, {
  loader as EmployeeEducationsDetailLoader,
} from '../pages/HR/EmployeeEducationController/EmployeeEducationDetail';

import { action as deleteEmployeeEducationsAction } from '../pages/HR/EmployeeEducationController/EmployeeEducationDetail';

import EmployeePerformanceDetailPage, {
  loader as EmployeePerformanceDetailLoader,
} from '../pages/HR/EmployeePerformance/EmployeePerformanceDetail';

import { action as deleteEmployeePerformanceAction } from '../pages/HR/EmployeePerformance/EmployeePerformanceDetail';

import EmployeeVacationDetailPage, {
  loader as EmployeeVacationDetailPageLoader,
} from '../pages/HR/EmployeeVacation/EmployeeVacationDetail';

import { action as deleteEmployeeVacationAction } from '../pages/HR/EmployeeVacation/EmployeeVacationDetail';

import RootLayout from '../pages/Root';
import ErrorPage from '../pages/Error';
import { checkAuthLoader, tokenLoader } from '../hooks/auth';
import { hrLoader } from '../util/utils';
import PDFsPage, { loader as PDFsLoader } from '../pages/PDF/PDFs';
import React from 'react';
export const HrRoute = {
  path: '/hr',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  loader: hrLoader,
  children: [
    {
      path: '/hr/benefits',
      children: [
        {
          index: true,
          element: <BenefitsPage />,
          loader: BenefitLoader,
        },
        {
          path: '/hr/benefits/new',
          element: <NewBenefitPage />,
          action: manipulateBenefitAction,
          loader: checkAuthLoader,
        },
        {
          path: '/hr/benefits/benefit-detail',
          id: 'benefit-detail',
          loader: BenefitsDetailLoader,
          children: [
            {
              path: '/hr/benefits/benefit-detail/:benefitId',
              element: <BenefitDetailPage />,
              action: deleteBenafitAction,
              loader: checkAuthLoader,
            },
            {
              path: '/hr/benefits/benefit-detail/edit/:benefitId',
              element: <EditBenefitPage />,
              action: manipulateBenefitAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/hr/departments',
      children: [
        {
          index: true,
          element: <DepartmentsPage />,
          loader: DepartmentLoader,
        },
        {
          path: '/hr/departments/new',
          element: <NewDepartmentPage />,
          action: manipulateDepartmentAction,
          loader: checkAuthLoader,
        },
        {
          path: '/hr/departments/department-detail',
          id: 'department-detail',
          loader: DepartmentsDetailLoader,
          children: [
            {
              path: '/hr/departments/department-detail/:departmentId',
              element: <DepartmentDetailPage />,
              action: deleteDepartmentAction,
              loader: checkAuthLoader,
            },
            {
              path: '/hr/departments/department-detail/edit/:tvId',
              element: <EditDepartmentPage />,
              action: manipulateDepartmentAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/hr/employeeCertificates',
      children: [
        {
          index: true,
          element: <EmployeeCertificatesPage />,
          loader: EmployeeCertificateLoader,
        },
        {
          path: '/hr/employeeCertificates/new',
          element: <NewEmployeeCertificatePage />,
          action: manipulateEmployeeCertificateAction,
          loader: checkAuthLoader,
        },
        {
          path: '/hr/employeeCertificates/employeeCertificate-detail',
          id: 'employeeCertificate-detail',
          loader: EmployeeCertificatesDetailLoader,
          children: [
            {
              path: '/hr/employeeCertificates/employeeCertificate-detail/:employeeCertificateId',
              element: <EmployeeCertificateDetailPage />,
              action: deleteEmployeeCertificateAction,
              loader: checkAuthLoader,
            },
            {
              path: '/hr/employeeCertificates/employeeCertificate-detail/edit/:employeeCertificateId',
              element: <EditEmployeeCertificatePage />,
              action: manipulateEmployeeCertificateAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/hr/employees',
      children: [
        {
          index: true,
          element: <EmployeeControllersPage />,
          loader: EmployeeControllerLoader,
        },
        {
          path: '/hr/employees/new',
          element: <NewEmployeeControllerPage />,
          action: manipulateEmployeeControllerAction,
          loader: checkAuthLoader,
        },
        {
          path: '/hr/employees/employee-detail',
          id: 'employee-detail',
          loader: EmployeesDetailLoader,
          children: [
            {
              path: '/hr/employees/employee-detail/:employeeId',
              element: <EmployeeDetailPage />,
              action: deleteEmployeeAction,
              loader: checkAuthLoader,
            },
            {
              path: '/hr/employees/employee-detail/edit/:employeeId',
              element: <EditEmployeePage />,
              action: manipulateEmployeeControllerAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/hr/employeeEducations',
      children: [
        {
          index: true,
          element: <EmployeeEducationControllersPage />,
          loader: EmployeeEducationControllerLoader,
        },
        {
          path: '/hr/employeeEducations/new',
          element: <NewEmployeeEducationPage />,
          action: manipulateEmployeeEducationAction,
          loader: checkAuthLoader,
        },
        {
          path: '/hr/employeeEducations/employeeEducation-detail',
          id: 'employeeEducation-detail',
          loader: EmployeeEducationsDetailLoader,
          children: [
            {
              path: '/hr/employeeEducations/employeeEducation-detail/:employeeEducationId',
              element: <EmployeeEducationDetailPage />,
              action: deleteEmployeeEducationsAction,
              loader: checkAuthLoader,
            },
            {
              path: '/hr/employeeEducations/employeeEducation-detail/edit/:employeeEducationId',
              element: <EditEmployeeEducationPage />,
              action: manipulateEmployeeEducationAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/hr/employeePerformances',
      children: [
        {
          index: true,
          element: <EmployeePerformanceControllersPage />,
          loader: EmployeePerformanceControllerLoader,
        },
        {
          path: '/hr/employeePerformances/new',
          element: <NewEmployeePerformancePage />,
          action: manipulateEmployeePerformanceAction,
          loader: checkAuthLoader,
        },
        {
          path: '/hr/employeePerformances/employeePerformance-detail',
          id: 'employeePerformance-detail',
          loader: EmployeePerformanceDetailLoader,
          children: [
            {
              path: '/hr/employeePerformances/employeePerformance-detail/:employeePerformanceId',
              element: <EmployeePerformanceDetailPage />,
              action: deleteEmployeePerformanceAction,
              loader: checkAuthLoader,
            },
            {
              path: '/hr/employeePerformances/employeePerformance-detail/edit/:employeePerformanceId',
              element: <EditEmployeePerformancePage />,
              action: manipulateEmployeePerformanceAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/hr/employeeVacations',
      children: [
        {
          index: true,
          element: <EmployeeVacationControllersPage />,
          loader: EmployeeVacationControllerLoader,
        },
        {
          path: '/hr/employeeVacations/new',
          element: <NewEmployeeVacationPage />,
          action: manipulateEmployeeVacationAction,
          loader: checkAuthLoader,
        },
        {
          path: '/hr/employeeVacations/employeeVacation-detail',
          id: 'employeeVacation-detail',
          loader: EmployeeVacationDetailPageLoader,
          children: [
            {
              path: '/hr/employeeVacations/employeeVacation-detail/:employeeVacationId',
              element: <EmployeeVacationDetailPage />,
              action: deleteEmployeeVacationAction,
              loader: checkAuthLoader,
            },
            {
              path: '/hr/employeeVacations/employeeVacation-detail/edit/:employeeVacationId',
              element: <EditEmployeeVacationPage />,
              action: manipulateEmployeeVacationAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/hr/pdfs',
      children: [
        {
          index: true,
          element: <PDFsPage />,
          loader: PDFsLoader,
        },
      ],
    },
  ],
};
