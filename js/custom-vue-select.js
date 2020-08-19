

function initAllSelect() {
  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "input-field": */
  x = document.getElementsByClassName("input-field");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    if (!selElmnt) {
      continue;
    }
    initSelect(x[i]);
  }
}

function closeAllSelect(elmnt) {
  /* A function that will close all select boxes in the document,
  except the current select box: */
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].previousElementSibling.classList.add("active");
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}


function initSelect(inputFieldSelect) {
  selElmnt = inputFieldSelect.getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /* For each element, if DIV already exist, delete it */
  var ss, si;
  ss = inputFieldSelect.getElementsByClassName("select-selected")[0];
  si = inputFieldSelect.getElementsByClassName("select-items")[0];
  if(ss && si) {
    inputFieldSelect.removeChild(ss);
    inputFieldSelect.removeChild(si);
  }

  if (selElmnt.selectedIndex < 0 && selElmnt.options.length) {
    // We just have to set
    selElmnt.selectedIndex = 0;
    selElmnt.dispatchEvent(new Event('change'));
  }

  /* For each element, create a new DIV that will act as the selected item: */
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  inputFieldSelect.appendChild(a);
  /* For each element, create a new DIV that will contain the option list: */
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 0; j < ll; j++) {
    /* For each option in the original select element,
    create a new DIV that will act as an option item: */
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    if (selElmnt.options[j].selected) c.setAttribute("class", "same-as-selected");
    c.addEventListener("click", function (e) {
      /* When an item is clicked, update the original select box,
      and the selected item: */
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          /* Trigger on change event for Vuejs */
          s.dispatchEvent(new Event('change'));
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  inputFieldSelect.appendChild(b);
  a.addEventListener("click", function (e) {
    /* When the select box is clicked, close any other select boxes,
    and open/close the current select box: */
    e.stopPropagation();
    closeAllSelect(this);
    this.previousElementSibling.classList.toggle("active");
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}

/* Select DOM Observer */
const observeSelectDom = function() {
  const callback = function(mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    const done = [];
    for (const mutation of mutationsList) {
      if(mutation.type === 'attributes' && mutation.attributeName === 'value') {
        const node = mutation.target.parentNode.parentNode;
        if(node.classList && node.classList.contains('input-field') &&
        node.classList.contains('select') && !done.includes(node)) {
          initSelect(node);
          done.push(node);
        }
      }
      if (mutation.type === 'childList') {
        if (mutation.addedNodes.length) {
          for (const node of mutation.addedNodes) {
            if (node.classList && node.classList.contains('input-field') &&
              node.classList.contains('select') && !done.includes(node)) {
              initSelect(node);
              done.push(node);
            } else if (node.childNodes.length) {
              const selectNodes = node.querySelectorAll('.input-field.select');
              for (const nodeSelect of selectNodes) {
                if(!done.includes(nodeSelect)) {
                  initSelect(nodeSelect);
                  done.push(nodeSelect);
                }
              }
            }
          }
        }
      }
    }
  };
  // Observe only select under <form>
  const targetNode = document.querySelector('body');
  const config = { attributes: true, childList: true, subtree: true };

  // Create an observer instance linked to the callback function
  const observer = new MutationObserver(callback);

  // Start observing the target node for configured mutations
  observer.observe(targetNode, config);

  // Start observing select change

}
