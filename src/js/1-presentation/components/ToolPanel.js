var React = require('react');
var _ = require('underscore');

var ToolPanel = React.createClass({
    render: function() {
        var self = this;
        var title = this.props.prefix + ' ' + ' ' + this.props.tool.label;
        var ToolIntroComponent = self.props.tool.introComponent;
        var ToolComponent = self.props.tool.toolComponent;
        var ToolWrapUpComponent = self.props.tool.wrapUpComponent;
        if (this.props.tool.subTools.length > 0) {
            var subTools = _.map(_.sortBy(this.props.tool.subTools, function(t) { return t.sequence; }), function(tool) { return tool(); });
            return (
                <span>
                    { ToolIntroComponent ? <ToolIntroComponent tool={this.props.tool} project={this.props.project} user={this.props.user} prefix={this.props.prefix} /> : <span /> }
                    {_.map(subTools, function(tool, index) {
                        var prefix = self.props.prefix + '.' + (index + 1);
                        return (<ToolPanel key={tool.name} index={index} tool={tool} user={self.props.user} project={self.props.project} prefix={prefix} />);
                    })}
                    { ToolWrapUpComponent ? <ToolWrapUpComponent tool={this.props.tool} project={this.props.project} user={this.props.user}  prefix={this.props.prefix} /> : <span /> }
                </span>
            );
        } else {
            return ( 
                <span>
                    { ToolIntroComponent ? <ToolIntroComponent tool={this.props.tool} project={this.props.project} user={this.props.user} prefix={this.props.prefix} /> : <span /> }
                    { ToolComponent ? <ToolComponent tool={this.props.tool} user={this.props.user} project={this.props.project} prefix={this.props.prefix} /> : <span /> }
                    { ToolWrapUpComponent ? <ToolWrapUpComponent tool={this.props.tool} project={this.props.project} user={this.props.user} prefix={this.props.prefix} /> : <span /> }
                </span>
            );
        }
    } 
});
module.exports = ToolPanel;
