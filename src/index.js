import "./styles.css";

const containerElem = document.getElementById("container");
const sliderElem = document.getElementById("slider");
const hsvElem = document.getElementById("hsv");
const rgbElem = document.getElementById("rgb");
const hexElem = document.getElementById("hex");

function intToHsv(int) {
  const h = (int & 1023) / 1023; // 10bit
  const s = ((int >> 10) & 1023) / 1023; // 10bit
  const v = ((int >> 20) & 4095) / 4095; // 12bit
  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100)
  };
}

function hsvToRgb(hsv) {
  let h, s, v, r, g, b, i, f, p, q, t;
  h = hsv.h / 360;
  s = hsv.s / 100;
  v = hsv.v / 100;
  i = Math.floor(h * 6);
  f = h * 6 - i;
  p = v * (1 - s);
  q = v * (1 - f * s);
  t = v * (1 - (1 - f) * s);
  switch (i % 6) {
    default:
      break;
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
  }
  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255)
  };
}

function rgbToHex(rgb) {
  return (
    "#" +
    ((1 << 24) + (rgb.r << 16) + (rgb.g << 8) + rgb.b).toString(16).slice(1)
  );
}

function sliderUpdated() {
  const hsv = intToHsv(sliderElem.value);
  const rgb = hsvToRgb(hsv);
  const hex = rgbToHex(rgb);
  hsvElem.textContent = `HSV: ${hsv.h}°, ${hsv.s}%, ${hsv.v}%`;
  rgbElem.textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
  hexElem.textContent = `HEX: ${hex}`;
  document.body.style.backgroundColor = hex;
}

sliderElem.addEventListener("input", sliderUpdated);
sliderUpdated();
containerElem.style.display = "flex";
