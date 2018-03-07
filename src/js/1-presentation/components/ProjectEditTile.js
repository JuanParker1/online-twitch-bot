var React = require('react');
var TileCommand = require('./metro-components/TileCommand');
var TemplateProjectController = require('../../2-application/controllers/TemplateProjectController');
var UserProjectController = require('../../2-application/controllers/UserProjectController');
// var ExampleProjectController = require('../../2-application/controllers/ExampleProjectController');

module.exports = React.createClass({
    onClick: function(e) {
        switch(this.props.project.type) {
            case 'UserProject': 
                UserProjectController().updateForm(this.props.project); 
                break;
            case 'TemplateProject': 
                TemplateProjectController().updateForm(this.props.project); 
                break;
            case 'ExampleProject':  
//                ExampleProjectController().updateForm(this.props.project); 
                break;
        }
    },
    render: function() {
        var color = '';
        var title = '';
        switch(this.props.project.type) {
            case 'UserProject': 
                color = 'blue'; 
                title = 'Project wijzigen';
                break;
            case 'TemplateProject': 
                color = 'red';
                title = 'Template wijzigen';
                break;
            case 'ExampleProject': 
                color = 'orange';
                title = 'Voorbeeldproject wijzigen';
                break;
        }
        return ( 
            <span>
                <TileCommand color={color} title={title} iconClass="fa fa-pencil" onClick={this.onClick} />
            </span>
        );
    }
}); 