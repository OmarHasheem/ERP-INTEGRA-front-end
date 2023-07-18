import AttributesPage,
{ loader as AttributesLoader }
  from '../../pages/Repository/product/productAttribute/Attributes';
import GroupsPage, {
  loader as GroupsLoader,
  action as deleteGroupAction
} from '../../pages/Repository/product/attributeGroup/Groups';
import NewGroup from '../../pages/Repository/product/attributeGroup/NewGroup';
import { action as manipulateGroupAction } from '../../components/Repository/product/productAttribute/group/GroupForm';
import { checkAuthLoader } from '../../hooks/auth';
import EditGroup, {
  loader as GroupDetailLoader
} from '../../pages/Repository/product/attributeGroup/EditGroup';
import NewAttribute from '../../pages/Repository/product/productAttribute/NewAttribute';
import { action as manipulateAttributeAction} from '../../components/Repository/product/productAttribute/attribute/AttributeForm';

export const productAttribute = {
  path: '/repository/products/attributes',
  children: [
    {
      path: '/repository/products/attributes',
      children: [
        {
          index: true,
          element: <AttributesPage />,
          loader: AttributesLoader
        },
        {
          path: '/repository/products/attributes/new/:groupId',
          element: <NewAttribute />,
          action: manipulateAttributeAction,
        },
      ],
    },
    {
      path: '/repository/products/attributes/groups',
      children: [
        {
          index: true,
          element: <GroupsPage />,
          loader: GroupsLoader,
        },
        {
          path: '/repository/products/attributes/groups/delete/:groupId',
          action: deleteGroupAction,
        },
        {
          path: '/repository/products/attributes/groups/new',
          element: <NewGroup />,
          loader: checkAuthLoader,
          action: manipulateGroupAction,
        },
        {
          path: '/repository/products/attributes/groups/group-detail/edit/:groupId',
          id: 'group-detail',
          element: <EditGroup />,
          action: manipulateGroupAction,
          loader: GroupDetailLoader,
        }
      ],
    },
  ],
};