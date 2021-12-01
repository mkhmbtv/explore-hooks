import React, { useEffect, useState } from 'react';
import ProductListItem from "../ProductListItem";
import ProductDetails from "../ProductDetails";
import './ProductView.css'

function ProductView({ products }) {
    const sideOpenStored = localStorage.getItem('sideOpen')
        ? JSON.parse(localStorage.getItem('sideOpen'))
        : true;
    const selectedProductStored = localStorage.getItem('selectedProduct')
        ? JSON.parse(localStorage.getItem('selectedProduct'))
        : null

    const [sideOpen, setSideOpen] = useState(sideOpenStored);
    const [selectedProduct, setSelectedProduct] = useState(selectedProductStored);

    useEffect(() => {
        localStorage.setItem('sideOpen', sideOpen);
        localStorage.setItem('selectedProduct', JSON.stringify(selectedProduct));
    }, [sideOpen, selectedProduct]);

    useEffect(() => {
        console.log('selectedProduct CHANGED TO', selectedProduct);
        if (selectedProduct) setSideOpen(true);
    }, [selectedProduct]);

    useEffect(() => {
        console.log('sideOpen CHANGED TO', sideOpen);
        if (!sideOpen) setSelectedProduct(null);
    }, [sideOpen]);
    
    console.log('rendering ProductView')
    return (
        <div className="product-view">
            <div className="product-main-area">
                <h1>Products</h1>
                <div className="product-list">
                    {products.map(item =>
                        <ProductListItem
                            key={item.id}
                            product={item}
                            isSelected={selectedProduct ? item.id === selectedProduct.id : false}
                            onClick={() => setSelectedProduct(item)}
                        />
                    )}
                </div>
            </div>
            <div className="product-side-panel">
                <div className="product-side-panel-toggle-wrapper">
                    <div className="product-side-panel-toggle"
                         onClick={() => setSideOpen(!sideOpen)}>
                        {sideOpen ? '>' : '<'}
                    </div>
                </div>
                <ProductDetails product={selectedProduct} visible={sideOpen} />
            </div>
        </div>
    );
}

export default ProductView;