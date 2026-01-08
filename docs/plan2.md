The use of AI:
As stated in the read me file, Claude.AI was used to implement a typewriter-style animation for the homepage text: "Hey there, welcome to my digital diary". I provided the HTML, and the JavaScript code I had so far and the prompt was the following:
"I have this HTML code, I proceeded to paste the code, and this Javascript, I proceeded to paste the code. I want the section that reads hey, welcome to my digital diary to have an animation that looks like a typewriter, that the text is being written. Please provide the necessary code for this."
To which the AI answered the following:

// =========================
// TYPEWRITER EFFECT
// =========================
const heroTitle = document.querySelector('.hero h1');
const text = heroTitle.textContent;
heroTitle.textContent = '';
heroTitle.style.visibility = 'visible';

let charIndex = 0;

function typeWriter() {
if (charIndex < text.length) {
heroTitle.textContent += text.charAt(charIndex);
charIndex++;
// Velocidad de escritura (ajusta el valor en milisegundos)
setTimeout(typeWriter, 80);
}
}

Now add this CSS to your stylesheet to enhance the typewriter effect with a blinking cursor:
/_ Add this to your CSS file _/

.hero h1 {
visibility: hidden; /_ Hide initially until typewriter starts _/
border-right: 2px solid; /_ Cursor effect _/
padding-right: 5px;
white-space: pre-wrap; /_ Preserve line breaks _/
animation: blink-caret 0.75s step-end infinite;
}

/_ Blinking cursor animation _/
@keyframes blink-caret {
from, to {
border-color: transparent;
}
50% {
border-color: currentColor;
}
}

/_ Optional: Remove cursor after typing is complete _/
.hero h1.typing-complete {
border-right: none;
animation: none;
}

I had an issue with the initial code Claude.AI gave me as the typewriter effect was reading the HTML content exactly as it was, including the <br> tag which means that the JavaScript code was ignoring the HTML tag, which causes "to" and "my" to appear together as "tomy". This was the prompt I wrote in order to fix the mistake:
"the text of hey there, welcome to my digital diary", reads" "tomy", which is incorrect, it should read "to my".
After explaining the issue, the final code Claude.AI gave me was the following:
// =========================
// TYPEWRITER EFFECT
// =========================
const heroTitle = document.querySelector('.hero h1');
const originalHTML = heroTitle.innerHTML;
// Split by <br> and join with a special marker
const text = originalHTML.replace(/<br\s\*\/?>/gi, '\n');
heroTitle.textContent = '';
heroTitle.style.visibility = 'visible';

let charIndex = 0;

function typeWriter() {
if (charIndex < text.length) {
const char = text.charAt(charIndex);
if (char === '\n') {
heroTitle.appendChild(document.createElement('br'));
} else {
heroTitle.appendChild(document.createTextNode(char));
}
charIndex++;
// Velocidad de escritura (ajusta el valor en milisegundos)
setTimeout(typeWriter, 80);
}
}
