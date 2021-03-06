// OTB_CustomFunctionList React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_AddCustomFunction from './OTB_AddCustomFunction';
import OTB_CustomFunction from './OTB_CustomFunction';

class OTB_CustomFunctionList extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        user: null,
        role: 'dropdown',
        userFunctionCategory: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <ul className={"custom-function-list " + 'd-menu toggle-dropdown-menu'} style={self.props.style || {}} data-role={self.props.role} >
                    <OTB_AddCustomFunction user={self.props.user} userFunctionCategory={self.props.userFunctionCategory} />
                    { ((true) && (self.props.userFunctionCategory && self.props.userFunctionCategory.get('userCategoryFunctions') && self.props.userFunctionCategory.get('userCategoryFunctions'))) ? self.props.userFunctionCategory.get('userCategoryFunctions').map(function(item, index) {
                        return (<OTB_CustomFunction index={index} userFunction={item} user={self.props.user} key={item.id || index} />);
                    }) : '' }
                </ul>
            );
        }
        else {
            return <span />;
        };
    };
};

export default OTB_CustomFunctionList;
