var React = require('react');
var _ = require('underscore');

module.exports = React.createClass({
    getDefaultProps: function() {
        return {
        };
    },
    render: function() {
        var classString = "tile htmltile w" + this.props.width + ' h' + this.props.height + ' ' + this.props.color;
        return (
            <div className={classString} style={this.props.style} >  
                <div className="tilecontent" >
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }, 
    componentDidMount: function() {
        var $tile = $(this.getDOMNode());
        $tile.mCustomScrollbar({
            mouseWheelPixels: 300,
            theme: 'light-thick',
            scrollButtons: {
                enable: true
            }
        });
    } 
});
