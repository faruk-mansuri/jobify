const FormRow = ({ name, type, labelText, defaultValue, onChange }) => {
  return (
    <div className='form-raw'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className='form-input'
        defaultValue={defaultValue || ''}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormRow;
