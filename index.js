const lengthNumber = document.querySelector('#password-number');
const inputSlider = document.querySelector('#slider');
const upperCaseCheck = document.querySelector('#upperCase')
const lowerCaseCheck = document.querySelector('#lowerCase')
const numbersCheck = document.querySelector('#numbers')
const symbolsCheck = document.querySelector('#symbols');
const allCheckBoxes = document.querySelectorAll('input[type=checkbox]')
// console.log(allCheckBoxes);
const strengthColor = document.querySelector('#display-strength');
const symbols = "?/.,><;':[]{}=+-_()*&^%$#@!~`"

// console.log(lengthNumber);

let passwordLength = 10;
let checkCount = 0;
handleSlider()

function handleSlider(){
    lengthNumber.innerHTML = passwordLength;
    inputSlider.value = passwordLength;
    
}

inputSlider.addEventListener('change', function(e){
    passwordLength = e.target.value
    lengthNumber.innerHTML = passwordLength;
})

function generateRndIntgr(min, max){
    return Math.round(Math.random() * (max-min)) + min;
}

function generateRndNum(){
    return generateRndIntgr(0,9)
}

function generateLowerCase(){
    return  generateRndIntgr(97,123)
}
function generateUpperCase(){
    return  generateRndIntgr(65,91)
}

function generateSymbol(){
    const randomIndex = generateRndIntgr(0, symbols.length)
    return symbols[randomIndex]
}

function displayStrength(color){
    strengthColor.style.backgroundColor = color;
}

function CalcStrength(){
    let hasUpperCase = false;
    let hasLowerCase = false;
    let hasNumber = false;
    let hasSymbol = false;
    
    if (upperCaseCheck.checked) hasUpperCase = true;
    if (lowerCaseCheck.checked) hasLowerCase = true;
    if (numbersCheck.checked) hasNumber = true;
    if (symbolsCheck.checked) hasSymbol = true;
    

    if (hasUpperCase && hasLowerCase (hasNumber || hasSymbol) && passwordLength >= 8) {
        displayStrength("green")
    }
     else if ((hasUpperCase || hasLowerCase) && (hasNumber || hasSymbol) && passwordLength >= 6) {
        displayStrength("yellow")
     }
     else {
        displayStrength("red")
     }
};


// continue from here above codes are all good, no need to rewrite just read again

allCheckBoxes.forEach(function (checkbox){
    checkbox.addEventListener("change", function(){
        checkCount = 0;
        
        
    })
})




