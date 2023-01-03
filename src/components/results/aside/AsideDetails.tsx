import React from "react";

type AsideDetailsProps = {
  data: { title: string; description: string | string[] }[];
};

function AsideDetails({ data }: AsideDetailsProps) {
  return (
    <table className="w-full table-auto max-w-md">
      <tbody>
        {data.map((detail, index) => (
          <tr
            key={detail.title}
            className={`flex justify-start ${
              index % 2 === 0 ? "bg-gray-600" : ""
            } md:px-10 lg:px-4`}
          >
            <th className="basis-7/12 text-start">{detail.title}</th>
            <td className="basis-5/12 text-end">{detail.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default AsideDetails;
