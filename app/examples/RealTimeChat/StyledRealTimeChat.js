import styled from 'styled-components';
export const StyledRealTimeChat = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  flex: 1;
  .searchContainer {
    margin-left: 20px;
    display: flex;
    margin-bottom: 20px;
    button {
      margin-left: 20px;
      margin-right: 20px;
    }
    .ant-select {
      display: flex;
    }
  }
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;
  flex-direction: row;
  height: 100vh;
  border: 1px solid @border-color-base;
  .noChats {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    @media only screen and (max-width: 767px) {
      display: none;
    }
  }
  .displayNone {
    @media only screen and (max-width: 767px) {
      display: none;
    }
  }
  .chatWindowClosed {
    @media only screen and (max-width: 767px) {
      flex: 1;
    }
  }
`;
