const themePicker = (input) => {


  const isDarkMode = window.matchMedia(`(prefers-color-scheme: dark)`).matches;
  const isLightMode = window.matchMedia(`(prefers-color-scheme: light)`).matches;
  const isNotSpecified = window.matchMedia(`(prefers-color-scheme: no-preference)`).matches;
  const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified;

  // console.log(`isDarkMode=` + isDarkMode, `isLightMode=` + isLightMode, `isNotSpecified=` + isNotSpecified, `hasNoSupport=` + hasNoSupport);

  const toggleSwitch = document.querySelector(input);
  const currentTheme = localStorage.getItem(`theme`);

  // Check if currentTheme exists
  if (currentTheme) {
    // Set data-theme attribute to currentTheme value
    document.documentElement.setAttribute(`data-theme`, currentTheme);
    // Set toggleSwitch checked to true if currentTheme is dark
    toggleSwitch.checked = currentTheme === 'dark';
    // Set toggleSwitch title to 'Turn on Light/Dark Mode' depending on currentTheme
    toggleSwitch.title = `Turn on ${currentTheme === 'dark' ? 'Light' : 'Dark'} Mode`;
  } else {
    // Set data-theme attribute to dark if isDarkMode is true
    if (isDarkMode) {
      document.documentElement.setAttribute(`data-theme`, `dark`);
      toggleSwitch.checked = true;
      toggleSwitch.title = 'Turn on Light Mode';

    // Set data-theme attribute to light if isLightMode is true
    } else if (isLightMode) {
      document.documentElement.setAttribute(`data-theme`, `light`);
      toggleSwitch.checked = false;
      toggleSwitch.title = 'Turn on Dark Mode';

    // Set data-theme attribute to light and remove theme from localStorage
    } else if(hasNoSupport) {
      document.documentElement.setAttribute(`data-theme`, `light`);
      localStorage.removeItem(`theme`);
    } else {
      document.documentElement.setAttribute(`data-theme`, `light`);
      localStorage.removeItem(`theme`);
    }
  }

  // Function to switch theme
  function switchTheme(e) {
    const newTheme = e.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute(`data-theme`, newTheme);
    localStorage.setItem(`theme`, newTheme);
    toggleSwitch.title = `Turn on ${newTheme === 'dark' ? 'Light' : 'Dark'} Mode`;
  }

  toggleSwitch.addEventListener(`change`, switchTheme, false);

}

export default themePicker;
