(function ($) {
  jQuery(document).ready(function ($) {
    // Text based inputs
    let input_selector =
      'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea';

    M = {
      keys: {
        ARROW_DOWN: 40,
        ARROW_UP: 38,
        ENTER: 13,
        ESC: 27,
        TAB: 9
      }
    }

    // Add active if form auto complete
    $(document).on('change', input_selector, function () {
      if (this.value.length !== 0 || $(this).attr('placeholder') !== null) {
        $(this)
          .siblings('label')
          .addClass('active');
      }
    });

    /**
     * Add active when element has focus
     * @param {Event} e
     */
    document.addEventListener(
      'focus',
      function (e) {
        if ($(e.target).is(input_selector)) {
          $(e.target)
            .siblings('label, .prefix')
            .addClass('active');
        }
      },
      true
    );

    /**
     * Remove active when element is blurred
     * @param {Event} e
     */
    document.addEventListener(
      'blur',
      function (e) {
        let $inputElement = $(e.target);
        if ($inputElement.is(input_selector)) {
          let selector = '.prefix';

          if (
            $inputElement[0].value.length === 0 &&
            $inputElement[0].validity.badInput !== true &&
            !$inputElement.attr('placeholder')
          ) {
            selector += ', label';
          }
          $inputElement.siblings(selector).removeClass('active');
        }
      },
      true
    );

    // Radio and Checkbox focus class
    let radio_checkbox = 'input[type=radio], input[type=checkbox]';
    $(document).on('keyup', radio_checkbox, function (e) {
      // TAB, check if tabbing to radio or checkbox.
      if (e.which === M.keys.TAB) {
        $(this).addClass('tabbed');
        let $this = $(this);
        $this.one('blur', function (e) {
          $(this).removeClass('tabbed');
        });
        return;
      }
    });
  }); // End of $(document).ready
})();

function initTextFields() {
  x = document.getElementsByClassName("input-field");
  l = x.length;
  for (i = 0; i < l; i++) {
    inputElement = x[i].getElementsByTagName("input")[0];
    if (inputElement) {
      if (inputElement.value.length !== 0) {
        $(inputElement)
          .siblings('label')
          .addClass('active');
      }
    }
  }
};