// OTB_LevelsSection React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_GeneralH1 from './OTB_GeneralH1';
import OTB_LevelsTable from './OTB_LevelsTable';

class OTB_LevelsSection extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        user: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <span className={"levels-section " + 'cell auto-size padding20'} style={self.props.style || {}} >
                    <OTB_GeneralH1 title={self.props.user.get('displayName').charAt(0).toUpperCase() + self.props.user.get('displayName').slice(1) + ' Levels'} />
                    { (self.props.user.get('ownLevelRanks') && self.props.user.get('ownLevelRanks').get) ? <OTB_LevelsTable levelRanks={self.props.user.get('ownLevelRanks')} user={self.props.user} /> : <span /> }
                </span>
            );
        }
        else {
            return <span />;
        };
    };
};

export default OTB_LevelsSection;
