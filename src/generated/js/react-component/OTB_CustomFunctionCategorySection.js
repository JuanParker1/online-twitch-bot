// OTB_CustomFunctionCategorySection React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_CustomFunctionSection from './OTB_CustomFunctionSection';

class OTB_CustomFunctionCategorySection extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        functionCategory: null,
        user: null,
        application: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <span className={"custom-function-category-section " + ""} style={self.props.style || {}} >
                    { ((true) && (self.props.functionCategory && self.props.functionCategory.get('userCategoryFunctions') && self.props.functionCategory.get('userCategoryFunctions'))) ? self.props.functionCategory.get('userCategoryFunctions').map(function(item, index) {
                        return (<OTB_CustomFunctionSection application={self.props.application} index={index} userFunction={item} user={self.props.user} key={item.id || index} />);
                    }) : '' }
                </span>
            );
        }
        else {
            return <span />;
        };
    };
};

export default OTB_CustomFunctionCategorySection;