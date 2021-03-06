// OTB_UserCommandCategorySection React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_GeneralH1 from './OTB_GeneralH1';
import OTB_ThinHR from './OTB_ThinHR';
import OTB_UserCommandInfo from './OTB_UserCommandInfo';

class OTB_UserCommandCategorySection extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        application: null,
        user: null,
        commandCategory: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <span className={"user-command-category-section " + 'cell auto-size padding20 page-panel panel-' + self.props.commandCategory.id} style={self.props.style || {}} >
                    <OTB_GeneralH1 title={self.props.commandCategory.get('name')} />
                    <OTB_ThinHR />
                    { ((true) && (self.getCommands() && self.getCommands() && self.getCommands())) ? self.getCommands().map(function(item, index) {
                        return (<OTB_UserCommandInfo index={index} command={item} key={item.id || index} />);
                    }) : '' }
                </span>
            );
        }
        else {
            return <span />;
        };
    };
    componentDidMount() {
        $('.user-command-category-section').hide();
    };
    getCommands = () => {
        var self = this;
        if(self.props.commandCategory.getLocation().indexOf('OTB_User') > -1)
            return self.props.commandCategory.get('userCategoryCommands');
        else{
            var commands = [];
            var activeC = self.props.user.get('activeDefaultCommands');
            commands = _.filter(self.props.commandCategory.get('appCategoryCommands'), function(cat){
                var f = _.find(activeC, function(obj){return obj.id == cat.id});
                return f != undefined;
            });
            return commands;
        }
    };
};

export default OTB_UserCommandCategorySection;
