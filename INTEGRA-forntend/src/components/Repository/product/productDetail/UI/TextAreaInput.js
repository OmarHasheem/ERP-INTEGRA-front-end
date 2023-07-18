const TextAreaInput = ({ props, value }) => {
  return (
      <textarea
        id={props.name}
        name={props.name}
        required
        defaultValue={value ? value : ''}
      >
      </textarea>
  );
};

export default TextAreaInput;