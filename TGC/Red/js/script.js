$(document).ready(function () {
    // 获取图片数据
    $.ajax({
        url: 'https://api.t1qq.com/api/sky/gytq',
        data: {
            key: 'luF8owK4UYIjENYbUmtKvRx2Zi'
        },
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            $('#loading').hide();
            if (data.code === 200) {
                data.data.forEach(function (imgUrl) {
                    const isGIF = imgUrl.endsWith('.gif');
                    const img = $(`<img src="${imgUrl}">`);

                    if (isGIF) {
                        // 处理动图装饰
                        img.addClass('gif-decoration')
                            .css({
                                right: Math.random() * 10 + 5 + '%',
                                bottom: Math.random() * 10 + 5 + '%'
                            });
                        $('body').append(img);
                    } else {
                        // 处理普通图片
                        const card = $(`<div class="photo-card"></div>`);
                        img.addClass('static-image');
                        card.append(img);
                        card.click(function () {
                            $('#modal-img').attr('src', imgUrl);
                            $('#modal').addClass('active');
                            $('body').addClass('no-scroll');
                            $('#modal-img').css('transform', 'translate(-50%, -50%)');
                        });
                        $('#gallery').append(card);
                    }

                    // 统一添加加载错误处理
                    img.on('error', function () {
                        $(this).attr('src', 'https://via.placeholder.com/150');
                    });
                });
            }
        },
        error: function () {
            $('#loading').html('<p style="color: red;">图片加载失败，请稍后重试</p>');
        }
    });

    // 关闭模态框
    $('#modal').click(function (e) {
        if (e.target === this) {
            $(this).removeClass('active');
            $('body').removeClass('no-scroll');
        }
    });
});