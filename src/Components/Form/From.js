import React, { useEffect, useState } from "react";
import DisplayItem from "../Display/DisplayItem";

const initialItem = {
    productId: "",
    sellingPrice: "",
    productName: "",
}

//To get all formData from localStorage to show on screen
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

    const [formData, setFormData] = useState(getLatestFormDataFetchedFromLocalStorage())
    const [item, setItem] = useState(initialItem);

    console.log(formData)

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setItem((prevItem) => {
            return { ...prevItem, [name]: value }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (item.productId && item.sellingPrice && item.productName) {
            setFormData((prevFormData) => {
                return ([...prevFormData, { ...item, totalPrice: item.sellingPrice }])
            });
        }
        setItem(initialItem);
    }

    //To set formData into localStorage
    useEffect(() => {
        localStorage.setItem("data", JSON.stringify(formData));
    }, [formData])


    const calculateTotalPrice = () => {
        return formData.reduce((total, item) => {
            return total + parseFloat(item.sellingPrice);
        }, 0);
    };

    const deleteItem = (id) => {
        // console.log(id);
        const updatedFormData = formData.filter((item) => {
            return (`${item.productId}-${item.sellingPrice}-${item.productName}` !== id)
        })
        setFormData(updatedFormData)
    }
    const hrStyle = { width: "100%", border: "0", height: "3px", background: "#095484", backgroundImage: "linear-gradient(to right, #ccc, #095484, #ccc)" }
    return (
        <>
            <div className="form" style={{ margin: "30px 0px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                <form className='form' onSubmit={handleSubmit} >
                    <div className='form-control'>
                        <label >
                            Product Id :
                            &nbsp;<input type="number" name="productId" value={item.productId} onChange={handleChange} required />
                        </label>
                    </div>
                    <div className='form-control'>
                        <label>
                            Selling Price :
                            &nbsp;<input type="number" name="sellingPrice" value={item.sellingPrice} onChange={handleChange} required />
                        </label>
                    </div>
                    <div className='form-control'>
                        <label>
                            Product Name :
                            &nbsp;<input type="text" name="productName" value={item.productName} onChange={handleChange} required />
                        </label>
                    </div>
                    <button type='submit'>Add Product</button>
                </form >
            </div >
            <div><hr style={hrStyle} /></div>
            <h2>Products</h2>
            <div>
                <DisplayItem formData={formData} deleteItem={deleteItem} hrStyle={hrStyle} />
            </div>
            <div><hr style={hrStyle} /></div>
            <div className='form-control'>
                <h2>
                    Total Value Worth of Product : {calculateTotalPrice()}
                </h2>
            </div>
        </>
    )
}
export default Form;