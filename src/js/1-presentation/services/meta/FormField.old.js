var _ = require('underscore');

module.exports = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};
    
    that = _.extend({
        sequence: 0,
        attribute: null, 
        value: '',
        width: 12,
        offset: 0,
        newLine: false,
        getFocus: false,
        isInput: true,
        set: function(value) {
            this.value = value;   
        },
        get: function(form) {
            var value = $('.modalForm.' + form.name + ' [name="' + this.attribute.name + '"]').val();
            return value;
        },
        getLayoutClass: function() {
            return ('col-md-' + this.width + ' col-md-offset-' + this.offset);
        },
        getComponent: function(project, user) {
            return React.createElement('div', {key: this.name, className:this.getLayoutClass()}, this.getFieldComponent());
        },
        getFieldComponent: function() {}
    }, spec);
    return that;
};