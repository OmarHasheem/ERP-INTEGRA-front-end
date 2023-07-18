import { Card } from '@mui/material';
import classes from './GroupsList.module.scss';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Form, Link, useSubmit } from 'react-router-dom';
import { getAuthToken } from '../../../../../hooks/auth';
import { useQuery } from 'react-query';
import { Fragment, useEffect, useState } from 'react';

const GroupsList = ({ groups }) => {
  const submit = useSubmit();
  const [attributesOfGroup, setAttributesOfGroup] = useState([]);
  const deleteHandler = (event) => {
    const proceed = window.confirm('Are you sure?');

    const id = event.target.value;
    if (proceed) {
      submit(null, {
        method: 'delete',
        action: `/repository/products/attributes/groups/delete/${id}`
      });
    }
  };

  let responseOfGroups;

  const attributesOfGroupHandler = async (id) => {
    const token = getAuthToken();
    const response = await fetch('http://localhost:8000/repository/products/attributeGroups/attributesOfGroup/' + id, {
      headers: {
        Authorization: 'bearer ' + token
      }
    });

    const data = await response.json();
    responseOfGroups = data.data;
    setAttributesOfGroup(responseOfGroups);
  };

  console.log(attributesOfGroup);

  return (
    <div className={classes.groupsList}>
      <div className={classes.add_category}>
        <Link
          className={classes.add_category_link}
          to='/repository/products/attributes/groups/new'
        >
          Add New Group
        </Link>
      </div>
      {groups.map((group) => (
        <Card className={classes.card} key={group.id}>
          <label>Name of Group:</label>
          <p> {group.name} </p>
          <div className={classes.arrowIcon}>
          <ArrowDropDownIcon className={classes.arrow} onClick={() => (attributesOfGroupHandler(group.id))} />
          <ArrowDropUpIcon className={classes.arrow} onClick={() => {
            if ((attributesOfGroup.length > 0) && (attributesOfGroup[0].group_id == group.id)) setAttributesOfGroup([]);
          }} />
</div>
          {(attributesOfGroup.length > 0) && (attributesOfGroup[0].group_id == group.id) &&
            <div>
              <h4> Details of Group</h4>
              {attributesOfGroup.map((attribute) => (
                <p key={attribute.id}>
                  <label>Name:</label>
                  {attribute.name}
                  {attribute.values && <label>Values:</label>}
                  {attribute.values && attribute.values.map((value, index) => (
                    <Fragment key={value}>
                      {index > 0 && ' - '}
                      {value}
                    </Fragment>
                    ))
                  }
            </p>
            ))
          }
            </div>
          }
          <div className={classes.btn}>
            <Link
              className={classes.link}
              to={`/repository/products/attributes/new/${group.id}`}
            >
              Create New Attribute
            </Link>
            <Link
              className={classes.link}
              to={`/repository/products/attributes/groups/group-detail/edit/${group.id}`}
            >
              Edit
            </Link>
            <button onClick={deleteHandler} value={group.id} type='submit'>
              Delete
            </button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default GroupsList;
