const newButton = document.querySelector(".info-button")
const infoContainer = document.querySelector(".info-div")
const loadButton = document.querySelector(".load-info")

let delButton = document.querySelectorAll('.info-del')
let weekday = document.querySelectorAll('.weekday')
let flag = false;

class PlanEvent{
    constructor(title, weekday, start, end){
        /* 
        * weekday = array 
        * if start length = 1 : time is always the same
        * else 0~ weekday order
        */

        this.title = title
        this.weekday = weekday
        this.start = start
        this.end = end;
    }
}

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

const getInfo = () => {
    const info = document.querySelectorAll(".info")
    info.forEach(e => {
        const title = e.children[1].children[0].children[1].value
        let weekdayArr = new Array()

        for(let i=0; i<7; i++){
            if(checkClass(e.children[2].children[i], "button-active")) weekdayArr.push(i)
        }

        console.log(e.children[3].children[0].children[1].value)
        console.log(e.children[3].children[0].children[3].value)

        console.log(`Title: ${title}\nWeekday: ${weekdayArr}`)
    })
}

newButton.addEventListener("click", (event) => {
    event.preventDefault()
    console.log("new info created")
    let newInfo = document.createElement('div')
    newInfo.className = "info"
    newInfo.innerHTML += `
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
    infoContainer.appendChild(newInfo)
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

loadButton.addEventListener("click", (event) => {
    event.preventDefault()
    getInfo()
})


