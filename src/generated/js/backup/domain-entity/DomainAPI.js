// DomainAPI
//
// Generated by IC STRATEGY
//
// WARNING: Do not change this code; it will be overwritten with the next generation run!
//          Change the code only in Visual Paradigm.
//
var Reflux = require('reflux');

var API = Reflux.createActions({
//
// OTB_Application Actions
// 
    'OTB_ApplicationConnect': { asyncResult: true },
    'OTB_ApplicationDisconnect': { asyncResult: true },
    'OTB_ApplicationCreate': { asyncResult: true },
    'OTB_ApplicationUpdate': { asyncResult: true },
    'OTB_ApplicationDelete': { asyncResult: true },
    'OTB_ApplicationGet': { asyncResult: false },
    'OTB_ApplicationLoadItem': { asyncResult: true },
    'OTB_ApplicationRefresh': { asyncResult: true },
    'OTB_Applicationinit': { asyncResult: true },
//
// OTB_User Actions
// 
    'OTB_UserConnect': { asyncResult: true },
    'OTB_UserDisconnect': { asyncResult: true },
    'OTB_UserCreate': { asyncResult: true },
    'OTB_UserUpdate': { asyncResult: true },
    'OTB_UserDelete': { asyncResult: true },
    'OTB_UserGet': { asyncResult: false },
    'OTB_UserLoadItem': { asyncResult: true },
    'OTB_UserRefresh': { asyncResult: true },
    'OTB_Userinit': { asyncResult: true },
    'OTB_UserLogOut': { asyncResult: true },
//
// OTB_Command Actions
// 
    'OTB_CommandConnect': { asyncResult: true },
    'OTB_CommandDisconnect': { asyncResult: true },
    'OTB_CommandCreate': { asyncResult: true },
    'OTB_CommandUpdate': { asyncResult: true },
    'OTB_CommandDelete': { asyncResult: true },
    'OTB_CommandGet': { asyncResult: false },
    'OTB_CommandLoadItem': { asyncResult: true },
    'OTB_CommandRefresh': { asyncResult: true },
//
// OTB_UserCommand Actions
// 
    'OTB_UserCommandConnect': { asyncResult: true },
    'OTB_UserCommandDisconnect': { asyncResult: true },
    'OTB_UserCommandCreate': { asyncResult: true },
    'OTB_UserCommandUpdate': { asyncResult: true },
    'OTB_UserCommandDelete': { asyncResult: true },
    'OTB_UserCommandGet': { asyncResult: false },
    'OTB_UserCommandLoadItem': { asyncResult: true },
    'OTB_UserCommandRefresh': { asyncResult: true },
//
// OTB_DefaultCommandCategory Actions
// 
    'OTB_DefaultCommandCategoryConnect': { asyncResult: true },
    'OTB_DefaultCommandCategoryDisconnect': { asyncResult: true },
    'OTB_DefaultCommandCategoryCreate': { asyncResult: true },
    'OTB_DefaultCommandCategoryUpdate': { asyncResult: true },
    'OTB_DefaultCommandCategoryDelete': { asyncResult: true },
    'OTB_DefaultCommandCategoryGet': { asyncResult: false },
    'OTB_DefaultCommandCategoryLoadItem': { asyncResult: true },
    'OTB_DefaultCommandCategoryRefresh': { asyncResult: true },
//
// OTB_UserCommandCategory Actions
// 
    'OTB_UserCommandCategoryConnect': { asyncResult: true },
    'OTB_UserCommandCategoryDisconnect': { asyncResult: true },
    'OTB_UserCommandCategoryCreate': { asyncResult: true },
    'OTB_UserCommandCategoryUpdate': { asyncResult: true },
    'OTB_UserCommandCategoryDelete': { asyncResult: true },
    'OTB_UserCommandCategoryGet': { asyncResult: false },
    'OTB_UserCommandCategoryLoadItem': { asyncResult: true },
    'OTB_UserCommandCategoryRefresh': { asyncResult: true },
//
// OTB_DefaultCommand Actions
// 
    'OTB_DefaultCommandConnect': { asyncResult: true },
    'OTB_DefaultCommandDisconnect': { asyncResult: true },
    'OTB_DefaultCommandCreate': { asyncResult: true },
    'OTB_DefaultCommandUpdate': { asyncResult: true },
    'OTB_DefaultCommandDelete': { asyncResult: true },
    'OTB_DefaultCommandGet': { asyncResult: false },
    'OTB_DefaultCommandLoadItem': { asyncResult: true },
    'OTB_DefaultCommandRefresh': { asyncResult: true },
//
// OTB_CommandVariable Actions
// 
    'OTB_CommandVariableConnect': { asyncResult: true },
    'OTB_CommandVariableDisconnect': { asyncResult: true },
    'OTB_CommandVariableCreate': { asyncResult: true },
    'OTB_CommandVariableUpdate': { asyncResult: true },
    'OTB_CommandVariableDelete': { asyncResult: true },
    'OTB_CommandVariableGet': { asyncResult: false },
    'OTB_CommandVariableLoadItem': { asyncResult: true },
    'OTB_CommandVariableRefresh': { asyncResult: true },
//
// OTB_CommandParameter Actions
// 
    'OTB_CommandParameterConnect': { asyncResult: true },
    'OTB_CommandParameterDisconnect': { asyncResult: true },
    'OTB_CommandParameterCreate': { asyncResult: true },
    'OTB_CommandParameterUpdate': { asyncResult: true },
    'OTB_CommandParameterDelete': { asyncResult: true },
    'OTB_CommandParameterGet': { asyncResult: false },
    'OTB_CommandParameterLoadItem': { asyncResult: true },
    'OTB_CommandParameterRefresh': { asyncResult: true },
//
// OTB_LevelRanks Actions
// 
    'OTB_LevelRanksConnect': { asyncResult: true },
    'OTB_LevelRanksDisconnect': { asyncResult: true },
    'OTB_LevelRanksCreate': { asyncResult: true },
    'OTB_LevelRanksUpdate': { asyncResult: true },
    'OTB_LevelRanksDelete': { asyncResult: true },
    'OTB_LevelRanksGet': { asyncResult: false },
    'OTB_LevelRanksLoadItem': { asyncResult: true },
    'OTB_LevelRanksRefresh': { asyncResult: true },
//
// OTB_PointRanks Actions
// 
    'OTB_PointRanksConnect': { asyncResult: true },
    'OTB_PointRanksDisconnect': { asyncResult: true },
    'OTB_PointRanksCreate': { asyncResult: true },
    'OTB_PointRanksUpdate': { asyncResult: true },
    'OTB_PointRanksDelete': { asyncResult: true },
    'OTB_PointRanksGet': { asyncResult: false },
    'OTB_PointRanksLoadItem': { asyncResult: true },
    'OTB_PointRanksRefresh': { asyncResult: true },
//
// OTB_LevelParticipation Actions
// 
    'OTB_LevelParticipationConnect': { asyncResult: true },
    'OTB_LevelParticipationDisconnect': { asyncResult: true },
    'OTB_LevelParticipationCreate': { asyncResult: true },
    'OTB_LevelParticipationUpdate': { asyncResult: true },
    'OTB_LevelParticipationDelete': { asyncResult: true },
    'OTB_LevelParticipationGet': { asyncResult: false },
    'OTB_LevelParticipationLoadItem': { asyncResult: true },
    'OTB_LevelParticipationRefresh': { asyncResult: true },
//
// OTB_PointParticipation Actions
// 
    'OTB_PointParticipationConnect': { asyncResult: true },
    'OTB_PointParticipationDisconnect': { asyncResult: true },
    'OTB_PointParticipationCreate': { asyncResult: true },
    'OTB_PointParticipationUpdate': { asyncResult: true },
    'OTB_PointParticipationDelete': { asyncResult: true },
    'OTB_PointParticipationGet': { asyncResult: false },
    'OTB_PointParticipationLoadItem': { asyncResult: true },
    'OTB_PointParticipationRefresh': { asyncResult: true },
//
// OTB_QueueVideo Actions
// 
    'OTB_QueueVideoConnect': { asyncResult: true },
    'OTB_QueueVideoDisconnect': { asyncResult: true },
    'OTB_QueueVideoCreate': { asyncResult: true },
    'OTB_QueueVideoUpdate': { asyncResult: true },
    'OTB_QueueVideoDelete': { asyncResult: true },
    'OTB_QueueVideoGet': { asyncResult: false },
    'OTB_QueueVideoLoadItem': { asyncResult: true },
    'OTB_QueueVideoRefresh': { asyncResult: true },
//
// OTB_HistoryVideo Actions
// 
    'OTB_HistoryVideoConnect': { asyncResult: true },
    'OTB_HistoryVideoDisconnect': { asyncResult: true },
    'OTB_HistoryVideoCreate': { asyncResult: true },
    'OTB_HistoryVideoUpdate': { asyncResult: true },
    'OTB_HistoryVideoDelete': { asyncResult: true },
    'OTB_HistoryVideoGet': { asyncResult: false },
    'OTB_HistoryVideoLoadItem': { asyncResult: true },
    'OTB_HistoryVideoRefresh': { asyncResult: true },
//
// OTB_DomainYoutubeVideo Actions
// 
    'OTB_DomainYoutubeVideoConnect': { asyncResult: true },
    'OTB_DomainYoutubeVideoDisconnect': { asyncResult: true },
    'OTB_DomainYoutubeVideoCreate': { asyncResult: true },
    'OTB_DomainYoutubeVideoUpdate': { asyncResult: true },
    'OTB_DomainYoutubeVideoDelete': { asyncResult: true },
    'OTB_DomainYoutubeVideoGet': { asyncResult: false },
    'OTB_DomainYoutubeVideoLoadItem': { asyncResult: true },
    'OTB_DomainYoutubeVideoRefresh': { asyncResult: true },
//
// OTB_UserPlaylistSettings Actions
// 
    'OTB_UserPlaylistSettingsConnect': { asyncResult: true },
    'OTB_UserPlaylistSettingsDisconnect': { asyncResult: true },
    'OTB_UserPlaylistSettingsCreate': { asyncResult: true },
    'OTB_UserPlaylistSettingsUpdate': { asyncResult: true },
    'OTB_UserPlaylistSettingsDelete': { asyncResult: true },
    'OTB_UserPlaylistSettingsGet': { asyncResult: false },
    'OTB_UserPlaylistSettingsLoadItem': { asyncResult: true },
    'OTB_UserPlaylistSettingsRefresh': { asyncResult: true },
//
// OTB_UserCommandVariable Actions
// 
    'OTB_UserCommandVariableConnect': { asyncResult: true },
    'OTB_UserCommandVariableDisconnect': { asyncResult: true },
    'OTB_UserCommandVariableCreate': { asyncResult: true },
    'OTB_UserCommandVariableUpdate': { asyncResult: true },
    'OTB_UserCommandVariableDelete': { asyncResult: true },
    'OTB_UserCommandVariableGet': { asyncResult: false },
    'OTB_UserCommandVariableLoadItem': { asyncResult: true },
    'OTB_UserCommandVariableRefresh': { asyncResult: true },
//
// OTB_DefaultCommandVariable Actions
// 
    'OTB_DefaultCommandVariableConnect': { asyncResult: true },
    'OTB_DefaultCommandVariableDisconnect': { asyncResult: true },
    'OTB_DefaultCommandVariableCreate': { asyncResult: true },
    'OTB_DefaultCommandVariableUpdate': { asyncResult: true },
    'OTB_DefaultCommandVariableDelete': { asyncResult: true },
    'OTB_DefaultCommandVariableGet': { asyncResult: false },
    'OTB_DefaultCommandVariableLoadItem': { asyncResult: true },
    'OTB_DefaultCommandVariableRefresh': { asyncResult: true },
//
// OTB_DefaultVariableCategory Actions
// 
    'OTB_DefaultVariableCategoryConnect': { asyncResult: true },
    'OTB_DefaultVariableCategoryDisconnect': { asyncResult: true },
    'OTB_DefaultVariableCategoryCreate': { asyncResult: true },
    'OTB_DefaultVariableCategoryUpdate': { asyncResult: true },
    'OTB_DefaultVariableCategoryDelete': { asyncResult: true },
    'OTB_DefaultVariableCategoryGet': { asyncResult: false },
    'OTB_DefaultVariableCategoryLoadItem': { asyncResult: true },
    'OTB_DefaultVariableCategoryRefresh': { asyncResult: true },
//
// OTB_UserVariableCategory Actions
// 
    'OTB_UserVariableCategoryConnect': { asyncResult: true },
    'OTB_UserVariableCategoryDisconnect': { asyncResult: true },
    'OTB_UserVariableCategoryCreate': { asyncResult: true },
    'OTB_UserVariableCategoryUpdate': { asyncResult: true },
    'OTB_UserVariableCategoryDelete': { asyncResult: true },
    'OTB_UserVariableCategoryGet': { asyncResult: false },
    'OTB_UserVariableCategoryLoadItem': { asyncResult: true },
    'OTB_UserVariableCategoryRefresh': { asyncResult: true },
//
// OTB_Function Actions
// 
    'OTB_FunctionConnect': { asyncResult: true },
    'OTB_FunctionDisconnect': { asyncResult: true },
    'OTB_FunctionCreate': { asyncResult: true },
    'OTB_FunctionUpdate': { asyncResult: true },
    'OTB_FunctionDelete': { asyncResult: true },
    'OTB_FunctionGet': { asyncResult: false },
    'OTB_FunctionLoadItem': { asyncResult: true },
    'OTB_FunctionRefresh': { asyncResult: true },
//
// OTB_DefaultFunction Actions
// 
    'OTB_DefaultFunctionConnect': { asyncResult: true },
    'OTB_DefaultFunctionDisconnect': { asyncResult: true },
    'OTB_DefaultFunctionCreate': { asyncResult: true },
    'OTB_DefaultFunctionUpdate': { asyncResult: true },
    'OTB_DefaultFunctionDelete': { asyncResult: true },
    'OTB_DefaultFunctionGet': { asyncResult: false },
    'OTB_DefaultFunctionLoadItem': { asyncResult: true },
    'OTB_DefaultFunctionRefresh': { asyncResult: true },
//
// OTB_UserFunction Actions
// 
    'OTB_UserFunctionConnect': { asyncResult: true },
    'OTB_UserFunctionDisconnect': { asyncResult: true },
    'OTB_UserFunctionCreate': { asyncResult: true },
    'OTB_UserFunctionUpdate': { asyncResult: true },
    'OTB_UserFunctionDelete': { asyncResult: true },
    'OTB_UserFunctionGet': { asyncResult: false },
    'OTB_UserFunctionLoadItem': { asyncResult: true },
    'OTB_UserFunctionRefresh': { asyncResult: true },
//
// OTB_UserFunctionCategory Actions
// 
    'OTB_UserFunctionCategoryConnect': { asyncResult: true },
    'OTB_UserFunctionCategoryDisconnect': { asyncResult: true },
    'OTB_UserFunctionCategoryCreate': { asyncResult: true },
    'OTB_UserFunctionCategoryUpdate': { asyncResult: true },
    'OTB_UserFunctionCategoryDelete': { asyncResult: true },
    'OTB_UserFunctionCategoryGet': { asyncResult: false },
    'OTB_UserFunctionCategoryLoadItem': { asyncResult: true },
    'OTB_UserFunctionCategoryRefresh': { asyncResult: true },
//
// OTB_DefaultFunctionCategory Actions
// 
    'OTB_DefaultFunctionCategoryConnect': { asyncResult: true },
    'OTB_DefaultFunctionCategoryDisconnect': { asyncResult: true },
    'OTB_DefaultFunctionCategoryCreate': { asyncResult: true },
    'OTB_DefaultFunctionCategoryUpdate': { asyncResult: true },
    'OTB_DefaultFunctionCategoryDelete': { asyncResult: true },
    'OTB_DefaultFunctionCategoryGet': { asyncResult: false },
    'OTB_DefaultFunctionCategoryLoadItem': { asyncResult: true },
    'OTB_DefaultFunctionCategoryRefresh': { asyncResult: true },
//
// OTB_Plugin Actions
// 
    'OTB_PluginConnect': { asyncResult: true },
    'OTB_PluginDisconnect': { asyncResult: true },
    'OTB_PluginCreate': { asyncResult: true },
    'OTB_PluginUpdate': { asyncResult: true },
    'OTB_PluginDelete': { asyncResult: true },
    'OTB_PluginGet': { asyncResult: false },
    'OTB_PluginLoadItem': { asyncResult: true },
    'OTB_PluginRefresh': { asyncResult: true },
//
// OTB_Repository Actions
// 
    'OTB_RepositoryConnect': { asyncResult: true },
    'OTB_RepositoryDisconnect': { asyncResult: true },
    'OTB_RepositoryCreate': { asyncResult: true },
    'OTB_RepositoryUpdate': { asyncResult: true },
    'OTB_RepositoryDelete': { asyncResult: true },
    'OTB_RepositoryGet': { asyncResult: false },
    'OTB_RepositoryLoadItem': { asyncResult: true },
    'OTB_RepositoryRefresh': { asyncResult: true },

});

module.exports = API;
