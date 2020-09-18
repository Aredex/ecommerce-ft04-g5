export const initialState = {
  allOrders: [],
  searchOrder: [],
  orderDetail: undefined,
  orderReadOnly: null,
  orderUpdate: null,
  orderRemove: null
};



export default function orders_reducer(state = initialState, action){
	switch(action.type){
		case "GET_ALL_ORDERS":
		    return {
		    	...state,
		    	allOrders: action.payload
		    }
		case "REMOVE_ORDER":
		    return {
		    	...state,
		    	orderRemove: action.payload
		    }

		case "DISABLED_CRUD":
             return {
        ...state,
        orderRemove: null,
        orderDetail: null,
        orderReadOnly: null,
        orderUpdate: null
      };

		default:
		    return {...state}
	}
}