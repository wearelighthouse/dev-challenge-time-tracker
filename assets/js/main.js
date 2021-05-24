import * as noUiSliderInit from "nouislider";

const slider = document.getElementById('slider');
const inputs = [...document.querySelectorAll('input.segment-value')];
const cumulativeSum = sum => element => sum += parseInt(element.value);

window.noUiSlider.create(slider, {
  start: inputs.slice(0, inputs.length - 1).map(cumulativeSum(0)),
  connect: Array(inputs.length).fill(true),
  step: 1,
  range: {
    'min': 0,
    'max': 100,
  },
});

function handleInputChange(event) {
  const newSliderValues = Array(inputs.length - 1);
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
