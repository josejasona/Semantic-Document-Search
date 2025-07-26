// utils/uploadPdf.js
export async function uploadPDFToBackend(file) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch("http://localhost:8000/upload-pdf", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    console.log("Upload successful:", data);
    return data;
  } catch (error) {
    console.error("Upload failed:", error);
    throw error;
  }
}
