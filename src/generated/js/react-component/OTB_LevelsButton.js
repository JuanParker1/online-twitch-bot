// OTB_LevelsButton React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';

class OTB_LevelsButton extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {

    };
    render() {
        var self = this;
        return(
            <li className="active levels-button"><a href="#" onClick={self.onClick}>Levels</a></li>
        );
    };
    onClick = (e) => {
        var self = this;
        $('.points-button').removeClass('active');
        $('.lp-settings-button').removeClass('active');
        $('.points-section').hide();
        $('.l-p-settings-section').hide();
        $('.levels-section').toggle();
        $('.levels-button').toggleClass("active");
    };
};

export default OTB_LevelsButton;