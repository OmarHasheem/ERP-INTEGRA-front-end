import { NavLink, useNavigate } from 'react-router-dom';
import classes from './Header.module.scss';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
function Header() {
  const navigate = useNavigate();
  return (
    <header className={classes.header}>
      <div className={classes['header-logo']}>I N T E G R A</div>
      <nav className={classes['header-nav']}>
        <ul>
          <li>
            <div
              onClick={() => {
                navigate('/userProfile/user');
              }}
              className={classes.box}
            >
              <AccountCircleIcon className={classes.icon} />
              <p>User Profile</p>
            </div>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
