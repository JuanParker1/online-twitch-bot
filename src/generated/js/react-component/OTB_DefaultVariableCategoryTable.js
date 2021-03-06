// OTB_DefaultVariableCategoryTable React Component
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
import OTB_CreateDefaultCommandVariable from './OTB_CreateDefaultCommandVariable';

class OTB_DefaultVariableCategoryTable extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        commandVariableCategory: null,
        user: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <OTB_Table className="o-tb_-default-variable-category-table"  titles={['Variable Name', 'Variable Description', 'Variable Handler', 'Variable Value']}>
                    { ((true) && (self.props.commandVariableCategory && self.props.commandVariableCategory.get('categoryCommandVariables') && self.props.commandVariableCategory.get('categoryCommandVariables'))) ? self.props.commandVariableCategory.get('categoryCommandVariables').map(function(item, index) {
                        return (<OTB_CommandVariableRow commandVariable={item} index={index} user={self.props.user} key={item.id || index} />);
                    }) : '' }
                    { (self.props.user && self.props.user.hasRole('administrator')) ? <OTB_CreateDefaultCommandVariable commandVariableCategory={self.props.commandVariableCategory} /> : <span /> }
                </OTB_Table>
            );
        }
        else {
            return <span />;
        };
    };
};

export default OTB_DefaultVariableCategoryTable;
