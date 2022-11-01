import React from "react";
import { useState } from "react";
import Public from "@public/icons/public.svg";
import Private from "@public/icons/private.svg";
import styles from "./index.module.css";
import Selected from '@public/icons/selected.svg';

type visibilityStates = "public" | "private";

type stateObj = {
  name: visibilityStates;
  details: string;
  icon: () => any;
}

const VisibilityDropdown = () => {
  const [selectedState, setSelectedState] =
    useState<visibilityStates>("public");
  const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);

  const toggleDropDown = () => {
    setDropDownVisible(!dropDownVisible);
  };

  const visibilityStates: stateObj[] = [
    {
      name: "public",
      details: "Visible to everyone",
      icon: () => <Public className={styles.stateIcon}/>,
    },
    {
      name: "private",
      details: "Visible to your followers",
      icon: () => <Private className={styles.stateIcon}/>,
    },
  ];

  const handleSelectState = (visibilitySetting: visibilityStates) => {
        setSelectedState(visibilitySetting);
  }

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.dropDownHeader} onClick={toggleDropDown}>
        Visibility DropDown
      </div>
      <div
        className={styles.dropDownMenu}
        style={{ display: dropDownVisible ? "block" : "none" }}
      >
        {visibilityStates.map((item) => {
          return (
            <div className={styles.listItem} onClick={() => handleSelectState(item.name)}>
              <div className={styles.stateWrapper}>
                <div className={styles.stateDetails}>
                  <div>{item.icon()}</div>
                  <div className={styles.stateName}>{item.name}</div>
                </div>
                <div className={styles.stateInfo}>{item.details}</div>
              </div>
              {(selectedState === item.name) &&<div className={styles.stateSelected}><Selected /></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VisibilityDropdown;
