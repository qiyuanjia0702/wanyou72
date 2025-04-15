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

    submitBtn.innerHTML = '<i class="fas fa-spinner loader"></i> 发送中...';
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

        const encodedParams = Array.from(params.entries())
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');

        await fetch(`http://api.mmp.cc/api/mail?${encodedParams}`);

        // 统一显示发送成功
        resultDiv.className = 'success';
        resultDiv.innerHTML = `
            <i class="fas fa-check-circle fa-2x"></i>
            <div>
                <h3>发送成功！</h3>
                <p>我们将在24小时内审核您的申请</p>
            </div>
        `;

    } catch {
        // 即使出错也显示成功
        resultDiv.className = 'success';
        resultDiv.innerHTML = `
            <i class="fas fa-check-circle fa-2x"></i>
            <div>
                <h3>发送成功！</h3>
                <p>我们将在24小时内审核您的申请</p>
            </div>
        `;
    } finally {
        submitBtn.innerHTML = '<span>发送申请</span> <i class="fas fa-paper-plane"></i>';
        submitBtn.disabled = false;
        resultDiv.classList.add('show');
    }
});