import { useState , useEffect } from "react";
import { usePermission, useRole } from "../../../hooks/useApi";
import classes from './UserSelectRole.module.scss'
import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
  useParams,
} from 'react-router-dom';
import { getAuthToken } from "../../../hooks/auth";
const UserSelectRole = ({userRoles})=>{
    const [editRole, setEditRole] = useState({ id: 0, type: '' });
    const [applyEdit, setApplyEdit] = useState(false);
    const [roles,setRoles] = useState([]);

    const navigation = useNavigation();
    const roleResponse = useRole();

    const { userId } = useParams('userId');

    const removeById = (arr, id) => {
      const requiredIndex = arr.findIndex(el => el.id == id);
      if (requiredIndex === -1) {
        return false;
      }
      arr.splice(requiredIndex, 1);
      return true;
    };
  
    const addById = (arr, id) => {
      const role = roles.find(role => role.id == id);
      if (role) {
        arr.push(role);
      }
    };
  
    const checkHandler = (event) => {
      const { value, checked } = event.target;
      if (checked) {
        addById(userRoles, value);
        setEditRole({ id: value, type: 'attach' });
        setApplyEdit(!applyEdit);
      } else {
        removeById(userRoles, value);
        setEditRole({ id: value, type: 'detach' });
        setApplyEdit(!applyEdit);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = getAuthToken();
          const roleData = {
            role: editRole.id,
          };
          
          let url;
          if (editRole.type === 'attach') {
            url = `http://localhost:8000/userManagement/roles/assignRole/${userId}`;
          } else {
            url = `http://localhost:8000/userManagement/roles/unassignRole/${userId}`;
          }
          console.log(url)
          console.log(roleData)
          const response = await fetch(url, {
            method: 'post',
            headers: {
              Authorization: 'bearer ' + token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(roleData),
          });
  
  
          if (!response.ok) {
            throw json({ message: 'Could not add role to user.' }, { status: 500 });
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      if (editRole.id > 0) {
        fetchData();
      }
    }, [editRole, applyEdit]);
  
    const verifyCheckHandler = (id) => {
      return userRoles.some(role => role.id === id);
    };


    useEffect(() => {
        setRoles(roleResponse);
    }, [roleResponse]);

    return(
    <div className={classes.UserSelectRole}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Give/Not</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr
              key={role.id}
            >
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td style={{cursor: 'auto'}} onClick={(event) => event.stopPropagation()}><input type="checkbox" 
              name="roleId"
               value={role.id}
               checked={verifyCheckHandler(role.id)}
               onChange={checkHandler}
               /></td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Give/Not</th>
          </tr>
        </tfoot>
      </table>
    </div>
    )
}

export default UserSelectRole;