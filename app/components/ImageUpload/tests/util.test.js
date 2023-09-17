/**
 *
 * Tests for image crop util in ImageUpload
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import '@testing-library/jest-dom';
import getCroppedImg, {
  createImage,
  getRadianAngle,
  rotateSize,
} from '../util/crop';

const imageObjectUrl = 'https://picsum.photos/1000';

global.URL.createObjectURL = jest.fn().mockImplementation(() => imageObjectUrl);

global.Image = class {
  constructor() {
    this.addEventListener = jest
      .fn()
      .mockImplementation((event, callback) => callback());
    this.setAttribute = jest.fn();
  }
};

global.document.createElement = jest.fn(() => ({
  getContext: jest.fn(() => ({
    translate: jest.fn(() => ({})),
    rotate: jest.fn(() => ({})),
    scale: jest.fn(() => ({})),
    drawImage: jest.fn(() => ({})),
  })),
  toBlob: jest.fn(cb => cb()),
}));

describe('image crop util', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('createImage', async () => {
    const image = await createImage(imageObjectUrl);
    expect(image.src).toBe(imageObjectUrl);
  });

  it('getRadianAngle', () => {
    const angle = getRadianAngle(180);
    expect(angle).toBe(Math.PI);
  });

  it('rotateSize', () => {
    const data = rotateSize(100, 100, 90);
    expect(data).toHaveProperty('width');
    expect(data).toHaveProperty('height');
  });

  it('getCroppedImg', async () => {
    const pixelCrop = { height: 100, width: 100, x: 0, y: 0 };

    const image = await getCroppedImg(
      imageObjectUrl,
      pixelCrop,
      0,
      'image/jpeg',
    );

    expect(image).toBe(imageObjectUrl);
  });
});
