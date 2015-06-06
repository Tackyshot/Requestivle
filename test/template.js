module.exports = {
    "base" :
    {
        "url":
        [
            "{{url}}"
        ],
        "params": null,
        "head":
        {
            "auth" :
            {
                "user": "{{username}}",
                "pass": "{{password}}"
            }
        }
    },
    "action":
    {
        "ping":
        {
            "method": "get",
            "url": null,
            "params":null,
            "head": null
        },
        "getFruit":
        {
            "method": "get",
            "url":
            [
                "/fruit"
            ],
                "params": null,
                "head": null
        },
        "getFruitByColor":{
            "method": "get",
            "url":[
                "/fruit"
            ],
            "params":[
                "?",
                "fruit_color={{fruit_color}}"
            ],
            "null": null
        },
        "postFruitByColor":{
            "method": "post",
            "url":[
                "/fruit"
            ],
            "params": null,
            "head": {
                "fruit_color": "{{fruit_color}}"
            }
        },
        "postFruitsByColorAndSize":{
            "method": "post",
            "url":[
                "/fruit"
            ],
            "params":[
                "?",
                "fruit_color={{fruit_color}}"
            ],
            "head":{
                "fruit_size": "{{fruit_size}}"
            }
        }
    }
}