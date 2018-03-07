var React = require('react');
var TileReveal = require('./metro-components/TileReveal');
var TemplateProjectController = require('../../2-application/controllers/TemplateProjectController');
var History = require('react-router').History;

module.exports = React.createClass({
    mixins: [ History ],
    onClick: function(e) { 
        e.preventDefault();
        e.stopPropagation();
        try {
            this.history.pushState(null, '/template/' + this.props.project.id);
        }
        catch (error) {
            window.location.href = '/template/' + this.props.project.id;
        }
    },
    onEdit: function(e) {
        e.stopPropagation();
        e.preventDefault();
        TemplateProjectController().updateForm(this.props.project);
    },
    onCreateProject: function(e) {
        e.stopPropagation();
        e.preventDefault();
        TemplateProjectController().createProjectFromTemplate(this.props.user, this.props.project);
    },
    render: function() {
        var iconClass = this.props.project.get('iconClass') || 'fa fa-file-text-o';
        var color = 'red';
        var commands = {};
        if (this.props.user) {
            commands = {
                edit: { iconClass: 'fa fa-pencil', onClick: this.onEdit, title: 'Template wijzigen' },
                createProject: { iconClass: 'fa fa-file-text', onClick: this.onCreateProject, title: 'Start een project met deze template' }
            };
        }
        return ( 
            <span>
                <TileReveal onClick={this.onClick} style={{cursor: 'pointer'}} title={this.props.project.get('name')} text={this.props.project.get('description')} iconClass={iconClass} color={color} width="2" height="1" sortBy={"title"} commands={commands} />
            </span>
        );
    }
});
