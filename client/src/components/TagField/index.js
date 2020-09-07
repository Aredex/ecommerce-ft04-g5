import React from "react";
import { useFormikContext } from "formik";
import style from "./index.module.scss";
import { useDebounce } from "react-use";

function TagField(props) {
  const formikContext = useFormikContext();
  const inputRef = React.useRef(null);
  const [suggestionResult, setSuggestionResult] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  useDebounce(
    () => {
      if (inputValue.length > 0)
        setSuggestionResult(
          props.suggestions.filter((element) =>
            props.suggestionProp
              ? element[props.suggestionProp]
                  .toLowerCase()
                  .includes(inputValue.toLowerCase()) &&
                !formikContext.values[props.name].includes(element)
              : element.toLowerCase().includes(inputValue.toLowerCase()) &&
                !formikContext.values[props.name].includes(element)
          )
        );
      else setSuggestionResult([]);
    },
    props.delay,
    [inputValue]
  );

  return (
    <div className={style.inputField}>
      <div className={style.prefix} style={props.prefixStyle}>
        {props.prefix}
      </div>
      <div className={style.input}>
        {formikContext.values[props.name].length > 0 ? (
          formikContext.values[props.name].map((val) => (
            <span key={props.suggestionProp ? val[props.suggestionProp] : val}>
              {props.suggestionProp ? val[props.suggestionProp] : val}
              {!props.readOnly && (
                <i
                  className={["far fa-times-circle", style.removeButton].join(
                    " "
                  )}
                  onClick={() =>
                    formikContext.setFieldValue(
                      props.name,
                      formikContext.values[props.name].reduce(
                        (result, item) => {
                          if (item !== val) result.push(item);
                          return result;
                        },
                        []
                      )
                    )
                  }
                />
              )}
            </span>
          ))
        ) : (
          <p>{props.empty || "sin datos"}</p>
        )}
      </div>
      {!props.readOnly && (
        <div className={style.sufix}>
          <input
            ref={inputRef}
            value={inputValue}
            placeholder={props.placeholder}
            onChange={({ currentTarget }) => {
              setInputValue(currentTarget.value);
            }}
            onKeyUp={(event) => {
              if (event.keyCode === 13 && suggestionResult.length > 0) {
                formikContext.setFieldValue(props.name, [
                  ...formikContext.values.categories,
                  suggestionResult[0],
                ]);
                setSuggestionResult([]);
                setInputValue("");
                inputRef.current.focus();
              }
            }}
          />
          {suggestionResult.length > 0 && (
            <ul>
              {suggestionResult.map((item, i) => (
                <li
                  key={i}
                  onClick={() => {
                    setSuggestionResult([]);
                    formikContext.setFieldValue(props.name, [
                      ...formikContext.values.categories,
                      item,
                    ]);
                    setInputValue("");
                    inputRef.current.focus();
                  }}
                >
                  {props.suggestionProp ? item[props.suggestionProp] : item}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

TagField.propTypes = {};

TagField.defaultProps = {
  delay: 250,
};

export default TagField;
