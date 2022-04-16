import React from "react";

function RowTable({ index, v }) {
  //   console.log("-> ", index, v);
  const getCountyFlag = (countryCode) =>
    `https://flagcdn.com/32x24/${countryCode}.png`;
  return (
    <tr>
      <td>{index + 1}</td>
      <td>{v.ip}</td>
      <td>
        {/* <img src={getCountyFlag(v.countryCode.toLowerCase())} alt="Flag" /> */}
      </td>
      <td>{v.city}</td>
      <td>{v.state}</td>
      <td>{v.country}</td>
    </tr>
  );
}

export default RowTable;
