var React = require('react');
var Button = require('react-bootstrap').Button;
var DomainAPI = require('../../3-domain/DomainAPI');

module.exports = React.createClass({
    logout: function() {
        DomainAPI.logOut();
    },
    render: function() {
        return (
            <Button className="logOutButton" bsStyle="default" onClick={this.logout}>Afmelden</Button>
        );
    }
}); 

