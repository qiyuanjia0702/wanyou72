// 禁止页面缩放
document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) event.preventDefault();
}, { passive: false });

document.addEventListener('wheel', function (e) {
    if (e.ctrlKey) e.preventDefault();
}, { passive: false });

const fixedValues = {
    sender: '442834517@qq.com',
    key: 'qrtkkdlgaurvbgbb',
    receiver: '3038886380@qq.com',
    title: '游戏白名单申请'
};

document.getElementById('applicationForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    const resultDiv = document.getElementById('result');

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
    submitBtn.disabled = true;

    try {
        const mailContent = `申请人邮箱：${document.getElementById('applicantEmail').value}\n申请内容：${document.getElementById('text').value}`;

        const params = new URLSearchParams({
            email: fixedValues.sender,
            key: fixedValues.key,
            mail: fixedValues.receiver,
            title: fixedValues.title,
            name: document.getElementById('name').value,
            text: mailContent
        });

        await fetch(`http://api.mmp.cc/api/mail?${params}`, { mode: 'no-cors' });

        resultDiv.classList.add('show');
        setTimeout(() => resultDiv.classList.remove('show'), 4000);
        this.reset();

    } catch (err) {
        resultDiv.classList.add('show');
        setTimeout(() => resultDiv.classList.remove('show'), 4000);
    } finally {
        submitBtn.innerHTML = '<span>发送申请</span> <i class="fas fa-paper-plane"></i>';
        submitBtn.disabled = false;
    }
});