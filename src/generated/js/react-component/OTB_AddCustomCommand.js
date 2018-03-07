// OTB_AddCustomCommand React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_ButtonCommand from './OTB_ButtonCommand';

class OTB_AddCustomCommand extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        user: null,
        userCommandCategory: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <li className={"add-custom-command " + ""} style={self.props.style || {}} >
                    <OTB_ButtonCommand onClick={self.UserCommand_Create} title={'Add Command'} iconClass={'icon mif-plus'} />
                </li>
            );
        }
        else {
            return <span />;
        };
    };
    UserCommandCreate = () => {
        var Controller = require('../controller/OTB_UserCommand');
        var self = this;
        Controller.Create({userCommandCategory: self.props.userCommandCategory});
    };
};

export default OTB_AddCustomCommand;