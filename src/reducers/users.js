const initial = {
    list: [],
    isLoaded: false
}

const users = (state = initial, action) => {

    switch (action.type) {

        case 'ADD_USERS':
            return {
                ...state,
                list: action.users,
                isLoaded: true
            }

        default:
            return state
    }
}

export default users