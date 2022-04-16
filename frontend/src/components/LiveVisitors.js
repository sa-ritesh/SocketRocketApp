import React, { Fragment, useEffect, useState } from "react";
import { Table } from "reactstrap";
import RowTable from "./RowTable";
import axios from "axios";
import openSocket from "socket.io-client";
const socket = openSocket("http://localhost:1999");
function LiveVisitors(props) {
  const initial_data = [
    { ip: "12345", country: "India", state: "Delhi", city: "swqswe" },
  ];
  const [visitors, setVisitors] = useState(initial_data);
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
      setVisitors((arr) => [...arr, visitor]);

      socket.emit("new_visitor", visitor);

      socket.on("visitors", (visitors) => {
        setVisitors(visitors);
      });
    });
  }, []);
  console.log(visitors);
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
    </Fragment>
  );
}

export default LiveVisitors;
