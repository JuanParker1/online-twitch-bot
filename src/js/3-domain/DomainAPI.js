var Reflux = require('reflux');

var API = Reflux.createActions([

    // User
    'connectUser',
    'disconnectUser',
    'logIn',
    'logOut',
    'signOn',
    

    // TemplateProject
    'connectTemplateProjects',
    'disconnectTemplateProjects',
    'connectTemplateProject',
    'disconnectTemplateProject',
    'createTemplateProject',
    'saveTemplateProject',
    'removeTemplateProject',
    'refreshTemplateProjects',
    'selectTemplateProject',
    'unselectTemplateProject',

    // UserProject
    'connectUserProjects',
    'disconnectUserProjects',
    'connectUserProject',
    'disconnectUserProject',
    'createUserProject',
    'createUserProjectFromTemplate',
    'saveUserProject',
    'removeUserProject',
    'refreshUserProjects',
    'selectUserProject',
    'unselectUserProject',
    
    // Step
    'connectSteps',
    'disconnectSteps',
    'connectStep',
    'disconnectStep',
    'createStep',
    'saveStep',
    'removeStep',
    'refreshSteps',
    'selectStep',
    'unselectStep',

    //ToolElement
    'connectToolElements',
    'disconnectToolElements',
    'connectToolElement',
    'disconnectToolElement',
    'createToolElement',
    'addToolElement',
    'getToolElements',
    'selectToolElement',
    'unselectToolElement'

]);

module.exports = API;