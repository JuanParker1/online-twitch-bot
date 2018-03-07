var React = require('react');

module.exports = React.createClass({
    render: function() {
        var classString = 'tile icon-featurefade title-verticalcenter title-scaleup w1 h1 '  + this.props.color;
        var iconClass = 'icon ' + this.props.iconClass;
        return ( 
            <div className={classString} onClick={this.props.onClick}> 
                <a className="link" href="#">
                    <i className={iconClass}></i>
                    <p className="title">{this.props.title}</p>
                </a>
            </div>
        );
    }
});