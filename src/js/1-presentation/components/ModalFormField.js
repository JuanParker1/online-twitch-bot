var React = require('react');

module.exports = React.createClass({
    render: function() {
        return this.props.field.getComponent();
    },
    componentDidMount: function() {
        if (this.props.field && this.props.field.componentDidMount) {
            this.props.field.componentDidMount(this);
        }
    }
});