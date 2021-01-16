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

class Events {
    constructor(){
        this.events = []
    }

    newEvent(title, weekday, start, end){
        const e = new PlanEvent(title, weekday, start, end)
        this.events.push(e)
        return e
    }

    get allEvents(){
        return this.events
    }

    get length(){
        return this.events.length
    }

    delEvent(idx){
        if(idx > this.events.length || idx < 0) return
        this.events.splice(idx, 1)
    }
}

const events = new Events()
const newButton = document.querySelector(".info-button")
const infoContainer = document.querySelector(".info-div")
const loadButton = document.querySelector(".load-info")

let delButton = document.querySelectorAll('.info-del')
let timeButton = document.querySelectorAll('.time-button')
let weekday = document.querySelectorAll('.weekday')
let timeDel = document.querySelectorAll('.time-del')
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
    for(let i=100; i>=0; i--){
        this.parentElement.style.opacity = i + "%"
    }
    setTimeout(() => {
        this.parentElement.remove()
    }, 700)
}

function delTime(){
    const el = this.parentElement
    this.parentElement.remove()

    const btn = document.createElement('button')
    const txt = document.createTextNode("시간 추가")
    addClass(btn, "time-button")
    btn.appendChild(txt)
    el.appendChild(btn)

    timeButton.forEach(e => {
        e.removeEventListener("click", addTime)
    })
    timeButton = document.querySelectorAll(".time-button")
    timeButton.forEach(e => {
        e.addEventListener("click", addTime)
    })
}

function addTime(){
    const el = this.parentElement
    this.remove()
    const divContainer = document.createElement('div')
    addClass(divContainer, "relative")
    divContainer.innerHTML += `
    <button class="time-del">X</button>
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

    const btn = document.createElement('button')
    const txt = document.createTextNode("시간 추가")
    addClass(btn, "time-button")
    btn.appendChild(txt)


    el.appendChild(divContainer)
    el.appendChild(btn)

    weekday.forEach(e => {
        e.removeEventListener("click", buttonActive)
    })
    timeButton.forEach(e => {
        e.removeEventListener("click", addTime)
    })
    timeDel.forEach(e => {
        e.removeEventListener("click", delTime)
    })
    weekday = document.querySelectorAll(".weekday")
    timeButton = document.querySelectorAll(".time-button")
    timeDel = document.querySelectorAll('.time-del')
    weekday.forEach(e => {
        e.addEventListener("click", buttonActive)
    })
    timeButton.forEach(e => {
        e.addEventListener("click", addTime)
    })
    timeDel.forEach(e => {
        e.addEventListener("click", delTime)
    })
}

const getInfo = () => {
    for(let i=0; i<events.length; i++){
        events.delEvent(0)
    }

    const info = document.querySelectorAll(".info")
    info.forEach(e => {
        let obj = { title: e.children[1].children[0].children[1].value }
        let time = new Array(7)
        for(let i=0; i<7; i++){
            time[i] = new Array()
        }

        for(let i=2; i<=e.children.length-2; i++){
            const startTime = e.children[i].children[2].children[0].children[1].value
            const endTime = e.children[i].children[2].children[0].children[3].value

            for(let j=0; j<7; j++){
                if(checkClass(e.children[i].children[1].children[j], "button-active")) time[j].push({start: startTime, end: endTime})
            }
            obj["time"] = time
        }

        console.log(`Title: ${obj.title}`)
        console.log(obj)
    })
}


const showPlanner = () => {
    /*
    const planInfo = document.querySelectorAll(".plan-info")
    planInfo.forEach(e => e.innerHTML = "")
    
    events.allEvents.forEach(e => {
        e.weekday.forEach(w => {
            if(e.weekday.length > e.start.length)
            let eventDiv = document.createElement('div')
            const text = document.createTextNode(`${e.title}\n${e.start} ~ ${e.end}`)
            addClass(eventDiv, "event")
            eventDiv.appendChild(text)
        })
    })*/
}

newButton.addEventListener("click", (event) => {
    event.preventDefault()
    console.log("new info created")
    let newInfo = document.createElement('div')
    addClass(newInfo, "info")
    newInfo.innerHTML += `
    <button class="info-del">X</button>
    <div class="info-title">
    <form onSubmit="return false;">
        <label for="criteria">이벤트: </label>
        <input type="text" class="criteria" name="criteria" value="이벤트 이름">
    </form>
</div>
<button class="time-button">시간 추가</button>`
    infoContainer.appendChild(newInfo)
    weekday.forEach(e => {
        e.removeEventListener("click", buttonActive)
    })
    delButton.forEach(e => {
        e.removeEventListener("click", deleteInfo)
    })
    timeButton.forEach(e => {
        e.removeEventListener("click", addTime)
    })
    weekday = document.querySelectorAll(".weekday")
    delButton = document.querySelectorAll(".info-del")
    timeButton = document.querySelectorAll(".time-button")
    weekday.forEach(e => {
        e.addEventListener("click", buttonActive)
    })
    delButton.forEach(e => {
        e.addEventListener("click", deleteInfo)
    })
    timeButton.forEach(e => {
        e.addEventListener("click", addTime)
    })
})

loadButton.addEventListener("click", (event) => {
    event.preventDefault()
    getInfo()
    showPlanner()
})