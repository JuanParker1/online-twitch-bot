// OTB_PointsTable React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

var DomainAPI = require('../domain-entity/DomainAPI');
import React from 'react';
import * as _ from 'lodash';
import OTB_Table from './OTB_Table';
import OTB_PointsTableInfo from './OTB_PointsTableInfo';

class OTB_PointsTable extends React.Component {
    constructor(props) {
        super(props);
    };
    static defaultProps = {
        user: null,
        pointRanks: null
    };
    render() {
        var self = this;
        if (true) {
            return(
                <OTB_Table className="o-tb_-points-table"  titles={['Rank', 'User Name', 'Points']}>
                    { ((true) && (self.sortPoints() && self.sortPoints() && self.sortPoints())) ? self.sortPoints().map(function(item, index) {
                        return (<OTB_PointsTableInfo index={index} key={item.id || index} pointParticipator={item} />);
                    }) : '' }
                </OTB_Table>
            );
        }
        else {
            return <span />;
        };
    };
    sortPoints = () => {
        var self = this;
        var pointParts = self.props.pointRanks.get('pointParticipators');
        var sortArray = _.sortBy(pointParts, function(obj){ return obj.get('points'); });
        return sortArray.reverse();
    };
};

export default OTB_PointsTable;