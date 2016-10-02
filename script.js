var node = [];

for (let i = 0; i < 12; i += 1) {
  node[i] = document.createElement("div");
  document.querySelector("#grid").appendChild(node[i]);

  node[i].classList.add("node");
  node[i].code = document.createElement("textarea");
  node[i].code.spellcheck = false;
  node[i].appendChild(node[i].code);

  if (i > 3) {
    node[i].classList.add("margin-top");
    node[i].arrow = {};

    for (let dir of ["up", "down"]) {
      node[i].arrow[dir] = document.createElement("div");
      node[i].arrow[dir].classList.add("arrow", dir);
      node[i].appendChild(node[i].arrow[dir]);
    }
  }
  if (i % 4 !== 0) {
    node[i].classList.add("margin-left");
    if (!node[i].arrow) node[i].arrow = {};

    for (let dir of ["left", "right"]) {
      node[i].arrow[dir] = document.createElement("div");
      node[i].arrow[dir].classList.add("arrow", dir);
      node[i].appendChild(node[i].arrow[dir]);
    }
  }
}

var TIS = {};
