import React from "react";

const DisplayItem = ({ formData, deleteItem, hrStyle }) => {

    return (
        <div>
            <hr style={{ ...hrStyle, width: "65%" }} />
            {formData.map((item) => {
                return (
                    <div key={`${item.productId}-${item.sellingPrice}-${item.productName}`}>
                        <li id={`${item.productId}-${item.sellingPrice}-${item.productName}`}>
                            Product ID : {item.productId}  --  Selling Price : {item.sellingPrice}  --  Poduct Name : {item.productName}
                            <button onClick={() => deleteItem(`${item.productId}-${item.sellingPrice}-${item.productName}`)}>Delete Item</button>
                        </li>
                    </div>
                );
            })}
        </div>
    )
}
export default DisplayItem;

