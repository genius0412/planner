const button = document.querySelector(".info-button")
const info = document.querySelector(".info-div")
const weekday = document.querySelectorAll('.weekday')

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


button.addEventListener("click", (event) => {
    event.preventDefault()
    console.log("new info created")
    let input = document.createElement('div')
    input.className = "info"
    input.innerHTML += `<div class="info-title">
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
})

weekday.forEach(e => {
    e.addEventListener("click", (event) => {
        event.preventDefault()
        if(checkClass(e, "button-active")) removeClass(e, "button-active")
        else addClass(e, "button-active")
    })
})