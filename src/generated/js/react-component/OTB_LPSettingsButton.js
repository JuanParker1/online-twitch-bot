// OTB_LPSettingsButton React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';

class OTB_LPSettingsButton extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {

    };
    render() {
        var self = this;
        return(
            <li className="lp-settings-button"><a href="#" onClick={self.onClick}>Settings</a></li>
        );
    };
    onClick = (e) => {
        var self = this;
        $('.levels-button').removeClass('active');
        $('.points-button').removeClass('active');
        $('.levels-section').hide();
        $('.points-section').hide();
        $('.l-p-settings-section').toggle();
        $('.lp-settings-button').toggleClass("active");
    };
};

export default OTB_LPSettingsButton;
