var React = require('react');
var _ = require('underscore');

module.exports = React.createClass({
    getDefaultProps: function() {
        return { commands: {} };
    },
    render: function() {
        var self = this;
        var commandsClass = _.keys(this.props.commands).length > 0 ? 'commands' : '';
        var classString = "tile reveal-slide  w" + this.props.width + ' h' + this.props.height + ' ' + this.props.color + ' ' + commandsClass;
        var revealClassString = "reveal white w" + this.props.width + ' h' + this.props.height;
        var iconClass = 'icon ' + this.props.iconClass;
        return ( 
            <div className={classString} onClick={this.props.onClick}> 
                <div className={revealClassString}>
                    <div className="text">
                        <p>
                            <span className="text-medium" style={{fontWeight: 'bold'}} >{this.props.title}</span><br/>
                            {this.props.text}
                        </p>
                    </div>
                    { _.values(this.props.commands).map(function(command) {
                        var className = 'command ' + command.iconClass;
                        return (<i className={className} title={command.title} key={command.title} onClick={command.onClick} ></i> );
                    })}
                </div>
                <a className="link" href="#">
                    <i className={iconClass}></i>
                    <p className="title">{this.props.title}</p>
                </a>
            </div>
        );
    },
    componentDidMount: function() {
    var $tile = $(this.getDOMNode());
    var height = $tile.height();
    $tile
        .bind('mouseenter', function() {
            $('.reveal', $tile).stop().slideDown();
        })
        .bind('mouseleave', function() {
            $('.reveal', $tile).stop().slideUp(function() {
                $tile.height(height);
            });
        });
    }
});