import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Field, useFormikContext } from "formik";
import style from "./index.module.scss";

function InputField(props) {
  const formikContext = useFormikContext();

  function handleChange(event) {
    props.onChange
      ? props.onChange(event)
      : formikContext.setFieldValue(props.name, event.target.value);
  }

  useEffect(() => {
    formikContext.validateField && formikContext.validateField(props.name)
  }, [formikContext, props.name])

  return (
    <div
      className={[style.inputField, props.readOnly ? style.ro : ""].join(" ")}
      style={props.style}
    >
      <div className={style.prefix} style={props.prefixStyle}>
        {props.prefix}
      </div>
      <div className={style.input}>
        {props.inputPrefix && (
          <div className={style.inputPrefix}>{props.inputPrefix}</div>
        )}
        <Field
          name={props.name}
          value={props.value ? props.value : formikContext.values[props.name]}
          type={props.type}
          onChange={handleChange}
          readOnly={props.readOnly}
          style={props.inputStyle}
          validate={props.validate}
        />
        <div className={style.inputSufix}>{props.inputSufix}</div>
      </div>
      <div className={style.sufix}>{props.sufix}</div>
    </div>
  );
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  readOnly: PropTypes.bool,
};

export default InputField;
