/* eslint-disable consistent-return */
/**
 * options for draft-js-export-html
 * for more options: https://github.com/sstur/draft-js-utils/blob/master/packages/draft-js-export-html/README.md
 */
export const options = {
  inlineStyles: {
    // Override default element (`strong`).
    BOLD: { element: 'b' },
  },
  defaultBlockTag: 'div',
  inlineStyleFn: styles => {
    const key = 'color-';
    const color = styles.filter(value => value.startsWith(key)).first();

    if (color) {
      return {
        element: 'span',
        style: {
          color: color.replace(key, ''),
        },
      };
    }
  },
  blockStyleFn: block => {
    if (block.getData().get('color')) {
      return {
        style: {
          color: block.getData().get('color'),
        },
      };
    }
  },
};
