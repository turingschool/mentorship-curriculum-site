$(
  (function () {
    const modHash = getModHashSelection();
    const modButton =
      modHash &&
      document.querySelector(`.module-selector[data-module=${modHash}]`);

    if (modButton) {
      activateButton(modHash);
      updateSelectedContent(modHash);
    }

    $('.module-selector').on('click', (event) => {
      event.preventDefault();

      const currentlyActiveButton = getActivatedButton();

      if (currentlyActiveButton) {
        deactivateButton(currentlyActiveButton);
      }

      const newSelection = $(event.target).data('module');

      if (newSelection) {
        activateButton(newSelection);
        updateUrl(newSelection);
        updateSelectedContent(newSelection);
      }
    });

    function getModHashSelection() {
      const modHash = window.location.hash;

      if (!!modHash) {
        return modHash.split('#')[1];
      }

      return undefined;
    }

    function updateSelectedContent(moduleSelection) {
      const contentContainer = document.getElementById('content-container');
      const activeButton = getActivatedButton(moduleSelection);

      $.get($(activeButton).data('file'), (data) => {
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
      const activeButton = document.querySelector(
        'button[class*="module-selector active"]'
      );

      return activeButton;
    }

    function updateUrl(newSelection) {
      window.location.hash = `#${newSelection}`;
    }
  })()
);
