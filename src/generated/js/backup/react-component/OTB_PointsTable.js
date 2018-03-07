// OTB_PointsTable React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');
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
       if (true){ 
           return(
               <OTB_Table className="o-t-b_-points-table"  titles={['Rank', 'User Name', 'Points']}>
{                  self.sortPoints() && self.sortPoints() ? self.sortPoints().map(function(item, index) {
                      return(<OTB_PointsTableInfo pointParticipator={item} index={index}  key={item.id || index} />);
                  }) : ''}
               </OTB_Table>
           );
       } else {
           return (<span />);
       }
   };
   sortPoints = () => {
       var self = this;
var pointParts = self.props.pointRanks.get('pointParticipators');
var sortArray = _.sortBy(pointParts, function(obj){ return obj.get('points'); });
return sortArray.reverse();
   };
   componentDidMount() {
   };
   componentWillUnmount() {
   };
}

export default OTB_PointsTable;
