const button = document.querySelector(".info-button")
const info = document.querySelector(".info-div")

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