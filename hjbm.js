import PDFMerger from "pdf-merger-js";

async function mergepdfs(p1, p2) {
  const merger = new PDFMerger();
  
  await merger.add(p1);
  await merger.add(p2);

  // Set metadata
  await merger.setMetadata({
    producer: "pdf-merger-js based script",
    author: "John Doe",
    creator: "John Doe",
    title: "My life as John Doe"
  });

  await merger.save('uploads/merged.pdf');
}

export { mergepdfs };





