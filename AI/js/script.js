let currentModel = "V3";
let currentTheme = "dark";
let abortController = null;
let isRequesting = false;

// 输入框自适应高度
const textarea = document.getElementById('userInput');
textarea.addEventListener('input', () => {
    textarea.style.height = '10px'; // 固定高度
});

// 回车发送消息
textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

function switchModel(model) {
    currentModel = model;
    document.querySelectorAll('.model-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.includes(model));
    });
}

function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.setAttribute('data-theme', currentTheme);
}

async function sendMessage() {
    const userInput = document.getElementById('userInput');
    const message = userInput.value.trim();
    if (!message || isRequesting) return;

    userInput.value = '';
    userInput.style.height = '10px'; // 固定高度
    userInput.disabled = true;
    isRequesting = true;
    document.getElementById('stopBtn').style.display = 'block';

    // 添加用户消息
    addMessage(message, true);

    // 添加思考中消息
    const thinkingMsg = addMessage('正在思考...', false, true);

    try {
        abortController = new AbortController();
        const response = await fetch('https://api.siliconflow.cn/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk-zxpsicplqdvrwdtoolupiobfahtaibanbaugrwqicpwvjnpn',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: `deepseek-ai/DeepSeek-${currentModel}`,
                messages: [{ role: "user", content: message }],
                stream: false,
                max_tokens: 512,
                temperature: 0.7
            }),
            signal: abortController.signal
        });

        const data = await response.json();
        const content = data.choices[0].message.content;

        thinkingMsg.remove();
        addMessage(content, false, false, true);
    } catch (error) {
        if (error.name === 'AbortError') {
            addMessage('请求已终止', false);
        } else {
            console.error(error);
            addMessage('请求失败，请重试', false);
        }
    } finally {
        userInput.disabled = false;
        isRequesting = false;
        abortController = null;
        document.getElementById('stopBtn').style.display = 'none';
    }
}

function stopThinking() {
    if (abortController) {
        abortController.abort();
        const container = document.getElementById('chatContainer');
        const thinkingMsg = container.lastElementChild;
        if (thinkingMsg && thinkingMsg.querySelector('.content').textContent === '正在思考...') {
            thinkingMsg.remove();
        }
    }
}

function addMessage(content, isUser, isThinking = false, withTyping = false) {
    const container = document.getElementById('chatContainer');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;

    const avatar = document.createElement('img');
    avatar.className = 'avatar';
    avatar.src = isUser ? 'https://th.bing.com/th/id/R.968cce410c358d91bc512854d3768526?rik=22he2Hm39EgJUg&riu=http%3a%2f%2fwww.kuaipng.com%2fUploads%2fpic%2fw%2f2018%2f09-06%2f46875%2fwater_46875_698_698_.png&ehk=03KlUKWUCZa%2bWBQUr0QfTxi%2boai%2bCuXD0AluGQIyWnM%3d&risl=&pid=ImgRaw&r=0' : 'https://imgapi.cn/qq.php?qq=3038886380';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';

    if (isThinking) {
        contentDiv.textContent = content;
        contentDiv.style.color = '#666';
    } else if (withTyping) {
        typeEffect(contentDiv, content);
    } else {
        processContent(contentDiv, content);
    }

    messageDiv.append(avatar, contentDiv);
    container.appendChild(messageDiv);
    container.scrollTop = container.scrollHeight;
    return messageDiv;
}

function typeEffect(element, text) {
    element.innerHTML = '';
    let index = 0;
    let codeBuffer = '';
    let inCodeBlock = false;

    function type() {
        if (index >= text.length) return;

        const char = text[index++];
        if (char === '`' && text.slice(index - 1, index + 2) === '```') {
            inCodeBlock = !inCodeBlock;
            codeBuffer += '```';
            index += 2;
            type();
            return;
        }

        if (inCodeBlock) {
            codeBuffer += char;
        } else {
            element.appendChild(document.createTextNode(char));
        }

        if (inCodeBlock && text.slice(index, index + 3) === '```') {
            inCodeBlock = false;
            codeBuffer += '```';
            processCodeBuffer();
            index += 3;
        }

        element.scrollIntoView(false);
        setTimeout(type, inCodeBlock ? 0 : 20);
    }

    function processCodeBuffer() {
        const codeBlock = document.createElement('pre');
        codeBlock.className = 'code-block';
        codeBlock.textContent = codeBuffer.slice(3, -3).trim();
        element.appendChild(codeBlock);
        codeBuffer = '';
    }

    type();
}

function processContent(element, text) {
    const segments = text.split(/```/g);
    segments.forEach((segment, index) => {
        if (index % 2 === 0) {
            element.appendChild(document.createTextNode(segment));
        } else {
            const codeBlock = document.createElement('pre');
            codeBlock.className = 'code-block';
            codeBlock.textContent = segment.trim();
            element.appendChild(codeBlock);
        }
    });
}

// 文本处理函数（补充部分）
function processCodeBlocks(text) {
    const segments = text.split(/(```[\s\S]*?```)/g);
    return segments.map(segment => {
        if (segment.startsWith('```') && segment.endsWith('```')) {
            const codeContent = segment.slice(3, -3).trim();
            return `<pre class="code-block">${codeContent}</pre>`;
        }
        return segment.replace(/\n/g, '<br>');
    }).join('');
}

// 完整的事件监听补充
document.addEventListener('DOMContentLoaded', () => {
    // 初始化主题
    document.body.setAttribute('data-theme', 'dark');

    // 输入框动态高度调整增强
    const textarea = document.getElementById('userInput');
    textarea.addEventListener('input', () => {
        textarea.style.height = '10px'; // 固定高度
    });

    // 页面点击事件处理
    document.body.addEventListener('click', (e) => {
        // 自动滚动到底部
        const container = document.getElementById('chatContainer');
        container.scrollTop = container.scrollHeight;

        // 点击代码块时复制功能
        if (e.target.classList.contains('code-block')) {
            const text = e.target.textContent;
            navigator.clipboard.writeText(text).then(() => {
                showToast('代码已复制到剪贴板');
            });
        }
    });
});

// 显示临时提示
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = 'rgba(0,0,0,0.7)';
    toast.style.color = 'white';
    toast.style.padding = '10px 20px';
    toast.style.borderRadius = '5px';
    toast.style.zIndex = '1000';
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// 增强的停止思考功能
function stopThinking() {
    if (abortController) {
        const container = document.getElementById('chatContainer');
        container.querySelectorAll('.content').forEach(content => {
            if (content.textContent === '正在思考...') {
                content.parentElement.remove();
            }
        });

        abortController.abort();
        abortController = null;
        isRequesting = false;
        document.getElementById('stopBtn').style.display = 'none';
        document.getElementById('userInput').disabled = false;
    }
}