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
            <label for="start-time" class="input-time">Start: </label>
            <input type="time" class="time input-time start-time" name="start-time">
            <label for="end-time" class="input-time">End: </label>
            <input type="time" class="time input-time end-time" name="end-time">
        </form>
    </div>`

    const btn = document.createElement('button')
    const txt = document.createTextNode("Add Time")
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
    const info = document.querySelectorAll(".info")
    let events = new Array()

    info.forEach(e => {
        let obj = { title: e.children[1].children[0].children[1].value, time: new Array(7) }
        for(let i=0; i<7; i++){
            obj.time[i] = new Array()
        }
    
        for(let i=2; i<=e.children.length-2; i++){
            const startTime = e.children[i].children[2].children[0].children[1].value
            const endTime = e.children[i].children[2].children[0].children[3].value

            for(let j=0; j<7; j++){
                if(checkClass(e.children[i].children[1].children[j], "button-active")) obj.time[j].push({start: startTime, end: endTime})
            }
        }

        events.push(obj)
    })
    return events;
}


const showPlanner = (events) => {
    const planInfo = document.querySelectorAll(".plan-info")
    planInfo.forEach(e => e.innerHTML = "")

    events.forEach(e => {
        for(let i=0; i<7; i++){
            e.time[i].forEach(d => {
                const el = document.createElement('div')
                addClass(el, "event")

                let st = d.start.split(":"), ed = d.end.split(":")
                let stime = st[0]*60 + st[1]
                let etime = ed[0]*60 + ed[1]

                el.style.position = "absolute"
                el.style.top = stime/150 + "px"
                el.style.height = (etime-stime)/150 + "px"

                el.innerHTML = `${e.title}<br/>${d.start} ~ ${d.end}`
                planInfo[i].appendChild(el)
            })
        }
    })
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
        <label for="criteria">Event: </label>
        <input type="text" class="criteria" name="criteria" value="An Event Title">
    </form>
</div>
<button class="time-button">Add Time</button>`
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
    const events = getInfo()
    console.log(events)
    showPlanner(events)
})