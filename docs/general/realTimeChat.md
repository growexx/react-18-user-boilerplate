## Real Time Chat with Firebase

This feature is an example of real time chat with Firebase firestore database.

## **_Feature List_**

1. Personal Chat Support.

2. Group Chat Support.

3. Listing of current chats with real time updates

4. Infinite scrolling of chats in chat list

5. Real time listening to updates from database.

6. Message Seen feature.

7. Notification dot for new messages.

8. Last seen of user.

9. Tracking of online and offline states using react-detect-offline

10. All antd components used.

11. 85% unit test covered code.

# **_How to use the feature_**

- First off, head over to the [Firebase Console](https://console.firebase.google.com/) and click the **“Add project”** option.

- Next, enter a name for the project.

- Next, we have to get the configuration details down for our project. So, click on the web icon in the dashboard.

- Then, enter a name for the app and click **Register app**.

- Next up, copy and store the configuration details on the next screen in a safe place. That will come in handy in the next step.

- Now, use these keys to add ENV values in the project.

- Following is the list of env values needed.

1. REACT_APP_FIREBASE_API_KEY

2. REACT_APP_FIREBASE_AUTH_DOMAIN

3. REACT_APP_FIREBASE_PROJECT_ID

4. REACT_APP_FIREBASE_STORAGE_BUCKET

5. REACT_APP_FIREBASE_MESSAGING_SENDER_ID

6. REACT_APP_FIREBASE_APP_ID

- Here, for real time chat we are using cloud firestore database by firebase.

- Now, head to firebase and select the ‘Database’ option from the left-hand navigation and select ‘Create database’ on the Firestore cta.

- Whilst in development, we’ll relax the security preferences to allow _‘read’_ & _‘writes’_ to our database. _This will need to be addressed prior to any publishing of your app for obvious security reasons._

- Once enabled, you’ll be presented with your new database. Leave it for now and jump to App.

- Login with the email id and password of your choice.

- Make sure to login with two different users, so that real-time-chat feature can be tested.

- Go to real time chat from left menu and let the component load.

- Search for the user from dropdown and start the chat.

## **_Components_**

1.  **RealTimeChat**

- This is the root component for Real Time Chat feature.

- This component in it's componentDidMount calls an API for getting current user reference and stores it in "_currentUserRef_" state value in redux state for this component.

- After calling this API it renders ChatList component.

- **Life Cycle methods used**.

1.  _componentDidMount_

- calls the API for current user reference.

2.  _componentDidCatch_

- catches the error found in component.

- **Functions Used**

1.  _setCurrentUserRef_

- called from componentDidMount. It calls the API and sets the result in state

2.  **ChatList**

- This component renders the chat list.

- This component in it's componentDidMount calls an API which finds the chat windows where currentUserRef.id is present true. In short lists down the chats for the user.

- This is the firebase's snapshot API which attaches the listener and listens for any change in database for changes in the list of chats.

- This API returns a function for unsubscribing the listener which i call when unmounting a component so that we don't keep listening even the component is not rendered in DOM.

- The results from the API are stored in "_chatList_" state of user.

- Here, when storing the results, i append username and email for the chat by calling getDataFromReference API for each chat window.

- **Life Cycle methods used.**

1.  _componentDidMount_

- calls the API for getting chat windows and subscribing to that result.

- calls the API for getting username and email for each user in the chat.

2.  _componentWillUnmount_

- unsubscribes the listener set for the list of users.

- **Functions Used**

1.  _subscribeToChatList_

- called from componentDidMount. It calls the API and sets the result in state.

2.  _fetchPersonData_

- Called from subscribeToChatList function.

- It loops through joined object in chat window document and calls getPersonData function for each user.

- Returns an object containing username and email for each chat window.

3.  _getPersonData_

- It gets called withing fetchPersonData and takes user reference.

- it returns username and email from the document.

4.  _getEmptyList_

- If the list is empty, it renders empty component from antd.

5.  _getEmptyContainer_

- returns description for empty component from antd.

6.  _getActions_

- Returns the actions for chat list, basically if that chat window is to be opened then click on action.

7.  _handleChatListItem_

- handles the clicking of chat list item and sets the chat window.

8.  _getLastMessage_

- Returns last message for showing in the chat list.

9.  _renderAllChats_

- renders SearchUser component and list of chats with skeleton loader.

3.  **SearchUser**

- This component renders the select dropdown from antd.

- This component in it's componentDidMount calls API for search results of user.

- Select Dropdown for selecting the user or list of users

- Contains a antd select dropdown and a create button to create or open a chat window.

- **Life Cycle methods used**.

1.  _componentDidMount_

- calls the API for storing search options for dropdown.

- **Functions Used**

1.  _onChange_

- called when user is selected from dropdown.

2.  _onCreate_

- called when user clicks on create button.

- this function sets selectedChatWindow state of redux.

4.  **ChatRoom**

- This component opens a chat window and gets previous messages for the chat.

- Calls API for getting the document and sets the initial chats.

- Renders the input box so that new messages can be sent.

- **Life Cycle methods used.**

1.  _componentDidMount_

- calls the API for getting chat window and subscribing to that result.

2.  _componentWillUnmount_

- unsubscribes the listener set for the chat window.

3.  _componentWillUpdate_

- update the window if other chat window is clicked from chat list or from user's dropdown.

- **Functions Used**

1.  _setCurrentChatWindow_

- called from componentDidMount. It calls the API and sets the result in state.

- Here mainly the decision is taken if the window is new or already present.

2.  _createNewChatWindow_

- Called from setCurrentChatWindow function if the window document is not present and so it creates new document.

3.  _setInitialChats_

- It stores initial chats of user if present.

4.  _setUserRefsAndValues_

- If the list is empty, it renders empty component from antd.

5.  _setUserRefsAndValues_

- for each user in chat window it sets values of states "currentUserValue" and "receiverUserValues", "receiverUserRefs".

- it calls API for each user in the window and gets the data of the user

6.  _fetchPersonData_

- calls API for getting data of each user.

7.  _subscribeToWindow_

- sets the listener to that window for real time updates.

8.  _handleSeenFlagForPreviousMessage_

- if the last message is from other users then sets seen flag for the message.

9.  _updateChatWindowData_

- if the seen flag is updated, then this function calls api for updating the data in database.

10. _handleSend_

- calls when new message is sent

- calls API for updating the chat

11. _getClassNames_

- called when displaying messages.

- it returns classnames based on received, sent and last message.

12. _renderMessages_

- called when chats are present and calls renderSingleMessage in return for each message.

13. _renderSingleMessage_

- called for rendering single message

- takes decision if the message is sent or received.

- loading skeleton loader if message is not loaded yet.

14. _getLastSeen_

- it calculated the last seen and it the chat is a group chat it does not displays the last seen

15. _getChatWindowName_

- renders window name and loops through users if it is group and displays comma separated users.

16. _closeChatWindow_

- closes the chat window and resets the state of redux.

17. _scrollToBottom_

- scrolls to last message in the chat.

## **_Changes in other components_**

1.  **Two Factor Authentication**

- Here the API for storing the user in database is called.

- If user is already present then the lastSeen value of user is updated.

2.  **Notification**

- Here the API for listening the updates for new messages for user is called.

3.  **Util file for Firebase**

- List of all API utils needed for firebase firestore.
