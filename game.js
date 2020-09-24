let canvas = document.getElementById("area")
let context = canvas.getContext("2d")

let gamestate = {
  objects: [],
  lasttime: new Date().getTime(),
  x: 0,
  y: 0,
  jump: false
}

function render(state) {
  context.clearRect(0, 0, canvas.width, canvas.height);
  gamestate.objects.forEach(o => {
    if (o.x-state.x > -100 && o.x-state.x < canvas.width + 100 && o.y-state.y > -100 && o.y-state.y < canvas.height + 100)
      context.fillRect(o.x-state.x, o.y-state.y, o.width, o.height)
  })
  let current = new Date().getTime()
  let interval = Math.floor(1000/(current - state.lasttime))
  state.lasttime = current
  context.fillText("fps:" + interval, 10, 10);
}

function update(state) {
  if (state.jump) {
    state.y -= 5;
    // state.objects[0].x += 1;
  }
  
}

setInterval(update, 0, gamestate)

setInterval(render, 0, gamestate)

gamestate.objects.push({x: 20, y: 20, width: 10, height: 10})

i = 10000;
while (i > 0) {
  gamestate.objects.push({x: Math.random()*(canvas.width-60)+30, y: Math.random(canvas.height-60)+30-i*60, width: 50, height: 5})
  i--;
}

window.addEventListener("keyup", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case " ":
      gamestate.jump = false
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

window.addEventListener("keydown", function (event) {
  if (event.defaultPrevented) {
    return; // Do nothing if the event was already processed
  }

  switch (event.key) {
    case " ":
      gamestate.jump = true
      break;
    default:
      return; // Quit when this doesn't handle the key event.
  }

  // Cancel the default action to avoid it being handled twice
  event.preventDefault();
}, true);

  