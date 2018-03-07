var React = require('react');
var TileCommand = require('./metro-components/TileCommand');
var TemplateProjectController = require('../../2-application/controllers/TemplateProjectController');

module.exports = React.createClass({
    onClick: function(e) {
        TemplateProjectController().createForm(this.props.user);
    },
    render: function() {
        var color = '';
        var title = '';
        switch(this.props.projectType) {
            case 'project': 
                color = 'blue'; 
                title = 'Project toevoegen';
                break;
            case 'template': 
                color = 'red';
                title = 'Template toevoegen';
                break;
            case 'example': 
                color = 'orange';
                title = 'Voorbeeldproject toevoegen';
                break;
        }
        if (this.props.user) {
            return (
                <span>
                    <TileCommand color={color} title={title} iconClass="fa fa-plus" onClick={this.onClick} />
                </span>
            );
        } else {
            return <span />;
        }
    }
}); 