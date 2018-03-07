var React = require('react');
var Reflux = require('reflux');
var _ = require('underscore');
var FormStore = require('../services/stores/FormStore');
var FormActions = require('../services/actions/FormActions');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;
var ModalFormField = require('./ModalFormField');

module.exports = React.createClass({
    mixins: [Reflux.listenTo(FormStore(), 'onFormChange')],
    onFormChange: function(form) {
        if (form) {
            if (Array.isArray(form)) {
                form = form[0];
            }
            this.setState({
                form: form
            });
        }
        else {
            this.setState({
                form: null
            });
        }
    },

    getInitialState: function() {
        return {
            form: null
        };
    },

    onOk: function() {
        FormActions.close();
    },
    onClose: function() {
        FormActions.close();
    },
    onDelete: function() {

    },
    render: function() {
        var openClass = this.state.form ? 'open' : 'closed';
        var formClass = 'form ' + openClass;
        var show = this.state.form ? true : false;
        if (show) {
            $('body, html').unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
        }
        else {
            if (!$('body').hasClass('vertical')) {
                $('body, html')
                    .bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(event, delta, deltaX, deltaY) {
                        $(this).scrollLeft($(this).scrollLeft() - deltaY);
                        event.preventDefault();
                    });
            }
        }
        if (this.state.form) {
            var modalClass = 'modalForm ' + this.state.form.name;
            var modalStyle = { width: this.state.form.width, height: this.state.form.height };
            return (
                <Modal className={modalClass} show={show} onHide={this.onClose}  >
                  <Modal.Header closeButton>
                    <Modal.Title>{ this.state.form.title }</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {_.sortBy(_.values(this.state.form.fields), function(field) { return field.sequence; }).map(function(field) {
                        return (<ModalFormField field={field} />);
                    })}
                    { this.props.children }
                  </Modal.Body>
                  <Modal.Footer>
                    {_.sortBy(_.values(this.state.form.buttons), function(button) { return button.sequence; }).map(function(button) {
                        return (button.getComponent());
                    })}
                  </Modal.Footer>
                </Modal>
            );
        } else {
            return (<span />);    
        }
    },
    componentDidUpdate: function() {
        if (this.state.form) {
            if ($('.modalForm [autofocus]').length > 0) {
                $('.modalForm [autofocus]').first().focus();
            }
            else {
                $('.modalForm input').first().focus();
            }
        }
    }
});
