// Domain Entities List
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten with the next generation run!
//          Change the code only in Visual Paradigm.
//

import {OTB_Application} from '../domain-entity/OTB_Application';
import {OTB_User} from '../domain-entity/OTB_User';
import {OTB_Command} from '../domain-entity/OTB_Command';
import {OTB_UserCommand} from '../domain-entity/OTB_UserCommand';
import {OTB_DefaultCommandCategory} from '../domain-entity/OTB_DefaultCommandCategory';
import {OTB_UserCommandCategory} from '../domain-entity/OTB_UserCommandCategory';
import {OTB_DefaultCommand} from '../domain-entity/OTB_DefaultCommand';
import {OTB_CommandVariable} from '../domain-entity/OTB_CommandVariable';
import {OTB_CommandParameter} from '../domain-entity/OTB_CommandParameter';
import {OTB_LevelRanks} from '../domain-entity/OTB_LevelRanks';
import {OTB_PointRanks} from '../domain-entity/OTB_PointRanks';
import {OTB_LevelParticipation} from '../domain-entity/OTB_LevelParticipation';
import {OTB_PointParticipation} from '../domain-entity/OTB_PointParticipation';
import {OTB_QueueVideo} from '../domain-entity/OTB_QueueVideo';
import {OTB_HistoryVideo} from '../domain-entity/OTB_HistoryVideo';
import {OTB_DomainYoutubeVideo} from '../domain-entity/OTB_DomainYoutubeVideo';
import {OTB_UserPlaylistSettings} from '../domain-entity/OTB_UserPlaylistSettings';
import {OTB_UserCommandVariable} from '../domain-entity/OTB_UserCommandVariable';
import {OTB_DefaultCommandVariable} from '../domain-entity/OTB_DefaultCommandVariable';
import {OTB_DefaultVariableCategory} from '../domain-entity/OTB_DefaultVariableCategory';
import {OTB_UserVariableCategory} from '../domain-entity/OTB_UserVariableCategory';
import {OTB_Function} from '../domain-entity/OTB_Function';
import {OTB_DefaultFunction} from '../domain-entity/OTB_DefaultFunction';
import {OTB_UserFunction} from '../domain-entity/OTB_UserFunction';
import {OTB_UserFunctionCategory} from '../domain-entity/OTB_UserFunctionCategory';
import {OTB_DefaultFunctionCategory} from '../domain-entity/OTB_DefaultFunctionCategory';
import {OTB_Plugin} from '../domain-entity/OTB_Plugin';
import {OTB_Repository} from '../domain-entity/OTB_Repository';
module.exports = function(entityType) {
   switch (entityType) {
       case 'OTB_Application': return OTB_Application;
       case 'OTB_User': return OTB_User;
       case 'OTB_Command': return OTB_Command;
       case 'OTB_UserCommand': return OTB_UserCommand;
       case 'OTB_DefaultCommandCategory': return OTB_DefaultCommandCategory;
       case 'OTB_UserCommandCategory': return OTB_UserCommandCategory;
       case 'OTB_DefaultCommand': return OTB_DefaultCommand;
       case 'OTB_CommandVariable': return OTB_CommandVariable;
       case 'OTB_CommandParameter': return OTB_CommandParameter;
       case 'OTB_LevelRanks': return OTB_LevelRanks;
       case 'OTB_PointRanks': return OTB_PointRanks;
       case 'OTB_LevelParticipation': return OTB_LevelParticipation;
       case 'OTB_PointParticipation': return OTB_PointParticipation;
       case 'OTB_QueueVideo': return OTB_QueueVideo;
       case 'OTB_HistoryVideo': return OTB_HistoryVideo;
       case 'OTB_DomainYoutubeVideo': return OTB_DomainYoutubeVideo;
       case 'OTB_UserPlaylistSettings': return OTB_UserPlaylistSettings;
       case 'OTB_UserCommandVariable': return OTB_UserCommandVariable;
       case 'OTB_DefaultCommandVariable': return OTB_DefaultCommandVariable;
       case 'OTB_DefaultVariableCategory': return OTB_DefaultVariableCategory;
       case 'OTB_UserVariableCategory': return OTB_UserVariableCategory;
       case 'OTB_Function': return OTB_Function;
       case 'OTB_DefaultFunction': return OTB_DefaultFunction;
       case 'OTB_UserFunction': return OTB_UserFunction;
       case 'OTB_UserFunctionCategory': return OTB_UserFunctionCategory;
       case 'OTB_DefaultFunctionCategory': return OTB_DefaultFunctionCategory;
       case 'OTB_Plugin': return OTB_Plugin;
       case 'OTB_Repository': return OTB_Repository;
   }
};
