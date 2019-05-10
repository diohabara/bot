// LINE bot 関連
var CHANNEL_ACCESS_TOKEN = "<LINEのチャンネルアクセスキー>";

// ポストデータを受け取る
function doPost(e) {
    var contents = e.postData.contents;
    var obj = JSON.parse(contents)
    var events = obj["events"];
    for (var i = 0; i < events.length; i++) {
        if (events[i].type == "message") {
            reply_message(events[i]);
        }
    }
}

// USER_ID・GROUP_ID・ROOM_IDを返す
function reply_message(e) {
    var user_id = e.source.userId;
    var group_id = e.source.groupId;
    var room_id = e.source.roomId;
    var ids = [user_id, group_id, room_id];
    var postData = {
        "replyToken": e.replyToken,
        "messages": [{
            "type": "text",
            "text": ids.join(",")
        }]
    };
    var options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + CHANNEL_ACCESS_TOKEN
        },
        "payload": JSON.stringify(postData)
    };
    UrlFetchApp.fetch("https://api.line.me/v2/bot/message/reply", options);
}