// OTB_ReactDefaultFunctionCategory React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_DefaultFunctionList from './OTB_DefaultFunctionList';
import OTB_ShowMenuList from './OTB_ShowMenuList';

class OTB_ReactDefaultFunctionCategory extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        application: null,
        defaultFunctionCategory: null,
        user: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <li className={"react-default-function-category " + 'toggle-active-state'} style={self.props.style || {}} >
                    <OTB_ShowMenuList text={self.props.defaultFunctionCategory.get('name')} />
                    <OTB_DefaultFunctionList defaultFunctionCategory={self.props.defaultFunctionCategory} application={self.props.application} user={self.props.user} />
                </li>
            );
        }
        else {
            return <span />;
        };
    };
};

export default OTB_ReactDefaultFunctionCategory;