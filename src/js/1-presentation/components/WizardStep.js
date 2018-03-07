var React = require('react');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            project: null
        };
    },
    onClick: function() {
        var marginLeft = parseInt($('.section').first().css('margin-left').replace('px',''), 10); 
        var className = this.props.tool.name;
        if ($('.' + className + '-intro').length > 0) {
            className += '-intro';
        }
        var scrollPosition = $('.' + className).offset().left - marginLeft;
        $('body').animate({scrollLeft: Math.max(0, scrollPosition)}, 500, 'swing');
    },
    render: function() { 
        var leftPosition = (this.props.index / this.props.steps) * 100;
        var width = 100 / this.props.steps;
        var style = { left: leftPosition + '%', width: width + '%' };
        var status = this.props.tool.getStatus(this.props.project, this.props.user);
        var className = 'wizardStep';
        if (status.percentage === 100) {
            className += ' ready';
        }
        return ( 
            <div className={className} style={style} onClick={this.onClick} >
                { this.props.index > 0 ? <div className="wizardStepLine" /> : '' }
                <div className="wizardStepSymbol" >
                    {this.props.index + 1}
                </div>
                {this.props.tool.label} <br />
                <span dangerouslySetInnerHTML={{__html: status.html}} /> 
            </div> 
        );
    }
}); 
