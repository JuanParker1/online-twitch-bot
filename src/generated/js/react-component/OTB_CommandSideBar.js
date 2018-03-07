// OTB_CommandSideBar React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_CommandDropdownLi from './OTB_CommandDropdownLi';
import OTB_VariableDropdownLi from './OTB_VariableDropdownLi';
import OTB_FunctionDropdownLi from './OTB_FunctionDropdownLi';

class OTB_CommandSideBar extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        user: null,
        application: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <ul className={"command-side-bar " + 'sidebar2 dark fixed-left'} style={self.props.style || {"height": "calc(100vh - 3.75rem)", "overflow": "auto"}} >
                    <OTB_CommandDropdownLi application={self.props.application} user={self.props.user} />
                    <OTB_VariableDropdownLi application={self.props.application} user={self.props.user} />
                    <OTB_FunctionDropdownLi application={self.props.application} user={self.props.user} />
                </ul>
            );
        }
        else {
            return <span />;
        };
    };
};

export default OTB_CommandSideBar;