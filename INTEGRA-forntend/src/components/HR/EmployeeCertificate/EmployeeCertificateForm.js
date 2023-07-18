import {
  Form,
  json,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import classes from './EmployeeCertificateForm.module.scss';
import { getAuthToken } from '../../../hooks/auth';
import { useEffect, useState } from 'react';
import { useSupervisors } from '../../../hooks/useApi';

const EmployeeCertificateForm = ({ method, employeeCertificate }) => {
  const [supervisors, setSupervisors] = useState([]);
  const SupervisorResponse = useSupervisors();
  //const data = useActionData();
  const navigate = useNavigate();
  const navigation = useNavigation();

  useEffect(() => {
    setSupervisors(SupervisorResponse);
  }, [SupervisorResponse]);

  const isSubmitting = navigation.state === 'submitting';

  const cancelHandler = () => {
    navigate(-1);
  };

  return (
    <Form method={method} className={classes.form}>
      <div>
        <label htmlFor="name">Name :</label>
        <input
          id="name"
          type="text"
          name="name"
          required
          defaultValue={employeeCertificate ? employeeCertificate.name : ''}
        />

        <label htmlFor="name">Level :</label>
        <input
          id="level"
          type="text"
          name="level"
          required
          defaultValue={employeeCertificate ? employeeCertificate.level : ''}
        />

        <label htmlFor="supervisor">Employee :</label>
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

export default EmployeeCertificateForm;

export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const token = getAuthToken();

  const employeeCertificateData = {
    employee_id: data.get('supervisorId'),
    name: data.get('name'),
    level: data.get('level'),
  };

  let url;

  if (method === 'PUT') {
    url =
      'http://localhost:8000/hr/employeeCertificates/' +
      params.employeeCertificateId;
  } else {
    url = 'http://localhost:8000/hr/employeeCertificates';
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'bearer' + token,
    },
    body: JSON.stringify(employeeCertificateData),
  });
console.log(employeeCertificateData)
  if (!response.ok) {
    throw json(
      { message: 'Could not save EmployeeCertificates.' },
      { status: 500 }
    );
  }

  return redirect('/hr/employeeCertificates');
}
