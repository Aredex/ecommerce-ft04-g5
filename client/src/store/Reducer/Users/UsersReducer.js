const initialState = {
    userCreate: {},
    userLogin: null,
};

export default function UsersReducer(state = initialState, action) {
    switch (action.type) {
        case "CREATE_USER":
            return {
                ...state,
                userCreate: action.payload,
            };
        case "SIGN_IN_USER":
            return {
                ...state,
                userLogin: action.payload,
            };
        default:
            return state;
    }
}
