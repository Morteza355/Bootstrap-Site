AOS.init();
let arr = [];
for (let i = 1; i < 4; i++) { // you should increase the condition number after adding a new article 
    $.ajax({
        type: "GET",
        url: `assets/articles/article-${i}.html`,
        dataType: "html",
        success: function (response) {
            const imgIndex = response.indexOf('img');
            const jpgIndex = response.indexOf('jpg');
            const subString = response.substring(imgIndex - 1, jpgIndex + 5);
            let newResponse = response.replace(subString, '');
            arr.push(newResponse);
            const img = response.replace('..', 'assets');
            const assets = img.indexOf('assets');
            const jpg = img.indexOf('jpg');
            const sub = img.substring(assets, jpg + 3);
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
            const assets = response.indexOf('img');
            const jpg = response.indexOf('jpg');
            const sub = response.substring(assets - 1, jpg + 5);
            let newResponse = response.replace(sub, '');
            modal.find('.modal-body #article').html(newResponse);
        }
    });
});

// hightlight nav item on active
$('.nav-link').click(function (e) {
    $('.nav-link').removeClass('active');
    $(this).addClass('active');
});

// Send Input datas to check cookie function on line 86
const form = document.getElementById('register-form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const userName = e.srcElement[0].value;
    const userEmail = e.srcElement[1].value;
    const userPassword = e.srcElement[2].value;
    checkCookieExists(userName, userEmail, userPassword);
});

// Cookie set and get and check if user exists or not
function setCoockie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = d.toUTCString();
    document.cookie = `${cname}=${JSON.stringify(cvalue)};expires=${expires};path=/`;
}

function getCookie(cname) {
    let name = `${cname}=`;
    let decodedCookie = decodeURIComponent(document.cookie);
    let cookies = decodedCookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) == ' ') {
            cookie = cookie.substring(1);
        }
        if (cookie.indexOf(name) == 0) {
            return cookie.substring(name.length, cookie.length).replace(/\s/g, '');
        }
    }
    return null;
}
let userArrays = [];

function checkCookieExists(username, email, password) {
    let userObj = getCookie('user');
    let UsersStringArr = localStorage.getItem('UserArrays');
    if (userObj != null) {
        RegisterAlert('alert alert-danger alert-box-register', 'شما قبلا ثبت نام کرده اید!');
        return;
    } else {
        if (UsersStringArr.includes(username)) {
            RegisterAlert('alert alert-danger alert-box-register', 'این نام کاربری قبلا ثبت شده است !');
            return;
        }
        let usernamePattern = /^[a-zA-Z]{5,10}$/;
        let emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(usernamePattern.test(username))) {
            RegisterAlert('alert alert-danger alert-box-register', 'نام کاربری خود را به درستی وارد کنید!');
        } else if (password.length == 0) {
            RegisterAlert('alert alert-danger alert-box-register', 'رمز عبور خود را به درستی وارد کنید!');
        } else if (!(emailPattern.test(email))) {
            RegisterAlert('alert alert-danger alert-box-register', 'ایمیل خود را به درستی وارد کنید!');
        } else {
            userObj = {
                'username': username,
                'password': password,
                'email': email
            }
            setCoockie('user', userObj, 365);
            RegisterAlert('alert alert-success alert-box-register', 'شما با موفقیت ثبت نام کردید (لطفا وارد حساب خود شوید ! )');
            userArrays.push(userObj.username);
            setTimeout(() => {
                localStorage.setItem('UserArrays', JSON.stringify(userArrays));
            }, 2000);
        }
    }
}

// ------------------------- // 

// Alerts in Register And Login
function RegisterAlert(className, content) {
    let alertBox = document.getElementById('register-alert-box');
    alertBox.style.display = 'block';
    alertBox.innerHTML = content;
    alertBox.className = className;
}

function loginAlert(className, content) {
    let loginAlert = document.getElementById('login-alert-box');
    loginAlert.style.display = 'block';
    loginAlert.innerHTML = content;
    loginAlert.className = className;
}
// ------------------------- // 
let NameLink = document.getElementById('dropdownMenuLink');
let buttons = document.getElementById('buttons');
let dropDown = document.getElementById('dropdown');
// validate input user and password and login the user and if he is not registered he will get an error and set his/her name on localStorage
function loginUser() {
    const objString = getCookie('user');
    if (objString != null) {
        const realObj = JSON.parse(objString);
        let loginPassInput = document.getElementById('login-password-input').value;
        let loginUserInput = document.getElementById('login-username-input').value;
        if (realObj.username !== loginUserInput) {
            loginAlert('alert alert-danger alert-box-register', 'نام کاربری وارد شده اشتباه است !');
        } else if (realObj.password !== loginPassInput) {
            loginAlert('alert alert-danger alert-box-register', 'رمز عبور وارد شده اشتباه است !');
        } else {
            localStorage.setItem('yourName', realObj.username);
            loginAlert('alert alert-success alert-box-register', 'شما با موفقیت وارد شدید (لطفا چند لحظه صبر کنید)');
            location.reload();
        }
    } else {
        loginAlert('alert alert-danger alert-box-register', 'شما هنوز ثبت نام نکردید !');
        return;
    }
}
// ------------------------- // 
// Call the loginUser Function on form submit
let loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    loginUser();
});

// ------------------------- // 
// get the name on localStorage and create a dynamic html wit user info
window.addEventListener('load', e => {
    const Name = localStorage.getItem('yourName');
    if (Name != null) {
        buttons.style.cssText = 'display:none!important';
        dropDown.style.display = 'block';
        NameLink.innerHTML = Name;
    } else {
        buttons.style.cssText = 'display:flex!important';
        dropDown.style.display = 'none';
    }
});
// ------------------------- // 
// if logout btn exists just logout the user and remove his name on localStorage
let logoutBtn = document.getElementById('logout');
logoutBtn.addEventListener('click', e => {
    localStorage.removeItem('yourName');
    location.reload();
    dropDown.style.cssText = 'display:none!important';
});
// ------------------------- // 