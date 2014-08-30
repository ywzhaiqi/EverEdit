// 转换的链接格式不一样，true 为 [0]: URL
var type = true;

function linkToFooter() {
    var mdLinkRegExp = /(\[.*?\])\(([^\)]*:\/\/[^\)]*)\)/g;

    var doc = App.ActiveDoc,
        caretLine = doc.CaretLine,  // 原光标的位置
        caretCol = doc.CaretCol;

    var func = type ? putLinkToFooter : putLinkToFooter2;
    var text = doc.Text;

    text = text.replace(/[\s\n\r]+$/, '');  // 移除底部的换行符
    doc.Text = func(text, mdLinkRegExp);
    doc.SetCaretPos(caretLine, caretCol, true);  // 还原光标的位置
}

function recoverLinks() {
    var mdLinkRegExp = /(\[\d+\]): (.*?:\/\/[^\n\r]+)/g;

    var doc = App.ActiveDoc,
        caretLine = doc.CaretLine,  // 原光标的位置
        caretCol = doc.CaretCol;

    var func = type ? revocerLinkFromFooter : revocerLinkFromFooter2;
    doc.Text = func(doc.Text, mdLinkRegExp);
    doc.SetCaretPos(caretLine, caretCol, true);  // 还原光标的位置
}

/**
 *  转换链接到底部，链接格式为 [0]: URL
 */
function putLinkToFooter(text, patt) {
    var match,
        matches = [];

    while (match = patt.exec(text)) {
        matches.push({
            line: match[0],
            name: match[1],
            url: match[2]
        });
    }

    var footer = '\n';
    for (var i = 0, obj; i < matches.length; i++) {
        obj = matches[i];
        // 修改原来的链接为 []
        text = text.replace(obj.line, obj.name + '[' + i + ']');
        // 添加到底部
        footer += '\n' + '[' + i + ']: ' + obj.url;
    }

    return text + '\n' + footer;
}

/**
 *  转换链接到底部，链接格式为 [标题]: URL
 */
function putLinkToFooter2(text, patt) {
    var match,
        matches = [];

    while (match = patt.exec(text)) {
        matches.push({
            line: match[0],
            name: match[1],
            url: match[2]
        });
    }

    var footer = ''
    for (var i = 0, obj; i < matches.length; i++) {
        obj = matches[i];
        // 修改原来的链接为 []
        text = text.replace(obj.line, obj.name + '[]');
        // 添加到底部
        footer += '\n' + obj.name + ': ' + obj.url;
    }

    return text + '\n' + footer;
}


/**
 *  把底部链接放回内容，底部链接格式为 [0]: URL
 */
function revocerLinkFromFooter(text, patt) {
    var match,
        matches = [];

    while (match = patt.exec(text)) {
        matches.push({
            line: match[0],
            name: match[1],
            url: match[2]
        });
    }

    for (var i = 0, obj; i < matches.length; i++) {
        obj = matches[i];
        // 修改原来的 [0] 为链接
        text = text.replace(obj.name, '(' + obj.url + ')');
        // 移除
        text = text.replace('\r\n' + obj.line, '');
    }

    return text;
}

function revocerLinkFromFooter2(text, patt) {
    
}