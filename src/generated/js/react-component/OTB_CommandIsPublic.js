// OTB_CommandIsPublic React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';

class OTB_CommandIsPublic extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {

    };
    render() {
        return(
            <label className="input-control checkbox">
                <input type="checkbox" />
                <span className="check"></span>
                <span className="caption">Public Command</span>
            </label>
        );

    };
};

export default OTB_CommandIsPublic;
