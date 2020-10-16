import React from 'react';
import {connect} from 'react-redux';
//import {fetchUser} from '../actions';

class UserHeader extends React.Component {

    //we commented because we are using fetchPostsAndUsers, refer index.js file in actions folder
    // componentDidMount() {
    //     this.props.fetchUser(this.props.userId);
    // }
    render() {
        //we commented below code because we dont want to pass entire user data to component we just need to pass required user data so we moved this code to mapStateToProps
        //const user = this.props.users.find((user) => user.id === this.props.userId);
        const {user} = this.props;
        if(!user) {
            return null;
        }

        return(
            <div>
                <h5>Author: {user.name}</h5>
            </div>
        )
    }
}

//here ownProps contains props of userheader class because those props can be accessed inside userheader only
//so we can user ownProps to access those props outside the class
const mapStateToProps = (state, ownProps) => {
    return {user: state.users.find((user) => user.id === ownProps.userId)};
}

export default connect(mapStateToProps)(UserHeader);