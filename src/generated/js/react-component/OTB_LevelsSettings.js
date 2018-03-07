// OTB_LevelsSettings React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_GeneralH1 from './OTB_GeneralH1';
import OTB_ModernTextBox from './OTB_ModernTextBox';

class OTB_LevelsSettings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            levelSettings: {}
        };
    };
    static defaultProps = {
        user: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <span className={"levels-settings " + ""} style={self.props.style || {}} >
                    <OTB_GeneralH1 classes={'text-light'} title={'Levels Settings'} />
                    <OTB_ModernTextBox inputId={'xpIncrease'} label={'Level XP Function'} placeholder={self.state.levelSettings.get ? 'XP Increase=' + self.state.levelSettings.get('xpfunction') : 'XP Increase'} informer={'XP needed for next level (prev.xp = previous XP need)'} />
                    <OTB_ModernTextBox inputId={'startXp'} classes={'place-right'} label={'Level 1 XP'} placeholder={self.state.levelSettings.get ? 'Start XP=' + self.state.levelSettings.get('xpstart') : 'Start XP'} informer={'The XP needed to reach level 1'} />
                    <OTB_ModernTextBox inputId={'xpPerMinute'} label={'XP Per Minute'} placeholder={self.state.levelSettings.get ? 'XP Interval=' + self.state.levelSettings.get('xppm') : 'XP Interval'} informer={'The amount of XP gained per 5 minutes'} />
                    <OTB_ModernTextBox inputId={'xpSubMult'} classes={'place-right'} label={'Subscriber XP Multiplier'} placeholder={self.state.levelSettings.get ? 'Subscriber Bonus=' + self.state.levelSettings.get('xpmult') : 'Subscriber Bonus'} informer={'How much more XP the subscribers gain per 5 minutes'} />
                </span>
            );
        }
        else {
            return <span />;
        };
    };
    componentWillReceiveProps(nextProps) {
        var self = this;
        
        if(Object.keys(self.props.user.get('ownLevelRanks')).length > 0){
            self.setState({levelSettings: self.props.user.get('ownLevelRanks')});
        }
        
    };
};

export default OTB_LevelsSettings;
