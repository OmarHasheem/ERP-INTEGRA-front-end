import { Link, useSubmit } from 'react-router-dom';
import classes from './EmailItem.module.scss';
import { Card } from '@mui/material';
const EmailItem = ({ email }) => {
  const submit = useSubmit();

  const deleteHandler = () => {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      submit(null, { method: 'delete' });
    }
  };

  return (
    <div className={classes.emailItem}>
        <h1> Email Item </h1>
        <div className={classes.box}>
          <Card className={classes.card}>
            <div className={classes.cardItems}>
              <label>Name of Email</label>
              <p> {email.type} </p>
            </div>
          </Card>
        </div>
    </div>
  );
};

export default EmailItem;
