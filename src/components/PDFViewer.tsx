export default function PDFViewer({ url, title }: { url: string; title: string }) {
  return (
    <section className="document-viewer">
      <h1>{title}</h1>
      <object 
        data={url} 
        type="application/pdf" 
        width="100%" 
        height="800px"
      >
        <p>
          Unable to display PDF file.{' '}
          <a href={url} target="_blank" rel="noopener noreferrer">
            Download it here
          </a>{' '}
          instead.
        </p>
      </object>
      <p>
        <a 
          href={url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-secondary"
        >
          Download PDF
        </a>
      </p>
    </section>
  );
}