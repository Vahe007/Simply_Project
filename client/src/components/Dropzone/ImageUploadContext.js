import { createContext, useContext, useState } from "react";

const ImageUploadContext = createContext({});

function ImageUploadContextProvider({ children }) {
    const [uploadedImages, setUploadedImages] = useState([]);

  return (
    <ImageUploadContext.Provider value={{ uploadedImages, setUploadedImages }}>
      {children}
    </ImageUploadContext.Provider>
  );
}

export const useCustomImageUpload = () => useContext(ImageUploadContext);

export default ImageUploadContextProvider;
