document.addEventListener('DOMContentLoaded', function () {
  const inputSelector =
    'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';

  // Add active class if field has value
  document.querySelectorAll(inputSelector).forEach(function (el) {
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
});

