$(
  (function () {
    var modHash = getModHashSelection();

    if (modHash) {
      activateButton(modHash);
      updateSelectedContent(modHash);
    }

    $('.module-selector').on('click', function (event) {
      event.preventDefault();

      var currentlyActiveButton = getActivatedButton();

      if (currentlyActiveButton) {
        deactivateButton(currentlyActiveButton);
      }

      var newSelection = $(event.target).data('module');
      activateButton(newSelection);
      updateUrl(newSelection);
      updateSelectedContent(newSelection);
    });

    function getModHashSelection() {
      var modHash = window.location.hash;

      if (!!modHash) {
        return modHash.split('#')[1];
      }

      return undefined;
    }

    function updateSelectedContent(moduleSelection) {
      var contentContainer = document.getElementById('content-container');
      var activeButton = getActivatedButton(moduleSelection);

      $.get($(activeButton).data('file'), function (data) {
        $(contentContainer).html(data);
      });
    }

    function activateButton(modeSearchQuery) {
      $(`.module-selector[data-module=${modeSearchQuery}]`).addClass('active');
    }

    function deactivateButton(currentlyActiveButton) {
      $(
        `.module-selector[data-module=${$(currentlyActiveButton).data(
          'module'
        )}]`
      ).removeClass('active');
    }

    function getActivatedButton() {
      var activeButton = document.querySelector(
        'button[class*="module-selector active"]'
      );

      return activeButton;
    }

    function updateUrl(newSelection) {
      window.location.hash = `#${newSelection}`;
    }
  })()
);
