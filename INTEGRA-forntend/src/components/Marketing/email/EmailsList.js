import { Link, useNavigate } from 'react-router-dom';
import classes from './EmailsList.module.scss';
const EmailsList = ({ emails }) => {
  const navigate = useNavigate();
  return (
    <div className={classes.emailsList}>
      <div className={classes.addNewEmail}>
        <Link className={classes.emailsList_link} to="/marketing/emails/new">
          Add New Email
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Email Id</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((email) => (
            <tr key={email.id} onClick={ () => navigate( '/marketing/emails/email-detail/1' ) }>
              <td>{email.id}</td>
              <td>{email.type}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>Email Id</th>
            <th>Name</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default EmailsList;