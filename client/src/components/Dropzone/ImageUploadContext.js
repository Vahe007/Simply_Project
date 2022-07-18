import { createContext, useContext, useState } from "react";

const ImageUploadContext = createContext({});

function ImageUploadContextProvider({ children }) {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [imageIdsToDelete, setImageIdsToDelete] = useState([]);
  const [oldImages, setOldImages] = useState([]);

  return (
    <ImageUploadContext.Provider
      value={{
        uploadedImages,
        setUploadedImages,
        imageIdsToDelete,
        setImageIdsToDelete,
        oldImages,
        setOldImages,
      }}
    >
      {children}
    </ImageUploadContext.Provider>
  );
}

export const useCustomImageUpload = () => useContext(ImageUploadContext);

export default ImageUploadContextProvider;
