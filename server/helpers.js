String.prototype.toCamel = function(){
	return this.toDash().replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
};
String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g, "");
};
String.prototype.toDash = function(){
    var unSpaced = this.replace(/( |:)/g, '-');
	var dashed = unSpaced.replace(/([A-Z])/g, function($1){return "-"+$1.toLowerCase();});
    if (dashed.substring(0,1) === '-') {
        dashed = dashed.substring(1, dashed.length);
    }
    return dashed;
};
String.prototype.capitalize = function () {
    'use strict';
    return this.charAt(0).toUpperCase() + this.slice(1);
};

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}
function replaceAll(string, find, replace) {
  return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

module.exports = {
    newGuid: function() {
        'use strict';
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }).toLowerCase();
    },
    replaceAll: function(string, find, replace) {
        return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
    },
    encodeFirebaseId: function (string) {
        'use strict';
        var string = string.toLowerCase();
        var string = replaceAll(string, '/', '');
        var string = replaceAll(string, '.', '@@');
        var string = replaceAll(string, '@@2E', '@@');
        var string = replaceAll(string, '$', '');
        var string = replaceAll(string, '#', '');
        var string = replaceAll(string, '[', '');
        var string = replaceAll(string, ']', '');
        var string = replaceAll(string, '=', '');
        var string = replaceAll(string, ' ', '');
        var string = replaceAll(string, '%2A', '');
        var string = replaceAll(string, '%2B', '');
        var string = replaceAll(string, '%2C', '');
        var string = replaceAll(string, '%2D', '');
        var string = replaceAll(string, '%2E', '');
        var string = replaceAll(string, '%2F', '');
        var string = replaceAll(string, '%23', '');
        var string = replaceAll(string, '%24', '');
        var string = replaceAll(string, '%5B', '');
        var string = replaceAll(string, '%5D', '');
        var string = replaceAll(string, '%3D', '');
        var string = replaceAll(string, '%', '');
        return string;
    },
    getFriendlyUrl: function(str, max) {
        'use strict';
        if (max === undefined) { max = 100; }
        var a_chars = [
            ["a", /[áàâãªÁÀÂÃ]/g],
            ["e", /[éèêÉÈÊ]/g],
            ["i", /[íìîÍÌÎ]/g],
            ["o", /[òóôõºÓÒÔÕ]/g],
            ["u", /[úùûÚÙÛ]/g],
            ["c", /[çÇ]/g],
            ["n", /[Ññ]/g]
        ];
        // Replace vowel with accent without them
        for(var i=0;i<a_chars.length;i++) {
            str = str.replace(a_chars[i][1],a_chars[i][0]);
        }
        // first replace whitespace by -, second remove repeated - by just one, third turn in low case the chars,
        // fourth delete all chars which are not between a-z or 0-9, fifth trim the string and
        // the last step truncate the string to 32 chars
        return str.replace(/\s+/g,'-').toLowerCase().replace(/[^a-z0-9\-]/g, '').replace(/\-{2,}/g,'-').replace(/(^\s*)|(\s*$)/g, '').substr(0,max);
    }
};