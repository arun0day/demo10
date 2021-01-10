import React, { useState } from 'react';
import './card.css';

const ProductTableCard = (props) => {

    const { card } = props;
    const [selectArray, setSelectedArray] = useState([]);

    const addToSelectedArray = (e, card) => {
        if(e.target.checked) {
            setSelectedArray([...selectArray, card]);
        } else {
            setSelectedArray(selectArray.filter(product => product.id !== card.id));
        }
    }

    const selectAll = (e) => {
        if(e.target.checked) {
            setSelectedArray(card);
        } else {
            setSelectedArray([]);
        }
    }


    return (
        <>
        <div className="action-button">
        <button disabled={selectArray.length > 0 ? false : true} onClick={()=>{
            props.deleteProduct(selectArray.map(card => {return card.id}));
        }}>
        Delete
        </button>
        <button disabled={selectArray.length === 1 ? false : true} onClick={()=>{props.editRow(selectArray[0])}}>Edit</button>
        </div>                
        <table id="product-list">
            <thead>
                <tr>
                    <th><input type="checkbox" onChange={(e)=>{selectAll(e)}}/></th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Is active</th>
                    <th>Original Price</th>
                    <th>Offer Price</th>
                    <th>Offer Start Date</th>
                    <th>Offer End Date</th>
                    <th>Created Date</th>
                    <th>Last Update</th>
                </tr>

            </thead>
            <tbody>
                {card.length > 0 ? (
                    card.map(card => (
                        <tr key={card.id}>
                            <td><input type="checkbox" onChange={(e) => {addToSelectedArray(e, card)}} checked={
                                selectArray.filter(product => product.id === card.id).length === 1 ? true : false
                            } /></td>
                            <td>{card.product_name}</td>
                            <td>{card.product_description}</td>

                            <td> <input type="checkbox" checked={card.is_active} readOnly />
                            </td>
                            <td>{card.price}</td>
                            <td>{card.offer_price}</td>
                            <td>{card.offer_start_at}</td>
                            <td>{card.offer_end_at}</td>
                            <td>{card.created_at}</td>
                            <td>{card.updated_at}</td>
                        </tr>
                    ))
                ) : (
                        <tr>
                            <td > No Product</td>
                        </tr>
                    )}
            </tbody>
        </table>



        </>);
}





export default ProductTableCard;