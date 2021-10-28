const fontLoader = (fontsToLoad) => {
  function loadFonts() {

    if (`fonts` in document) {
      const fontsArray = fontsToLoad.map((font,i) => {
          const shortName = font.shortName || font.localName || `font${i+1}`;
          const localName = font.localName || font.shortName || `font${i+1}`;
          const path = font.path;


          const doesFileExist = (urlToFile, extension) => {
              fetch(
                urlToFile+extension,
                { method: 'GET' }
              )
              .then( response => console.error('success:', response) )
              .catch( error => console.error('error:', error) );
          };


          let fontsToEmbed;
          if(doesFileExist(path,`.eot`)){
            fontsToEmbed += `url('${path}.eot?#iefix') format('embedded-opentype'),`
          }
          if(doesFileExist(path,`.ttf`)){
            fontsToEmbed += `url('${path}.format('truetype'),`
          }
          if(doesFileExist(path,`.woff2`)){
            fontsToEmbed += `url('${path}.woff2') format('woff2'),`
          }
          if(doesFileExist(path,`.woff`)){
            fontsToEmbed += `url('${path}.woff') format('woff'),`
          }

          const newFont = new FontFace(
            shortName,
            `local(${localName}),
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
        .then(_ => {
          document.documentElement.classList.add('fonts-loaded')
        })
        .catch((error) => console.log(error.message));
    }
  }

  if (
    (navigator.connection && navigator.connection.saveData) ||
    (`matchMedia` in window && window.matchMedia(`(prefers-reduced-motion: reduce)`).matches) ||
    (navigator.connection && (navigator.connection.effectiveType === `slow-2g` || navigator.connection.effectiveType === `2g`))
  ) {
    console.warning(`looks like you don't want custom typefaces`)
  } else {
    loadFonts();
  }
};

export default fontLoader;
