// LINE bot 関連
var CHANNEL_ACCESS_TOKEN = "<LINEのチャンネルアクセスキー>";
var USER_ID = "<ユーザーID>";
var GROUP_ID = "<グループID>";
var PUSH_URL = "https://api.line.me/v2/bot/message/reply"

//スプレッドシート関連
var SPREAD_SHEET = SpreadsheetApp.openById("<スプレッドシートのID>");
var MY_SHEET = SPREAD_SHEET.getSheetByName("<シートの名前>");

// "to"に"text"を送る関数
function push(to, text) {
  var pushToken = PUSH_URL;
  var headers = {
    "Content-Type": "application/json; charset=UTF-8",
    'Authorization': 'Bearer ' + CHANNEL_ACCESS_TOKEN,
  };
  var postData = {
    "to": to,
    "messages": [{
      "type": "text",
      "text": text,
    }]
  };
  var options = {
    "method": "post",
    "headers": headers,
    "payload": JSON.stringify(postData)
  };
  UrlFetchApp.fetch(pushToken, options);
}

// スプレッドシートにある誕生日から，明日が誕生日の人を祝う関数
// 以下，名前の書かれたセルが3列目，誕生日の書かれたセルが3列目とする
function happyBirthMessage() {
  var i;
  var max_i = MY_SHEET.getRange("<誕生日の書かれた列>").getValues().filter(String).length;
  for (i = 2; i <= max_i; i++) {
    // 誕生日のmonthとdayを取得する
    // スプレッドシートの日付をDate型にキャストする
    var birthYearMonthDay = new Date(MY_SHEET.getRange(i, 3).getValue());
    var birthMonth = birthYearMonthDay.getMonth();
    var birthday = birthYearMonthDay.getDate();

    // 今日のmonthとdayを取得する
    // monthは0-indexなのに注意する
    var date = new Date();
    date.setDate(date.getDate() + 1);
    var month = date.getMonth() + 1;
    var day = date.getDate();

    // 明日が誕生日のとき
    if (birthday == day && birthMonth == month) {
      var text = "明日は" + MY_SHEET.getRange(i, 2).getValue() + "さんの誕生日です！\nおめでとうございます！"
      push(GOURP_ID, text);
    }
  }
}

// テスト用の関数
function testMessage() {
  var message = "これはテスト用のメッセージです";
  push(GROUP_ID, message);
}
