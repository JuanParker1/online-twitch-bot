var React = require('react');
var _ = require('underscore');

module.exports = React.createClass({
    getDefaultProps: function() {
        return { commands: {}, title: '', text: '', rightBottom: '', rightTop: '', leftBottom: '' }; 
    },
    render: function() {
        var self = this;
        var commandsClass = _.keys(this.props.commands).length > 0 ? 'commands' : '';
        var classString = "tile w" + this.props.width + ' h' + this.props.height + ' ' + this.props.color + ' ' + commandsClass;
        var revealClassString = "reveal white w" + this.props.width + ' h' + this.props.height;
        var iconClass = 'icon ' + this.props.iconClass;
        return ( 
            <div className={classString} onClick={this.props.onClick}> 
                <a className="link" href="#">
                    <div className="text">
                        <p className="text-medium">{this.props.title}</p>
                        <p>{this.props.text}</p>
                    </div>
                    <p className="sub">{this.props.rightBottom}</p>
                    <p className="title-right text-large">{this.props.rightTop}</p>
                    <p className="title">{this.props.leftBottom}</p>
                </a>
            </div>
        );
    }
});