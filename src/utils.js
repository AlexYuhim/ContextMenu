export const colors = [
  "#FED17C",
  "#FABBA0",
  "#F3EAE7",
  "#9093F3",
  "#1D1DE7",
  "#E7212E",
  "#21E738",
  "#CE8AF0",
  "#AAF071",
  "#50C878",
  "#DCE70B",
  "#E7506E",
  "#4C3EE7",
  "#9CE790",
  "#8421E7",
  '#365a76',
  '#092b46',
  '#84BF7D',
  '#A3BF6B',
  '#BF4A18',
  '#BF21B7',
  '#3624BF',
  '#2BBF1B',
  '#F0EAD6',
  '#F0BD71',
  '#F0354B',
  '#F0D717',
  '#4313F0',
  "#E70ED1",
  "#DCE70B",
];

export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}



export function getColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}


export function setColor(element) {
  element.style.backgroundColor = getColor();
  element.style.boxShadow = `0 0 2px${getColor()}, 0 0 10px${getColor()}`;
}

export function removeColor(element) {
  element.style.backgroundColor = "#1d1d1d";
  element.style.boxShadow = "0 0 2px #000";
}

