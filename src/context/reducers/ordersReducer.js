const ordersReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_ALL_ORDERS":
      return action.orders;

    case "GET_ALL_ORDERS":
      return state;
      
    default:
      return state;
  }
};

export default ordersReducer;
