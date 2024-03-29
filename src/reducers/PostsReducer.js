//Rules of Reducer
//1. Should not return undefined value
//2. we can produce state or data in our app using only previous state and action
// EX: for ex when app starts each reducer called by redux automatically
// so from that we can get some state
// so, when we want to produce state using that reducer we can make use of initial state that is generated by redux and current action
//3. we cannot get out of the reducer we just make some computation on state thats it
// bad approach inside reducer===> return document.querySelector('input'), return axios.get(''), accessing harddrive, accessing user input
//4. must not mutate its state argument like state.age = 20, state.name = 'damu' etc we cannot do these type of initializations on state
export default (state = [], action) => {
    switch(action.type) {
        case 'FETCH_POSTS':
            return action.payload;
        default:
            return state;
    }
}