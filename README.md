# Requestivle — A simple request wrapper and variable compiler for making HTTP(s) based API calls.
[![NPM](https://nodei.co/npm/requestivle.png)](https://nodei.co/npm/requestivle/)

##Notice:
we accidentally published two versions of Requestivle, the other has shut down. If you are here from `'restivle'` you ARE in the correct spot.

## Overview

Requestivle is designed to help standardize your API calls no matter what type of API your destination is using. Whether its a RESTful service or an old school php system, Requestivle will build your request and return the response of your query.

## Usage Example

```javascript
var requestivle = require('requestivle');
requestivle.accessResource(template, action, context, function(error, response, body){
    if(!error && response.statusCode == 200){
        console.log(body); //show the resource accessed for your API.
    }
});
```

* #### template:
    * `Type:` JSON
    * The structured JSON template for determining the APIs requirements
* #### action:
    * `Type:` String
    * The name of the action that Requestivle should take upon the API
* #### context:
    * `Type:` Object
    * The variable data that Requestivle uses to build the HTTP(s) request.

## Template Structure

Requestivle requires an API specific form template to be entered. Because every API is slightly different Requestivle needs to know the specific "flavor" of API you're going to be accessing. The template structure is fairly straight forward and can be used for any HTTP(s) get or post request.

```javascript
{
    "base" :
    {
        "url":
        [
            "{{url}}", //context passed here as 'https://somesite.com'
            "/some/global/path"
        ],
        "params":[],
        "head":
        {
            "auth" : //example of a header to be passed.
            {
                "user": "{{username}}",
                "pass": "{{password}}"
            }
        }
    },
    "action":
    {
    	"ping": //not required but always helpful for a checking response 200.
        {
    		"method": "get",
    		"url": null,
            "params":null,
    		"head": null
    	},
        "some_action":
        {
            "method": "get", //get or post
            "url":
            [
                "/path/to/resource"
            ],
            "params":
            [
                "/?", //resolve how parameters start for us (differs slightly per API)
                "format=json",
                "someParam={{parameter}}"
            ],
            "head":
            {
                some_header:{{header_value}}
            }
        }
    }
}
```

#### Note: Be sure to remove any javascript comments from your templates.

The Markup for the template is pretty straight forward.
* #### "base":
    * The "base" object defines global scope url, parameter, and header requirements for your API. The base will be used for every request you make.
* #### "action":
    * the "action" object contains a list of api specific actions that Requestivle can use to access a specific resource.
    * `"some_action"` — is the name of the action you want to take which and is equivalent to the `action` parameter passed when invoking the Requestivle.accessResource() method.
* #### Handlebars delimiter:
    * The JSON template contains handlebars / moustache variable formatting which are used in conjunction with the `context` parameter to render variable information when accessing an API.
    
### template structure
```javascript
{
    "base" :
    {
        "url":
        [
            "{{url}}" //can also be static (http://somesite.com)'
        ],
        "params":[],
        "head":{}
    },
    "action":
    {
    	"some_action":
        {
    		"method": "get", //get or post
    		"url": null,
            "params":null, //if no parameters set to null, else resolution is required.
    		"head": null
    	}        
    }
}
```


## Context Structure

The context variable is a simple javascript object that is used the same way it would be used for any moustache / handlebars instance. You pass in the object where the object names are equal to the `'{{ }}'` wrapped variable names in your JSON template, and the object values are whatever variable information you want passed to your API.

```javascript
context = {
    url: "https://somesite.com",
    username: "someUser",
    password: "somePassword",
    parameter: "some_parameter_value",
    header_value: "some_header_value"
}
```

As you can see the context markup is super straight forward, you tell it what it needs to know and it does the rest for you!

## Future Development Plans

Requestivle is currently in an early, yet stable release. Its features are minimal, but there are plans to expand further. The extent of that expansion will be based on popular demand.

### planned features:
* Support for PUT, DELETE, and UPDATE methods
* Synchronus Methods for using Requestivle
* JSON template builder to quickly build out APIs in the required format.