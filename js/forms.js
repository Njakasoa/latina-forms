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

