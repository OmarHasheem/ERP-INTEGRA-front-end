const SelectInput = ({ props }) => {
  return (
      <select id={props.name} name={props.name}>
        {props.values.map((value) => (
          <option key={value} value={value}>{value}</option>
        ))}
      </select>
  );
};

export default SelectInput;