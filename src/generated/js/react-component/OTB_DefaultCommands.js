// OTB_DefaultCommands React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_ShowMenuList from './OTB_ShowMenuList';
import OTB_DefaultCategoryList from './OTB_DefaultCategoryList';

class OTB_DefaultCommands extends React.Component {
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
                <li className={"default-commands " + 'toggle-active-state'} style={self.props.style || {}} >
                    <OTB_ShowMenuList text={'Default Commands'} />
                    <OTB_DefaultCategoryList application={self.props.application} user={self.props.user} />
                </li>
            );
        }
        else {
            return <span />;
        };
    };
};

export default OTB_DefaultCommands;
