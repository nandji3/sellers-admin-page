import React from "react";

const DisplayItem = ({ formData, deleteItem, editItem, hrStyle }) => {

    return (
        <div>
            <hr style={{ ...hrStyle, width: "65%" }} />
            {formData.map((ele) => {
                return (
                    <div key={ele.id} style={{ margin: "15px 0px" }}>
                        <li id={ele.id}>
                            Product ID : {ele.productId}  --  Selling Price : {ele.sellingPrice}  --  Poduct Name : {ele.productName}
                            &nbsp;&nbsp;&nbsp;<button className="edit-item" onClick={() => editItem(ele.id)}>Edit Item</button>
                            &nbsp;&nbsp;&nbsp;<button className="delete-item" onClick={() => deleteItem(ele.id)}>Delete Item</button>
                        </li>
                    </div>
                );
            })}
        </div>
    )
}
export default DisplayItem;

