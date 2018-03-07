// OTB_AddCustomFunction React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_ButtonCommand from './OTB_ButtonCommand';

class OTB_AddCustomFunction extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        user: null,
        userFunctionCategory: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <li className={"add-custom-function " + ""} style={self.props.style || {}} >
                    <OTB_ButtonCommand onClick={self.UserFunction_Create} title={'Add Function'} iconClass={'icon mif-plus'} />
                </li>
            );
        }
        else {
            return <span />;
        };
    };
    UserFunctionCreate = () => {
        var Controller = require('../controller/OTB_UserFunction');
        var self = this;
        Controller.Create({userFunctionCategory: self.props.userFunctionCategory});
    };
};

export default OTB_AddCustomFunction;
