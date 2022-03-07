const cart = [];

const handleCart = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case 'ADD':
      // check if product exist
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        return state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        ); // -> Increase quantity
      }
      break;

    case 'DELETE':
      break;

    case 'RESET':
      break;

    default:
      break;
  }
};

export default handleCart;
