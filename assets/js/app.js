window.onload = function () {
    AOS.init();
    let arr = [];
    for (let i = 1; i < 3; i++) {
        $.ajax({
            type: "GET",
            url: `assets/articles/article-${i}.html`,
            dataType: "html",
            success: function (response) {
                arr.push(response);
                const img = response.replace('..','assets');
                const assets = img.indexOf('assets');
                const sub = img.substring(assets , assets + 26)
                setTimeout(() => {
                    const string = `<section class="col-lg-3" data-aos="flip-left">
                    <div class="card mb-3 shadow post-card">
                    <img src="${sub}" class="card-img-top">
                    <div class="card-body">
                    <p class="card-text"><small class="text-muted">بارگذاری شده در ۳ دقیقه پیش</small></p><h5 class="card-title mb-4"></h5>
                    <button type="button" class="card-text fs-6 getstrbtn post-btn" data-bs-toggle="modal" data-bs-target="#Post-modal" id="readmore" data-article="${i}"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-arrow-left" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
                بیشتر...</button></div></div></section>`
                    document.getElementById('posts').innerHTML += string;
                }, 1000);
                setTimeout(() => {
                    document.getElementsByClassName('card-title')[i - 1].innerHTML += arr[i - 1];
                }, 1500);
            }
        });
    }
}

$('#Post-modal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let recipient = button.data('article');
    let modal = $(this);
    modal.find('#exampleModalLabel').text(`مقاله ${recipient}`);
    $.ajax({
        type: "GET",
        url: `assets/articles/article-${recipient}.html`,
        dataType: "html",
        success: function (response) {
            modal.find('.modal-body #article').html(response);
        }
    });
});
$('.nav-link').click(function (e) { 
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
});