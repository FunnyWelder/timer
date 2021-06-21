function izm() {
    let hours = document.getElementById('t1');
    let minutes = document.getElementById('t2');
    let secondes = document.getElementById('t3');
    let up1 = document.getElementById('433k');
    let up2 = document.getElementById('466k');
    let up3 = document.getElementById('488k');
    let down1 = document.getElementById('455k');
    let down2 = document.getElementById('477k');
    let down3 = document.getElementById('499k');
    up1.addEventListener('click', function () {
        if (hours.textContent === '23') {
            hours.textContent = '00';
        } else {
            hours.textContent = +hours.textContent + 1;
            if (hours.textContent < 10) {
                hours.textContent = '0' + hours.textContent;
            }
        }
    })
    up2.addEventListener('click', function () {
        if (minutes.textContent === '59') {
            minutes.textContent = '00';
        } else {
            minutes.textContent = +minutes.textContent + 1;
            if (minutes.textContent < 10) {
                minutes.textContent = '0' + minutes.textContent;
            }
        }
    })
    up3.addEventListener('click', function () {
        if (secondes.textContent === '59') {
            secondes.textContent = '00';
        } else {
            secondes.textContent = +secondes.textContent + 1;
            if (secondes.textContent < 10) {
                secondes.textContent = '0' + secondes.textContent;
            }
        }
    })
    down1.addEventListener('click', function () {
        if (hours.textContent === '00') {
            hours.textContent = '23';
        } else {
            hours.textContent = +hours.textContent - 1;
            if (hours.textContent < 10) {
                hours.textContent = '0' + hours.textContent;
            }
        }
    })
    down2.addEventListener('click', function () {
        if (minutes.textContent === '00') {
            minutes.textContent = '59';
        } else {
            minutes.textContent = +minutes.textContent - 1;
            if (minutes.textContent < 10) {
                minutes.textContent = '0' + minutes.textContent;
            }
        }
    })
    down3.addEventListener('click', function () {
        if (secondes.textContent === '00') {
            secondes.textContent = '59';
        } else {
            secondes.textContent = +secondes.textContent - 1;
            if (secondes.textContent < 10) {
                secondes.textContent = '0' + secondes.textContent;
            }
        }
    })
}

function otschet() {
    let hours = document.getElementById('t1');
    let minutes = document.getElementById('t2');
    let secondes = document.getElementById('t3');
    let start = document.getElementById('53k');
    let tochki = document.getElementsByClassName('time');
    let boom = document.getElementById('boom');
    let bool = 1;
    let audio = new Audio();
    audio.src = 'timer/sounds/boom.flac';

    start.addEventListener('click', function () {
        let hour = +hours.textContent;
        let minute = +minutes.textContent;
        let seconde = +secondes.textContent;

        if (hour !== 0 || minute !== 0 || seconde !== 0) {
            let up = document.getElementsByClassName('up');
            let down = document.getElementsByClassName('down');
            for (let i = 0; i < 3; i++) {
                up[i].disabled = true;
                down[i].disabled = true;
            }
            start.disabled = true;

            let lasttime = new Date()/1000;
            let nowtime = new Date()/1000;

            function repeat() {
                const promise = new Promise((resolve, reject) => {
                    if (hour !== 0 || minute !== 0 || seconde !== 0) {
                        setTimeout(function () {
                            if(seconde === 0) {
                                if(minute === 0) {
                                    resolve('h' );
                                }
                                resolve('m' );
                            }
                            resolve('s' );
                        }, 100)
                    } else {
                        reject('Результат - поезд сделал БУМ!!!');
                    }
                });

                promise.then((data) => {
                        nowtime = new Date()/1000;
                        if(nowtime - lasttime >= 1) {
                            lasttime = new Date()/1000;
                            if(data === 'h') {
                                hour -= 1;
                                minute = 59;
                                seconde = 59;
                                if (hour < 10) {
                                    hours.textContent = '0' + hour;
                                } else {
                                    hours.textContent = hour;
                                }
                                if (minute < 10) {
                                    minutes.textContent = '0' + minute;
                                } else {
                                    minutes.textContent = minute;
                                }
                            } else if(data === 'm') {
                               minute -= 1;
                               seconde = 59;
                               if (minute < 10) {
                                   minutes.textContent = '0' + minute;
                               } else {
                                   minutes.textContent = minute;
                               }
                            } else {
                                seconde -= 1;
                            }
                            if(seconde < 10) {
                                secondes.textContent = '0' + seconde;
                            } else {
                                secondes.textContent = seconde;
                            }

                            bool = 1 - bool;

                            if(bool === 0) {
                                tochki[0].style.visibility = 'hidden';
                                tochki[1].style.visibility = 'hidden';
                            } else {
                                tochki[0].style.visibility = 'visible';
                                tochki[1].style.visibility = 'visible';
                            }
                        }
                        repeat();
                    },
                    (err) => {
                        console.log(err)
                        audio.play();
                        setTimeout(function () {
                            boom.style.visibility = 'visible';
                            tochki[0].style.visibility = 'visible';
                            tochki[1].style.visibility = 'visible';
                            bool = 1;
                            setTimeout(function () {
                                boom.style.visibility = 'hidden';
                            }, 2500)
                        }, 800)
                        for (let i = 0; i < 3; i++) {
                            up[i].disabled = false;
                            down[i].disabled = false;
                        }
                        start.disabled = false;
                    }
                );
            }
            repeat();
        }
    })
    //в promise проверять текущее время компьютера и секунды
    //во время смены времени показывать и скрывать двоеточие
    //синхронизовать время на таймере, если есть рассинхрон

}

window.addEventListener('DOMContentLoaded', function () {
    izm();
    otschet();
})