var _ = require('underscore');
var ItemStore = require('./meta/ItemStore');
var UserEntity = require('../model/UserEntity');
var DomainAPI = require('../DomainAPI');

var User = function(spec, my) {
    var that;
    
    my = my || {};
    spec = spec || {};

    
    that = ItemStore(_.extend({
        Entity: UserEntity,
        init: function() {
            var self = this;
            var fetchUser = UserEntity().getCurrentUser();
            $.when(fetchUser).done(function(user) {
                if (user) {
                    self.user = user;
                    self.user.syncInstance(UserEntity, user.id, function(item) {
                        self.user = item;
                        self.trigger(self.user);
                    });
                }
            });
        },
        onLogIn: function(loginData) {
            var self = this;
            var fetchUser = UserEntity().logIn(loginData);
            $.when(fetchUser).done(function(user) {
                if (user) {
                    self.user = user;
                    self.user.syncInstance(UserEntity, user.id, function(item) {
                        self.user = item;
                        self.trigger(self.user);
                    });
                }
            });
        },
        onLogOut: function() {
            var self = this;
            var fetchUser = UserEntity().logOut();
            $.when(fetchUser).done(function() {
                self.user = null;
                self.trigger(self.user);
            });
        },
        onSignOn: function(signOnData) {
            var self = this;
            var fetchUser = UserEntity().signOn(signOnData);
            $.when(fetchUser).done(function(user) {
                if (user) {
                    self.user = user;
                    self.user.syncInstance(UserEntity, user.id, function(item) {
                        self.user = item;
                        self.trigger(self.user);
                    });
                }
            });
        } 
    }, spec));
    that.connectAPI([
        [DomainAPI.connectUser, 'onConnect'],
        [DomainAPI.disconnectUser, 'onDisconnect'],
        [DomainAPI.logIn, 'onLogIn'],
        [DomainAPI.logOut, 'onLogOut'],
        [DomainAPI.signOn, 'onSignOn']
    ]);
    return that;
};

module.exports = User;
