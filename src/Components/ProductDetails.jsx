import React, { useContext, useEffect } from 'react';
import { productContext } from '../App';
import './ProductDetails.css'

const ProductDetails = () => {

    const productByContext = useContext(productContext);

    const {customSelect, customSelectDispatch, hoverImg, hoverImgDispatch, productDispatch} = productByContext;
    
    const {product} = productByContext.product;

    
    // condition if color and size of product select then change the prize
    useEffect(() => {
        if(Object.keys(customSelect?.color).length > 0 && Object.keys(customSelect?.size).length > 0 ) {
            const selectedColorSize =  product.variation.skus.find(s => (s.props[0] === customSelect.color.id && s.props[1] === customSelect.size.id));
            
            customSelectDispatch({type: 'CustomSelectPrice', price: selectedColorSize.price})
      
          }
    },[customSelect.color, customSelect.size]);
    
    return (
        <div>
          
            {/* Title of the Product */}
            <p style={{fontSize:'18px'}}>{product.title}</p>

            {/* Price Part */}
            <div className='Product-price-part'>
                <p style={{fontSize: '28px', fontWeight:'700', margin: '0 20px 0 0'}}>Price: Rs. {(Object.keys(customSelect.price)).length > 0 ? customSelect.price.discounted : product.price.discounted}</p>

                <p style={{fontSize: '28px', fontWeight:'700', textDecoration: 'line-through', margin: '0 20px 0 0',color:'#B1B0B5'}}>Rs.  {(Object.keys(customSelect.price)).length > 0 ? customSelect.price.old : product.price.old}</p>
            </div>

            {/* Product Color */}
            <div>
                <h4>{product.variation.props[0].name}: {(Object.keys(customSelect.color).length > 0) ? customSelect.color.name : '' }</h4>
               
            </div>

            {/* Product Variation in Color thumbs */}
            <div>
                {
                    product.variation.props[0].values.map(p => <img 
                        key={p.id}
                        className={`Product-Details-thumb
                            ${(customSelect.color.id === p.id)? 'Product-Details-thumb-select': ''}
                        `}

                        onClick={()=> {
                           customSelectDispatch({type:'CustomSelectColor', color: p});
                           hoverImgDispatch({type: 'ImageOnMouseHover', hoverImg: p.image})
                        }}
                        src={p.thumb}/>)
                }
            </div>

            
            {/* Size Part */}
            <div>
                <h4>{product.variation.props[1].name}: {(Object.keys(customSelect.size).length > 0)? customSelect.size.name : ''}</h4>

                {/* Size Selection of Product */}
                <div className='Product-Details-size'>
                    {
                        product.variation.props[1].values.map( size => <div
                            key={size.id}
                            className={`Product-Details-size-inside
                            ${(customSelect.size.id === size.id)? 'Product-Details-size-inside-select': ''}
                        `}

                            onClick={() => {
                                customSelectDispatch({type: 'CustomSelectSize', size: size})
                            }}  
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