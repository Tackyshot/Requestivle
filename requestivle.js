var request = require('request'),
    fs = require('fs'),
    handlebars = require('handlebars');

/*
 * **************
 * DO THINGS HERE
 * **************
 */

var requestivle = {};

requestivle.accessResource = function(template, action, context, next){

    parseTemplate(template, action, function(url, object){

        return compileHB(url, context, function(err, compURL){

            return compileHB(JSON.stringify(object), context, function(err, compObj){

                return sendRequest(template.action[action].method, compURL, JSON.parse(compObj), function(err, response, body){

                    return next(err, response, body);

                });

            })

        });

    });

};

module.exports = requestivle;


/*
 * **********
 * END DO THINGS
 * **********
 */



function parseTemplate(template, action, next){

    //var template = JSON.parse(row.template);
    var fullURL;
    var fullObj;

    //compile URL
    fullURL = mergeStrings(template, action);
    //compile Header vars
    fullObj = mergeObjects(template.base.head, template.action[action].head);

    next(fullURL, fullObj);

}

function mergeObjects(obj1, obj2){
    var obj3 = {};

    if(obj1 !== null){
        for (var attrname in obj1) {
            obj3[attrname] = obj1[attrname];
        }
    }

    if(obj2 !== null) {
        for (var attrname in obj2) {
            obj3[attrname] = obj2[attrname];
        }
    }

    return obj3;
}


function mergeStrings(template, action){
    //base always comes BEFORE actions
    var baseURL = template.base.url,
        baseParams = template.base.params,
        actURL = template.action[action].url,
        urlParams = template.action[action].params,
        finalStr,
        str1 = "",
        str2 = "",
        str3 = "",
        str4 = "",
        counter = 0,
        delim;

    for (var i = 0; i <= baseURL.length; i++) {

        if(typeof baseURL[i] !== 'undefined') {
            str1 += baseURL[i];
        }

    }

    if(actURL !== null) {
        for (var j = 0; j <= actURL.length; j++) {

            if(typeof actURL[j] !== 'undefined') {
                str2 += actURL[j];
            }

        }
    }

    if(baseParams !== null) {
        //reset counter.
        counter = 0;

        for (var k = 0; k <= baseParams.length; k++) {

            if(typeof baseParams[k] !== 'undefined') {

                if(counter === 0){
                    delim = "";
                    counter ++;
                }
                else{
                    delim = "&";
                }

                str3 += delim + baseParams[k];
            }

        }
    }


    if(urlParams !== null) {
        //reset counter.
        counter = 0;

        for (var l = 0; l = urlParams.length; l++) {

            if(typeof urlParams[l] !== 'undefined') {

                if(counter === 0){
                    delim = "";
                    counter ++;
                }
                else{
                    delim = "&";
                }

                str4 += delim + urlParams[l];
            }

        }
    }

    //reset counter.
    counter = 0;

    finalStr = str1 + str2 + str3 + str4;

    return finalStr;
}


function sendRequest(method, url, headers, next){

    if(method === "post"){
        request.post(url, headers, function(err, response, body){

            return next(err, response, body);

        });
    }
    if(method === "get"){
        request.get(url, headers, function(err, response, body){

            return next(err, response, body);

        });
    }

    //TODO: add support for PUT, DELETE, UPDATE request methods.

}

function compileHB(template, context, next){

    var compiled, //the object to return as a string.
        err = null;

    template = handlebars.compile(template);
    compiled = template(context);

    return next(err, compiled);

}
