import React, { useContext, useState } from "react";

import { AppContext } from "Components/App";

import "./index.scss";

const SortBar = () => {
  const { sortItems, sortOrder } = useContext(AppContext);

  return (
    <div className="sortbar">
      <span className="sortbar__heading">Sort By</span>
      <a
        className={`sortbar__sort-option ${
          sortOrder === "desc" ? "sortbar__sort-option--active" : ""
        }`}
        onClick={() => {
          sortItems("desc");
        }}
      >
        Price -- High Low
      </a>
      <a
        className={`sortbar__sort-option ${
          sortOrder === "asc" ? "sortbar__sort-option--active" : ""
        }`}
        onClick={() => sortItems("asc")}
      >
        Price -- Low High
      </a>
      <a
        className={`sortbar__sort-option ${
          sortOrder === "discount" ? "sortbar__sort-option--active" : ""
        }`}
        onClick={() => sortItems("discount")}
      >
        Discount
      </a>
    </div>
  );
};
export default SortBar;
