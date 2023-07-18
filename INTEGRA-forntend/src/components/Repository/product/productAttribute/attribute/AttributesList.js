import { Card } from '@mui/material';
import AttributeCard from '../UI/AttributeCard';

const AttributesList = ({attributes}) => {
  return (
    <div>
      {attributes.map((attribute) => (
            <AttributeCard attribute={attribute} key={attribute.id} />
      ))}
    </div>
  );
}

export default AttributesList;