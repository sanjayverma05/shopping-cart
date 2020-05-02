import React from "react";
import SideBar from "Components/SideBar";
import SortBar from "Components/SortBar";
import ShoppingList from "Components/ShoppingList";
import UtilityHeader from "Components/UtilityHeader";

import styles from "./index.scss";

const SelectView = () => {
  return (
    <section className="select-view">
      <section className="utilityHeader">
        <UtilityHeader />
      </section>
      <section className="container">
        <section className="sidebar-container">
          <SideBar />
        </section>
        <main className="list-container">
          <SortBar />
          <ShoppingList />
        </main>
      </section>
    </section>
  );
};

export default SelectView;
