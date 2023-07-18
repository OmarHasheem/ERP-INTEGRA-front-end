import { useState , useEffect } from "react";
import { usePermission } from "../../../hooks/useApi";
import classes from './RolesSelectPermissions.module.scss'
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
const RolesSelectPermissions = ({rolePermission})=>{
    const [editPermission, setEditPermission] = useState({ id: 0, type: '' });
    const [applyEdit, setApplyEdit] = useState(false);
    const [permissions,setPermissions] = useState([]);
    console.log(rolePermission)

    const navigation = useNavigation();
    const permissionInfo = usePermission();

    const { roleId } = useParams('roleId');

    const removeById = (arr, id) => {
      const requiredIndex = arr.findIndex(el => el.id == id);
      if (requiredIndex === -1) {
        return false;
      }
      arr.splice(requiredIndex, 1);
      return true;
    };
  
    const addById = (arr, id) => {
      const permission = permissions.find(permission => permission.id == id);
      if (permission) {
        arr.push(permission);
      }
    };
  
    const checkHandler = (event) => {
      const { value, checked } = event.target;
      if (checked) {
        addById(rolePermission, value);
        setEditPermission({ id: value, type: 'attach' });
        setApplyEdit(!applyEdit);
      } else {
        removeById(rolePermission, value);
        setEditPermission({ id: value, type: 'detach' });
        setApplyEdit(!applyEdit);
      }
    };
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const token = getAuthToken();
          const permissionData = {
            permissionId: editPermission.id,
          };
          
          let url;
          if (editPermission.type === 'attach') {
            url = `http://localhost:8000/userManagement/roles/attach/${roleId}`;
          } else {
            url = `http://localhost:8000/userManagement/roles/detach/${roleId}`;
          }
          
          const response = await fetch(url, {
            method: 'post',
            headers: {
              Authorization: 'bearer ' + token,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(permissionData),
          });
  
  
          if (!response.ok) {
            throw json({ message: 'Could not add permission to role.' }, { status: 500 });
          }
        } catch (error) {
          console.error(error);
        }
      };
  
      if (editPermission.id > 0) {
        fetchData();
      }
    }, [editPermission, applyEdit]);
  
    const verifyCheckHandler = (id) => {
      return rolePermission.some(permission => permission.id === id);
    };


    useEffect(() => {
        setPermissions(permissionInfo);
    }, [permissionInfo]);

    return(
    <div className={classes.RolesSelectPermissions}>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Give/Not</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((permission) => (
            <tr
              key={permission.id}
            >
              <td>{permission.id}</td>
              <td>{permission.name}</td>
              <td style={{cursor: 'auto'}} onClick={(event) => event.stopPropagation()}><input type="checkbox" 
              name="permissionId"
               value={permission.id}
               checked={verifyCheckHandler(permission.id)}
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

export default RolesSelectPermissions;