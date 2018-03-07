var React = require('react');
var ToolPanel = require('./ToolPanel');
var _ = require('underscore');

module.exports = React.createClass({
    render: function() {
        var self = this;
        var tools = _.map((self.props.project.get('steps')|| []), function(step) { return step.getTool(); }); 
        return ( 
            <span>
                {_.map(tools, function(tool, index) {
                    return (<ToolPanel key={tool.id} tool={tool} user={self.props.user} project={self.props.project} prefix={index + 1} />); 
                })}; 
            </span>
        ); 
    }
});