export const blobToBase64 = async (blob: Blob): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        const base64Data = reader.result.split(",")[1];
        if (base64Data) {
          resolve(base64Data);
        } else {
          reject(new Error("Failed to extract Base64 data from result"));
        }
      } else {
        reject(new Error("Unexpected reader result type"));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read blob data"));
    };

    reader.readAsDataURL(blob);
  });
};
