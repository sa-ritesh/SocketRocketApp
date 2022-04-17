import React from "react";

function RowTable({ index, v }) {
  // console.log(v.countryCode);
  const res = v.countryCode ? v.countryCode.toLowerCase() : "";
  // console.log(res);
  const url = `https://flagcdn.com/32x24/${res}.png`;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{v.ip}</td>
      <td>
        <img src={url} alt="Flag" />
      </td>
      <td>{v.city}</td>
      <td>{v.state}</td>
      <td>{v.country}</td>
    </tr>
  );
}

export default RowTable;
