

function initAllSelect() {
  var x, i, j, l, ll, selElmnt, a, b, c;
  /* Look for any elements with the class "input-field": */
  x = document.getElementsByClassName("input-field");
  l = x.length;
  for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    if (!selElmnt) continue;
    ll = selElmnt.length;
    /* For each element, create a new DIV that will act as the selected item: */
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
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
    x[i].appendChild(b);
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

// Initialize custom selects on load
document.addEventListener('DOMContentLoaded', function () {
  initAllSelect();
  document.addEventListener('click', function (e) {
    closeAllSelect(e.target);
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const inputSelector =
    'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';

  // Add active class if field has value (on load and change)
  document.querySelectorAll(inputSelector).forEach(function (el) {
    if (el.value.length !== 0 || el.getAttribute('placeholder') !== null) {
      const label = el.parentNode.querySelector('label');
      if (label) {
        label.classList.add('active');
      }
    }
    el.addEventListener('change', function () {
      if (el.value.length !== 0 || el.getAttribute('placeholder') !== null) {
        const label = el.parentNode.querySelector('label');
        if (label) {
          label.classList.add('active');
        }
      }
    });
  });

  // Add active class on focus
  document.addEventListener(
    'focus',
    function (e) {
      if (e.target.matches(inputSelector)) {
        const label = e.target.parentNode.querySelector('label, .prefix');
        if (label) {
          label.classList.add('active');
        }
      }
    },
    true
  );

  // Remove active class on blur
  document.addEventListener(
    'blur',
    function (e) {
      const target = e.target;
      if (target.matches(inputSelector)) {
        let selector = '.prefix';
        if (
          target.value.length === 0 &&
          target.validity.badInput !== true &&
          !target.getAttribute('placeholder')
        ) {
          selector += ', label';
        }
        const siblings = target.parentNode.querySelectorAll(selector);
        siblings.forEach(function (el) {
          el.classList.remove('active');
        });
      }
    },
    true
  );

  // Password visibility toggle
  document.querySelectorAll('input[type=password]').forEach(function (el) {
    const toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'password-toggle';
    toggle.setAttribute('aria-label', 'Toggle password visibility');
    toggle.textContent = 'Show';
    const parent = el.parentNode;
    parent.classList.add('has-toggle');
    toggle.addEventListener('mousedown', function (e) {
      // Keep focus on the input when clicking the toggle
      e.preventDefault();
    });
    toggle.addEventListener('click', function () {
      if (el.type === 'password') {
        el.type = 'text';
        toggle.textContent = 'Hide';
      } else {
        el.type = 'password';
        toggle.textContent = 'Show';
      }
    });
    parent.appendChild(toggle);
  });

  // Radio and checkbox focus class
  const rcSelector = 'input[type=radio], input[type=checkbox]';
  document.querySelectorAll(rcSelector).forEach(function (el) {
    el.addEventListener('keyup', function (e) {
      if (e.key === 'Tab' || e.keyCode === 9) {
        el.classList.add('tabbed');
        const removeTab = function () {
          el.classList.remove('tabbed');
          el.removeEventListener('blur', removeTab);
        };
        el.addEventListener('blur', removeTab);
      }
    });
  });

  // Number input controls
  document.querySelectorAll('.number-field').forEach(function (wrapper) {
    const input = wrapper.querySelector('input[type=number]');
    const inc = wrapper.querySelector('.increment');
    const dec = wrapper.querySelector('.decrement');
    if (inc) {
      inc.addEventListener('click', function () {
        input.stepUp();
        input.dispatchEvent(new Event('change'));
      });
    }
    if (dec) {
      dec.addEventListener('click', function () {
        input.stepDown();
        input.dispatchEvent(new Event('change'));
      });
    }
  });

  // Tags input
  const tagsInput = document.getElementById('tags-text');
  const tagsContainer = document.getElementById('tags-input');
  if (tagsInput && tagsContainer) {
    tagsInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && tagsInput.value.trim() !== '') {
        e.preventDefault();
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = tagsInput.value.trim();
        const remove = document.createElement('button');
        remove.type = 'button';
        remove.className = 'remove-tag';
        remove.setAttribute('aria-label', 'Remove tag');
        remove.textContent = '×';
        tag.appendChild(remove);
        tagsContainer.insertBefore(tag, tagsInput);
        tagsInput.value = '';
      }
    });
    tagsContainer.addEventListener('click', function (e) {
      if (e.target.classList.contains('remove-tag')) {
        tagsContainer.removeChild(e.target.parentNode);
      }
    });
  }
});

