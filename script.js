/* This file is licensed under the MIT License. See LICENSE for details. */

var node = [];
var save = [];

for (let i = 0; i < 12; i += 1) {
  node[i] = document.createElement("div");
  document.querySelector("#grid").appendChild(node[i]);
  node[i].classList.add("node");

  node[i].outgate = {};
  node[i].ready = true;

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
  eval: function (nodei, cmd) {
    cmd = cmd.replace(/( |,)( |,)+/g, " ");
    cmd = cmd.replace(/(^ +)|( +$)/g, "")

    cmd = cmd.split(" ");
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

    else if (cmd[0] === "mov") {
      if (cmd.length < 3) throw new SyntaxError("missing operand");
      if (cmd.length > 3) throw new SyntaxError("too many operands");
      TIS.mov(nodei, cmd[1], cmd[2]);
    }

    else if (cmd[0] === "swp") {
      if (cmd.length > 1) throw new SyntaxError("too many operands");
      TIS.swp(nodei); 
    }

    else if (cmd[0] === "sav") {
      if (cmd.length > 1) throw new SyntaxError("too many operands");
      TIS.sav(nodei);
    }

    else if (cmd[0] === "add") {
      if (cmd.length < 2) throw new SyntaxError("missing operand");
      if (cmd.length > 2) throw new SyntaxError("too many operands");
      TIS.add(nodei, cmd[1]);
    }

    else if (cmd[0] === "sub") {
      if (cmd.length < 2) throw new SyntaxError("missing operand");
      if (cmd.length > 2) throw new SyntaxError("too many operands");
      TIS.sub(nodei, cmd[1]);
    }

    else {
      throw new SyntaxError('invalid opcode "' + cmd[0] + '"');
    }
  },

  getAcc: function (nodei) {
    return node[nodei].acc.getAttribute("data-value");
  },
  getBak: function (nodei) {
    return node[nodei].bak.getAttribute("data-value")
      .replace(/\(([0-9]+)\)/, "$1");
  },
  setAcc: function (nodei, src) {
    node[nodei].acc.setAttribute("data-value", src);
  },
  setBak: function (nodei, src) {
    node[nodei].bak.setAttribute("data-value", src);
  },

  mov: function (nodei, src, dst) {
    if (src.match(/^[0-9]+$/)) {
      if (["up", "right", "down", "left"].indexOf(dst) !== -1) {
        if (node[nodei].outgate[dst] && node[nodei].outgate[dst].match(/a-z/)) {
          if (dst === "up")         var dstnode = nodei - 4;
          else if (dst === "right") var dstnode = nodei + 1;
          else if (dst === "down")  var dstnode = nodei + 4;
          else                      var dstnode = nodei - 1;
          TIS.mov(dstnode, src, node[nodei].outgate[dst]);
          node[dstnode].ready = true;
        } else {
          node[nodei].outgate[dst] = src;
          node[nodei].ready = false;
        }
      } else if (dst === "acc") {
        node[nodei].acc.setAttribute("data-value", src);
      } else if (dst === "nil") ; else {
        throw new ReferenceError('invalid register "' + dst + '"');
      }
    } else if (["up", "right", "down", "left"].indexOf(src) !== -1) {
      if (src === "up") {
        var rule = nodei > 3;
        var dstnode = nodei - 4;
        var dstdir = "down";
      } else if (src === "right") {
        var rule = nodei < 11;
        var dstnode = nodei + 1;
        var dstdir = "left";
      } else if (src === "down") {
        var rule = nodei < 8;
        var dstnode = nodei + 4;
        var dstdir = "up";
      } else {
        var rule = nodei > 0;
        var dstnode = nodei - 1;
        var dstdir = "right";
      }
      if (rule) {
        if (node[dstnode].outgate[dstdir]) {
          TIS.mov(nodei, node[dstnode].outgate[dstdir], dst);
          node[dstnode].ready = true;
        } else {
          node[dstnode].outgate[dstdir] = dst;
          node[nodei].ready = false;
        }
      }
    } else if (src === "acc") {
      TIS.mov(nodei, node[nodei].acc.getAttribute("data-value"), dst);
    } else if (src === "nil") {
      TIS.mov(nodei, "0", dst);
    } else {
      throw new SyntaxError('invalid expression "' + src + '"');
    }
  },

  swp: function (nodei) {
    var acc = TIS.getAcc(nodei);
    var bak = TIS.getBak(nodei);

    TIS.setBak(nodei, acc);
    TIS.setAcc(nodei, bak);
  },

  sav: function (nodei) {
    TIS.setBak(nodei, TIS.getAcc(nodei));
  },

  add: function (nodei, src) {
    var acc = parseInt(TIS.getAcc(nodei));
    TIS.setAcc(nodei, (acc + parseInt(src)).toString());
  },

  sub: function (nodei, src) {
    var acc = parseInt(TIS.getAcc(nodei));
    TIS.setAcc(nodei, (acc - parseInt(src)).toString());
  }
};
