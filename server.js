var http = require('http');
var https = require('https');
var inspect = require('util').inspect;
var path = require('path');
var express = require('express');
var multer = require('multer');
var cloudinary = require('cloudinary');
var fs = require('fs');
var helpers = require('./server/helpers');
var net = require('net');
var $ = require('jquery');

var safeEval = require('safe-eval');

var serviceAccount = require('./vp-test-website-88f6c21992c7.json');
var ItemStore = require('./src/js/3-domain/stores/meta/ItemStore');

var router = express();
var server = http.createServer(router);
var IRCTwitch = false;
var DomainEntitiesList = require('./src/generated/js/domain-entity/DomainEntitiesList');

import * as admin from 'firebase-admin';
import {OTB_User} from './src/generated/js/domain-entity/OTB_User';
import {OTB_QueueVideo} from './src/generated/js/domain-entity/OTB_QueueVideo';
import {OTB_PointRanks} from './src/generated/js/domain-entity/OTB_PointRanks';
import {OTB_PointParticipation} from './src/generated/js/domain-entity/OTB_PointParticipation';
import {OTB_LevelRanks} from './src/generated/js/domain-entity/OTB_LevelRanks';
import {OTB_LevelParticipation} from './src/generated/js/domain-entity/OTB_LevelParticipation';
import {FirebaseManager} from './src/js/4-infrastructure/databaseManagers/FirebaseManager';
import * as firebase from 'firebase';
import * as _ from 'lodash';
var FBManager = new FirebaseManager();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: FBManager.config.databaseURL
});

var connectedChannels = [];
var client = new net.Socket();
var shortRef = {
    'users': {},
    'defaultCommands': {},
    'defaultVariables': {}
};
var joinedIRC = false;
var ref = firebase.database().ref();
ref.on('value', function(snapshot){
    var firebaseObject = snapshot.val();
    createShortRef(firebaseObject);
    _.each(shortRef['users'], function(value, key){
        var userName = key;
        streamIsOnline(userName, function(isOnline){
            if(isOnline || userName.toLowerCase() == "formadill"){
                if(connectedChannels.indexOf(userName) <= -1 && joinedIRC)
                    joinTwitchChannel(userName);
            }
        });
    });
});

String.prototype.escapeSpecialChars = function() {
    return this.replace(/\\n/g, "\\n")
        .replace(/\\'/g, "\\'")
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, "\\&")
        .replace(/\\r/g, "\\r")
        .replace(/\\t/g, "\\t")
        .replace(/\\b/g, "\\b")
        .replace(/\\f/g, "\\f");
};

String.prototype.replaceAll = function(target, replacement) {
    return this.split(target).join(replacement);
};

String.prototype.occurrences = function(subString, allowOverlapping) {
    var string = this;
    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
}

router.use(express.static(__dirname + '/'));

router.use(multer({
    dest: 'uploads/',
    rename: function (fieldname, filename) {
        return filename + Date.now();
    },
    onFileUploadStart: function (file) {
    },
    onFileUploadComplete: function (file) {
        done = true;
    }
}).single('redactorUpload'));

router.post('/upload', function (req, res) {
    if (done == true) {
        res.writeHead(200, {"Content-Type": "application/json"});
        _.each(req.files, function (file) {
            res.write('{"filelink": "' + file.path + '"}');
        });
        res.end("");
    }
});

router.get('/addToPlaylist', function (req, res) {
    var query = req.query;
    console.log(query);
    if(query.vid && query.uid && query.sender){
        var Entity = new OTB_QueueVideo();
        var User = new OTB_User();
        User.setValues({'id': query.uid});
        User.id = query.uid;

        Entity.setValues({'videoUrl': 'https://youtu.be/' + query.vid, 'queueUser': User, 'timestampCreate': new Date().toISOString()});
        var fbObject = FBManager.getFirebaseTransaction(Entity, null, null, null, query.uid);
        var ref = firebase.database().ref();
        ref.update(fbObject, function(error) {
            if (!error) {
                FBManager.saveUserInputs(Entity);
                res.send('Request succeeded');
            } else {
                console.log(error);
                console.log('Firebase object:');
                console.log(fbObject);
                res.send('Request failed');
            }
        });

    }
    else{
        res.send('Request failed');
    }

});

router.get('/getLoginToken', function(req, res){
    var options = {
        host: req.headers.host,
        path: '/twitch_oauth2',
        port: 3000
    }
    var callback = function(response){
        var str = ''
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function(){
            res.send(str);
        })
    }
    http.request(options, callback).end();
});

