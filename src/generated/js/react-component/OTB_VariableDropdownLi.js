// OTB_VariableDropdownLi React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_ShowMenuList from './OTB_ShowMenuList';
import OTB_VariableDropdownUl from './OTB_VariableDropdownUl';

class OTB_VariableDropdownLi extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        application: null,
        user: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <li className={"variable-dropdown-li " + 'toggle-active-state'} style={self.props.style || {}} >
                    <OTB_ShowMenuList text={'Variables'} />
                    <OTB_VariableDropdownUl application={self.props.application} user={self.props.user} />
                </li>
            );
        }
        else {
            return <span />;
        };
    };
};

export default OTB_VariableDropdownLi;
