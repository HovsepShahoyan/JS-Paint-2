(function(window, document) {
window.colors = colors;
let canvas;
let context;
let xCord;
let yCord;
let drawing = false;
let radius = 24;
let pen_color = "black";
let pen_width = "2";
let tool;
canvas = document.getElementById("canvas");
context = canvas.getContext("2d");
context.strokeStyle = pen_color;
context.lineWidth = pen_width;
let brushButton = document.getElementById("brush");
let sprayButton = document.getElementById("spray");
let rectangleButton = document.getElementById("rectangle");
let fillButton = document.getElementById("fill");
let circleButton = document.getElementById("circle");
let lineButton = document.getElementById("line");
let clearButton = document.getElementById("clear");

brushButton.onclick = function brush() {
    console.log(tool);
    tool = "brush";
    console.log(tool);
    canvas.addEventListener("mousedown", (event) => {
        drawing = true;
        context.beginPath();
        context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        event.preventDefault();
    });
    canvas.addEventListener("mousemove", (event) => {
        if (drawing) {
            context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
            context.strokeStyle = pen_color;
            context.stroke();
        }
        event.preventDefault();
    });
    canvas.addEventListener("mouseup", (event) => {
        if (drawing) {
            context.stroke();
            context.closePath();
            drawing = false;
        }
    });
}

sprayButton.onclick = () => {
    tool = "spray";
}
sprayButton.onclick = function spray() {

    console.log(tool)
    tool = "spray";
    console.log(tool);
    canvas.addEventListener("mousedown", (event) => {
        event.preventDefault();
        context.beginPath();
        context.strokeStyle = pen_color;
        context.moveTo(event.clientX, event.clientY);
        drawing = true;
    });

    canvas.addEventListener("mousemove", (event) => {
        event.preventDefault();
        if (drawing) {
            context.strokeStyle = pen_color;
            context.arc(
                event.clientX + Math.cos(Math.random() * Math.PI * 2) * radius * Math.random(),
                event.clientY + Math.sin(Math.random() * Math.PI * 2) * radius * Math.random(), 1, 0, Math.PI * 2, false);
            context.fill();
        }
    });

    canvas.addEventListener("mouseup", (event) => {
        event.preventDefault();
        if (drawing) {
            drawing = false;
            context.stroke();
            context.closePath();
        }
    });
}

rectangleButton.onclick = function rectangle() {
    canvas.addEventListener("mousedown", (event) => {
        context.beginPath();
        xCord = event.clientX - canvas.offsetLeft;
        yCord = event.clientY - canvas.offsetTop;
        context.strokeStyle = pen_color;
        drawing = true;
    })

    canvas.addEventListener("mousemove", (event) => {
        if (drawing) {
            context.strokeRect(xCord, yCord, event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
            drawing = false;
        }
    })

    canvas.addEventListener("mouseup", (event) => {
        context.stroke();
        context.closePath();
    })
}

fillButton.onclick = function fill() {
    canvas.addEventListener("mousedown", (event) => {
        context.beginPath();
        xCord = event.clientX - canvas.offsetLeft;
        yCord = event.clientY - canvas.offsetTop;
        context.fillStyle = pen_color;
        context.strokeStyle = pen_color;
        drawing = true;
    })

    canvas.addEventListener("mousemove", (event) => {
        if (drawing) {
            context.fillRect(xCord, yCord, event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
            drawing = false;
        }
    })

    canvas.addEventListener("mouseup", (event) => {
        context.stroke();
        context.closePath();
        context.fillStyle = "white"
    })
}

circleButton.onclick = function circle() {
    canvas.addEventListener("mousedown", (event) => {
        context.beginPath();
        xCord = event.clientX - canvas.offsetLeft;
        xCord /= 2;
        yCord = event.clientY - canvas.offsetTop;
        yCord /= 2;
        context.strokeStyle = pen_color;
        drawing = true;
    })

    canvas.addEventListener("mousemove", (event) => {
        if (drawing) {
            context.arc(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop, xCord, yCord, 2 * Math.PI);
            drawing = false;
        }
    })

    canvas.addEventListener("mouseup", (event) => {
        context.stroke();
        context.closePath();
    })
}

lineButton.onclick = function line() {
    canvas.addEventListener("mousedown", (event) => {
        context.beginPath();
        context.strokeStyle = pen_color;
        context.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        drawing = true;
    })

    canvas.addEventListener("mousemove", (event) => {
        if (drawing) {

            context.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        }
    })

    canvas.addEventListener("mouseup", (event) => {
        context.stroke();
        context.closePath();
        drawing = false;
    })
}

clearButton.onclick = function clear() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function colors(value) {
    drawing = false;
    pen_color = value;
}

})(this, window.document);