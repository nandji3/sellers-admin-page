import React from "react";

const DisplayItem = ({ formData, deleteItem, editItems, hrStyle }) => {

    return (
        <div>
            <hr style={{ ...hrStyle, width: "65%" }} />
            {formData.map((item) => {
                return (
                    <div key={`${item.productId}-${item.sellingPrice}-${item.productName}`} style={{ margin: "15px 0px" }}>
                        <li id={`${item.productId}-${item.sellingPrice}-${item.productName}`}>
                            Product ID : {item.productId}  --  Selling Price : {item.sellingPrice}  --  Poduct Name : {item.productName}
                            &nbsp;&nbsp;&nbsp;<button className="edit-item" onClick={() => editItems(`${item.productId}-${item.sellingPrice}-${item.productName}`)}>Edit Item</button>
                            &nbsp;&nbsp;&nbsp;<button className="delete-item" onClick={() => deleteItem(`${item.productId}-${item.sellingPrice}-${item.productName}`)}>Delete Item</button>
                        </li>
                    </div>
                );
            })}
        </div>
    )
}
export default DisplayItem;

