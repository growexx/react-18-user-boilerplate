const securityQuestions = [
  {
    id: 1,
    name: "What is your mother's maiden name?",
    value: "What is your mother's maiden name?",
  },
  {
    id: 2,
    name: 'Where did you go to high school/college?',
    value: 'Where did you go to high school/college?',
  },
  {
    id: 3,
    name: 'What is the name of the road you grew up on?',
    value: 'What is the name of the road you grew up on?',
  },
  {
    id: 4,
    name: 'What was the name of your first/current/favorite pet?',
    value: 'What was the name of your first/current/favorite pet?',
  },
  {
    id: 5,
    name: 'What was the first company that you worked for?',
    value: 'What was the first company that you worked for?',
  },
  {
    id: 6,
    name: 'What is the name of the town where you were born?',
    value: 'What is the name of the town where you were born?',
  },
  {
    id: 7,
    name: 'What elementary school did you attend?',
    value: 'What elementary school did you attend?',
  },
  {
    id: 8,
    name: 'What was your first car?',
    value: 'What was your first car?',
  },
  {
    id: 9,
    name: 'What elementary school did you attend?',
    value: 'What elementary school did you attend?',
  },
  {
    id: 10,
    name: 'What is the name of your first pet?',
    value: 'What is the name of your first pet?',
  },
];

export const getSecurityQuestions = () =>
  Promise.resolve({
    data: securityQuestions,
    status: 1,
  });
export const postSecurityQuestionRegister = () =>
  Promise.resolve({
    data: {
      securityQuestionAvailable: true,
    },
    status: 1,
  });

export const getRegisteredSecurityQuestion = () =>
  Promise.resolve({
    data: {
      securityQuestions: securityQuestions.slice(0, 3),
    },
    status: 1,
  });
export const registerSecurityQuestion = reqData =>
  Promise.resolve({
    data: reqData,
    status: 1,
  });
