// OTB_AddDefaultCategory React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_ButtonCommand from './OTB_ButtonCommand';

class OTB_AddDefaultCategory extends React.Component {
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
                <li className={"add-default-category " + ""} style={self.props.style || {}} >
                    <OTB_ButtonCommand onClick={self.DefaultCommandCategory_Create} title={'Add Category'} iconClass={'icon mif-plus'} />
                </li>
            );
        }
        else {
            return <span />;
        };
    };
    DefaultCommandCategoryCreate = () => {
        var Controller = require('../controller/OTB_DefaultCommandCategory');
        var self = this;
        Controller.Create({commandCategoryApp: self.props.application});
    };
};

export default OTB_AddDefaultCategory;
