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
		case "CONFIRM_ORDER":
		    return {
		    	...state,
		    	orderUpdate: true,
		    }

		case "DELIVERED_ORDER":
		    return {
		    	...state,
		    	orderUpdate: true,
		    }

		case "PREPARE_ORDER":
		    return {
		    	...state,
		    	orderUpdate: true,
		    }

		case "REJECT_ORDER":
		    return {
		    	...state,
		    	orderUpdate: true,
		    }

		 case "SEND_ORDER":
		    return {
		    	...state,
		    	orderUpdate: true,
		    }
		 case "GET_ORDER_DETAIL":
             return {
                ...state,
                orderDetail: action.payload,
            }

        case "HANDLE_VIEW_ORDER":
              return {
              ...state,
               orderReadOnly: true,
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