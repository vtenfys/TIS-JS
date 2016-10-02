/*
 * To the extent possible under law, David Bailey has waived all copyright and
 * related or neighboring rights to this file under the CC0.
 * See <https://creativecommons.org/publicdomain/zero/1.0/> for details.
 */

(function () {
  var script = document.querySelector("script[src$='autozoom.js']");
  var width = script.getAttribute("data-width");
  var height = script.getAttribute("data-height");

  function updateSize() {
    if (window.innerWidth / window.innerHeight > width / height) {
      document.body.style.transform = "scale(" + (window.innerHeight / height) + ")";
    } else {
      document.body.style.transform = "scale(" + (window.innerWidth / width) + ")";
    }
    document.body.style.left = ((window.innerWidth - width) / 2) + "px";
    document.body.style.top = ((window.innerHeight - height) / 2) + "px";
  }
  updateSize();
  window.addEventListener("resize", updateSize);
})();
