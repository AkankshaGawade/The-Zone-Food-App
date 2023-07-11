export const setAllOrders=(data)=>{
    return{
        type:"SET_ALL_ORDERS",
        orders:data,
    }
}

export const getAllOrders=()=>{
    return{
        type:"GET_ALL_ORDERS",
    }
}