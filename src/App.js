import { useState, useEffect } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';

const App = () => {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    alanBtn({
      key:
        "27e533e08a80e955c1243e994c2f27092e956eca572e1d8b807a3e2338fdd0dc/stage",
      onCommand: (commandData) => {
        if (commandData.command === "getMenu") {
          setProducts(commandData.data)
          console.log(commandData)
        }
        else if (commandData.command === "addToCart") {
          setCart((currentCart) => [...currentCart, commandData.data])
        }
      },
    })
  }, []);

  return (
    <div className="App">
      <h1>Menu</h1>
      {products.map((product) => (
        <div key={product.name}>
          {product.name} - {`$${product.price}`} - {product.category}
        </div>
      ))}
      <h2>Cart:</h2>
      {cart.map((cartItem) => (
        <div key={cartItem.name} className="bt-2">
          {cartItem.name} - {`$${cartItem.price}`} - {cartItem.category}
        </div>
      ))}
    </div>
  )
}

export default App;
