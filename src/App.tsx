import React,{ Component,Fragment } from 'react';
import './App.css';
import { Route,Switch, Redirect } from 'react-router-dom'
import Login from './containers/login/login';
import Form from './containers/form/form';
import Table from './containers/table/table';
import Header from './components/header/header';
import {connect} from 'react-redux';
import {Dispatch} from 'redux'
import * as actionTypes from './store/actions';
import {State,AuthService,AppMapDispatchToProps} from './interface/interface';

interface OwnProps extends State, AuthService,AppMapDispatchToProps {}
// Type '{}' is missing the following properties from type 'Pick<ClassAttributes<App> & OwnProps, "authorisedUser" | "userData" | "ref" | "key">': authorisedUser, userDatats(2739)
class App extends Component<OwnProps> {

    userLogoutHandle = () => { //HEADER
        localStorage.clear();
        this.props.authenticationFail();
        this.forceUpdate()
    }
    render () {
        const userAlreadyLogin = localStorage.getItem('isUserLogIn');
        const username = localStorage.getItem('userName');
        if (userAlreadyLogin) {
            this.props.checkAuthentication()
        }

        let routes = (
            <Switch>
              <Route path="/login" component={Login} />
              <Redirect to="/login" />
            </Switch>
          );
      
          if ( this.props.auth || userAlreadyLogin ) {
            routes = (
              <Switch>
                <Route exact path="/add-user" component={Form} />
                <Route exact path="/edit-user/:id" component={Form} />
                {/* <Route exact path="/login" component={Login} /> */}
                <Route exact path="/users" component={Table} />
                <Redirect to="/users" />
              </Switch>
            );
          }
        return (
            <Fragment>
                <Header username = {username} userLogoutHandle = {this.userLogoutHandle}/>
                {routes}
            </Fragment>
        )
    }
}

const mapStateToProps = (state: State)=> {
    return {
        authorisedUser : state.authorisedUser,
        userData : state.userData,
        auth : state.auth
    }
}

const mapDispatchToProps = (dispatch: Dispatch):AppMapDispatchToProps => {
    return {
        authenticationFail : () => dispatch({type:actionTypes.AUTHORIZATION_FALSE}),
        checkAuthentication : () => dispatch({type: actionTypes.AUTHORIZATION_TRUE}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
