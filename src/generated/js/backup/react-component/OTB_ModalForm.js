// OTB_ModalForm React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
var FormActions = require('../../../js/1-presentation/services/actions/FormActions');
import OTB_ModalFormField from './OTB_ModalFormField';
import OTB_ModalFormButton from './OTB_ModalFormButton';

class OTB_ModalForm extends React.Component {
   constructor(props) {
       super(props);
       this.state = {

       };
   };
   static defaultProps = {

   };
   render() {
       var self = this;
        var openClass = this.state.form ? 'open' : 'closed';
        var formClass = 'form ' + openClass;
        var show = this.state.form ? true : false;
        if (show) {
            $(window).unbind('mousewheel DOMMouseScroll MozMousePixelScroll');
        }
        else {
            if (!$('body').hasClass('vertical')) {
                require('jquery-mousewheel')($);
                $(window)
                    .unbind('mousewheel DOMMouseScroll MozMousePixelScroll')
                    .bind('mousewheel DOMMouseScroll MozMousePixelScroll', mouseWheelHorizontal);
            }
        }
        if (this.state.form) {
            var modalClass = 'modalForm dialog padding20 ' + this.state.form.name;
            var modalStyle = {width: this.state.form.width, height: this.state.form.height};
            return (
                <span>
                    <div className="modal-bg" onClick={() => (self.onClose())}></div>
                    <div className={modalClass} data-role="dialog" data-windows-style="true" id={this.state.form.name}>
                        <div className="container">
                            <div className="modalTitle">
                                <h2>{ this.state.form.title }</h2>
                            </div>
                            <div className="modalBody">
                                {_.sortBy(_.values(this.state.form.fields), function (field) {
                                    return field.sequence;
                                }).map(function (field) {
                                    return (<OTB_ModalFormField key={field.attribute.name} field={field} width={field.width} offset={field.offset}/>);
                                })}
                                { this.props.children }
                            </div>
                            <div className="modalFooter">
                                {_.sortBy(_.values(this.state.form.buttons), function (button) {
                                    return button.sequence;
                                }).map(function (button) {
                                    return (<OTB_ModalFormButton key={button.name} button={button}/>);
                                })}
                            </div>
                        </div>
                    </div>
                </span>
            );
        } else {
            return (<span />);
        }
   };
   onOk = () => {
       FormActions.closeForm();
   };
   onClose = () => {
       FormActions.closeForm();
   };
   componentDidMount() {
       FormActions.connectToForm(this);
   };
   componentDidUpdate() {
       if (this.state.form) {
    if ($('.modalForm [autofocus]').length > 0) {
        $('.modalForm [autofocus]').first().focus();
    }
    else {
        $('.modalForm input').first().focus();
    }
}
   };
   componentWillUnmount() {
       FormActions.disconnectFromForm(this);
   };
}

export default OTB_ModalForm;
