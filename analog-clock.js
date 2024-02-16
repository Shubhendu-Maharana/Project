const hourHand = document.querySelector(".hour");
const minuteHand = document.querySelector(".minute");
const secondHand = document.querySelector(".second");

const updateTime = () => {
    let date = new Date(),
    secToDeg = (date.getSeconds() / 60) * 360;
    minToDeg = (date.getMinutes() / 60) * 360;
    hourToDeg = (date.getHours() / 12) * 360;
    secondHand.style.transform = `rotate(${secToDeg}deg)`;
    minuteHand.style.transform = `rotate(${minToDeg}deg)`;
    hourHand.style.transform = `rotate(${hourToDeg}deg)`;
};

setInterval(updateTime, 1000);

updateTime;