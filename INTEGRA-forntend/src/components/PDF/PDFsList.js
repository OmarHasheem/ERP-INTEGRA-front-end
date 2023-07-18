import classes from './pdfsList.module.scss';
import { getAuthToken } from '../../hooks/auth';
const PDFsList = ({ pdfs }) => {
  const downloadPdfHandler = async (id, name) => {
    try {
      const proceed = window.confirm('Are you sure to download pdf?');
      if (proceed) {
        const token = getAuthToken();
        const response = await fetch(`http://localhost:8000/pdfs/${id}`, {
          headers: {
            Authorization: 'bearer ' + token,
            'Content-Type': 'application/pdf',
            'Accept': 'application/pdf'
          }
        });
        if (response.ok) {
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = name;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }
    } catch {
    }
  }

  return (
    <div className={classes.pdfsList}>
      <h1> Marketing > PDFs</h1>
      <table>
        <thead>
        <tr>
          <th>PDF Id</th>
          <th>Name</th>
        </tr>
        </thead>
        <tbody>
        {pdfs.map((pdf) => (
          <tr
            key={pdf.id}
            onClick={() => (downloadPdfHandler(pdf.id, pdf.name))}
          >
            <td>{pdf.id}</td>
            <td>{pdf.name}</td>
          </tr>
        ))}
        </tbody>
        <tfoot>
        <tr>
          <th>PDF Id</th>
          <th>Name</th>
        </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default PDFsList;
