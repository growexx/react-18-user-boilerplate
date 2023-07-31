export const stubUserData = elseCase => {
  if (elseCase) {
    return {
      docs: [],
    };
  }
  return {
    docs: [
      {
        id: '0',
      },
    ],
  };
};
