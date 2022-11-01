import React from 'react';
import { useState } from 'react';

type visibilityStates = 'public' | 'private';

const VisibilityDropdown = () => {
    const [selectedState, setSelectedState] = useState<visibilityStates>('public');
    const [dropDownVisible, setDropDownVisible] = useState<boolean>(false);

    const toggleDropDown = () => {
        setDropDownVisible(!dropDownVisible);
    }

    return (
        <>
            <div onClick={toggleDropDown}>Visibility DropDown</div>
            <div style={{ display: dropDownVisible ? 'block' : 'none' }}>Dropdown Menu</div>
        </>
    )
}

export default VisibilityDropdown;