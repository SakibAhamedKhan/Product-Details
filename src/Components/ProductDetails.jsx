import React, { useContext } from 'react';
import { productContext } from '../App';
import './ProductDetails.css'

const ProductDetails = () => {

    const productByContext = useContext(productContext);
    console.log(productByContext);

    const {customSelect, customSelectDispatch, hoverImg, hoverImgDispatch, productDispatch} = productByContext;
    
    const {product} = productByContext.product;

    
    

    
    return (
        <div>
            {/* <h2>This is Product Details Part</h2> */}

            <h3>Tilte: {product.title}</h3>
            <div className='Product-price-part'>
                <p style={{fontSize: '28px', fontWeight:'700', margin: '0 20px 0 0'}}>Price: Rs. {product.price.discounted}</p>
                <p style={{fontSize: '28px', fontWeight:'700', textDecoration: 'line-through', margin: '0 20px 0 0',color:'#B1B0B5'}}>Rs. {product.price.old}</p>
            </div>

            <div>
                <h4>Color: {product.variation.props[0].values[0].name}</h4>
            </div>
            <div>
                {
                    product.variation.props[0].values.map(p => <img 
                        key={p.id}
                        className='Product-Details-thumb'
                        src={p.thumb}/>)
                }
            </div>
            <div>
                <h4>{product.variation.props[1].name}: {product.variation.props[1].values[0].name}</h4>
                <div className='Product-Details-size'>
                    {
                        product.variation.props[1].values.map( size => <div
                            key={size.id}
                            className='Product-Details-size-inside'
                        >
                            {size.name}
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;