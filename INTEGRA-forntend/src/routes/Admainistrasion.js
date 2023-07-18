import RootLayout from '../pages/Root';
import ErrorPage from '../pages/Error';
import { checkAuthLoader, tokenLoader } from '../hooks/auth';

import RolesPage, {
  loader as RoleLoader,
} from '../pages/Administration/Role/Role';

import NewRolePage from '../pages/Administration/Role/NewRole';
import { action as manipulateRoleAction } from '../components/Administration/Role/RoleForm';

import RoleDetailPage, {
  loader as RoleDetailLoader,
} from '../pages/Administration/Role/RoleDetail';

import { action as deleteRoleAction } from '../pages/Administration/Role/RoleDetail';

import EditRolePage from '../pages/Administration/Role/EditRole';

// import { action as manipulateRoleAction } from '../components/Administration/Role/RoleForm';

import UsersPage, {
  loader as UserLoader,
} from '../pages/Administration/User/User';

import NewUserPage from '../pages/Administration/User/NewUser';

import UserDetailPage, {
  loader as UserDetailLoader,
} from '../pages/Administration/User/UserDetail';

import { action as deleteUserAction } from '../pages/Administration/User/UserDetail';

import EditUserPage from '../pages/Administration/User/EditUser';

import { action as manipulateUserAction } from '../components/Administration/User/UserForm';

import PermissionPage, {
  loader as PermissionLoader,
} from '../pages/Administration/Permission/Permission';

import PermissionsDetailPage, {
  loader as PermissionDetailLoader,
} from '../pages/Administration/Permission/PermissionDetail';

import { action as deletePermissionAction } from '../pages/Administration/Permission/PermissionDetail';
import { userManagementLoader } from '../util/utils';

export const AdmainstrationRoute = {
  path: '/userManagement',
  element: <RootLayout />,
  errorElement: <ErrorPage />,
  loader: userManagementLoader,
  children: [
    {
      path: '/userManagement/roles',
      children: [
        {
          index: true,
          element: <RolesPage />,
          loader: RoleLoader,
        },
        {
          path: '/userManagement/roles/new',
          element: <NewRolePage />,
          action: manipulateRoleAction,
          loader: checkAuthLoader,
        },
        {
          path: '/userManagement/roles/role-detail',
          id: 'role-detail',
          loader: RoleDetailLoader,
          children: [
            {
              path: '/userManagement/roles/role-detail/:roleId',
              element: <RoleDetailPage />,
              action: deleteRoleAction,
              loader: checkAuthLoader,
            },
            {
              path: '/userManagement/roles/role-detail/edit/:roleId',
              element: <EditRolePage />,
              action: manipulateRoleAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/userManagement/users',
      children: [
        {
          index: true,
          element: <UsersPage />,
          loader: UserLoader,
        },
        {
          path: '/userManagement/users/new',
          element: <NewUserPage />,
          action: manipulateUserAction,
          loader: checkAuthLoader,
        },

        {
          path: '/userManagement/users/user-detail',
          id: 'user-detail',
          loader: UserDetailLoader,
          children: [
            {
              path: '/userManagement/users/user-detail/:userId',
              element: <UserDetailPage />,
              action: deleteUserAction,
              loader: checkAuthLoader,
            },
            {
              path: '/userManagement/users/user-detail/edit/:userId',
              element: <EditUserPage />,
              action: manipulateUserAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    {
      path: '/userManagement/permissions',
      children: [
        {
          index: true,
          element: <PermissionPage />,
          loader: PermissionLoader,
        },

        {
          path: '/userManagement/permissions/permission-detail',
          id: 'permission-detail',
          loader: PermissionDetailLoader,
          children: [
            {
              path: '/userManagement/permissions/permission-detail/:permissionId',
              element: <PermissionsDetailPage />,
              action: deletePermissionAction,
              loader: checkAuthLoader,
            },
          ],
        },
      ],
    },
    //
  ],
};
