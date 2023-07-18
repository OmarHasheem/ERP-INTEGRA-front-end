import GroupForm from '../../../../components/Repository/product/productAttribute/group/GroupForm';
import { json, useRouteLoaderData } from 'react-router-dom';
import classes from './EditGroup.module.scss';
import { getAuthToken } from '../../../../hooks/auth';

const EditGroupPage = () => {
  const { data } = useRouteLoaderData('group-detail');
  return (
    <div className={classes.editGroup}>
      <h1>Repository > Product > Edit Group Of Attribute</h1>
      <GroupForm method='put' group={data}/>
    </div>
  );
};

export default EditGroupPage;

export async function loader({ request, params }) {
  const id = params.groupId;
  const token = getAuthToken();

  const response = await fetch(
    'http://localhost:8000/repository/products/attributeGroups/' + id,
    {
      headers: {
        Authorization: 'bearer' + token,
      },
    }
  );

  if (!response.ok) {
    throw json(
      { message: 'Could not fetch details for selected group' },
      { status: 500 }
    );
  } else {
    return response.json();
  }
}
