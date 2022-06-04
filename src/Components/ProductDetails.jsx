import React, { useContext } from 'react';
import { productContext } from '../App';
import './ProductDetails.css'

const ProductDetails = () => {

    const productByContext = useContext(productContext);
    console.log(productByContext);
    
    return (
        <div>
            <h2>This is Product Details Part</h2>

            <div className='Product-price-part'>
                <p style={{fontSize: '28px', fontWeight:'700', margin: '0 20px 0 0'}}>Price: Rs. {productByContext.product.product.price.discounted}</p>
                <p style={{fontSize: '28px', fontWeight:'700', textDecoration: 'line-through', margin: '0 20px 0 0',color:'#B1B0B5'}}>Rs. {productByContext.product.product.price.old}</p>
            </div>

        </div>
    );
};

export default ProductDetails;