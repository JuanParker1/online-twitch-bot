var React = require('react');
var Reflux = require('reflux');
var ProjectIntro = require('./ProjectIntro');
var DomainAPI = require('../../3-domain/DomainAPI');
var StepsList = require('./StepsList');
var StepsPanels = require('./StepsPanels');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            project: null
        };
    },
    render: function() {
        if (this.state.project) {
            return ( 
                <span className="projectPage" >
                    <ProjectIntro project={this.state.project} user={this.state.user} />
                    <StepsList user={this.props.user} project={this.state.project} />
                    { (this.state.project.get('steps')) ? <StepsPanels user={this.props.user} project={this.state.project} /> : <span /> }
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
