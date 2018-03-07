var React = require('react');

module.exports = React.createClass({
    render: function() {
        return (
            <div className="form-group" style={{width: '100%'}} >
                <label>{this.props.label}</label>
                <input className="kendo-slider" name={this.props.name} value={this.props.value} style={{width: '100%'}} />
            </div>
        );
    },
    componentDidMount: function() { 
        var self = this;
        $(this.getDOMNode()).find('input').kendoSlider({
            increaseButtonTitle: 'Right',
            decreaseButtonTitle: 'Left',
            min: self.props.min || 0,
            max: self.props.max || 10,
            smallStep: self.props.smallStep || self.props.step || 1,
            largeStep: self.props.largeStep || 1
        });
    },
    componentWillReceiveProps: function(nextProps) {
        if(nextProps.value !== this.props.value) {
            $(this.getDOMNode()).find('input').data("kendoSlider").value(nextProps.value);
        }
    },
    shouldComponentUpdate: function() {
        return false;
    }
});
