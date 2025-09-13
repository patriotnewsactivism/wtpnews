import PDFViewer from "../../../components/PDFViewer";

export const metadata = {
  title: "FOIA Evidence - WTP News",
};

export default function FoiaDoc() {
  return (
    <PDFViewer 
      url="/Factual Background FOIA Evidence of Federal Coordination and Retaliation.pdf" 
      title="FOIA Evidence" 
    />
  );
}