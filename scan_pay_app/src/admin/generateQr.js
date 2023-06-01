import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import QRCode from "qrcode.react";

function GenPDF() {
  const data = [
    { id: 1, name: "John", age: 25 },
    { id: 2, name: "Jane", age: 30 },
    // ...
  ];

  const tableRef = useRef(null);

  const generateQRCodeDataURL = (value) => {
    const canvas = document.createElement("canvas");
    QRCode.toCanvas(canvas, value, { scale: 4 });

    return canvas.toDataURL("image/png");
  };

  const generatePDF = () => {
    const tableElement = tableRef.current;

    html2pdf().from(tableElement).save("table.pdf");
  };

  return (
    <div>
      <button onClick={generatePDF}>Generate PDF</button>

      <table ref={tableRef}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>QR Code</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>
                <img
                  src={generateQRCodeDataURL(
                    `ID: ${item.id}\nName: ${item.name}\nAge: ${item.age}`
                  )}
                  alt="QR Code"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GenPDF;
