function alert(message) {
    var vbOKOnly = 0;
    ShowMsgBox(message, "Message from EverEdit", vbOKOnly);
}

function prompt(message, defaultValue) {
    return ShowInputBox(defaultValue, message);
}

function confirm(message){
    var vbOKCancel = 1;
    var result = ShowMsgBox(message, "Confirm from EverEdit", vbOKCancel);
    if (result == 1) {
        return true;
    }
    return false;
}

function now() {
    var now = new Date();
    var year = now.getFullYear().toString();
    var month = (now.getMonth() + 1).toString();
    var date = now.getDate().toString();
    var hour = now.getHours().toString();
    var minute = now.getMinutes().toString();
    if (minute == "0") {
        minute = "00";
    }
    var second = now.getSeconds().toString();
    if (second == "0") {
        second = "00";
    }
    var result = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    return result;
}

function dump(arr, level) {
    if (!level) { 
        level = 0; 
    }
    var dumped_text = "";
    var level_padding = "";
    for (var i = 0; i < level + 1; i++) { 
        level_padding += "    ";
    }
    if (typeof(arr) == 'object') {  
        for (var item in arr) {
            var value = arr[item];
            if (typeof(value) == 'object') { 
                dumped_text += level_padding + "'" + item + "' ...\n";
                dumped_text += dump(value,level+1);
            } else {
                dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
            }
        }
    } else { 
        dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
    }
    return dumped_text;
}

function trim(s) {  
    return s.replace(/(^\s*)|(\s*$)/g, "");  
}

function space(len) {
    var arr = [];
    while (arr.length < len) {
        arr.push(' ');
    }
    return arr.join('');
}

function getLinesep(text) {
    var LINE_SEP = {
        "PC": "\r\n",
        "UNIX": "\n",
        "MAC": "\r"
    }
    var linesep = false;
    if (text.indexOf("\r\n") != -1) {
        linesep = LINE_SEP.PC;
    }
    else if (text.indexOf("\n") != -1) {
        linesep = LINE_SEP.UNIX;
    }
    else if (text.indexOf("\r") != -1) {
        linesep = LINE_SEP.MAC;
    }
    return linesep;
}

function regexEscape(str, except) {
    str = str.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, function(ch){
        if (except && except.indexOf(ch) != -1) {
            return ch;
        }
        return "\\" + ch;
    }); 
    return str;
}

function getDisplayLength(s) {
    return s.replace(/[^\x00-\xff]/g, '**').length;
}

function getSystemCodeSet() {
    var systemCodeSet = 0;
    var computer = ".";
    var objWMIService = GetObject("winmgmts:\\\\" + computer + "\\root\\cimv2");
    var e = new Enumerator(objWMIService.ExecQuery("Select * from Win32_OperatingSystem", "WQL", 48));
    for ( ; !e.atEnd(); e.moveNext()) {	
        systemCodeSet = e.item().CodeSet;
    }
    return systemCodeSet;
}

function setClipboard(s) {
    var ie = new ActiveXObject('InternetExplorer.Application');
    ie.silent = true;
    ie.Navigate('about:blank');
    while (ie.ReadyState!=4) App.Sleep(20);
    while (ie.document.readyState!='complete') App.Sleep(20);
    ie.document.body.innerHTML = '<textarea id="txt" wrap="off"></textarea>';
    var txt = ie.document.getElementById('txt');
    txt.value = s;
    txt.select();
    txt = null;
    ie.ExecWB(12,0);
    ie.Quit();
    ie = null;
}

function deleteFile(filename) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
	fso.DeleteFile(filename);
}

function fileExists(filename) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    return fso.FileExists(filename)
}

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

function addLeadingZero(num) {
    if (num < 10) {
        return '0' + num;
    }
    return num.toString();
}

function addLeadingZeros(num) {
    if (num < 10) {
        return '00' + num;
    }
    if (num < 100) {
        return '0' + num;
    }
    return num.toString();
}

var os = {
    'curdir': '.', 
    'pardir': '..', 
	'sep': '\\',
	'altsep': '/',
	'extsep': '.',
	'pathsep': ';',
	'linesep': '\n'
};

/*==================================================
  wrapper
 ==================================================*/
function hasSel() {
    return App.ActiveDoc.HasSel();
}

function getSelText() {
    return App.ActiveDoc.SelText;
}

function setSelText(s) {
    App.ActiveDoc.SelText = s;
}

function getSelStartPos() {
    return App.ActiveDoc.SelStartPos;
}

function getSelEndPos() {
    return App.ActiveDoc.SelEndPos;
}

function getLineText(index) {
    return App.ActiveDoc.GetLineText(index);
}

function setSel(startLine, startCol, endLine, endCol) {
    App.ActiveDoc.SetSel(startLine, startCol, endLine, endCol);
}

function insert(s) {
    App.ActiveDoc.Insert(s);
}

function geDoctFullName() {
    return App.ActiveDoc.PathName
}

function getDocName() {
    return App.ActiveDoc.PathName.split('\\').pop();
}

function getDocPath() {
    return App.ActiveDoc.PathName.split('\\').slice(0, -1).join(os.sep) + os.sep;
}

function include(path) {
    if (path.indexOf(':') == -1) {
        path = getDocPath() + (path.slice(0, 1) == os.sep ? path : os.sep + path)
    }
    Include(path);
}
