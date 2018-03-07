// OTB_AddCommandFunction React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import { Form } from '../../../js/1-presentation/services/meta/Form';
import * as FormField from '../../../js/1-presentation/services/meta/FormField';
import OTB_ButtonCommand from './OTB_ButtonCommand';

class OTB_AddCommandFunction extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        command: null,
        application: null,
        user: null
    };
    render() {
        var self = this;
        return(
            <tr>
                <td><OTB_ButtonCommand title={"Add Function"} style={"button"} onClick={self.onClick} /></td>
                <td></td>
                <td></td>
            </tr>
        );
    };
    onClick = () => {
        var self = this;
                var defaultTreeObj = {nodes: self.props.application.get('appFunctionCategories')};
                var customTreeObj = {nodes: self.props.user.get('ownFunctionCategories')};
                _.each(defaultTreeObj['nodes'], function (obj, index) {
                    defaultTreeObj['nodes'][index] = _.extend(obj, {nodes: obj.get('appCategoryFunctions')});
                });
                _.each(customTreeObj['nodes'], function (obj, index) {
                    customTreeObj['nodes'][index] = _.extend(obj, {nodes: obj.get('userCategoryFunctions')});
                });
        
                class SelectForm extends Form {
                    constructor() {
                        super();
                        this.name = 'FunctionSelectForm';
                        this.title = 'Function selecteren';
                        this.fields = {
                            defaultIds: new class extends FormField.TreeView {
                                constructor() {
                                    super();
                                    this.name = 'defaultIds';
                                    this.sequence = '01';
                                    this.attribute = {
                                        name: 'Default Functions',
                                        tree: defaultTreeObj,
                                        label: 'Default Functions'
                                    };
                                    this.width = '12';
                                    this.offset = '0';
                                    this.getFocus = true;
                                }
                            }(),
                            customIds: new class extends FormField.TreeView {
                                constructor() {
                                    super();
                                    this.name = 'customIds';
                                    this.sequence = '01';
                                    this.attribute = {name: 'Custom Functions', tree: customTreeObj, label: 'Custom Functions'};
                                    this.width = '12';
                                    this.offset = '0';
                                    this.getFocus = true;
                                }
                            }()
                        };
                        delete this.buttons.remove;
                    };
                }
        
                var form = new SelectForm().open();
                $.when(form).done(function (formData) {
                    if (formData) {
                        var Command = self.props.command;
                        if (formData['values']) {
                            _.each(formData['values']['defaultIds'], function (id) {
                                _.each(self.props.application.get('appFunctionCategories'), function (category) {
                                    _.each(category.get('appCategoryFunctions'), function (variable) {
                                        if (variable.id == id) {
                                            Command.add('commandFunctions', variable);
                                            DomainAPI.OTB_CommandUpdate(Command);
                                        }
                                    });
                                });
                            });
                            _.each(formData['values']['customIds'], function (id) {
                                _.each(self.props.user.get('ownFunctionCategories'), function (category) {
                                    _.each(category.get('userCategoryFunctions'), function (variable) {
                                        if (variable.id == id) {
                                            Command.add('commandFunctions', variable);
                                            DomainAPI.OTB_CommandUpdate(Command);
                                        }
                                    });
                                });
                            });
                        }
                    }
                });
    };
};

export default OTB_AddCommandFunction;
