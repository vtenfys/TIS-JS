/* This file is licensed under the MIT License. See LICENSE for details. */

var node = [];

for (let i = 0; i < 12; i += 1) {
  node[i] = document.createElement("div");
  document.querySelector("#grid").appendChild(node[i]);

  node[i].classList.add("node");
  node[i].code = document.createElement("textarea");

  node[i].code.spellcheck = false;
  node[i].code.addEventListener("input", function () {
    var text = this.value.split("\n");
    for (let i = 0; i < text.length; i += 1) {
      if (text[i].length > 18) text[i] = text[i].substring(0, 18);
    }
    this.value = text.join('\n');
  });

  node[i].appendChild(node[i].code);

  for (let thing of ["acc", "bak", "last", "mode", "idle"]) {
    node[i][thing] = document.createElement("div");
    node[i][thing].classList.add("data", thing);
    node[i].appendChild(node[i][thing]);
  }

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
