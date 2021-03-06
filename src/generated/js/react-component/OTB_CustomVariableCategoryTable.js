// OTB_CustomVariableCategoryTable React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_Table from './OTB_Table';
import OTB_CommandVariableRow from './OTB_CommandVariableRow';
import OTB_CreateUserCommandVariable from './OTB_CreateUserCommandVariable';

class OTB_CustomVariableCategoryTable extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        commandVariableCategory: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <OTB_Table className="o-tb_-custom-variable-category-table"  titles={['Variable Name', 'Variable Description', 'Variable Handler', 'Variable Value']}>
                    { ((true) && (self.props.commandVariableCategory && self.props.commandVariableCategory.get('userCategoryVariables') && self.props.commandVariableCategory.get('userCategoryVariables'))) ? self.props.commandVariableCategory.get('userCategoryVariables').map(function(item, index) {
                        return (<OTB_CommandVariableRow commandVariable={item} index={index} key={item.id || index} />);
                    }) : '' }
                    <OTB_CreateUserCommandVariable commandVariableCategory={self.props.commandVariableCategory} />
                </OTB_Table>
            );
        }
        else {
            return <span />;
        };
    };
};

export default OTB_CustomVariableCategoryTable;
