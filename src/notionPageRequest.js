class NotionPageRequest {
    constructor(databaseId, job, banch, commit) {
        let [title, message, foot] = messageParser(commit.message);
        this.parent = { "database_id": databaseId };
        this.properties = {
            "Job": {
                "select": {
                    "name": job
                },
            },
            "Type": {
                "select": {
                    "name": typeParser(title)
                }
            },
            "Hot-fix": title.indexOf('핫') > 0 ? {
                "select": {
                    "name": "O"
                }
            } : undefined,
            "Title": {
                "title": [
                    {
                        "text": {
                            "content": title
                        }
                    }
                ]
            },
            "Deploy": {
                "select": {
                    "name": banch
                }
            },
            "DeployedAt": {
                "date": {
                    "start": commit.timestamp
                }
            }
        };
        this.children = createChildren(message,foot)
    }
}

function typeParser(title) {
    return title.substring(0, title.indexOf(']')).replaceAll(/[[핫]/g, '');
}

function messageParser(message) {
    console.log(message);
    let body = message
        .split('\n')
        .map(msg => msg.trim())
        .filter(msg => msg.length > 0)
    let title = body.shift();
    let foot = body.length>2?body[2].indexOf('](')>0?body.pop():undefined:undefined;
    return [title,body,foot];
}

function createChildren(message, foot) {
    let result = message.map(msg => (
        {
            "object": "block",
            "type": "paragraph",
            "paragraph": {
                "rich_text": [
                    {
                        "type": "text",
                        "text": {
                            "content": msg
                        }
                    }
                ]
            }
        }
    ));
    if(foot!==null && foot !==undefined && foot.length >0 ){
       result.push({
            "object": "block",
                "type": "bookmark",
                "bookmark": {
                    "url":foot.substring(foot.indexOf(']')+1).replaceAll(/[()]/g,'')
                }
        })
    }
    return result;
}

export default NotionPageRequest;