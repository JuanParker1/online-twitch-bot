// OTB_UserHomePage React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';

class OTB_UserHomePage extends React.Component {
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
                <div className={"page user-home-page " + 'flex-grid page-content'} style={self.props.style || {"height": "100%"}} >
                </div>
            );
        }
        else {
            return <span />;
        };
    };
};

export default OTB_UserHomePage;
