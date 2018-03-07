var React = require('react');
var _ = require('underscore');

module.exports = React.createClass({
    getDefaultProps: function() {
        return { commands: {}, title: '', text: '', rightBottom: '', rightTop: '', leftBottom: '', opacity: 1 }; 
    },
    render: function() {
        var self = this;
        var commandsClass = _.keys(this.props.commands).length > 0 ? 'commands' : '';
        var classString = "tile reveal-slide  w" + this.props.width + ' h' + this.props.height + ' ' + this.props.color + ' ' + commandsClass;
        var revealClassString = "reveal white w" + this.props.width + ' h' + this.props.height;
        var iconClass = 'icon ' + this.props.iconClass;
        return ( 
            <div className={classString} style={{opacity: this.props.opacity}} onClick={this.props.onClick}> 
                <div className={revealClassString}>
                    <div className="text">
                        <p>
                            {this.props.text || this.props.title}
                        </p>
                    </div>
                    { _.values(this.props.commands).map(function(command) {
                        var className = 'command ' + command.iconClass;
                        return (<i className={className} title={command.title} key={command.title} onClick={command.onClick} ></i> );
                    })}
                </div>
                <a className="link" href="#">
                    <div className="text">
                        <p className="text-medium">{this.props.title}</p>
                    </div>
                    <p className="sub">{this.props.rightBottom}</p>
                    <p className="title-right text-large">{this.props.rightTop}</p>
                    <p className="title">{this.props.leftBottom}</p>
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