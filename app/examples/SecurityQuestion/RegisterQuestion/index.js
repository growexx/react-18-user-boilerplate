import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../containers/constants';
import SecurityQuestionForm from '../SecurityQuestionForm';
import { registerSecurityQuestion } from '../stub';
import { StyledSecurityQuestion } from '../StyledSecurityQuestion';

const RegisterQuestion = () => {
  const navigate = useNavigate();

  const handleSubmit = data => {
    registerSecurityQuestion(data).then(() => {
      navigate(ROUTES.HOME);
    });
  };
  return (
    <StyledSecurityQuestion>
      <div className="container">
        <p className="title-main">Set Security Question</p>
        <div className="question-form">
          <SecurityQuestionForm handleSubmit={handleSubmit} />
        </div>
      </div>
    </StyledSecurityQuestion>
  );
};

export default RegisterQuestion;
