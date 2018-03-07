// FormStore

var Reflux = require('reflux');
var _ = require('underscore');
var FormActions = require('../actions/FormActions');

module.exports = Reflux.createStore({
    form: null,
    init: function() {
        this.listenTo(FormActions.openForm, this.onOpen);
        this.listenTo(FormActions.closeForm, this.onClose);
        this.listenTo(FormActions.connectToForm, this.onConnect);
        this.listenTo(FormActions.disconnectFromForm, this.onDisconnect);
    },
    onConnect: function(component) {
        component.unsubscribe = this.listen(function(form) {


                if (form) {
                    if (Array.isArray(form)) {
                        form = form[0];
                    }
                    component.setState({ form: form });
                } else {
                    component.setState({ form: null });
                }

        }, component);
        if (this.form) {
            this.trigger(this.form);
        }
    },
    onDisconnect: function(component) {
        component.unsubscribe();
    },
    getDefaultData: function() {
        this.clearForm();
    },
    onOpen: function(form, project, user) {
        this.form = form;
        this.trigger(this.form);
    },
    onClose: function() {
        this.clearForm();
    },
    clearForm: function() {
        this.form = null;
        this.trigger(this.form);
    }
});
