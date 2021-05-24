import * as noUiSliderInit from "nouislider";

const slider = document.getElementById('slider');

window.noUiSlider.create(slider, {
  start: [25, 50],
  connect: [ true, true, true ],
  range: {
    'min': 0,
    'max': 100
  },
});
