var React = require('react');
var Reflux = require('reflux');
var _ = require('underscore');
var DomainAPI = require('../../3-domain/DomainAPI');
var Section = require('./metro-components/Section');
var TemplateTile = require('./TemplateTile');
var ProjectInsertTile = require('./ProjectInsertTile');


module.exports = React.createClass({
    getInitialState: function() {
        return {  
            items: []
        };    
    },
    render: function() {
        var self = this;
        var href = '';
        if (this.props.isLink) { href="templates" }
        return ( 
            <Section sectionClass="templates" title="Project templates" href={href} > 
                {this.state.items.map(function(item, index) {
                    return (<TemplateTile key={item.id} index={index} project={item} user={self.props.user} tools={self.props.tools} />);
                })}; 
                { (this.props.user ) ? <ProjectInsertTile projectType="template" user={self.props.user} /> : ''}
            </Section> 
        ); 
    },
    componentDidMount: function() {
        DomainAPI.connectTemplateProjects(this, 'items');
    },
    componentWillUnmount: function() { 
        DomainAPI.disconnectTemplateProjects(this);
    }
});

