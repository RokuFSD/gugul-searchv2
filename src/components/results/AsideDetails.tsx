import React from "react";

type AsideDetailsProps = {
  data: { [key: string]: unknown }
}

function AsideDetails({ data }: AsideDetailsProps) {
  const { list } = data;
  const details = Object.entries(list as { [key: string]: string });
  return (
    <table className="table-auto my-2 max-w-md md:max-w-full w-full md:relative">
      <tbody>
      {details.map((detail, index) => (
        <tr key={detail[0]} className={`flex justify-start ${index % 2 === 0 ? "bg-gray-600" : ""} md:px-10 lg:px-0`}>
          <th className="basis-10/12 text-start">{detail[0]}</th>
          <td>{detail[1]}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default AsideDetails;
