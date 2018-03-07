var React = require('react');
var TileCommand = require('./metro-components/TileCommand');
var TemplateProjectController = require('../../2-application/controllers/TemplateProjectController');

module.exports = React.createClass({
    onClick: function(e) {
        // TemplateProjectController().createForm(this.props.user);
    },
    render: function() {
        if (this.props.user) {
            return (
                <span>
                    <TileCommand color={''} title={'Deelnemer toevoegen'} iconClass="fa fa-plus" onClick={this.onClick} />
                </span>
            );
        } else {
            return <span />;
        }
    }
}); 