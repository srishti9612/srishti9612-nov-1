import React from "react";
import { useState } from "react";
import Public from "@public/icons/public.svg";
import Private from "@public/icons/private.svg";
import styles from "./index.module.css";
import Selected from "@public/icons/selected.svg";
import DownArrow from "@public/icons/downArrow.svg";

type visibilityStates = "public" | "private";

type stateObj = {
  name: visibilityStates;
  details: string;
  icon: () => any;
};

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
      icon: () => <Public className={styles.stateIcon} />,
    },
    {
      name: "private",
      details: "Visible to your followers",
      icon: () => <Private className={styles.stateIcon} />,
    },
  ];

  const handleSelectState = (visibilitySetting: visibilityStates) => {
    setSelectedState(visibilitySetting);
  };

  const dropDownHeaderContent = () => {
    const selectState: stateObj | undefined = visibilityStates.find(
      (item) => item.name === selectedState
    );
    return (
      <div className={styles.dropDownHeaderContent}>
        {selectState?.icon()}
        <div
          style={{
            textTransform: "capitalize",
            fontSize: "14px",
            color: "#176d91",
            fontWeight: "500",
          }}
        >
          {selectState?.name}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.componentWrapper}>
      <div className={styles.dropDownHeader} onClick={toggleDropDown}>
        {dropDownHeaderContent()}
        <DownArrow className={styles.dropDownIcon} />
      </div>
      <div
        className={styles.dropDownMenu}
        style={{ display: dropDownVisible ? "block" : "none" }}
      >
        {visibilityStates.map((item) => {
          const isSelectedState = selectedState === item.name;
          return (
            <div
              className={styles.listItem}
              onClick={() => handleSelectState(item.name)}
            >
              <div className={styles.stateWrapper}>
                <div className={styles.stateDetails}>
                  <div
                    className={
                      isSelectedState
                        ? styles.selectedIcon
                        : styles.unselectedIcon
                    }
                  >
                    {item.icon()}
                  </div>
                  <div
                    className={
                      isSelectedState
                        ? styles.selectedStateName
                        : styles.stateName
                    }
                  >
                    {item.name}
                  </div>
                </div>
                <div
                  className={
                    isSelectedState
                      ? styles.selectedStateInfo
                      : styles.stateInfo
                  }
                >
                  {item.details}
                </div>
              </div>
              {isSelectedState && (
                <div className={styles.stateSelected}>
                  <Selected className={styles.selectedArrowIcon} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VisibilityDropdown;
