const displayPassword = document.getElementById("password-display")
const copyButton = document.getElementById("copy-btn")
const copiedText = document.getElementById('copiedText')
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
const generateButton = document.querySelector('#submit-btn')

// console.log(lengthNumber);

let passwordLength = 10;
let checkCount = 0;
handleSlider()
displayStrength("#ccc")


function handleSlider(){
    passwordLength = inputSlider.value
    lengthNumber.innerHTML = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
    // console.log(passwordLength);
    
    
}

inputSlider.addEventListener('input', function(){
    // passwordLength = e.target.value
    // lengthNumber.innerHTML = passwordLength;
    handleSlider();
})

function generateRndIntgr(min, max){
    return Math.round(Math.random() * (max-min)) + min;
}

function generateRndNum(){
    return generateRndIntgr(0,9)
}

function generateLowerCase(){
    return  String.fromCharCode(generateRndIntgr(97,122))
}
function generateUpperCase(){
    return  String.fromCharCode(generateRndIntgr(65,90))
}

function generateSymbol(){
    const randomIndex = generateRndIntgr(0, symbols.length - 1)
    return symbols[randomIndex]
}

function displayStrength(color){
    strengthColor.style.backgroundColor = color;
    strengthColor.style.boxShadow = `0px 0px 12px 1px ${color}`;
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
    

    if ((hasUpperCase && hasLowerCase ) && (hasNumber || hasSymbol) && (passwordLength >= 8)) {
        displayStrength("green")
    }
     else if ((hasUpperCase || hasLowerCase) && (hasNumber || hasSymbol) && passwordLength >= 6) {
        displayStrength("yellow")
     }
     else {
        displayStrength("red")
     }
};





allCheckBoxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", function () {     
    if (checkbox.checked) {
      checkCount++;
    } else {
      checkCount--;
    }
    // console.log(checkCount);
  });
});

const copyToClipboard = async function(){
  
  try {
    await  navigator.clipboard.writeText(displayPassword.value)
    copiedText.classList.remove('active');

    setTimeout (function(){
        copiedText.classList.add('active');
    },2000)
  } catch (error) {
    console.log(`error occured`);
  }
} 

copyButton.addEventListener('click', copyToClipboard);
console.log(inputSlider.value)

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}


const generatePassword = () => {
    let password = "";
    displayPassword.value = "";

    // when password length is less than no. of checked boxes
    if (passwordLength < checkCount) {
        passwordLength = checkCount;
        inputSlider.value = passwordLength;
        lengthNumber.innerHTML = passwordLength;
    }
    

    if (upperCaseCheck.checked) {
        password += generateUpperCase()
    }

    if (lowerCaseCheck.checked) {
        password += generateLowerCase()

    }
    if (numbersCheck.checked) {
        password += generateRndNum()
    }
    if (symbolsCheck.checked) {
        password += generateSymbol()
    }

    console.log(password)

    for (let i = checkCount; i < passwordLength; i++) {
        let methodsArray = []

        if (upperCaseCheck.checked) {
            methodsArray.push(generateUpperCase)
        }

        if (lowerCaseCheck.checked){
            methodsArray.push(generateLowerCase)
        }

        if (numbersCheck.checked){
            methodsArray.push(generateRndNum)
        }

        if (symbolsCheck.checked){
            methodsArray.push(generateSymbol)
        }

        const randomMethod = methodsArray[generateRndIntgr(0, methodsArray.length - 1)]

        password += randomMethod();
        
    }

    console.log(password)

    // shuffle

    const passwordArray = Array.from(password);
    shuffleArray(passwordArray);
    const shuffledPassword = passwordArray.join('');
    console.log(shuffledPassword);

    displayPassword.value = shuffledPassword;
    CalcStrength();

    // console.log(password);
    // console.log(displayPassword);

}

generateButton.addEventListener('click', generatePassword)






