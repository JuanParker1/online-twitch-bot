// OTB_UserCommandsPageContent React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_UCommandSidebarCell from './OTB_UCommandSidebarCell';
import OTB_UserCommandCategorySection from './OTB_UserCommandCategorySection';

class OTB_UserCommandsPageContent extends React.Component {
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
                <div className={"user-commands-page-content " + 'row'} style={self.props.style || {"height": "100%", "width": "100%"}} >
                    <OTB_UCommandSidebarCell application={self.props.application} user={self.props.user} />
                    { ((true) && (self.getAllCategories() && self.getAllCategories() && self.getAllCategories())) ? self.getAllCategories().map(function(item, index) {
                        return (<OTB_UserCommandCategorySection application={self.props.application} commandCategory={item} index={index} user={self.props.user} key={item.id || index} />);
                    }) : '' }
                </div>
            );
        }
        else {
            return <span />;
        };
    };
    getAllCategories = () => {
        var self = this;
        var categories = self.props.user.get('ownCommandCategories');
        var defCategories = self.props.application.get('appCommandCategories');
        var defCommands = self.props.user.get('activeDefaultCommands');
        var fc = _.filter(defCategories, function(obj, key){
            var f = _.find(defCommands, function(cObj, cKey){
                return cObj.getLocation().indexOf(key);
            });
            return (f != undefined);
        });
        categories = categories.concat(fc);
        return categories;
    };
};

export default OTB_UserCommandsPageContent;
