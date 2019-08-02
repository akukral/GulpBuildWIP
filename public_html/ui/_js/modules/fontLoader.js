const fontLoader = () => {
  function loadFonts() {
    if (`fonts` in document) {
      var font = new FontFace(
        `Neue`,
        `local('HelveticaNeue-Roman'),
          url('/ui/webfonts/helvetica/helveticaneue-roman-webfont.eot?#iefix') format('embedded-opentype'),
          url('/ui/webfonts/helvetica/helveticaneue-roman-webfont.woff') format('woff'),
          url('/ui/webfonts/helvetica/helveticaneue-roman-webfont.ttf') format('truetype')`
      );

      var fontBold = new FontFace(
        `NeueBold`,
        `local('HelveticaNeue-Bold'),
          url('/ui/webfonts/helvetica/helveticaneue-bold-webfont.eot?#iefix') format('embedded-opentype'),
          url('/ui/webfonts/helvetica/helveticaneue-bold-webfont.woff') format('woff'),
          url('/ui/webfonts/helvetica/helveticaneue-bold-webfont.ttf') format('truetype')`, {
          weight: `700`,
        }
      );

      Promise
        .all([font.load(), fontBold.load()])
        .then(loadedFonts => {
          // Render them at the same time
          loadedFonts.forEach(function (font) {
            document.fonts.add(font);
          });
        })
        .catch((error) => console.log(error.message));
    }
  }

  if (
    (navigator.connection && navigator.connection.saveData) ||
    (`matchMedia` in window && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) ||
    (navigator.connection && (navigator.connection.effectiveType === `slow-2g` || navigator.connection.effectiveType === `2g`))
  ) {
    console.log(`looks like you don't want custom typefaces`)
  } else {
    loadFonts();
  }

};

export default fontLoader;
