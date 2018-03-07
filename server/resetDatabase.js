var helpers = require('./helpers');

var Promise = require('es6-promise').Promise;
var DSFirebaseAdapter = require('js-data-firebase');
var firebaseAdapter = new DSFirebaseAdapter({
    basePath: 'https://ics-r.firebaseio.com'
});

var JSData = require('js-data');

var store = new JSData.DS({
//   keepChangeHistory: false,
//   resetHistoryOnInject: false,
//   cacheResponse: false,
//   ignoreMissing: true,
//   upsert: false,
// //   bypassCache: true,
// //   findInverseLinks: false,
// //   findHasMany: false,
// //   findBelongsTo: false,
// //   findHasOne: false,
//   notify: false,
//   log: false 
});
store.registerAdapter('firebase', firebaseAdapter, { default: true });

var ProjectDS = store.defineResource({
    name: 'project',
    relations: {
        belongsTo: {
            user: {
                localKey: 'userId',
                localField: 'user'
            }
            // template: {
            //     localKey: 'templateId',
            //     localField: 'template'
            // }
        }
        // hasMany: {
        //     participant: {
        //         foreignKey: 'projectId',
        //         localField: 'participants'
        //     }
        // }
    },
    afterInject: function () {
      ProjectDS.emit('change');
    },
    afterEject: function () {
      ProjectDS.emit('change');
    }
});

// var TemplateDS = store.defineResource({
//     name: 'template',
//     relations: {
//         belongsTo: {
//             user: {
//                 localKey: 'userId',
//                 localField: 'owner'
//             },
//             tool: {
//                 localKey: 'toolId',
//                 localField: 'tool'
//             }
//         },
//         hasMany: {
//             project: {
//                 foreignKey: 'templateId',
//                 localField: 'projects'
//             },
//             user: {
//                 foreignKey: 'templateId',
//                 localField: 'subscriptions'
//             }
//         }
//     },
//     afterInject: function () {
//       TemplateDS.emit('change');
//     },
//     afterEject: function () {
//       TemplateDS.emit('change');
//     }
// });

// var ToolDS = store.defineResource({
//     name: 'tool',
//     relations: {
//         belongsTo: {
//             user: {
//                 localKey: 'userId',
//                 localField: 'owner'
//             }
//         },
//         hasMany: {
//             project: {
//                 foreignKey: 'toolId',
//                 localField: 'projects'
//             },
//             template: {
//                 foreignKey: 'toolId',
//                 localField: 'templates'
//             }
//         }
//     },
//     afterInject: function () {
//       ToolDS.emit('change');
//     },
//     afterEject: function () {
//       ToolDS.emit('change');
//     }
// });


var UserDS = store.defineResource({
    name: 'user',
    relations: {
        hasMany: {
            project: {
                foreignKey: 'userId',
                localField: 'projects'
            }
            // template: {
            //     foreignKey: 'ownerId',
            //     localField: 'templates'
            // },
            // tool: {
            //     foreignKey: 'ownerId',
            //     localField: 'tools'
            // }
            // participant: {
            //     foreignKey: 'userId',
            //     localField: 'participations'
            // }
        }
    },
    afterInject: function () {
      UserDS.emit('change');
    },
    afterEject: function () {
      UserDS.emit('change');
    }
});

for (var resourceName in store.definitions) {
    var Resource = store.definitions[resourceName];
    var ref = firebaseAdapter.ref.child(Resource.endpoint);
    // Inject items into the store when they're added to Firebase
    // Update items in the store when they're modified in Firebase
    ref.on('child_changed', function (dataSnapshot) {
      var data = dataSnapshot.val();
      if (data[Resource.idAttribute]) {
        Resource.inject(data);
      }
    });
    // Eject items from the store when they're removed from Firebase
    ref.on('child_removed', function (dataSnapshot) {
      var data = dataSnapshot.val();
      if (data[Resource.idAttribute]) {
        Resource.eject(data[Resource.idAttribute]);
      }
    });
}

store.utils.Promise.all([
    ProjectDS.destroyAll(),
    // ToolDS.destroyAll(),
    // TemplateDS.destroyAll(),
    UserDS.destroyAll()
]).then(function() { 
    console.log('Database empty');
    UserDS.create({id: '51238389-df3b-4ba8-a312-d22d615c83c9', displayName: "Edwin Velzel", email: "edwin.velzel@icstrategy.com"}).then(function(user){ 
        console.log('User created');
        var projectId = helpers.newGuid();
        ProjectDS.create({id: projectId, name:'test', userId: user.id}).then(function(project) {
            console.log('Project created');
            console.log('project: ' + project);
            console.log('project.ownerId: ' + project.userId);
            console.log('project.owner: ' + project.user);
            console.log('UserDS.get(project.ownerId)' + UserDS.get(project.userId));
        });
    });
});
