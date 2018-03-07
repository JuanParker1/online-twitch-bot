var React = require('react');

module.exports = React.createClass({
    render: function() {
        if (this.props.user) {
            return (
                <div className="userInfo" >
                    <span className="userDisplayName">{ this.props.user.get('displayName') }</span><br />
                    <span className="userEmail">{ this.props.user.get('email') }</span>
                </div>
            );
        } else {
            return (<span />);
        }
    }
}); 
 