router.get('/getAuthToken', function(req, res){
    var code = req.query.code;
    if(code){
        var path = '/kraken/oauth2/token';
        if(req.headers.host == "localhost:3000")
            path = path + "?client_id=bmb6804dysjgm0uhgzynanyjqhbw8nr" +
                "&client_secret=v3l0r6hdwbjtxe1ninitima6bjarsq" +
                "&grant_type=authorization_code" +
                "&redirect_uri=http://localhost:3000/twitchoauth2" +
                "&code=" + code;
        else if(req.headers.host == "online-twitch-bot.herokuapp.com")
            path = path + "?client_id=3unmnqmc0eaj10yq9t9p3n6hv8hsbxz" +
                "&client_secret=8rxbd0aajdbrzqhp3pxthdpweaxbp8e" +
                "&grant_type=authorization_code" +
                "&redirect_uri=http://online-twitch-bot.herokuapp.com/twitchoauth2" +
                "&code=" + code;
        var options = {
            host: 'api.twitch.tv',
            path: path,
            method: 'POST'
        };
        var token = '';
        var callback = function (response) {
            var str = ''
            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                console.log(code);
                console.log(req.headers.host);
                console.log(str);
                var json = JSON.parse(str);
                token = json['access_token'];
                var userOpts = {
                    host: 'api.twitch.tv',
                    path: '/kraken/user',
                    headers: {'Authorization': 'OAuth ' + token}
                }
                https.request(userOpts, function (userRes) {
                    var resStr = '';
                    userRes.on('data', function (_chunk) {
                        resStr += _chunk;
                    });

                    userRes.on('end', function () {
                        var userJSON = JSON.parse(resStr);
                        var userRef = firebase.database().ref('OTB_User/' + userJSON['_id']);
                        userRef.once('value', function (userSnapshot) {
                            var userObject = userSnapshot.val();
                            if (userObject) {
                                admin.auth().createCustomToken(userJSON['_id'].toString())
                                    .then(function(customToken){
                                        res.send(customToken);
                                    })
                                    .catch(function(error){
                                        console.log(error);
                                        res.send('Request failed');
                                    });
                            }
                            else {
                                var User = new OTB_User();
                                User.setValues({
                                    id: userJSON['_id'],
                                    email: userJSON['email'],
                                    displayName: userJSON['display_name'],
                                    entityType: "OTB_User"
                                });
                                if (userJSON['_id'] != undefined) {
                                    var fbObject = FBManager.getFirebaseTransaction(User);
                                    var ref = firebase.database().ref();
                                    ref.update(fbObject, function (error) {
                                        if (!error) {
                                            admin.auth().createCustomToken(userJSON['_id'].toString())
                                                .then(function(customToken){
                                                    res.send(customToken);
                                                })
                                                .catch(function(error){
                                                    console.log(error);
                                                    console.log('Firebase object:');
                                                    console.log(fbObject);
                                                    res.send('Request failed');
                                                });
                                        } else {
                                            console.log(error);
                                            console.log('Firebase object:');
                                            console.log(fbObject);
                                            res.send('Request failed');
                                        }
                                    });
                                }
                            }
                        });
                    })
                }).end();
            });
        }
        var request = https.request(options, callback);
        request.end();
    }
});

router.get('/twitchoauth2', function(req, res){
    var code = req.query.code;
    if(code) {
        res.redirect("http://" + req.headers.host + "/login/" + code);
    }
    else if(req.headers.host == "localhost:3000")
        res.redirect("https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=bmb6804dysjgm0uhgzynanyjqhbw8nr&redirect_uri=http://localhost:3000/twitchoauth2&scope=user_read&state=test123321");
    else if(req.headers.host == "online-twitch-bot.herokuapp.com")
        res.redirect("https://api.twitch.tv/kraken/oauth2/authorize?response_type=code&client_id=3unmnqmc0eaj10yq9t9p3n6hv8hsbxz&redirect_uri=http://online-twitch-bot.herokuapp.com/twitchoauth2&scope=user_read&state=test123321");
});

router.get('/api/points', function(req, res){
    var query = req.query;
    var channel = query.channel;
    var user = query.user.toLowerCase();
    var returnValue = query.returnValue;
    if(channel && user){
        var message = "";
        if(returnValue == "full-object")
            var message = JSON.stringify(shortRef['users'][channel]['pointSettings']['participators'][user]);
        else
            var message = shortRef['users'][channel]['pointSettings']['participators'][user][returnValue];
        res.send(message.toString());
    }
});

router.get('/api/levels', function(req, res){
    var query = req.query;
    var channel = query.channel;
    var user = query.user.toLowerCase();
    var returnValue = query.returnValue;
    if(channel && user){
        var message = "";
        if(returnValue == "full-object")
            var message = JSON.stringify(shortRef['users'][channel]['levelSettings']['participators'][user]);
        else
            var message = shortRef['users'][channel]['levelSettings']['participators'][user][returnValue];
        res.send(message.toString());
    }
});



cloudinary.config({cloud_name: 'icstrategy', api_key: '411686915589974', api_secret: 'Fj-9TuU4bJVZME33xKCoUJJ8WsI'});

router.locals.api_key = cloudinary.config().api_key;
router.locals.cloud_name = cloudinary.config().cloud_name;

