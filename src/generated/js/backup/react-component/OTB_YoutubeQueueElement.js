// OTB_YoutubeQueueElement React Component
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten by the next generation run!
//          Change the code only in the Visual Paradigm Project.

import React from 'react';
import * as _ from 'lodash';
var DomainAPI = require('../domain-entity/DomainAPI');

class OTB_YoutubeQueueElement extends React.Component {
   constructor(props) {
       super(props);
       this.state = {
           data: {}
       };
   };
   static defaultProps = {
           videoObj: null
   };
   render() {
       var self = this;
return(
    <div className="window">
        <div className="window-caption">
            <span className="window-caption-icon"><span className="mif-youtube-play fg-red"></span></span>
            <span className="window-caption-title">Youtube Video</span>
        </div>
        <div className="window-content">
            <div className="grid">
                <div className="row cells3">
                    <div className="cell">
                        {(self.state.data.thumbnails) ? <img src={self.state.data.thumbnails.default.url} /> : <span />}
                    </div>
                    <div className="cell colspan2">
                        {(self.state.data.title) ? <h5>{self.state.data.title}</h5> : <span />}
                        <p>Song Link: <a href={self.props.videoObj.get('videoUrl')} target="_blank">{self.props.videoObj.get('videoUrl')}</a></p>
                        {(self.state.data.length) ? <p>Length: {self.state.data.length}</p> : <span />}
                    </div>
                </div>
            </div>
        </div>
    </div>
);
   };
   componentDidMount() {
       var self = this;
var moment = require('moment');
var id = self.props.videoObj.get('videoUrl').split('/')[self.props.videoObj.get('videoUrl').split('/').length-1];
var key = "AIzaSyCkdJFzybAjC84U-zqKqmU8njCePlM3G6k";
var snippet = null;
$.getJSON('https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=' + id + '&key=' + key, function(data){
    var snippet = data['items'][0]['snippet'];
    var contentDetails = data['items'][0]['contentDetails'];
    var _length = moment.duration(contentDetails['duration']);
    var timeData = _length['_data'];
    var length = '';
    if(timeData['hours'] > 0){
        length = timeData['hours'] + ":" + timeData['minutes'] + ":" + timeData['seconds'];
        if(timeData['seconds'] < 10)
            length = timeData['hours'] + ":" + timeData['minutes'] + ":0" + timeData['seconds'];
    }
    else{
        length = timeData['minutes'] + ":" + timeData['seconds'];
        if(timeData['seconds'] < 10)
            length = timeData['minutes'] + ":0" + timeData['seconds']; 
    }
    snippet['length'] = length;
    self.setState({'data': snippet});
});

   };
   componentWillUnmount() {
   };
}

export default OTB_YoutubeQueueElement;
