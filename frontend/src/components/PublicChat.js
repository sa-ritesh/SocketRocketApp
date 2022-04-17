import React, { Fragment } from "react";

function PublicChat(props) {
  return (
    <Fragment>
      <h2>Public Chat Room</h2>
      <button className="btn open-button">Chat</button>

      <div id="user-chat-box" style={{ display: "block" }}>
        <div id="feedback"></div>
        <ul id="chat-messages-list">
          <li className="other-message"></li>
          <li className="self-message"></li>
        </ul>

        <div id="chat-message-input-container">
          <input id="chat-message-input" placeholder="type your msg here..." />
          <button id="send-message">Send</button>
        </div>
        <div className="btn btn-cancel">
          <i className="fas fa-window-close"></i>
        </div>
      </div>
    </Fragment>
  );
}

export default PublicChat;
