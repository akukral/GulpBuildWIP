const fontLoader = (fontsToLoad) => {
  function loadFonts() {

    if (`fonts` in document) {
      const fontsArray = fontsToLoad.map((font,i) => {
        const shortName = font.shortName || font.localName || `font${i+1}`;
        const localName = font.localName || font.shortName || `font${i+1}`;
        const path = font.path;
        const newFont = new FontFace(
          shortName,
          `local(${localName}),
          url('${path}.eot?#iefix') format('embedded-opentype'),
          url('${path}.woff') format('woff'),
          url('${path}.ttf') format('truetype')`,
          {weight: 400}
        )
        newFont.display = 'swap';
        return newFont
      })
      // console.log(fontsArray);

      const requests = fontsArray.map(font => font.load());

      Promise
        .all(requests)
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
