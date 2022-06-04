import React, { useContext, useEffect } from 'react';
import { SideBySideMagnifier } from 'react-image-magnifiers';
import { productContext } from '../App';
import './ProductGallery.css'

const ProductGallery = () => {
    const productByContext = useContext(productContext);
    const { loading, error, product } = productByContext.product;

    return (
        <div>
            <h2>This is Product Gallery Part</h2>
            
            <SideBySideMagnifier transitionSpeed={1} fillGapLeft={20} style={{ height: '400px', width: '400px' }} alwaysInPlace={true} fillAvailableSpace={false} imageSrc={
               productByContext.hoverImg.url.length > 0 ? 
                productByContext.hoverImg.url
               :
               product.gallery[0].url
            }>
            </SideBySideMagnifier>



            <div style={{
                display: 'flex'
            }}>
                {
                    product?.gallery.map((p, index) => <div
                        key={index}
                        
                    >
                        <img onMouseEnter={() => {
                            productByContext.hoverImgDispatch({type:'ImageOnMouseHover', hoverImg: p.url})

                        } } style={
                        (p.url === productByContext.hoverImg.url || (productByContext.hoverImg.url.length === 0 && index===0)) ? 
                        {
                            border: '3px solid red' ,
                            margin: '20px 10px 20px 0',
                            borderRadius:'5px'
                        } 
                        : 
                        {
                            border: '3px solid white', 
                            margin: '20px 10px 20px 0',
                            borderRadius:'5px'
                        } } src={p.thumb} alt="" />
                    </div>)
                }
            </div>
        </div>
    );
};

export default ProductGallery;