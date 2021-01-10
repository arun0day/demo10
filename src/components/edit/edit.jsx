import React, { useState, useEffect } from 'react';
import moment from 'moment';
import './edit.css';

const EditProductForm = (props) => {

    const [product, setProduct] = useState(props.currentProduct)

    useEffect(
        () => {
            setProduct(props.currentProduct)
        },
        [props]
    )


    const handleFormChange = (event) => {
        const { name, value } = event.target;
        if(event.target.type === "checkbox"){
            setProduct({ ...product, [name]: event.target.checked })
        } else {
            setProduct({ ...product, [name]: value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        var currentDate = moment().format('MMMM D, YYYY H:mm:ss');
        var addedData = {...product, updated_at: currentDate };
        props.updateProduct(product.id,addedData);
    }

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    return (
        <form onSubmit={(e) => {
            handleSubmit(e)
        }}>
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
                <input name="offer_start_at" type="date" value={formatDate(product.offer_start_at)} onChange={(e) => handleFormChange(e)} />
            </label>
            <label>
                Offer End Date:
                <input name="offer_end_at" type="date" value={formatDate(product.offer_end_at)} onChange={(e) => handleFormChange(e)} />
            </label>
            <label className="switch">
                Is Active:
                <input type="checkbox" className="isActive" name="is_active" onChange={(e) => handleFormChange(e)} checked={product.is_active} />
            </label>
            <input type="submit" value="Submit" />
        </form>
    );
}

export default EditProductForm;