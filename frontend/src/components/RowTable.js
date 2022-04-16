import React from "react";

function RowTable({ index, v }) {
  console.log("-> ", index, v);
  return (
    <tr>
      <td>{index + 1}1</td>
      <td>{v.ip}1</td>
      <td>{/* <img src={this.getCountyFlag(v.countryCode)} /> */}</td>
      <td>{v.city}1</td>
      <td>{v.state}11</td>
      <td>{v.country}1</td>
    </tr>
  );
}

export default RowTable;
