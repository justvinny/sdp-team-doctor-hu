import React, { useState } from "react";
import RadioButton from "./RadioButton";

const RadioButtonGroup = ({ radioData, setSelectedValue }) => {

    const [selected, setSelected] = useState(0);

    const selectCurrent = (index) => () => {
        setSelected(index);
    }

    return (
        <>
            {radioData.map((d, index) => <RadioButton
                key={index + d}
                label={d}
                index={index}
                selected={selected}
                selectCurrent={selectCurrent}
                setSelectedValue={setSelectedValue}
            />)}
        </>
    )
}

export default RadioButtonGroup;