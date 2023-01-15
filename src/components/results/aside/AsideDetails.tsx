import React from "react";

type AsideDetailsProps = {
  data: { [key: string]: string | string[] };
};

function AsideDetails({ data }: AsideDetailsProps) {
  return (
    <table className="w-full table-auto max-w-md">
      <tbody>
        {Object.entries(data).map(([key, value], index) => (
          <tr
            key={key}
            className={`flex justify-start ${
              index % 2 === 0 ? "bg-gray-600" : ""
            } md:px-10 lg:px-4`}
          >
            <th className="basis-7/12 text-start">{key}</th>
            <td className="basis-5/12 text-end">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AsideDetails;
