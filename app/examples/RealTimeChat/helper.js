/**
 * resetChatWindow - reset chat window related state
 * @param {Function} updateAction
 */
export const resetChatWindow = (updateAction, component) => {
  updateAction('receiverUserRefs', []);
  updateAction('receiverUserValues', []);
  updateAction('selectedChatWindow', '');
  updateAction('chatWindowId', '');
  if (component === 'chatList') {
    updateAction('chatList', []);
  }
};
