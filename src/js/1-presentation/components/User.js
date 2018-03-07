var React = require('react');
var UserInfo = require('./UserInfo');
    LogOutButton = require('./LogOutButton'),
    LogIn = require('./LogIn'),
    SignOn = require('./SignOn');

module.exports = React.createClass({ 
    render: function() {
        if (this.props.user) {
            return ( 
                <div className="user" >
                    <UserInfo user={this.props.user} />
                    <LogOutButton user={this.props.user} />
                </div>
            );
        } else {
            return ( 
                <div className="user" >
                    <LogIn />
                    <SignOn />
                </div>
            ); 
        }
    }
});
