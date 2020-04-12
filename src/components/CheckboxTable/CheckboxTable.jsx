import React from "react";
import "./styles.scss";

const renderRows = (data, onChange) => {
  const output = data.map((item, index) => {
    return (
      <label
        className="checkbox-table__row"
        htmlFor={`check-${item.id}`}
        key={item.id}
      >
        <span className="checkbox-table__col">
          <input
            className="checkbox-table__col"
            type="checkbox"
            name={item.name}
            id={`check-${item.id}`}
            checked={item.checked}
            onChange={() => onChange(item.name, item.path)}
          />
        </span>

        {item.columns.map(col => (
          <span key={col} className="checkbox-table__col">
            {col}
          </span>
        ))}
      </label>
    );
  });

  return output;
};

const CheckboxTable = ({ tableName, columns, data, onChange }) => {
  return (
    <div className="form__row">
      <div className="form__label">{tableName}:</div>
      <div className="checkbox-table">
        <div className="checkbox-table__header">
          <div className="checkbox-table__col"></div>
          {columns.map(item => (
            <div key={item} className="checkbox-table__col">
              {item}
            </div>
          ))}
        </div>

        {renderRows(data, onChange)}
      </div>
    </div>
  );
};

export default CheckboxTable;
