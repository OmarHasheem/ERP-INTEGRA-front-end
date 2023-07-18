import { Form, NavLink, useLocation, useMatch } from 'react-router-dom';
import classes from './SideBar.module.scss';
import { useContext, useEffect, useState } from 'react';
import { marketingCtx } from './SideBarContext';

function SideBar() {
  const [showMarketingDropdown, setShowMarketingDropdown] = useState(false);
  const [showRepositoryDropdown, setShowRepositoryDropdown] = useState(false);
  const [showSystemManagementDropdown, setSystemManagementDropdown] =
    useState(false);
  const [showAdministrationDropdown, setShowAdministrationDropdown] =
    useState(false);
  const [showHrDropdown, setShowHrDropdown] = useState(false);

  const handleMarketingDropdownClick = () => {
    setShowMarketingDropdown(!showMarketingDropdown);
  };
  const handleRepositoryDropdownClick = () => {
    setShowRepositoryDropdown(!showRepositoryDropdown);
  };
  const handleSystemManagementDropdownClick = () => {
    setSystemManagementDropdown(!showSystemManagementDropdown);
  };
  const handleHrDropdownClick = () => {
    setShowHrDropdown(!showHrDropdown);
  };

  const handleAdministrationDropdownClick = () => {
    setShowAdministrationDropdown(!showAdministrationDropdown);
  };
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('marketing'))
      handleMarketingDropdownClick(true);

    if (location.pathname.includes('hr')) handleHrDropdownClick(true);

    if (location.pathname.includes('repository'))
      handleRepositoryDropdownClick(true);

    if (location.pathname.includes('systemManagement'))
      handleSystemManagementDropdownClick(true);
  }, []);

  const department = localStorage.getItem('department');

  return (
    <aside className={classes.sidebar}>
      {department === 'userManagement' && <div
        onClick={() => {
          {
            handleSystemManagementDropdownClick();
          }
        }}
        className={` ${
          showSystemManagementDropdown ? classes.itemBold : classes.item
        }`}
      >
        System Management
      </div>}
      <div
        className={` ${
          showSystemManagementDropdown ? classes.dropdown.show : classes.dropdown
        }`}
      >
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/systemManagement/marketing'
            end
          >
            Marketing Charts
          </NavLink>
        </div>
        {/* <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/systemmanagment/profile'
            end
          >
            HR Info
          </NavLink>
        </div> */}
        {/* <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/systemmanagment/profile'
            end
          >
            Repository Info
          </NavLink>
        </div> */}
      </div>

      {department === 'userManagement' && <div
        onClick={() => {
          handleAdministrationDropdownClick();
        }}
        className={` ${
          showAdministrationDropdown ? classes.itemBold : classes.item
        }`}
      >
        Administration
      </div>}
      <div
        className={` ${
          showAdministrationDropdown ? classes.dropdown.show : classes.dropdown
        }`}
      >
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/userManagement/roles'
            end
          >
            Roles
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/userManagement/permissions'
            end
          >
            Permission
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/userManagement/users'
            end
          >
            User
          </NavLink>
        </div>
      </div>

      {(department === 'userManagement' || department === 'marketing') && <div
        onClick={() => {
          {
            handleMarketingDropdownClick();
          }
        }}
        className={` ${
          showMarketingDropdown ? classes.itemBold : classes.item
        }`}
      >
        Marketing
      </div>}
      <div
        className={` ${
          showMarketingDropdown ? classes.dropdown.show : classes.dropdown
        }`}
      >
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/marketing/campaigns'
            end
          >
            Campaigns
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/marketing/tvs'
            end
          >
            TVs
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/marketing/socialMedia'
            end
          >
            SocialMedia
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/marketing/events'
            end
          >
            Events
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            to='/marketing/pdfs'
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
          >
            PDFs
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/marketing/emails'
            end
          >
            Emails
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/marketing/customers'
            end
          >
            Customers
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/marketing/leads'
            end
          >
            Leads
          </NavLink>
        </div>
      </div>

      {(department === 'userManagement' || department === 'repository') && <div
        onClick={() => {
          handleRepositoryDropdownClick();
        }}
        className={` ${
          showRepositoryDropdown ? classes.itemBold : classes.item
        }`}
      >
        Repository
      </div>}
      <div
        className={` ${
          showRepositoryDropdown ? classes.dropdown.show : classes.dropdown
        }`}
      >
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/repository/suppliers'
            end
          >
            Suppliers
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/repository/categories'
            end
          >
            Categories
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/repository/products'
            end
          >
            Products
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/repository/products/attributes/groups'
            end
          >
            Attributes Groups
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/repository/imports'
            end
          >
            Imports
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/repository/exports'
            end
          >
            Exports
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            to='/repository/pdfs'
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
          >
            PDFs
          </NavLink>
        </div>
      </div>
      {(department === 'userManagement' || department === 'hr') && <div
        onClick={() => {
          handleHrDropdownClick();
        }}
        className={` ${showHrDropdown ? classes.itemBold : classes.item}`}
      >
        HR
      </div>
      }
      <div
        className={` ${
          showHrDropdown ? classes.dropdown.show : classes.dropdown
        }`}
      >
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/hr/benefits'
            end
          >
            Benefit
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/hr/departments'
            end
          >
            Departments
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/hr/employeeCertificates'
            end
          >
            Employee Certificate
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/hr/employees'
            end
          >
            Employee
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/hr/employeeEducations'
            end
          >
            Employee Education
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/hr/employeePerformances'
            end
          >
            Employee Performances
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
            to='/hr/employeeVacations'
            end
          >
            Employee Vacations
          </NavLink>
        </div>
        <div className={classes.item}>
          <NavLink
            to='/hr/pdfs'
            className={({ isActive }) =>
              isActive ? classes.active : classes.navlink
            }
          >
            PDFs
          </NavLink>
        </div>
      </div>
      <div className={classes.butContainar}>
        <Form action='/Logout' method='post'>
          <button className={classes.button}>Logout</button>
        </Form>
      </div>
    </aside>
  );
}

export default SideBar;
