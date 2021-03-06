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

const initialCustom = {
  color: {},
  size: {},
  price: {},
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
    case 'CustomSelectColor':
      return {
        ...state,
        color: action.color,
      }
    case 'CustomSelectSize':
      return {
        ...state,
        size: action.size,
      }
    case 'CustomSelectPrice':
      return {
        ...state,
        price: action.price,
      }
    default:
      return state;
  }
}




function App() {
  const [product, dispatch] = useReducer(reducer, initialState);
  const [hoverImg, dispatch2] = useReducer(reducer, initialPicture);
  const [customSelect, dispatch3] = useReducer(reducer, initialCustom);

  // fetch data by get from API
  useEffect(() => {
    fetch('https://moveon-api-server.sbox.ali2bd.net/api/v1/customer/dummy-product')
      .then(res => res.json())
      .then(data => dispatch({ type: 'SUCCESS', data }))
  }, []);

  // Loading 
  if (product.loading) {
    return <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100wh',
      height: '100vh'
    }}>
      <p>Loading...</p>
    </div>
  }

  return (
    <div style={{padding: '30px'}}>
      <div style={{
          backgroundColor: 'white',
          boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          margin: '0 auto',
          borderRadius: '5px',
          maxWidth: '1200px',
      }}>
          <productContext.Provider value={{
              productDispatch: dispatch,
              product,
              hoverImgDispatch: dispatch2,
              hoverImg,
              customSelectDispatch: dispatch3,
              customSelect,
          }}>

            <div className='container'>
              <div className='product-part-1'>
                <ProductGallery />
              </div>
              <div className='product-part-2'>
                <ProductDetails />
              </div>
            </div>

          </productContext.Provider>
      </div>

    </div>
  );
}

export default App;
