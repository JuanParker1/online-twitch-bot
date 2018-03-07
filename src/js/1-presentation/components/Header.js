var React = require('react');
var SiteName = require('./SiteName');
var User = require('./User');
var History = require('react-router').History;

module.exports = React.createClass({ 
    mixins: [ History ],
    back: function() {
        if ($('body').scrollLeft() === 0) {
           this.history.goBack(); 
        } else {
            $('body').animate({scrollLeft: 0}, 500, 'swing');
        }
    },
    render: function() {
        return (
            <div className="header"> 
                { this.props.location.pathname !== '/home' && this.props.location.pathname !== '/' ? <img className="backButton" title="Terug" src="/img/icons/white/32x32/nav_left.png" onClick={this.back} /> : <span /> }
                <SiteName />
                <User user={this.props.user} />
            </div>
        ); 
    }
});

