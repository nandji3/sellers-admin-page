import React, { useEffect, useState } from "react";
import DisplayItem from "../Display/DisplayItem";
import Total from "../Total/Total";
import './Form.css';;

const initialItem = {
    productId: "",
    sellingPrice: "",
    productName: "",
}

//To get new raw formData from localStorage to show on screen
const getLatestFormDataFetchedFromLocalStorage = () => {

    let listOfArrayObjectOfFormData = JSON.parse(localStorage.getItem("data"));

    if (listOfArrayObjectOfFormData) {
        return listOfArrayObjectOfFormData;
    }
    else {
        return [];
    }
}

const Form = () => {

    const [item, setItem] = useState(initialItem);
    const [formData, setFormData] = useState(getLatestFormDataFetchedFromLocalStorage())
    const [toggleSubmit, setToggleSubmit] = useState(true)
    const [isUpdateItemID, setIsUpdateItemID] = useState(null);

    const handleChange = (e) => {

        const name = e.target.name;
        const value = e.target.value;

        setItem((prevItem) => {
            return { ...prevItem, [name]: value }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        //Show alert the enter all filled is required
        if (!(item.productId.trim() && item.sellingPrice.trim() && item.productName.trim())) {

        }

        //Update the editable item after click on "Update Product" button
        else if (item && !toggleSubmit) {
            setFormData(
                formData.map((ele) => {
                    return (ele.id === isUpdateItemID) ? { ...ele, ...item } : ele;
                })
            )

            setToggleSubmit(true);
            setItem(initialItem)
            setIsUpdateItemID(null);
        }

        //Add new item into formData after click on "Add Product" button
        else {
            // const itemWithId = { id: new Date().getTime().toString(), ...item }  //How to create add uniqe id
            setFormData((prevFormData) => {
                return ([...prevFormData, { id: new Date().getTime().toString(), ...item }]);
                // return ([...prevFormData, itemWithId])   //also return formData in this formate
            });
        }

        setItem(initialItem);
    }

    //To set formData into localStorage
    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(formData));
    }, [formData])

    //Delete item from list
    const deleteItem = (clickedId) => {
        const updatedFormData = formData.filter((ele) => {
            return (ele.id !== clickedId)
        })
        setFormData(updatedFormData)
    }

    //find method is used to traverse through array of item, when 1st item match with given it then return it.
    const editItem = (clickedId) => {
        let formEditableData = formData.find((ele) => {
            return (ele.id === clickedId)
        })

        setToggleSubmit(false);
        setItem(formEditableData)
        setIsUpdateItemID(clickedId);
    }

    const hrStyle = { width: "100%", border: "0", height: "3px", background: "#095484", backgroundImage: "linear-gradient(to right, #ccc, #095484, #ccc)" }
    return (
        <>
            <div className="form" style={{ margin: "30px 0px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <form className='form' onSubmit={handleSubmit} >
                    <div className='form-control'>
                        <label >
                            Product Id :
                            &nbsp;<input type="number" name="productId" value={item.productId} onChange={handleChange} placeholder="Enter Product Id" required />
                        </label>
                    </div>
                    <div className='form-control'>
                        <label>
                            Selling Price :
                            &nbsp;<input type="number" name="sellingPrice" value={item.sellingPrice} onChange={handleChange} placeholder="Enter Selling Price" required />
                        </label>
                    </div>
                    <div className='form-control'>
                        <label>
                            Product Name :
                            &nbsp;<input type="text" name="productName" value={item.productName} onChange={handleChange} placeholder="Enter Product Name" required />
                        </label>
                    </div>
                    {toggleSubmit ? <button className="add-product" type='submit'>Add Product</button> : <button className="add-product" type='submit'>Update Product</button>}
                </form >
            </div >
            <div><hr style={hrStyle} /></div>
            <h2>Products</h2>
            <div>
                <DisplayItem formData={formData} deleteItem={deleteItem} editItem={editItem} hrStyle={hrStyle} />
            </div>
            <div>
                <Total formData={formData} hrStyle={hrStyle} />
            </div>
            <div>
                <button className="delete-all-items" onClick={() => setFormData([])}>Delete All Items</button>
            </div>
        </>
    )
}
export default Form;










//If we implement in same page form.js

// const calculateTotalPrice = () => {
//     return formData.reduce((total, item) => {
//         return total + parseFloat(item.sellingPrice);
//     }, 0);
// };
// <div className='form-control'>
//     <h2>
//         Total Value Worth of Product : {calculateTotalPrice()}
//     </h2>
// </div>

//or

// const totalz2 = () => {
//     let total2 = 0;
//     for (let i = 0; i < props.parts.length; i++) {
//       total2 += props.parts[i].exercises;
//     }
//     return total2;
//   };