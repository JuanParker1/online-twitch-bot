// OTB_AddDefaultFunctionCategory React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_ButtonCommand from './OTB_ButtonCommand';

class OTB_AddDefaultFunctionCategory extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        application: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <li className={"add-default-function-category " + ""} style={self.props.style || {}} >
                    <OTB_ButtonCommand onClick={self.DefaultFunctionCategory_Create} title={'Add Category'} iconClass={'icon mif-plus'} />
                </li>
            );
        }
        else {
            return <span />;
        };
    };
    DefaultFunctionCategoryCreate = () => {
        var Controller = require('../controller/OTB_DefaultFunctionCategory');
        var self = this;
        Controller.Create({functionCategoryApp: self.props.application});
    };
};

export default OTB_AddDefaultFunctionCategory;
