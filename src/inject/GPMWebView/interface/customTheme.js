const customStyle = document.createElement('style');
let customStyleString = '';

Emitter.on('theme:updateColor', (event, customColor) => {
  window.GPMTheme.updateTheme({
    foreSecondary: customColor,
  });
  customStyle.innerHTML = window.GPMTheme.substituteColors(customStyleString);
});

Emitter.on('theme:updateState', (event, state) => {
  if (state.state) {
    window.GPMTheme.enable();
  } else {
    window.GPMTheme.disable();
  }
});

Emitter.on('theme:updateType', (event, type) => {
  window.GPMTheme.updateTheme({
    type,
  });
});

Emitter.on('LoadGPMCustomStyles', (event, styleString) => {
  customStyleString = styleString;
  customStyle.innerHTML = window.GPMTheme.substituteColors(customStyleString);
});
Emitter.fire('FetchGPMCustomStyles');

window.wait(() => {
  document.body.appendChild(customStyle);
  window.GPMTheme.updateTheme({
    type: Settings.get('themeType', 'FULL'),
    backHighlight: '#1a1b1d',
    foreSecondary: Settings.get('themeColor'),
  });
  if (Settings.get('theme')) {
    window.GPMTheme.enable();
  } else {
    window.GPMTheme.disable();
  }
});
