export default function PDFViewer({ url, title }: { url: string; title: string }) {
  return (
    <main className="content content--page">
      <section className="section">
        <h1>{title}</h1>
        <object data={url} type="application/pdf" width="100%" height="800px">
          <p>
            Unable to display PDF file.{' '}
            <a href={url} target="_blank" rel="noopener noreferrer">
              Download it here
            </a>{' '}
            instead.
          </p>
        </object>
        <p style={{ marginTop: "1.5rem" }}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn--outline">
            Download PDF
          </a>
        </p>
      </section>
    </main>
  );
}
