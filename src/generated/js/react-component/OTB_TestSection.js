// OTB_TestSection React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';

class OTB_TestSection extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        user: null
    };
    render() {
        return(
            <p>{this.props.user.id}</p>
        );
    };
};

export default OTB_TestSection;