router.get('*', function (request, response) {
    response.sendFile(__dirname + '/index.html');
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function () {
//server.listen(3000, "0.0.0.0", function(){
    var addr = server.address();
    console.log("ICSTRATEGY react server listening at", addr.address + ":" + addr.port);
});


client.connect(6667, 'irc.chat.twitch.tv', function (){
    console.log('Connected');
    clientWrite(
        "PASS " + "oauth:juuaw9ex7ryxxx73i11v9k0yq9z4jo" + "\n" +
        "NICK " + "wwpcbot" + "\n"
    );
});

client.on('error', function(e){
    console.log(e.toString());
});

client.on('data', function(_data){
    if(_data != undefined) {
        var data = _data.toString();
        console.log("Received: " + data);
        if (data.startsWith("PING ")) {
            clientWrite(data.replace("PING", "PONG") + "\n");
            _.each(shortRef['users'], function(value, key){
                var userName = key;
                streamIsOnline(userName, function(isOnline){
                    if(isOnline || userName.toLowerCase() == "formadill"){
                        if(connectedChannels.indexOf(userName) <= -1 && joinedIRC)
                            joinTwitchChannel(userName);
                        upPoints(key);
                        upLevels(key);
                    }
                });
            });
        }
        if (data.split(' ')[1] == "001") {
            clientWrite(
                "CAP REQ :twitch.tv/membership" + "\n" +
                "CAP REQ :twitch.tv/commands" + "\n" +
                "CAP REQ :twitch.tv/tags" + "\n"
            );
            _.each(shortRef['users'], function(value, key){
                var userName = key;
                streamIsOnline(userName, function(isOnline){
                    if(isOnline || userName.toLowerCase() == "formadill"){
                        if(connectedChannels.indexOf(userName) <= -1 && joinedIRC)
                            joinTwitchChannel(userName);
                    }
                });
            });
            joinedIRC = true;
            IRCTwitch = true;
        }
        if(data.split(" ")[1] == "JOIN"){
            if(connectedChannels.indexOf(data.split(" ")[2].replace("#", "").trim() <= -1))
                connectedChannels.push(data.split(" ")[2].replace("#", "").trim());
        }
        if(data.indexOf("PRIVMSG") > -1) {
            var messageChannel = getMessageChannel(data);
            var message = getMessage(data, messageChannel);
            var twitchMessageTags = {};
            var containsURL = false;

            if(!message.startsWith('!') && containsURL){

            }
            else if(message.startsWith('!')){
                if (IRCTwitch) {
                    twitchMessageTags = getTwitchMessageTags(data);
                    console.log(twitchMessageTags);
                }
                commandHandler(message, messageChannel, twitchMessageTags);
            }
        }
    }
});

function joinTwitchChannel(channelName){
    clientWrite(
        "MODE " + "wwpcbot" + " +B" + "\n" +
        "JOIN " + "#" + channelName + "\n"
    );
}

function getTwitchMessageTags(data){
    data = data.split(" :", 2)[0];
    var  _tags = data.split(';');
    var tags = {};
    for (var tag of _tags){
        var key = tag.split('=')[0];
        var value = tag.split('=')[1];
        tags[key] = value;
    }
    return tags;
}

function getMessageChannel(data){
    var channel = data.substring(data.indexOf('PRIVMSG #') + 9, data.length);
    channel = channel.split(' :', 2)[0].toLowerCase();
    return channel;
}

function getMessage(data, channel){
    return data.split("PRIVMSG #" + channel + " :", 2)[1];
}

function commandHandler(message, messageChannel, twitchMessageTags){
    var parameters = [];
    var command;
    if(message.indexOf(" ") > 0) {
        command = message.split(' ')[0];
        parameters = message.split(' ');
        parameters.shift();
    }
    else{
        command = message;
    }
    var handleCommandScript = function(commandObj, commandHandler){
        var commandScript = commandObj['script'];
        var parAmount = Object.keys(commandObj['parameters']).length - 1;
        var _parameters = parameters;
        var lastPars = parameters.slice(parAmount, parameters.length);
        parameters = _parameters;
        var lastString = lastPars.join(" ");
        var isInCallback = false;
        var context = {
            'http': require('http'),
            'updateVariable': function(variableHandler, setValue){
                var obj = shortRef['users'][messageChannel]['variables'][variableHandler];
                var CommandVariable = DomainEntitiesList('OTB_UserCommandVariable');
                CommandVariable = new CommandVariable();
                CommandVariable.setValues({'entityLocation': obj['entityLocation'], 'id': obj['id'], 'entityType': 'OTB_UserCommandVariable', 'handler': variableHandler, 'description': obj['description'], 'name': obj['name'], 'type': obj['type'], 'value': setValue});
                var ref = firebase.database().ref();
                var fbObject = FBManager.getFirebaseTransaction(CommandVariable, null, null, null, shortRef['users'][messageChannel]['id']);
                ref.update(fbObject, function (error) {
                    if (!error) {
                        FBManager.saveUserInputs(CommandVariable);
                        return;
                    } else {
                        console.log(error);
                        console.log('Firebase object:');
                        console.log(CommandVariable);
                    }
                });
            }
        }
        _.each(commandObj['parameters'], function(parObj, parHandler){
            var parNumber = parObj['parameterNumber'];
            if(parameters[parNumber] == null && parObj['defaultValue'] != "") {
                if (message.indexOf(parHandler.trim()) > -1)
                    context[parHandler.trim()] = parObj['defaultValue'].trim();
            }
            else if(parNumber.trim() == (lastPars.length - lastString.split(' ').length + parAmount).toString().trim()) {
                context[parHandler.trim()] =  lastString.trim();
            }
            else if(parNumber < parameters.length) {
                context[parHandler.trim()] = parameters[parNumber].trim();
            }
        });
        _.each(commandObj['functions'], function(funcObj, funcHandler){
            context[funcHandler.trim()] = safeEval(funcObj['script']);
        });
        var variableSorted = _.sortBy(Object.keys(commandObj['variables']), function(key){ return commandObj['variables'][key]['type']; }).reverse();
        _.each(variableSorted, function(varHandler){
            var varObj = shortRef['users'][messageChannel]['variables'][varHandler];
            if(!varObj)
                varObj = shortRef['defaultVariables'][varHandler];
            if(commandScript.indexOf(varHandler) > -1){
                var callback = function(response){
                    var str = '';
                    response.on('data', function (chunk) {
                        str += chunk;
                    });

                    response.on('end', function () {
                        context[varHandler] = str;
                        var allVars = Object.keys(commandObj['variables']);
                        var sendMsg = true;
                        _.each(allVars, function(key){
                            if(Object.keys(context).indexOf(key) <= -1 && commandScript.indexOf(key) > -1)
                                sendMsg = false;
                        });
                        if(sendMsg) {
                            console.log(commandScript.replace(/(\r\n|\n|\r)/gm, "") + "()");
                            try {
                                sendPrivMsg(safeEval(commandScript.replace(/(\r\n|\n|\r)/gm, "") + "()", context), messageChannel);
                                return true;
                            }
                            catch (e) {
                                sendPrivMsg("Command script failed with error: " + e.message + ".", messageChannel);
                                return true;
                            }
                        }
                    });
                }
                if(varObj['type'] == "3"){
                    if(varHandler == "message_sender")
                        context[varHandler] =  twitchMessageTags['display-name'];
                    if(varHandler == "user_username")
                        context[varHandler] =  messageChannel;
                    if(varHandler == "user_uid")
                        context[varHandler] = shortRef['users'][messageChannel]['id'].toString();
                }
                else if(varObj['type'] == "0" || varObj['type'] == ""){
                    context[varHandler] = varObj['value'];
                }
                else if(varObj['type'] == "1"){
                    var replacedVariables = [];
                    isInCallback = true;
                    var value = varObj['value'];
                    if(value.indexOf('message_sender') > -1)
                        value = value.replaceAll('message_sender', twitchMessageTags['display-name']);
                    if(value.indexOf('user_username') > -1)
                        value = value.replaceAll('user_username', messageChannel);
                    var options = JSON.parse(value);

                    http.request(options, callback).end();
                }
                else if(varObj['type'] == "2"){
                    isInCallback = true;
                    var value = varObj['value'];
                    if(value.indexOf('message_sender') > -1)
                        value = value.replaceAll('message_sender', twitchMessageTags['display-name']);
                    if(value.indexOf('user_username') > -1)
                        value = value.replaceAll('user_username', messageChannel);
                    var options = JSON.parse(value);
                    https.request(options, callback).end();
                }

            }
        });
        console.log(context);

        if(!isInCallback){
            console.log(commandScript.replace(/(\r\n|\n|\r)/gm, "") + "()");
            try {
                sendPrivMsg(safeEval(commandScript.replace(/(\r\n|\n|\r)/gm, "") + "()", context), messageChannel);
                return true;
            }
            catch(e){
                sendPrivMsg("Command script failed with error: " + e.message + ".", messageChannel);
                return true;
            }
        }

        return false;
    }
    var usedCommand = false;
    _.each(shortRef['users'][messageChannel], function(commandObj, commandHandler){
        if(commandHandler.trim() == command.trim() && commandObj['enabled'])
            if(handleCommandScript(commandObj, commandHandler))
                usedCommand = true;
    });
    if(usedCommand)
        return;
    _.each(shortRef['defaultCommands'], function(obj, handler){
        if(handler.trim() == command.trim())
            if(shortRef['users'][messageChannel]['defaultCommands'].indexOf(handler.trim()) > -1)
                handleCommandScript(obj, handler);
    });
}

function createShortRef(firebaseObject){
    _.each(firebaseObject['OTB_User'], function(user){
        var attributes = user['attributes'];
        var userName = attributes['displayName'].toLowerCase();
        shortRef['users'][userName] = {};
        shortRef['users'][userName]['levelSettings'] = {};
        shortRef['users'][userName]['levelSettings']['participators'] = {};
        shortRef['users'][userName]['id'] = attributes['id'];
        shortRef['users'][userName]['pointSettings'] = {};
        shortRef['users'][userName]['pointSettings']['participators'] = {};
        shortRef['users'][userName]['defaultCommands'] = [];
        shortRef['users'][userName]['variables'] = {};
        shortRef['users'][userName]['functions'] = {};
        var associations = user['associations'];
        if(associations != undefined) {
            _.each(associations['ownCommandCategories'], function (category) {
                var catAssociations = category['associations'];
                if(catAssociations != undefined) {
                    _.each(catAssociations['userCategoryCommands'], function (command) {
                        var comAttributes = command['attributes'];
                        var comAssociations = command['associations'];
                        var handler = comAttributes['handler'];
                        shortRef['users'][userName][handler] = {};
                        shortRef['users'][userName][handler]['catid'] = category['attributes']['id'];
                        shortRef['users'][userName][handler]['script'] = comAttributes['commandScript'];
                        shortRef['users'][userName][handler]['enabled'] = comAttributes['enabled'];
                        shortRef['users'][userName][handler]['entityLocation'] = comAttributes['entityLocation'];
                        shortRef['users'][userName][handler]['id'] = comAttributes['id'];
                        shortRef['users'][userName][handler]['parameters'] = {};
                        shortRef['users'][userName][handler]['variables'] = {};
                        shortRef['users'][userName][handler]['functions'] = {};
                        if(comAssociations != undefined) {
                            if(comAssociations['commandParameters']){
                                _.each(comAssociations['commandParameters'], function (parameter) {
                                    var parAttributes = parameter['attributes'];
                                    var parHandler = parAttributes['handler'];
                                    var parDefault = parAttributes['defaultValue'];
                                    var handlerSplit = parHandler.split('_');
                                    shortRef['users'][userName][handler]['parameters'][parHandler] = {};
                                    shortRef['users'][userName][handler]['parameters'][parHandler]['parameterNumber'] = handlerSplit[handlerSplit.length - 1];
                                    shortRef['users'][userName][handler]['parameters'][parHandler]['defaultValue'] = parDefault;
                                });
                            }
                            if(comAssociations['commandVariables']){
                                _.each(comAssociations['commandVariables'], function (variable) {
                                    var varAttributes = variable['attributes'];
                                    var varHandler = varAttributes['handler'];
                                    var varType = varAttributes['type'];
                                    var varVal = varAttributes['value'];
                                    shortRef['users'][userName][handler]['variables'][varHandler] = {};
                                    shortRef['users'][userName][handler]['variables'][varHandler]['type'] = varType;
                                    shortRef['users'][userName][handler]['variables'][varHandler]['description'] = varAttributes['description'];
                                    shortRef['users'][userName][handler]['variables'][varHandler]['name'] = varAttributes['name'];
                                    shortRef['users'][userName][handler]['variables'][varHandler]['value'] = varVal;
                                    shortRef['users'][userName][handler]['variables'][varHandler]['entityLocation'] = varAttributes['entityLocation'];
                                    shortRef['users'][userName][handler]['variables'][varHandler]['id'] = varAttributes['id'];
                                });
                            }
                            if(comAssociations['commandFunctions']){
                                _.each(comAssociations['commandFunctions'], function (func) {
                                    var funcAttributes = func['attributes'];
                                    var funcHandler = funcAttributes['handler'];
                                    shortRef['users'][userName][handler]['functions'][funcHandler] = {};
                                    shortRef['users'][userName][handler]['functions'][funcHandler]['description'] = funcAttributes['description'];
                                    shortRef['users'][userName][handler]['functions'][funcHandler]['name'] = funcAttributes['name'];
                                    shortRef['users'][userName][handler]['functions'][funcHandler]['script'] = funcAttributes['functionScript'];
                                    shortRef['users'][userName][handler]['functions'][funcHandler]['entityLocation'] = funcAttributes['entityLocation'];
                                    shortRef['users'][userName][handler]['functions'][funcHandler]['id'] = funcAttributes['id'];
                                });
                            }
                        }

                    });
                }
            });
            _.each(associations['ownPointRanks'], function(pointRank){
                shortRef['users'][userName]['pointSettings']['enabled'] = pointRank['attributes']['enabled'];
                shortRef['users'][userName]['pointSettings']['pointsmult'] = pointRank['attributes']['pointsmult'];
                shortRef['users'][userName]['pointSettings']['pointspm'] = pointRank['attributes']['pointspm'];
                shortRef['users'][userName]['pointSettings']['id'] = pointRank['attributes']['id'];
                shortRef['users'][userName]['pointSettings']['location'] = pointRank['attributes']['entityLocation'];
                var pointAssociations = pointRank['associations'];
                if(pointAssociations){
                    _.each(pointAssociations['pointParticipators'], function(participator){
                        var partAttributes = participator['attributes'];
                        var username = partAttributes['username'];
                        if(Object.keys(shortRef['users'][userName]['pointSettings']['participators']).indexOf(username) <= -1) {
                            shortRef['users'][userName]['pointSettings']['participators'][username] = {};
                            shortRef['users'][userName]['pointSettings']['participators'][username]['points'] = partAttributes['points'];
                            shortRef['users'][userName]['pointSettings']['participators'][username]['location'] = partAttributes['entityLocation'];
                            shortRef['users'][userName]['pointSettings']['participators'][username]['id'] = partAttributes['id'];
                        }
                    });
                }
            });
            _.each(associations['ownLevelRanks'], function(levelRank){
                shortRef['users'][userName]['levelSettings']['enabled'] = levelRank['attributes']['enabled'];
                shortRef['users'][userName]['levelSettings']['xpfunction'] = levelRank['attributes']['xpfunction'];
                shortRef['users'][userName]['levelSettings']['xpstart'] = levelRank['attributes']['xpstart'];
                shortRef['users'][userName]['levelSettings']['xppm'] = levelRank['attributes']['xppm'];
                shortRef['users'][userName]['levelSettings']['xpmult'] = levelRank['attributes']['xpmult'];
                shortRef['users'][userName]['levelSettings']['id'] = levelRank['attributes']['id'];
                shortRef['users'][userName]['levelSettings']['location'] = levelRank['attributes']['entityLocation'];
                var levelAssociations = levelRank['associations'];
                if(levelAssociations){
                    _.each(levelAssociations['levelParticipators'], function(participator){
                        var levelAttributes = participator['attributes'];
                        var username = levelAttributes['username'];
                        if(Object.keys(shortRef['users'][userName]['levelSettings']['participators']).indexOf(username) <= -1) {
                            shortRef['users'][userName]['levelSettings']['participators'][username] = {};
                            shortRef['users'][userName]['levelSettings']['participators'][username]['level'] = levelAttributes['level'];
                            shortRef['users'][userName]['levelSettings']['participators'][username]['experience'] = levelAttributes['experience'];
                            shortRef['users'][userName]['levelSettings']['participators'][username]['xpreq'] = levelAttributes['xpreq'];
                            shortRef['users'][userName]['levelSettings']['participators'][username]['location'] = levelAttributes['entityLocation'];
                            shortRef['users'][userName]['levelSettings']['participators'][username]['id'] = levelAttributes['id'];
                        }
                    });
                }
            });
            _.each(associations['activeDefaultCommands'], function(defaultCommand){
                shortRef['users'][userName]['defaultCommands'].push(defaultCommand['attributes']['handler']);
            });
            _.each(associations['ownVariableCategories'], function(category){
                var catAssociations = category['associations'];
                if(catAssociations != undefined) {
                    _.each(catAssociations['userCategoryVariables'], function(variable){
                        var varAttributes = variable['attributes'];
                        var varHandler = varAttributes['handler'];
                        var varType = varAttributes['type'];
                        var varVal = varAttributes['value'];
                        shortRef['users'][userName]['variables'][varHandler] = {};
                        shortRef['users'][userName]['variables'][varHandler]['type'] = varType;
                        shortRef['users'][userName]['variables'][varHandler]['description'] = varAttributes['description'];
                        shortRef['users'][userName]['variables'][varHandler]['name'] = varAttributes['name'];
                        shortRef['users'][userName]['variables'][varHandler]['value'] = varVal;
                        shortRef['users'][userName]['variables'][varHandler]['entityLocation'] = varAttributes['entityLocation'];
                        shortRef['users'][userName]['variables'][varHandler]['id'] = varAttributes['id'];
                    });
                }
            });
        }
    });
    var Application = firebaseObject['OTB_Application']['vp-test-website'];
    var appAssociations = Application['associations'];
    _.each(appAssociations['appCommandCategories'], function(category){
        var catAssociations = category['associations'];
        if(catAssociations != undefined){
            if(catAssociations['appCategoryCommands']){
                _.each(catAssociations['appCategoryCommands'], function (command) {
                    var comAttributes = command['attributes'];
                    var comAssociations = command['associations'];
                    var handler = comAttributes['handler'];
                    shortRef['defaultCommands'][handler] = {};
                    shortRef['defaultCommands'][handler]['script'] = comAttributes['commandScript'];
                    shortRef['defaultCommands'][handler]['enabled'] = comAttributes['enabled'];
                    shortRef['defaultCommands'][handler]['parameters'] = {};
                    shortRef['defaultCommands'][handler]['variables'] = {};
                    if(comAssociations != undefined) {
                        if(comAssociations['commandParameters']){
                            _.each(comAssociations['commandParameters'], function (parameter) {
                                var parAttributes = parameter['attributes'];
                                var parHandler = parAttributes['handler'];
                                var parDefault = parAttributes['defaultValue'];
                                var handlerSplit = parHandler.split('_');
                                shortRef['defaultCommands'][handler]['parameters'][parHandler] = {};
                                shortRef['defaultCommands'][handler]['parameters'][parHandler]['parameterNumber'] = handlerSplit[handlerSplit.length - 1];
                                shortRef['defaultCommands'][handler]['parameters'][parHandler]['defaultValue'] = parDefault;
                            });
                        }
                        if(comAssociations['commandVariables']){
                            _.each(comAssociations['commandVariables'], function (variable) {
                                var varAttributes = variable['attributes'];
                                var varHandler = varAttributes['handler'];
                                var varType = varAttributes['type'];
                                var varVal = varAttributes['value'];
                                shortRef['defaultCommands'][handler]['variables'][varHandler] = {};
                                shortRef['defaultCommands'][handler]['variables'][varHandler]['type'] = varType;
                                shortRef['defaultCommands'][handler]['variables'][varHandler]['value'] = varVal;
                            });
                        }
                    }
                });
            }
        }
    });
    _.each(appAssociations['appVariableCategories'], function(category){
        var catAssociations = category['associations'];
        if(catAssociations != undefined){
            if(catAssociations['categoryCommandVariables']){
                _.each(catAssociations['categoryCommandVariables'], function(variable){
                    var varAttributes = variable['attributes'];
                    var varHandler = varAttributes['handler'];
                    var varType = varAttributes['type'];
                    var varVal = varAttributes['value'];
                    shortRef['defaultVariables'][varHandler] = {};
                    shortRef['defaultVariables'][varHandler]['type'] = varType;
                    shortRef['defaultVariables'][varHandler]['value'] = varVal;
                    var varAttributes = variable['attributes'];
                    var varHandler = varAttributes['handler'];
                    var varType = varAttributes['type'];
                    var varVal = varAttributes['value'];
                    shortRef['defaultVariables'][varHandler] = {};
                    shortRef['defaultVariables'][varHandler]['type'] = varType;
                    shortRef['defaultVariables'][varHandler]['description'] = varAttributes['description'];
                    shortRef['defaultVariables'][varHandler]['name'] = varAttributes['name'];
                    shortRef['defaultVariables'][varHandler]['value'] = varVal;
                    shortRef['defaultVariables'][varHandler]['entityLocation'] = varAttributes['entityLocation'];
                    shortRef['defaultVariables'][varHandler]['id'] = varAttributes['id'];
                });
            }
        }
    });
}

function sendPrivMsg(input, channel){
    clientWrite("PRIVMSG #" + channel + " :" + input + "\n");
}

function clientWrite(input){
    client.write(input);
    console.log("Sent: " + input);
}

function getViewers(channelName, _callback){
    var options = {
        host: 'tmi.twitch.tv',
        path: '/group/user/' + channelName + '/chatters'
    }
    var callback = function(response){
        var str = '';
        response.on('data', function (chunk) {
            str += chunk;
        });

        response.on('end', function(){
            var JSONres = JSON.parse(str);
            _callback(JSONres, channelName);
        });
    }
    https.request(options, callback).end();
}

function upPoints(channelName){
    var callback = function(namesObj, channel){

        if(shortRef['users'][channel]['pointSettings']){
            if(shortRef['users'][channel]['pointSettings']['enabled']){
                var existingParticipators = [];
                var participators = [];
                var newParticipators = [];
                _.each(namesObj['chatters'], function(value, key){
                    _.each(value, function(name){
                        if(participators.indexOf(name) <= -1)
                            participators.push(name);
                    });
                });
                _.each(shortRef['users'][channel]['pointSettings']['participators'], function(value, key){
                    var username = key;
                    if(participators.indexOf(username) > -1) {
                        existingParticipators.push(username);
                        var points = parseInt(value['points']);
                        points += parseInt(shortRef['users'][channel]['pointSettings']['pointspm']);
                        var PointRanks = new OTB_PointRanks();
                        var pointRank = shortRef['users'][channel]['pointSettings'];
                        PointRanks.setValues({'entityLocation': pointRank['location'], 'id': pointRank['id'], 'entityType': 'OTB_PointRanks', 'pointsmult': pointRank['pointsmult'], 'pointspm': pointRank['pointspm']});
                        var PointPart = new OTB_PointParticipation();
                        PointPart.setValues({'entityLocation': value['entityLocation'], 'points': points, 'entityType': "OTB_PointParticipation", 'id': value['id'], 'username': username, 'participatorPoints': PointRanks});
                        var ref = firebase.database().ref();
                        var fbObject = FBManager.getFirebaseTransaction(PointPart, null, null, null, shortRef['users'][channel]['id']);
                        ref.update(fbObject, function (error) {
                            if (!error) {
                                FBManager.saveUserInputs(PointPart);
                                return;
                            } else {
                                console.log(error);
                                console.log('Firebase object:');
                                console.log(fbObject);
                            }
                        });
                    }
                });
                newParticipators = _.filter(participators, function(name){return existingParticipators.indexOf(name) <= -1});
                _.each(newParticipators, function(userName){
                    var PointRanks = new OTB_PointRanks();
                    var pointRank = shortRef['users'][channel]['pointSettings'];
                    PointRanks.setValues({'entityLocation': pointRank['location'], 'id': pointRank['id'], 'entityType': 'OTB_PointRanks', 'pointsmult': pointRank['pointsmult'], 'pointspm': pointRank['pointspm']});
                    var PointPart = new OTB_PointParticipation();
                    PointPart.setValues({'points': parseInt(shortRef['users'][channel]['pointSettings']['pointspm']), 'username': userName, 'participatorPoints': PointRanks});
                    var fbObject = FBManager.getFirebaseTransaction(PointPart, null, null, null, shortRef['users'][channel]['id']);
                    var ref = firebase.database().ref();
                    ref.update(fbObject, function(error) {
                        if (!error) {
                            FBManager.saveUserInputs(PointPart);
                            return;
                        } else {
                            console.log(error);
                            console.log('Firebase object:');
                            console.log(fbObject);
                        }
                    });
                });
            }
        }
    }
    getViewers(channelName, callback);
}

function upLevels(channelName){
    var callback = function(namesObj, channel){
        if(shortRef['users'][channel]['levelSettings']){
            if(shortRef['users'][channel]['levelSettings']['enabled']){
                var existingParticipators = [];
                var participators = [];
                var newParticipators = [];
                _.each(namesObj['chatters'], function(value, key){
                    _.each(value, function(name){
                        if(participators.indexOf(name) <= -1)
                            participators.push(name);
                    });
                });
                _.each(shortRef['users'][channel]['levelSettings']['participators'], function(value, key){
                    var username = key;
                    if(participators.indexOf(username) > -1) {
                        existingParticipators.push(username);
                        var experience = parseInt(value['experience']);
                        var level = parseInt(value['level']);
                        var xpreq = parseInt(value['xpreq']);
                        experience += parseInt(shortRef['users'][channel]['levelSettings']['xppm']);
                        if(experience >= xpreq){
                            level++;
                            xpreq = Math.round(safeEval(shortRef['users'][channel]['levelSettings']['xpfunction'].replaceAll('prev.xp', xpreq.toString())));
                        }
                        var LevelRanks = new OTB_LevelRanks();
                        var levelRank = shortRef['users'][channel]['levelSettings'];
                        LevelRanks.setValues({'entityLocation': levelRank['location'], 'id': levelRank['id'], 'entityType': 'OTB_LevelRanks', 'xpfunction': levelRank['xpfunction'], 'xpstart': levelRank['xpstart'], 'xppm': levelRank['xppm'], 'xpmult': levelRank['xpmult']});
                        var LevelPart = new OTB_LevelParticipation();
                        LevelPart.setValues({'entityLocation': value['entityLocation'], 'experience': experience, 'level': level, 'xpreq': xpreq, 'entityType': "OTB_LevelParticipation", 'id': value['id'], 'username': username, 'participatorLevel': LevelRanks});
                        var ref = firebase.database().ref();
                        var fbObject = FBManager.getFirebaseTransaction(LevelPart, null, null, null, shortRef['users'][channel]['id']);
                        ref.update(fbObject, function (error) {
                            if (!error) {
                                FBManager.saveUserInputs(LevelPart);
                                return;
                            } else {
                                console.log(error);
                                console.log('Firebase object:');
                                console.log(fbObject);
                            }
                        });
                    }
                });
                newParticipators = _.filter(participators, function(name){return existingParticipators.indexOf(name) <= -1});
                _.each(newParticipators, function(username){
                    var LevelRanks = new OTB_LevelRanks();
                    var levelRank = shortRef['users'][channel]['levelSettings'];
                    LevelRanks.setValues({'entityLocation': levelRank['location'], 'id': levelRank['id'], 'entityType': 'OTB_LevelRanks', 'xpfunction': levelRank['xpfunction'], 'xpstart': levelRank['xpstart'], 'xppm': levelRank['xppm'], 'xpmult': levelRank['xpmult']});
                    var LevelPart = new OTB_LevelParticipation();
                    LevelPart.setValues({'experience': parseInt(shortRef['users'][channel]['levelSettings']['xppm']), 'level': 1, 'xpreq': parseInt(shortRef['users'][channel]['levelSettings']['xpstart']), 'username': username, 'participatorLevel': LevelRanks});
                    var fbObject = FBManager.getFirebaseTransaction(LevelPart, null, null, null, shortRef['users'][channel]['id']);
                    var ref = firebase.database().ref();
                    ref.update(fbObject, function(error) {
                        if (!error) {
                            FBManager.saveUserInputs(LevelPart);
                            return;
                        } else {
                            console.log(error);
                            console.log('Firebase object:');
                            console.log(fbObject);
                        }
                    });
                });
            }
        }
    }
    getViewers(channelName, callback);
}

function streamIsOnline(channel, callback){
    var options = {
        "host": "api.twitch.tv",
        "path": "/kraken/streams/" + channel + "?client_id=3unmnqmc0eaj10yq9t9p3n6hv8hsbxz",
        "method": "GET"
    }
    var _callback = function(response){
        var str = "";
        response.on('data', function(chunk){
            str += chunk;
        });
        response.on('end', function(){
            var obj = JSON.parse(str);
            if(obj['stream'] !== null)
                callback(true);
            else
                callback(false);
        });
    }
    https.request(options, _callback).end();
}