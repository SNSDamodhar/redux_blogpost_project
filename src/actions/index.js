import JSONPlaceHolder from '../apis/JSONPlaceHolder';
import _ from 'lodash';


export const fetchPosts = () => {
    
    //Bad Approach
    //Because at some point of time this function returns JSONPlaceHolder.get('/posts') because of async and await syntax
    //instead of plain object
    //if JSONPlaceHolder.get('/posts') is reurned its not a plain object and it brokes the rule f redux that the action creator should return plain object
    //const response = await JSONPlaceHolder.get('/posts');

    //we can get rid of async and await and we can fetch data like this
    //const promise = JSONPlaceHolder.get('/posts');
    //but this also has same problem
    //when we call action creator it instantly create action and dispatched the action to reducers
    //by that time there may not have any data fetched from api because api requests takes some time
    //so we cannot do anything with that generated action

    //so we go with middleware called redux-thunk to manage api calls and to solve async problems
    //redux-thunk changes the rules of action creators i.e.,
    //Now action creators can return function or object
    //if it returns object then it must have type property and it can optionally have payload property


    //we write payload value as response.data instead of response because 
    //we are getting lot of values from api request but we dont care of those we just want data property from that response
    //so we just dispatches data to reducers
    return async (dispatch) => {
        console.log('Fetching posts');
        const response = await JSONPlaceHolder.get('/posts');
        console.table(response);
        dispatch({
            type: 'FETCH_POSTS',
            payload: response.data
        });
    };
};


export const fetchUser = (id) => async dispatch => {
    console.log('Fetching Users');
    const response = await JSONPlaceHolder.get(`/users/${id}`);
    dispatch({
        type: 'FETCH_USERS',
        payload: response.data
    });
}


//we have 100 posts in our api
//only 10 users wrote those posts
//so when we make api request to get users, for every post we are making api request for users
//finally we are making 100 requests for getting 10 users
//so we can refractor our app as follows
//we can create main action creator to call other action creators automatically
//we jus call below action creator in PostList component
//then it will call fetchposts action creator and fetchusers action creator
//after this action creator successfully executed we have users and teir posts
//so we need not to call any action creator inside useheader component
//and this actioncreator makes only 10 api requests for getting 10 users
export const fetchPostsAndUsers = () => async (dispatch, getState) => {
    console.log('About to fetch posts');
    await dispatch(fetchPosts());
    console.log('Fetched posts');
    console.log('Getting list of posts from Store');
    console.log(getState().posts);
    console.log('Got list of posts from Store');
    console.log('Getting unique ids from posts');
    //gets unique ids
    //2nd arguement says we want unique userId's from result of 1st argument
    const userIds = _.uniq(_.map(getState().posts, 'userId'));
    console.log(userIds);
    console.log('Got unique ids from posts');
    console.log('About to fetch users by using unique userids');
    userIds.map((id) => dispatch(fetchUser(id)));
    console.log('Users fetched');

    //Another way of doing samething as above
    // _.chain(getState().posts)
    //     .map('userId')
    //     .uniq()
    //     .forEach(id => dispatch(fetchUser(id)))
    //     .value();
}




