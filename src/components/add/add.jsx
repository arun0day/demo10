import React, { useState } from 'react';
import moment from 'moment';
import './add.css'
const AddProductForm = props => {
    const initialFormState = { }
    const [product, setProduct] = useState(initialFormState)

    const handleFormChange = event => {
        const { name, value } = event.target
        if(event.target.type === "checkbox"){
            setProduct({ ...product, [name]: event.target.checked })
        } else {
            setProduct({ ...product, [name]: value })
        }
    }

    return (
        <form
            onSubmit={event => {
                event.preventDefault() 
                var currentDate = moment().format('MMMM D, YYYY H:mm:ss');
                if(!product.product_name || product.product_name === ""){
                    alert("Please provide a valid product name");
                    return false;
                }
                if(!product.price || isNaN(product.price) || !product.offer_price || isNaN(product.offer_price)) {
                    alert("Invalid Price");
                    return false;
                }
               let addedData= {...product, created_at: currentDate, updated_at: currentDate, id: moment().unix() };
                 
                props.addProduct(addedData)
                setProduct(initialFormState)
            }}
        >
            <label>
           Name:
           <input type="text" name="product_name" value={product.product_name} onChange={(e) => handleFormChange(e)} />
       </label>
       <label>
           Description:
           <textarea name="product_description" value={product.product_description} onChange={(e) => handleFormChange(e)} />
       </label>
       <label>
           Price:
           <input name="price" type="text" value={product.price} onChange={(e) => handleFormChange(e)} />
       </label>
       <label>
           Offer Price:
           <input name="offer_price" type="text" value={product.offer_price} onChange={(e) => handleFormChange(e)} />
       </label>
       <label>
           Offer Start Date:
           <input name="offer_start_at" type="date" value={product.offer_start_at} onChange={(e) => handleFormChange(e)} />
       </label>
       <label>
           Offer End Date:
           <input name="offer_end_at" type="date" value={product.offer_end_at} onChange={(e) => handleFormChange(e)} />
       </label>
       <label className="switch">
           Is Active:
           <input type="checkbox" className="isActive" name="is_active" onChange={(e) => handleFormChange(e)} checked={product.is_active} />
       </label>
       <input type="submit" value="Submit" />
        </form>
    )
}

export default AddProductForm;