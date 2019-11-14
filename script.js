const textArea = document.querySelector('#tArea');
const essayArea = document.querySelector('.essayArea');
const min = document.querySelector('.min');
const sec = document.querySelector('.sec');
const wCount = document.querySelector('.wCount');
let totalMins = 19;
let totalSecs = 59;
const startBtn = document.querySelector('.start');
const allParas = [];

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
          el.textContent = item;
          essayArea.appendChild(el);
        });
      } else {
        totalMins--;
        totalSecs = 59;
      }
    }
    min.textContent = totalMins;
  }, 100);
});

//Reset Button
//Note -: word count not working properly
const resetBtn = document.querySelector('.reset');
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
