var React = require('react');
var DomainAPI = require('../../3-domain/DomainAPI');
var WizardStep = require('./WizardStep');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            project: null
        };
    },
    render: function() { 
        var self = this;
        if (this.state.project) {
            var toolsList = this.state.project.getToolsList();
            return ( 
                <span className="projectFooter" >
                    { toolsList.map(function(tool, index) {
                        return ( <WizardStep key={tool.id} tool={tool} index={index} steps={toolsList.length} project={self.state.project}  /> );
                    }) }
                </span> 
            );
        } else {
            return (<span />);
        }
    },
    componentDidMount: function() {
        DomainAPI.connectTemplateProject(this, 'project');
        DomainAPI.selectTemplateProject(this.props.params.id);
    },
    componentWillUnmount: function() { 
        DomainAPI.unselectTemplateProject();
        DomainAPI.disconnectTemplateProject(this);
    }
});
