// OTB_PointsSection React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_GeneralH1 from './OTB_GeneralH1';
import OTB_PointsTable from './OTB_PointsTable';

class OTB_PointsSection extends React.Component {
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
                <span className={"points-section " + 'cell auto-size padding20'} style={self.props.style || {}} >
                    <OTB_GeneralH1 title={'Point Leaderboards'} />
                    { (self.props.user.get('ownPointRanks') && self.props.user.get('ownPointRanks').get) ? <OTB_PointsTable user={self.props.user} pointRanks={self.props.user.get('ownPointRanks')} /> : <span /> }
                </span>
            );
        }
        else {
            return <span />;
        };
    };
    componentDidMount() {
        var self = this;
        if(window.location.href.toLowerCase().indexOf(self.props.user.get('displayName').toLowerCase()) <= -1)
            $('.points-section').hide();
    };
};

export default OTB_PointsSection;
