import React, { useEffect, useReducer } from 'react';
import ProductDetails from './Components/ProductDetails';
import ProductGallery from './Components/ProductGallery';
import './App.css';

export const productContext = React.createContext();

const initialState = {
  loading: true,
  error: '',
  product: {},
}

const initialPicture = {
  url: ''
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        loading: false,
        error: '',
        product: action.data
      }
    case 'ERROR':
      return {
        loading: false,
        error: 'There is a Error',
        product: {}
      }
    case 'ImageOnMouseHover':
      return {
        url: action.hoverImg
      }
    default:
      return state;
  }
}




function App() {
  const [product, dispatch] = useReducer(reducer, initialState);
  const [hoverImg, dispatch2] = useReducer(reducer, initialPicture);
  console.log(hoverImg);

  useEffect(() => {
    fetch('/Product.json')
      .then(res => res.json())
      .then(data => dispatch({ type: 'SUCCESS', data }))
  }, []);

  // Loading 
  if(product.loading) {
    return <div style={{
      display:'flex',
      justifyContent:'center',
      alignItems: 'center',
      width: '100wh',
      height: '100vh'
    }}>
      <p>Loading...</p>
    </div>
  }

  return (
    <div>
      <productContext.Provider value={{ 
          productDispatch: dispatch, 
          product, 
          hoverImgDispatch: dispatch2,
          hoverImg
      }}>

          <div className='container'>
            <ProductGallery />
            <ProductDetails />
          </div>

      </productContext.Provider>

    </div>
  );
}

export default App;
