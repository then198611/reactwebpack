import '../styles/main.less';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory} from 'react-router';

const App = React.createClass({
    render() {
        return (
            <div>
            <div className="app">
            <nav>
            <Link to="/about">about</Link>
            <Link to="/users">users</Link>
            </nav>
            </div>
            <div className="detail">
            {this.props.children}
    </div>
        </div>
    )
    }
});

const About = React.createClass({
    render(){
        return (
            <div className="about" onclick={this.cickEvent} >
            <h2>about</h2>
            </div>
    )
    }
});

const Users = React.createClass({
    getInitialState(){
        return {
            users: [{
                id :1,
                name : 'one'
            },{
                id : 2,
                name : 'two'
            },{
                id : 3,
                name : 'three'
            }]
        }
    },
    render(){
        return (
            <div>
            <div className="users">
            <h2>users</h2>
            <ul>
            {this.state.users.map(user => (
            <li key={user.id}><Link to={`/user/${user.id}`}>{user.name}</Link></li>
    ))}
    </ul>
        </div>
        <div className="detail">
            {this.props.children}
    </div>
        </div>
    )
    }
});

const User = React.createClass({
    componentDidMount(){
        this.setState({
            user: this.props.params.userId
        })
    },
    render(){
        return (
            <div className="user">
            <h2>{this.props.params.userId}</h2>
        </div>
    )
    }
});

render((
    <Router history={browserHistory}>
    <Route path="/" component={App}>
    <Route path="about" component={About}/>
    <Route path="users" component={Users}>
    <Route path="/user/:userId" component={User}/>
    </Route>
    </Route>
    </Router>
), document.getElementById('container'));