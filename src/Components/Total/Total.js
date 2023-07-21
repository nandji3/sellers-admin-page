import React from "react";

const Total = ({ formData, hrStyle }) => {

    const calculateTotalPrice = formData.reduce((prevValue, item) => prevValue + parseFloat(item.sellingPrice), 0);

    return (
        <div>
            <hr style={hrStyle} />
            <div className='form-control'>
                <h2>
                    Total Value Worth of Product : {calculateTotalPrice}
                </h2>
            </div>
        </div>
    )
}
export default Total;




