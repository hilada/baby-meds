import React from "react";

const ListGroup = ({
  items,
  textProperty,
  valueProperty,
  selectedItem,
  onItemSelect,
  allMeds
}) => {
  let medsCount = allMeds.map(m => m.patient._id);
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem
              ? "list-group-item list-group-item-success"
              : "list-group-item"
          }
        >
          {item[textProperty]}
          <span className="badge badge-success m-2">
            {item[valueProperty] === ""
              ? medsCount.length
              : medsCount.filter(m => m === item[valueProperty]).length}
          </span>
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
