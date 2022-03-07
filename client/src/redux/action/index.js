export const addToCart = (product) => {
  return {
    type: 'ADD',
    payload: product,
  };
};

export const removeFromCard = (product) => {
  return {
    type: 'DELETE',
    payload: product,
  };
};

export const emptyCard = (product) => {
  return {
    type: 'RESET',
  };
};
