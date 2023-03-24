export const getAPIMock = () => {
  const data = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 10; i++) {
    data.push({
      name: `${i} - Label`,
      count: Math.floor(Math.random() * 100),
    });
  }

  return Promise.resolve({
    data,
    status: 1,
  });
};
