import React from "react";

type AsideDetailsProps = {
  data: { [key: string]: unknown }
}

function AsideDetails({ data }: AsideDetailsProps) {
  const { list } = data;

  const toMap = (list || data) as { [key: string]: string };

  // TODO: Move this logic to the backend
  const details = Object.keys(toMap).filter((key) => {
    if (Array.isArray(toMap[key])) {
      return toMap[key].length < 2 && typeof toMap[key] === "string";
    }
    return (!key.match(/link/ig) && !key.match(/links/ig) && !key.match(/stick/ig) && typeof toMap[key] === "string");

  });
  return (
    <table className="table-auto my-2 max-w-md md:max-w-full w-full md:relative">
      <tbody>
      {details.map((detail, index) => (
        <tr key={detail} className={`flex justify-start ${index % 2 === 0 ? "bg-gray-600" : ""} md:px-10 lg:px-4`}>
          <th className="basis-7/12 text-start">{detail}</th>
          <td className="basis-5/12 text-end">{toMap[detail]}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}

export default AsideDetails;

