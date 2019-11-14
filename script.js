const textArea = document.querySelector('#tArea');
const essayArea = document.querySelector('.essayArea');
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');
const wCount = document.querySelector('.wCount');
let totalMins = 19;
let totalSecs = 59;
const startBtn = document.querySelector('.start');
const allParas = [];
const resetBtn = document.querySelector('.reset');
const editBtn = document.querySelector('.edit');

// Some initalzing
textArea.style.cursor = 'not-allowed';
editBtn.disabled = true;
resetBtn.disabled = true;

// Word Count Logic
textArea.addEventListener('keyup', function(e) {
  let essayText = this.value;
  if (e.keyCode != 32) {
    const textArray = essayText.split(' ');
    let essayLength = textArray.length;
    if (textArray[0] == '') {
      wCount.textContent = 0;
    } else {
      wCount.textContent = essayLength;
    }
  }
});

startBtn.addEventListener('click', () => {
  //Disabling Start button and enabling text-area
  textArea.disabled = false;
  textArea.style.cursor = 'text';
  startBtn.disabled = true;
  startBtn.style.cursor = 'not-allowed';
  //Creating the timer...
  const intervalId = setInterval(() => {
    sec.textContent = totalSecs;
    //Just to add zero infront of single nums like 1,2,3
    if (totalSecs < 10) {
      sec.textContent = `0${totalSecs}`;
    }
    totalSecs--;

    if (totalSecs < 1) {
      if (totalMins <= 0) {
        clearInterval(intervalId);
        alert('Times Up');
        //Creating Paras....
        const bodyParas = textArea.value.split('\n');
        bodyParas.forEach((val, i) => {
          if (val != '') {
            allParas.push(val);
          }
        });
        // Removing textarea tag
        essayArea.innerHTML = '';
        //Inserting paras into Webpage
        allParas.forEach(item => {
          let el = document.createElement('p');
          let brEl = document.createElement('br');
          el.textContent = item;
          essayArea.appendChild(el);
          essayArea.appendChild(brEl);
        });
        // Enabling Edit and Reset buttons
        editBtn.disabled = false;
        resetBtn.disabled = false;
      } else {
        totalMins--;
        totalSecs = 59;
      }
    }
    min.textContent = totalMins;
  }, 1000);
});

//Reset Button
//Note -: word count not working properly
resetBtn.addEventListener('click', () => {
  totalMins = 19;
  totalSecs = 59;
  sec.textContent = totalSecs;
  min.textContent = totalMins;
  essayArea.innerHTML = `<textarea name="essay-area"
  cols="80"
  rows="18"
  id="tArea"
  placeholder="Write Your Essay Here!!!!"
  disabled></textarea>`;
  startBtn.disabled = false;
});

// Edit button
editBtn.addEventListener('click', () => {
  //textArea.style.cursor = 'text';
  essayArea.innerHTML = `<textarea name="essay-area"
  cols="80"
  rows="18"
  id="tArea"
  placeholder="Write Your Essay Here!!!!">${textArea.value}</textarea>`;
});
