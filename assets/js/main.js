import * as noUiSliderInit from "nouislider";

const slider = document.getElementById('slider');

window.noUiSlider.create(slider, {
  start: [25, 50],
  connect: [ true, true, true ],
  step: 1,
  range: {
    'min': 0,
    'max': 100,
  },
});

const inputs = [...document.querySelectorAll('input.segment-value')];

function handleInputChange(event) {
  const newSliderValues = new Array(inputs.length - 1);
  const targetIndex = inputs.indexOf(event.target);

  if (targetIndex < inputs.length - 1) {
    const sumBeforeTarget = inputs.reduce((acc, curr, i) => i > targetIndex ? acc : acc + parseInt(curr.value), 0);
    newSliderValues[targetIndex] = sumBeforeTarget;
  } else {
    newSliderValues[targetIndex - 1] = 100 - parseInt(event.target.value);
  }

  slider.noUiSlider.set(newSliderValues);
}

inputs.forEach((input, i) => {
  input.addEventListener('input', handleInputChange);
});

slider.noUiSlider.on('update', function (values) {
  let runningTotal = Math.round(values[0]);

  inputs[0].value = runningTotal;

  for (let i = 1; i < inputs.length - 1; i++) {
    const sliderThumbValue = Math.round(values[i]);
    inputs[i].value = sliderThumbValue - runningTotal;
    runningTotal += sliderThumbValue - runningTotal;
  }

  inputs[inputs.length - 1].value = 100 - runningTotal;
});
