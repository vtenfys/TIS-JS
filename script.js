var grid = document.querySelector("#grid");
var node = [];

for (let i = 0; i < 12; i += 1) {
  node[i] = document.createElement("div");
  grid.appendChild(node[i]);

  node[i].classList.add("node");
  node[i].code = document.createElement("textarea");
  node[i].code.spellcheck = false;
  node[i].appendChild(node[i].code);

  if (i > 3) node[i].classList.add("margin-top");
  if (i % 4 !== 0) node[i].classList.add("margin-left");
}
