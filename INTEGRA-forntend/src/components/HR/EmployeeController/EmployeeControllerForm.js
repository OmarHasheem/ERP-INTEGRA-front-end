import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './EmployeeControllerForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';
import { useDepartments } from '../../../hooks/useApi';
import { useSupervisors } from '../../../hooks/useApi';
import { useEffect, useState } from 'react';

const EmployeeControllerForm = ({ method, employee }) => {
  const [departments, setDepartments] = useState([]);
  const [supervisors, setSupervisors] = useState([]);
  // const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';
  const departmentResponse = useDepartments();
  const SupervisorResponse = useSupervisors();
  useEffect(() => {
    setDepartments(departmentResponse);
  }, [departmentResponse]);

  useEffect(() => {
    setSupervisors(SupervisorResponse);
  }, [SupervisorResponse]);
  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <Form method={method} className={classes.form}>
      <div>
        <label htmlFor="firstName">First name :</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          required
          defaultValue={employee ? employee.firstName : ''}
        />
        <label htmlFor="lastName">Last name :</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          required
          defaultValue={employee ? employee.lastName : ''}
        />
        <label htmlFor="dateOfBrith">date Of Brith :</label>
        <input
          id="dateOfBrith"
          type="date"
          name="dateOfBrith"
          required
          defaultValue={employee ? employee.dateOfBrith : ''}
        />

        <label htmlFor="gender">gender :</label>
        <select
          id="gender"
          name="gender"
          required
          defaultValue={employee ? employee.gender : ''}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <label htmlFor="gender">Address :</label>
        <input
          id="address"
          type="text"
          name="address"
          required
          defaultValue={employee ? employee.address : ''}
        />
        <label htmlFor="email">Email :</label>
        <input
          id="email"
          type="email"
          name="email"
          required
          defaultValue={employee ? employee.email : ''}
        />
        <label htmlFor="phone">Phone :</label>
        <input
          id="phone"
          type="number"
          name="phone"
          required
          defaultValue={employee ? employee.phone : ''}
        />

        <label htmlFor="dateOfHire">Date Of Hire :</label>
        <input
          id="dateOfHire"
          type="date"
          name="dateOfHire"
          required
          defaultValue={employee ? employee.dateOfHire : ''}
        />

        <label htmlFor="salary">Salary:</label>
        <input
          id="salary"
          type="number"
          name="salary"
          required
          defaultValue={employee ? employee.salary : ''}
        />

        <label htmlFor="status">Status :</label>
        <select name="status" id="status" required>
          <option value="rejected">Rejected</option>
          <option value="resigned">Resigned</option>
          <option value="actual">Actual</option>
        </select>

        <label htmlFor="department">Department :</label>
        <select id="department" name="departmentId" required>
          <option disabled>--Choose Department--</option>
          {departments.map((department) => (
            <option key={department.id} value={department.id}>
              {department.name}
            </option>
          ))}
        </select>

        <label htmlFor="supervisor">Supervisor :</label>
        <select id="supervisor" name="supervisorId" required>
          <option disabled>--Choose Supervisor--</option>
          {supervisors.map((supervisor) => (
            <option key={supervisor.id} value={supervisor.id}>
              {supervisor.firstName + ' ' + supervisor.lastName}
            </option>
          ))}
        </select>

        <div className={classes.actions}>
          <button type="button" onClick={cancelHandler} disabled={isSubmitting}>
            Cancel
          </button>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </div>
    </Form>
  );
};

export default EmployeeControllerForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();
  const employeeData = {
    firstName: data.get('firstName'),
    lastName: data.get('lastName'),
    dateOfBrith: data.get('dateOfBrith'),
    gender: data.get('gender'),
    address: data.get('address'),
    email: data.get('email'),
    phone: data.get('phone'),
    dateOfHire: data.get('dateOfHire'),
    salary: data.get('salary'),
    supervisorId: data.get('supervisorId'),
    status: data.get('status'),
    departmentId: data.get('departmentId'),
  };
  console.log(employeeData);
  let url;

  if (method === 'PUT') {
    url = 'http://localhost:8000/hr/employees/' + params.employeeId;
  } else {
    url = 'http://localhost:8000/hr/employees';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify(employeeData),
  });

  console.log(response.json());
  if (!response.ok) {
    throw json({ message: 'Could not save Employees.' }, { status: 500 });
  }

  return redirect('/hr/employees');
}
