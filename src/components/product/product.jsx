/* eslint-disable array-callback-return */
import './product.css';
import axios from 'axios';
import React, {Fragment, useEffect, useState } from 'react';
import ProductTableCard from '../card/card';
import EditProductForm from '../edit/edit';
import AddProductForm from '../add/add';


const Product = () => {
    let isAllSelected = false;
    const [cardState, setCardState] = useState([]);
    const [editing, setEditing] = useState(false);
    const [currentProduct, setCurrentProduct] = useState({});
    useEffect(() => {
        async function fetchData() {
            const result = await axios(
                'data.json',
            );
            setCardState(result.data);
        };
        fetchData();
    }, []);

    
    const addProduct = (product) => {
        setCardState([...cardState, product]);
    }

    const deleteProduct = productList => {
        setEditing(false)
        setCardState(cardState.filter(product => {
            return productList.includes(product.id);
        }))
    }
    const updateProduct = (id, updatedProduct) => {
        setEditing(false)
        setCardState(cardState.map(product => (product.id === id ? updatedProduct : product)))
    }

    const editRow = product => {
        if(product){
            setEditing(true)
            setCurrentProduct(product)
        }
    }

    return (
        <div className="root">
            <div className="editform">{editing ? (
                <Fragment>
                    <h2>Edit Product</h2>
                    <EditProductForm
                        editing={editing}
                        setEditing={setEditing}
                        currentProduct={currentProduct}
                        updateProduct={updateProduct}
                    />
                </Fragment>
            ) : (
                    <Fragment>
                        <h2>Add Product</h2>
                        <AddProductForm addProduct={addProduct} />
                    </Fragment>
                )}</div>
            <div className="productlist"><h2>View Product</h2>
                <ProductTableCard card={cardState} editRow={editRow} deleteProduct={deleteProduct} /></div>
        </div>
    );
}

export default Product;