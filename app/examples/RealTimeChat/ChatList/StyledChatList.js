import styled from 'styled-components';
export const StyledChatList = styled.div`
  font-family: 'Montserrat', sans-serif;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100vh;
  @media only screen and (min-width: 767px) {
    border-right: 1px solid @border-color-base;
  }
`;

export const ChatListContainer = styled.div`
  overflow: auto;
  .demo-infinite-container {
    border-radius: 4px;
    button {
      border: none;
      color: @primary-color;
      box-shadow: none;
    }
    border-bottom: 1px solid @border-color-base;
    .activeChat {
      background-color: @border-color-base;
    }
    .newChatsLoaderContainer {
      display: flex;
      flex-direction: column;
      padding: 20px;
    }
  }
  .searchBar {
    margin-top: 10px;
    .ant-select {
      width: 80%;
    }
    .ant-select-selector {
      width: 100%;
    }
    margin-bottom: 0;
  }
  .noChatContainer {
    align-items: center;
    justify-content: center;
    padding: 20px 0px 20px 20px;
    display: flex;
    height: calc(100vh - 180px);
    @media only screen and (min-width: 767px) {
      min-width: 300px;
      max-width: 300px;
    }
  }
  .emptyContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 0 !important;
    p {
      color: @primary-color !important;
      font-size: 24px;
      margin-bottom: 0 !important;
    }
  }
  .borderNone {
    border-bottom: none;
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
`;

export const SingleChatContainer = styled.div`
  padding: 20px 0px 20px 20px;
  width: 300px;
  display: flex;
  img {
    border-radius: 50%;
    height: 50px;
    width: 50px;
  }
  p {
    margin-left: 20px;
    margin-bottom: 0px;
  }
  .removeMarginLeft {
    margin-left: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .lastMessage {
    font-weight: bold;
    color: @black;
  }
`;
