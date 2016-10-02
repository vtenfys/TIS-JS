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
    document.body.style.left = (window.innerWidth / 2 - 683) + "px";
    document.body.style.top = (window.innerHeight / 2 - 384) + "px";
  }
  updateSize();
  window.addEventListener("resize", updateSize);
})();
