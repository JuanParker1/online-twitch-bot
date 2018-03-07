var React = require('react');
var TileCommand = require('./metro-components/TileCommand');
var StepController = require('../../2-application/controllers/StepController');

module.exports = React.createClass({
    onClick: function(e) {
        StepController().createForm(this.props.project);
    },
    render: function() {
        if (this.props.user) {
            return (
                <span>
                    <TileCommand color={"yellow"} title={"Stap toevoegen"} iconClass="fa fa-plus" onClick={this.onClick} />
                </span>
            );
        } else {
            return <span />;
        }
    }
}); 