const button = document.querySelector(".info-button")
const info = document.querySelector(".info-div")

let delButton = document.querySelectorAll('.info-del')
let weekday = document.querySelectorAll('.weekday')
let flag = false;

const addClass = (element, className) => {
    element.className += " " + className
}

const removeClass = (element, className) => {
    let check = new RegExp("(\\s|^)" + className + "(\\s|$)")
    element.className = element.className.replace(check, " ").trim()
}

const checkClass = (element, className) => {
    let check = new RegExp("(\\s|^)" + className + "(\\s|$)")
    return check.test(element.className)
}

function buttonActive (event) {
    event.preventDefault()
    if(checkClass(this, "button-active")) removeClass(this, "button-active")
    else addClass(this, "button-active")
}

function deleteInfo(){
    this.parentElement.remove()
}

button.addEventListener("click", (event) => {
    event.preventDefault()
    console.log("new info created")
    let input = document.createElement('div')
    input.className = "info"
    input.innerHTML += `
    <button class="info-del">X</button>
    <div class="info-title">
    <form onSubmit="return false;">
        <label for="criteria">이벤트: </label>
        <input type="text" class="criteria" name="criteria">
    </form>
</div>
<div class="weekday-picker">
    <button class="weekday">SUN</button>
    <button class="weekday">MON</button>
    <button class="weekday">TUE</button>
    <button class="weekday">WEN</button>
    <button class="weekday">THU</button>
    <button class="weekday">FRI</button>
    <button class="weekday">SAT</button>
</div>
<div class="info-time">
    <form onSubmit="return false;">
        <label for="start-time" class="input-time">시작 시간: </label>
        <input type="time" class="time input-time start-time" name="start-time">
        <label for="end-time" class="input-time">종료 시간: </label>
        <input type="time" class="time input-time end-time" name="end-time">
    </form>
</div>`
    info.appendChild(input)
    weekday.forEach(e => {
        e.removeEventListener("click", buttonActive)
    })
    delButton.forEach(e => {
        e.removeEventListener("click", deleteInfo)
    })
    weekday = document.querySelectorAll(".weekday")
    delButton = document.querySelectorAll(".info-del")
    weekday.forEach(e => {
        e.addEventListener("click", buttonActive)
    })
    delButton.forEach(e => {
        e.addEventListener("click", deleteInfo)
    })
})
