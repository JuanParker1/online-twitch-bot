var React = require('react');
var TileReveal = require('./metro-components/TileReveal');
var UserProjectController = require('../../2-application/controllers/UserProjectController');
var History = require('react-router').History;

module.exports = React.createClass({
    mixins: [ History ],
    onClick: function(e) { 
        e.preventDefault();
        this.history.pushState(null, '/project/' + this.props.project.id);
        try {
            this.history.pushState(null, '/project/' + this.props.project.id);
        }
        catch (error) {
            window.location.href = '/project/' + this.props.project.id; 
        }
    },
    onEdit: function(e) {
        e.stopPropagation();
        e.preventDefault();
        UserProjectController().updateForm(this.props.project);
    },
    render: function() {
        var iconClass = this.props.project.get('iconClass') || 'fa fa-file-text';
        var color = 'blue';
        var commands = {};
        if (this.props.user) {
            commands = {
                edit: { iconClass: 'fa fa-pencil', onClick: this.onEdit, title: 'Project wijzigen' }
            };
        }
        return ( 
            <span>
                <TileReveal onClick={this.onClick} style={{cursor: 'pointer'}} title={this.props.project.get('name')} text={this.props.project.get('description')} iconClass={iconClass} color={color} width="2" height="1" sortBy={"title"} commands={commands} />
            </span>
        );
    }
});
