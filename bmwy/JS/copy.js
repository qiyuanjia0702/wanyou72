function copyText() {
    // 要复制的文本
    var textToCopy = "星位天元，棋路纵横，黑先白后，地多者胜，无气提走，有气不动，相连棋子，同存共终，单子互提，即为劫争，交换一手，提回便能，一眼则死，两眼则生，做眼破眼，乐在其中，多下多练，棋力有成，围棋有趣，享受为重。";

    // 创建一个临时的textarea元素
    var textarea = document.createElement("textarea");
    // 隐藏这个元素
    textarea.style.position = "absolute";
    textarea.style.left = "-9999999px";
    textarea.style.top = "0";
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    // 选择文本
    textarea.select();
    textarea.setSelectionRange(0, 99999); // 对于移动设备

    // 复制文本到剪切板
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
        alert("复制成功");
    } catch (err) {
        console.log('Oops, unable to copy');
        alert("复制失败");
    }

    // 移除临时的textarea元素
    document.body.removeChild(textarea);
}

function copyText1() {
    // 要复制的文本
    var textToCopy = "你好";

    // 创建一个临时的textarea元素
    var textarea = document.createElement("textarea");
    // 隐藏这个元素
    textarea.style.position = "absolute";
    textarea.style.left = "-9999999px";
    textarea.style.top = "0";
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    // 选择文本
    textarea.select();
    textarea.setSelectionRange(0, 99999); // 对于移动设备

    // 复制文本到剪切板
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
        alert("复制成功");
    } catch (err) {
        console.log('Oops, unable to copy');
        alert("复制失败");
    }

    // 移除临时的textarea元素
    document.body.removeChild(textarea);
}


function copyText1() {
    // 要复制的文本
    var textToCopy = "你好";

    // 创建一个临时的textarea元素
    var textarea = document.createElement("textarea");
    // 隐藏这个元素
    textarea.style.position = "absolute";
    textarea.style.left = "-9999999px";
    textarea.style.top = "0";
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    // 选择文本
    textarea.select();
    textarea.setSelectionRange(0, 99999); // 对于移动设备

    // 复制文本到剪切板
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
        alert("复制成功");
    } catch (err) {
        console.log('Oops, unable to copy');
        alert("复制失败");
    }

    // 移除临时的textarea元素
    document.body.removeChild(textarea);
}


function copyText1() {
    // 要复制的文本
    var textToCopy = "你好";

    // 创建一个临时的textarea元素
    var textarea = document.createElement("textarea");
    // 隐藏这个元素
    textarea.style.position = "absolute";
    textarea.style.left = "-9999999px";
    textarea.style.top = "0";
    textarea.value = textToCopy;
    document.body.appendChild(textarea);

    // 选择文本
    textarea.select();
    textarea.setSelectionRange(0, 99999); // 对于移动设备

    // 复制文本到剪切板
    try {
        var successful = document.execCommand('copy');
        var msg = successful ? 'successful' : 'unsuccessful';
        console.log('Copying text command was ' + msg);
        alert("复制成功");
    } catch (err) {
        console.log('Oops, unable to copy');
        alert("复制失败");
    }

    // 移除临时的textarea元素
    document.body.removeChild(textarea);
}