const urlParams = new URLSearchParams(window.location.search);

const timezones = {
    'EST': 'GMT-0500',
    'CST': 'GMT-0600',
    'MST': 'GMT-0700',
    'PST': 'GMT-0800'
}

function destructMS(milli) {
    if (isNaN(milli) || milli < 0) {
        console.log(new Date(urlParams.get('countdown')));
        return null;
    }

    var d, h, m, s, ms;
    s = Math.floor(milli / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    ms = Math.floor((milli % 1000) * 1000) / 1000;
    return { d: d, h: h, m: m, s: s, ms: ms };
}

function outputTimeLeft() {
    const d = new Date();
    let currentMs = d.getTime();
    let goalMs = parseInt(new Date(urlParams.get('countdown')).getTime());
    let destructed = destructMS(Math.max(0, goalMs - currentMs));

    let formatSeconds = String(destructed.s).padStart(2, '0');
    let formatMinutes = String(destructed.m).padStart(2, '0');
    let formatDays = destructed.d ? destructed.d : null;
    let formatHours = destructed.d || destructed.h ? String(destructed.h).padStart(2, '0') : null;
    
    const formattedTime = [formatDays, formatHours, formatMinutes, formatSeconds].filter(p => { return p !== null; }).join(':');
    document.getElementById('countdown').innerText = formattedTime;
}

window.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('text').innerText = urlParams.get('text');

    if (urlParams.get('countdown')) {
        window.setInterval(outputTimeLeft, 10);
    } else {
        const buttonsContainer = document.getElementById('buttons');

        Object.keys(timezones).forEach((timezone) => {
            const timezoneLink = document.createElement('a');
            const nextYear = new Date().getFullYear()+1;
            timezoneLink.href = encodeURI(`${document.location.href}?text=${timezone}&countdown=January 1, ${nextYear} 00:00:00 ${timezones[timezone]}`);
            timezoneLink.innerText = timezone;
            buttonsContainer.appendChild(timezoneLink);
            buttonsContainer.append(' ');
        })
        buttonsContainer.appendChild
        buttonsContainer.style.display="block";
    }


});