import { Parser } from 'json2csv';

/**
 * @description Export Json data as CSV, on function call it'll convert
 * JSON data to blob and add phantom anchor for download and removes once download is complete
 * @param {Array} jsonData object array
 * @param {Object} csvOptions parser options
 * @param {String} fileName file name
 */
export const exportJsonAsCSV = (jsonData, csvOptions, fileName) => {
  try {
    const parser = new Parser(csvOptions);
    const csv = parser.parse(jsonData);
    const downloadLink = document.createElement('a');
    const blob = new Blob(['\ufeff', csv]);
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
    // eslint-disable-next-line no-empty
  } catch (err) {}
};
