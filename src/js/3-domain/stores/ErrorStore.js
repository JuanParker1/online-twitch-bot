// ErrorStore

var Reflux = require('reflux');
var _ = require('underscore');
var ErrorActions = require('../actions/ErrorActions');

module.exports = Reflux.createStore({
    errors: [],
    init: function() {
        this.listenTo(ErrorActions.add, this.onAdd);
        this.listenTo(ErrorActions.clear, this.onClear);
        this.listenTo(ErrorActions.connect, this.onConnect);
        this.listenTo(ErrorActions.disconnect, this.onDisconnect);
    },
    onConnect: function(component) {
        component.unsubscribe = this.listen(function(errors) {
            if (component.isMounted()) {
                if (errors) {
                    component.setState({ errors: errors });
                } else {
                    component.setState({ errors: [] });
                }
            }
        }, component);
        if (this.errors) {
            this.trigger(this.errors);
        }
    },
    onDisconnect: function(component) {
        component.unsubscribe();
    },
    onAdd: function(error) {
        this.errors = this.errors.concat([error]);
        this.trigger(this.errors);
    },
    onClear: function() {
        this.errors = [];
        this.trigger(this.errors);
    }
});