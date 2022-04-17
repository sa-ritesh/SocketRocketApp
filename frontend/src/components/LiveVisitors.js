import React, { Fragment, useEffect, useState } from "react";
import { Table } from "reactstrap";
import RowTable from "./RowTable";
import axios from "axios";
import $ from "jquery";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:1999");
function LiveVisitors() {
  const initial_data = [
    { ip: "12345", country: "India", state: "Delhi", city: "swqswe" },
  ];
  const [visitors, setVisitors] = useState(initial_data);
  const [vis, setVis] = useState({});
  useEffect(() => {
    axios.get("http://geoplugin.net/json.gp").then((res) => {
      const {
        geoplugin_request,
        geoplugin_countryCode,
        geoplugin_city,
        geoplugin_region,
        geoplugin_countryName,
      } = res.data;

      const visitor = {
        ip: geoplugin_request,
        countryCode: geoplugin_countryCode,
        city: geoplugin_city,
        state: geoplugin_region,
        country: geoplugin_countryName,
      };
      setVis(visitor);
      setVisitors((arr) => [...arr, visitor]);

      socket.emit("new_visitor", visitor);

      socket.on("visitors", (visitors) => {
        console.log("v recieved");
        setVisitors(visitors);
      });
      socket.emit("join_room", {
        user_email: vis.ip,
        chatRoom: "MAIT",
      });
    });
    socket.on("user_joined", (data) => {
      console.log("a user joined", data);
    });
    socket.on("receive_message", function (data) {
      console.log("message recieved ", data.message);

      //sending request for broadcasting nothing if a user has send the msg.
      // self.socket.emit("stop_typing", {
      //   user_email: self.userEmail,
      // });

      let newMessage = $("<li>");
      let messageType = "other-message";

      if (vis.userEmail == data.user_email) {
        messageType = "self-message";
      }
      newMessage.append(
        $("<span>", {
          html: data.message,
        }),
      );
      newMessage.append(
        $("<sub>", {
          html: data.user_email,
        }),
      );
      newMessage.addClass(messageType);
      $("#chat-messages-list").append(newMessage);
    });
  }, []);

  // console.log(visitors);
  const sendMessage = () => {
    console.log("clicked");
    let msg = document.getElementById("chat-message-input").value;
    // console.log("-> ", msg);
    if (msg != "") {
      // console.log("-> ", msg);
      document.getElementById("chat-message-input").value = "";
      socket.emit("send_message", {
        message: msg,
        user_email: vis.ip,
        chatroom: "MAIT",
      });
    }
  };
  return (
    <Fragment>
      <h2>Live Visitors</h2>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>IP</th>
            <th>Flag</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((vis, i) => {
            return <RowTable index={i} v={vis} key={i} />;
          })}
        </tbody>
      </Table>
      <button className="btn open-button">Public Chat</button>

      <div id="user-chat-box" style={{ display: "block" }}>
        <div id="feedback"></div>
        <ul id="chat-messages-list">
          <li className="other-message"></li>
          <li className="self-message"></li>
        </ul>

        <div id="chat-message-input-container">
          <input id="chat-message-input" placeholder="type your msg here..." />
          <button id="send-message" onClick={sendMessage}>
            Send
          </button>
        </div>
        <div className="btn btn-cancel">
          <i className="fas fa-window-close"></i>
        </div>
      </div>
    </Fragment>
  );
}

export default LiveVisitors;
