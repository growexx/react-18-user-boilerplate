import styled from 'styled-components';
import chatImage from 'images/chat_window.png';

export const StyledChatRoom = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  flex: 1;
  overflow: hidden;
  .chatRoomContainer {
    overflow: auto;
    height: calc(100vh - 140px);
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      border-radius: 5px;
    }
    ::-webkit-scrollbar-thumb {
      background: @gray72;
      border-radius: 10px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: @lightGray;
    }
  }
  .ant-card-head {
    background: @primary-color !important;
  }
  .ant-card-body {
    padding: 0 !important;
    background-repeat: repeat;
    background-image: url(${chatImage});
  }
  .chatRoomHeader {
    color: @white;
    font-weight: bold;
    min-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    p {
      display: flex;
      flex-direction: column;
      margin-bottom: 0;
      span {
        color: @messageSent !important;
        font-weight: normal;
      }
    }
    svg {
      cursor: pointer;
    }
  }
  .sendMessageContainer {
    margin-top: auto;
  }
  .messageInput {
    display: flex;
    margin: auto 5px 5px 5px;
    .ant-form-item {
      flex: 1;
      margin-bottom: 2px !important;
      margin-right: 10px !important;
    }
  }
  .messageContainer {
    display: flex;
    flex-direction: column;
    margin: 10px 5px 0 5px;
    p,
    span {
      padding: 10px;
      overflow: auto;
      color: @black;
      width: 30%;
      height: auto;
      border-radius: 10px;
      font-size: 14px;
      @media only screen and (max-width: 767px) {
        width: 80%;
        margin: 10px;
      }
      ::-webkit-scrollbar {
        width: 8px;
      }
      ::-webkit-scrollbar-track {
        border-radius: 5px;
      }
      ::-webkit-scrollbar-thumb {
        background: @gray72;
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: @lightGray;
      }
    }
    .messageSent {
      margin-right: 10px;
      background-color: @messageSent;
      margin-left: auto;
    }
    .messageReceived {
      margin-left: 10px;
      margin-right: auto;
      background-color: @messageReceived;
    }
    .messageSentLast {
      border-radius: 10px 10px 0 10px;
    }
    .messageReceivedLast {
      border-radius: 0 10px 10px 10px;
    }
    .messageTimeStamp {
      width: 100% !important;
      margin-left: auto;
      font-size: 10px;
      align-self: flex-end;
    }
  }
`;
