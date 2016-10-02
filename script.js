/* This file is licensed under the MIT License. See LICENSE for details. */

var node = [];
var save = [];

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
      text[i] = text[i].toLowerCase();
    }
    this.value = text.slice(0, 15).join('\n');

    save[i] = this.value;
    window.name = JSON.stringify(save);
  });

  node[i].appendChild(node[i].code);

  for (let thing of ["acc", "bak", "last", "mode", "idle"]) {
    node[i][thing] = document.createElement("div");
    node[i][thing].classList.add("data", thing);
    node[i][thing].innerHTML = "<br />";
    node[i].appendChild(node[i][thing]);
  }

  node[i].acc.setAttribute("data-value", "0");
  node[i].bak.setAttribute("data-value", "(0)");
  node[i].last.setAttribute("data-value", "n/a");
  node[i].mode.setAttribute("data-value", "idle");
  node[i].idle.setAttribute("data-value", "0%");

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

if (window.name !== "") {
  save = JSON.parse(window.name);
  for (let i = 0; i < 12; i += 1) {
    node[i].code.value = save[i] || "";
  }
}

var TIS = {
  runCmd: function (cmd, node) {
    cmd = cmd.replace(/((\s)\s+)|,/g, "$2").split(" ");
    if ((!cmd[0][0]) || cmd[0][0] === "#") return;

    for (let i = 1; i < cmd.length; i += 1) {
      if (cmd[i][0] === "#") {
        cmd = cmd.slice(0, i);
        break;
      }
    }

    if (cmd[0] === "nop") {
      if (cmd[1]) throw new SyntaxError("too many operands");
      return;
    }

    if (cmd[0] === "mov") {
      if (cmd.length < 3) throw new SyntaxError("missing operand");
      if (cmd.length > 3) throw new SyntaxError("too many operands");
    }
  }
};
