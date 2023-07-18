import { getAuthToken } from '../../../../hooks/auth';
import { Form, json, redirect, useNavigate, useNavigation, useParams } from 'react-router-dom';
import classes from './ProductDetailNewForm.module.scss';
import { useEffect, useState } from 'react';
import { useAttributesGroup, useGroups, useProductStock } from '../../../../hooks/useApi';
import Input from './UI/Input';
import CheckboxInput from './UI/CheckboxInput';
import { Select } from '@mui/material';
import SelectInput from './UI/SelectInput';
import TextAreaInput from './UI/TextAreaInput';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import Wrapper from './Helpers/Wrapper';
import { Card } from '@mui/material';

const ProductDetailEditForm = ({ method, detail }) => {
  const [attributesGroup, setAttributesGroup] = useState([]);

  // const data = useActionData();
  const navigation = useNavigation();

  const isSubmitting = navigation.state === 'submitting';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getAuthToken();

        const response = await fetch('http://localhost:8000/repository/products/attributeGroups/attributesOfGroup/' + detail.attribute_group_id, {
          headers: {
            'Authorization': 'bearer ' + token,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setAttributesGroup(data.data);
        } else {
          throw json({ message: 'Could not fetch Attributes of Group.' }, { status: 500 });
        }
      } catch (error) {
        console.error(error);
      }
    }

      fetchData();
  }, []);

  return (
    <div className={classes.productDetailForm}>
      <Card className={classes.card}>
      <Form method={method} className={classes.form}>
        <table>
          <thead>
          <tr>
          </tr>
          </thead>
          <tbody>
            <tr>
              <label>Stock</label>
              <td><input type="number" name="stock"  required min="0" defaultValue={detail.stock}/></td>
              {
                attributesGroup.map((attribute) => (
                  <Wrapper key={attribute.id}>
                    {<label>{attribute.name}</label>}
                    {attribute.type == 'select' && <td><SelectInput props={attribute} key={attribute.id} /></td>}
                    {attribute.type == 'checkbox' && <td><CheckboxInput props={attribute} key={attribute.id} /></td>}
                    {attribute.type == 'radio' && <td><CheckboxInput props={attribute} key={attribute.id} /></td>}
                    {attribute.type == 'textArea' && <td><TextAreaInput props={attribute} key={attribute.id} value={detail.details[attribute.name]} /></td>}
                    {attribute.type == 'text' && <td><Input props={attribute} key={attribute.id} value={detail.details[attribute.name]} /></td>}
                    {attribute.type == 'number' && <td><Input props={attribute} key={attribute.id} value={detail.details[attribute.name]} /></td>}
                    {attribute.type == 'date' && <td><Input props={attribute} key={attribute.id} value={detail.details[attribute.name]} /></td>}
                    {attribute.type == 'time' && <td><Input props={attribute} key={attribute.id} value={detail.details[attribute.name]} /></td>}
                    {attribute.type == 'date-time' && <td><Input props={attribute} key={attribute.id} value={detail.details[attribute.name]} /></td>}
                  </Wrapper>
                ))
              }
            </tr>
          </tbody>
        </table>
        <div className={classes.editActions}>
          <button disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Save'}
          </button>
        </div>
      </Form>
          </Card>
    </div>
  );
};

export default ProductDetailEditForm;

export async function action({ request, params }) {
  const formData = await request.formData();
  const token = getAuthToken();
  const method = request.method;
console.log(params)
  const attributeData = {};
  //let attributeData = [];

  let currentGroup = 1;
  let currentAttributes = {};

  for (let pair of formData.entries()) {
    const [fieldName, fieldValue] = pair;

    if(Object.keys(currentAttributes).includes(fieldName)) {
      attributeData[`group${currentGroup}`] = currentAttributes;
      // attributeData = attributeData.concat(currentAttributes);
      currentGroup ++;
      currentAttributes = {};
    }

    if (fieldName.includes('name')) {
      currentAttributes.name = fieldValue;
    } else if (fieldName.includes('value')) {
      attributeData[`group${currentGroup}`] = currentAttributes;
      currentAttributes = { name: fieldValue };
      currentGroup++;
    } else {
      const attributeName = fieldName.split('_')[0];
      currentAttributes[attributeName] = fieldValue;
    }
  }

  if (Object.keys(currentAttributes).length > 0) {
    attributeData[`group${currentGroup}`] = currentAttributes;
  }



  const details = {
    details: attributeData,
  }

  const response = await fetch('http://localhost:8000/repository/productDetails/' + params.detailId, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      Authorization: 'bearer' + token
    },
    body: JSON.stringify(details),
  });

  if (!response.ok) {
    throw json({ message: 'Could not save Details of Product.' }, { status: 500 });
  }

  return redirect(`/repository/products`);
}