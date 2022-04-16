import React, { Fragment, useEffect, useState } from "react";
import { Table } from "reactstrap";
import RowTable from "./RowTable";

function LiveVisitors(props) {
  const initial_data = [
    { ip: "12345", country: "India", state: "Delhi", city: "swqswe" },
    { ip: "12345", country: "India", state: "Delhi", city: "swqswe" },
  ];
  const [visitors, setVisitors] = useState(initial_data);
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
