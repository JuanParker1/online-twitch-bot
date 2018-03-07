// OTB_FunctionActionsConfirm React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';

class OTB_FunctionActionsConfirm extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        function: null,
        user: null
    };
    render() {
        var self = this;
        return(
            <a onClick={self.onClick} className="place-right button">Confirm Changes</a>
        );

    };
    onClick = (e) => {
        var self = this;
        
        var checked = true;
        var checkbox = $('#active-' + self.props.command.id);
        if(checkbox.is(':checked'))
            checked = true;
        else
            checked = false;
        
        if(self.props.command.get('enabled') != null){
            var Command = self.props.command;
            Command.setValues({'enabled': checked});
            DomainAPI.OTB_UserCommandUpdate(Command, {'enabled': checked});
            if(checked) {
                $.Notify({
                    caption: 'Success',
                    content: 'Activated Command',
                    type: 'success'
                });
            }
            else{
                $.Notify({
                    caption: 'Success',
                    content: 'Dectivated Command',
                    type: 'success'
                });
            }
        }
        else{
            var User = self.props.user;
            if(!checked){
                User.remove('activeDefaultCommands', self.props.command);
                DomainAPI.OTB_UserUpdate(User, null, null, function(){
                    $.Notify({
                        caption: 'Success',
                        content: 'Deactivated Default Command',
                        type: 'success'
                    });
                });
            }
            else{
                User.add('activeDefaultCommands', self.props.command);
                DomainAPI.OTB_UserUpdate(User, null, null, function(){
                    $.Notify({
                        caption: 'Success',
                        content: 'Activated Default Command',
                        type: 'success'
                    });
                });
            }
        }
        
        

    };
};

export default OTB_FunctionActionsConfirm;
