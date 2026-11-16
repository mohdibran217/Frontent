
let display = document.querySelector(".box");
let buttons = document.querySelectorAll(".tab");
let clear = document.querySelector(".Rbox");
let del = document.querySelector(".Bbox");

let expression = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        let value = button.innerText.trim();

        if (value === "=") {
            try {
                expression = eval(expression);
                display.innerText = expression;
            } catch {
                display.innerText = "Error";
                expression = "";
            }
        } else {
            expression += value;
            display.innerText = expression;
        }
    });
});

// CLEAR button
clear.addEventListener("click", () => {
    expression = "";
    display.innerText = "";
});

// DELETE button
del.addEventListener("click", () => {
    expression = expression.slice(0, -1);
    display.innerText = expression;
});
