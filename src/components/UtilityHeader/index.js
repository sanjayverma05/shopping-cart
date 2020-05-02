import React, { useState, useContext } from "react";
import InputRange from "CoreComponents/inputRange";
import Modal from "CoreComponents/modal";
import RadioGrp from "CoreComponents/radioButton";
import { AppContext } from "Components/App";
import styles from "./index.scss";

const optionsList = [
  { label: "Price -- High Low", value: "desc" },
  { label: "Price -- Low High", value: "asc" },
  { label: "Discount", value: "discount" },
];
const SortItemModal = ({ sortOrder, changeOrder }) => {
  return (
    <div className="sort-items-modal">
      <div className="sort-items-modal__content">
        <RadioGrp
          optionsList={optionsList}
          changeCallback={changeOrder}
          defaultValue={sortOrder}
        />
      </div>
    </div>
  );
};

const UtilityHeader = () => {
  const [showModal, toggleModal] = useState(false);
  const { sortItems, sortOrder } = useContext(AppContext);
  let [order, changeOrder] = useState(sortOrder);
  return (
    <div className="utility-header__container">
      <Modal
        showModal={showModal}
        onClose={() => {
          toggleModal(!showModal);
        }}
        heading="Sort Options"
        onSubmit={() => {
          sortItems(order);
          toggleModal(!showModal);
        }}
      >
        <SortItemModal
          sortOrder={order || sortOrder}
          changeOrder={changeOrder}
        />
      </Modal>
      <section className="container">
        <div
          className="utility-header__sort"
          onClick={() => toggleModal(!showModal)}
        >
          <span className="icon-sort-amount-asc"></span>
          Sort
        </div>
        <div className="utility-header__filter">
          <span className="icon-filter"></span>
          Filter
        </div>
      </section>
    </div>
  );
};

export default UtilityHeader;
