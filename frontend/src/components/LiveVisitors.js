import React, { Fragment, useEffect, useState } from "react";
import { Table } from "reactstrap";
import RowTable from "./RowTable";
import axios from "axios";
import $ from "jquery";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:1999");
function LiveVisitors() {
  var answer;
  function requiredFunction() {
    answer = prompt("Enter Your Name");
    if (!answer) {
      requiredFunction();
    }
  }
  const initial_data = [
    { ip: "12345", country: "India", state: "Delhi", city: "swqswe" },
  ];
  const [visitors, setVisitors] = useState(initial_data);
  const [vis, setVis] = useState({});
  useEffect(() => {
    while (answer == "" || answer == null) {
      requiredFunction();
    }
    console.log("gfcn");
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
      answer = answer + ` - ${visitor.countryCode}`;
      visitor["answer"] = answer;
      setVis(visitor);
      setVisitors((arr) => [...arr, visitor]);

      socket.emit("new_visitor", visitor);

      socket.on("visitors", (visitors) => {
        console.log("v recieved");
        setVisitors(visitors);
      });
      socket.emit("join_room", {
        user_email: answer,
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
      $("#chat-messages-list")
        .stop()
        .animate({ scrollTop: $("#chat-messages-list")[0].scrollHeight }, 200);
      let newMessage = $("<li>");
      let messageType = "other-message";
      console.log("dfghjkmlsdfghbjn- > ", vis);
      console.log(answer, "-----", data.user_email);
      if (answer === data.user_email) {
        console.log("SELFFFFF");
        messageType = "self-message";
      }
      newMessage.append(
        $("<span>", {
          html: data.message,
        }),
      );
      // console.log("-> ", data);
      newMessage.append(
        $("<sub>", {
          html: data.user_email,
        }),
      );
      newMessage.addClass(messageType);
      console.log("->>>>>>>", newMessage);
      $("#chat-messages-list").append(newMessage);
    });
  }, [answer]);
  $("#chat-message-input").on("keypress", function (e) {
    console.log(e.which);
    //ascii code of enter key is 13
    if (e.which === 13) {
      let msg = $("#chat-message-input").val();

      //automatic scroll down as user sends a new msg
      $("#chat-messages-list")
        .stop()
        .animate({ scrollTop: $("#chat-messages-list")[0].scrollHeight }, 200);

      if (msg !== "") {
        $("#chat-message-input").val("");
        socket.emit("send_message", {
          message: msg,
          user_email: vis.answer,
          chatroom: "MAIT",
        });
      }
    }
  });

  // console.log(visitors);
  const sendMessage = () => {
    console.log("clicked");
    let msg = document.getElementById("chat-message-input").value;
    //automatic scroll
    $("#chat-messages-list")
      .stop()
      .animate({ scrollTop: $("#chat-messages-list")[0].scrollHeight }, 200);
    // console.log("-> ", msg);
    if (msg !== "") {
      // console.log("-> ", msg);
      document.getElementById("chat-message-input").value = "";
      console.log("insendmessgae", answer);
      socket.emit("send_message", {
        message: msg,
        user_email: vis.answer,
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
      <h4 className="btn open-button">Username: {vis.answer}</h4>

      <div id="user-chat-box" style={{ display: "block" }}>
        <h2>Public Chat Room</h2>
        <div id="feedback"></div>
        <ul id="chat-messages-list">
          <li className="other-message"></li>
          <li className="self-message"></li>
        </ul>

        <div id="chat-message-input-container">
          <input id="chat-message-input" placeholder="Type your msg here..." />
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
