import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function GeneratePDF() {
  const data = [
    {
      id: 1,
      name: "John",
      age: 25,
      imageUrl: "/assets/Images/cart_logo.png",
    },
    {
      id: 2,
      name: "Jane",
      age: 30,
      imageUrl: "/assets/Images/qr-1.png",
    },
    // ...
  ];

  const tableRef = useRef(null);

  const generateCanvas = async () => {
    const tableElement = tableRef.current;

    const canvas = await html2canvas(tableElement);

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    pdf.addImage(imgData, "PNG", 0, 0);
    pdf.save("table.pdf");
  };

  return (
    <div>
      <button onClick={generateCanvas}>Generate PDF</button>

      <table ref={tableRef}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>
                <img src={item.imageUrl} className="imge" danc dsalt="Image" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GeneratePDF;
