import React from "react";
import { useDebounce } from "react-use";

import style from "./index.module.scss";

function Autocomplete({
  value,
  placeholder,
  readOnly,
  suggestions,
  suggestionProp,
  delay,
  onAdd,
  onRemove,
}) {
  const [suggestionResult, setSuggestionResult] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef(null);
  useDebounce(
    () => {
      if (inputValue.length > 0)
        setSuggestionResult(
          suggestions.filter((element) =>
            suggestionProp
              ? element[suggestionProp]
                  .toLowerCase()
                  .includes(inputValue.toLowerCase()) &&
                !value.includes(element)
              : element.toLowerCase().includes(inputValue.toLowerCase()) &&
                !value.includes(element)
          )
        );
      else setSuggestionResult([]);
    },
    delay,
    [inputValue]
  );

  return (
    <div className={style.autocomplete}>
      {value.length > 0 && (
        <div className={style.result}>
          {value.map((val) => (
            <span key={suggestionProp ? val[suggestionProp] : val}>
              {suggestionProp ? val[suggestionProp] : val}
              {!readOnly && (
                <i
                  className={["far fa-times-circle", style.removeButton].join(
                    " "
                  )}
                  onClick={() => onRemove(val)}
                />
              )}
            </span>
          ))}
        </div>
      )}
      {!readOnly && (
        <div className={style.input}>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            placeholder={placeholder}
            onChange={({ currentTarget }) => {
              setInputValue(currentTarget.value);
            }}
            onKeyUp={(event) => {
              if (event.keyCode === 13 && suggestionResult.length > 0) {
                onAdd(suggestionResult[0]);
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
                    onAdd(item);
                    setInputValue("");
                    inputRef.current.focus();
                  }}
                >
                  {suggestionProp ? item[suggestionProp] : item}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

Autocomplete.defaultProps = {
  delay: 250,
};

export default Autocomplete;
