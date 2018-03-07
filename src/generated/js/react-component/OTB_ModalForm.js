// OTB_ModalForm React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var FormActions = require('../../../js/1-presentation/services/actions/FormActions');
var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_ModalFormField from './OTB_ModalFormField';
import OTB_ModalFormButton from './OTB_ModalFormButton';

class OTB_ModalForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: null
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
                }
                else {
                    if (!$('body').hasClass('vertical')) {
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
    componentDidMount() {
        FormActions.connectToForm(this);
    };
    componentWillUnmount() {
    };
    onOk = () => {
        FormActions.closeForm();
    };
    onClose = () => {
        FormActions.closeForm();
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
};

export default OTB_ModalForm;