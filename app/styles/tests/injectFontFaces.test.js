import injectFontFaces from '../injectFontFaces';

describe('injectFontFaces', () => {
  it('should generate correct CSS for font-face with default values', () => {
    const expectedCSS = `
    @font-face {
    font-family: MyFont;
    src: ;
    font-weight: normal;
    font-style: normal;
}
    `.replace(/\s+/g, '');

    const result = injectFontFaces('MyFont').replace(/\s+/g, '');
    expect(result).toEqual(expectedCSS);
  });

  it('should generate correct CSS for font-face with custom values', () => {
    const expectedCSS = `
      @font-face {
        font-family: CustomFont;
        src: font1.woff2,font2.woff2;
        font-weight: bold;
        font-style: italic;
      }
    `.replace(/\s+/g, '');
    const result = injectFontFaces(
      'CustomFont',
      ['font1.woff2', 'font2.woff2'],
      'bold',
      'italic',
    ).replace(/\s+/g, '');
    expect(result).toEqual(expectedCSS);
  });
});
