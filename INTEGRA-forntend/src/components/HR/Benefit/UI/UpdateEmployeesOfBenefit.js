import { useEffect, useState } from 'react';
import { useEmployees } from '../../../../hooks/useApi';
import classes from '../../EmployeeController/EmployeeControllersList.module.scss';
import { getAuthToken } from '../../../../hooks/auth';
import { json, useNavigate, useParams } from 'react-router-dom';

const UpdateEmployeesOfBenefit = ({ employeesOfBenefit }) => {
  const [employees, setEmployees] = useState([]);
  const [editEmployee, setEditEmployee] = useState({ id: 0, type: '' });
  const [applyEdit, setApplyEdit] = useState(false);

  const { benefitId } = useParams('benefitId');
  const responseEmployee = useEmployees();
  const navigate = useNavigate();

  useEffect(() => {
    setEmployees(responseEmployee);
  }, [responseEmployee]);

  const removeById = (arr, id) => {
    const requiredIndex = arr.findIndex(el => el.id == id);
    if (requiredIndex === -1) {
      return false;
    }
    arr.splice(requiredIndex, 1);
    return true;
  };

  const addById = (arr, id) => {
    const employee = employees.find(employee => employee.id == id);
    if (employee) {
      arr.push(employee);
    }
  };

  const checkHandler = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      addById(employeesOfBenefit, value);
      setEditEmployee({ id: value, type: 'attach' });
      setApplyEdit(!applyEdit);
    } else {
      removeById(employeesOfBenefit, value);
      setEditEmployee({ id: value, type: 'detach' });
      setApplyEdit(!applyEdit);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(editEmployee.type);
      try {
        const token = getAuthToken();
        const benefitData = {
          benefitId: benefitId,
        };

        let url;
        if (editEmployee.type === 'attach') {
          url = `http://localhost:8000/hr/employees/attachBenefitToEmployee/${editEmployee.id}`;
        } else {
          url = `http://localhost:8000/hr/employees/detachBenefitToEmployee/${editEmployee.id}`;
        }

        const response = await fetch(url, {
          method: 'post',
          headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(benefitData),
        });


        if (!response.ok) {
          throw json({ message: 'Could not add employee to benefit.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (editEmployee.id > 0) {
      fetchData();
    }
  }, [editEmployee, applyEdit]);

  const verifyCheckHandler = (id) => {
    return employeesOfBenefit.some(employeeBenefit => employeeBenefit.id === id);
  };

  return (
    <div className={classes.EmployeeList}>
      <table>
        <thead>
        <tr>
          <th>Employee Id</th>
          <th>Name</th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        {employees.map((employee) => (
          <tr
            key={employee.id}
            onClick={() => navigate(`/hr/employees/employee-detail/${employee.id}`)}
          >
            <td>{employee.id}</td>
            <td>{employee.firstName + ' ' + employee.lastName}</td>
            <td style={{cursor: 'auto'}} onClick={(event) => event.stopPropagation()}>
              <input
                type="checkbox"
                value={employee.id}
                checked={verifyCheckHandler(employee.id)}
                onChange={checkHandler}
              />
            </td>
          </tr>
        ))}
        </tbody>
        <tfoot>
        <tr>
          <th>Employee Id</th>
          <th>Name</th>
          <th></th>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default UpdateEmployeesOfBenefit;
