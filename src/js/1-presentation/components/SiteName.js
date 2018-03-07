var React = require('react');
var History = require('react-router').History;

module.exports = React.createClass({
    mixins: [ History ],
    onClick: function(e) {
        e.preventDefault();
        e.stopPropagation();
        try {
            this.history.pushState(null, '/home');
        }
        catch (error) {
            window.location.href = '/home';
        }
    },
    render: function() {
        return (
            <div className="site-name" title="Home" onClick={this.onClick}>
                <span className="site-logo"><img src="/img/icons/white/256x256/eye.png" /></span>IC STRATEGY
            </div>
        ); 
    }
}); 
  