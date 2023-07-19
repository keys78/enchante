import { CloudArrowUp, FileX, Info, Swap } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import React, { useState, useRef, useEffect } from 'react';
import useWindowSize from '../hooks/useWindowSize';

const UploadPhoto = ({ setFieldValue, uploadSrc }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string>('');
    const { width } = useWindowSize();

    console.log('image_url', uploadSrc)
    console.log('selectedFile', selectedFile)

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleOpenFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files && event.currentTarget.files[0];
        if (file) {
            setFieldValue("image", file)
            handleFileUpload(file);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();

        if (event.dataTransfer.items) {
            const file = event.dataTransfer.items[0].getAsFile();
            if (file) {
                handleFileUpload(file);
            }
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleFileUpload = (file: File) => {
        if (file.size > 600 * 1024) {
            setFileError('File size exceeds 600 KB, please rescale or select another.');
            return;
        }

        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === 'string') {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const context = canvas.getContext('2d');
                    if (!context) {
                        return;
                    }

                    const aspectRatio = 1.6 / 1;
                    let newWidth = img.width;
                    let newHeight = img.height;

                    if (img.width / img.height > aspectRatio) {
                        newWidth = img.height * aspectRatio;
                    } else {
                        newHeight = img.width / aspectRatio;
                    }

                    canvas.width = newWidth;
                    canvas.height = newHeight;
                    context.drawImage(img, 0, 0, newWidth, newHeight);

                    const scaledImageDataURL = canvas.toDataURL('image/jpeg');
                    setSelectedFile(new File([dataURLtoBlob(scaledImageDataURL)], file.name));
                    setFileError('');

                };

                img.src = reader.result;
            }
        };
        reader.readAsDataURL(file);
    };

    const dataURLtoBlob = (dataURL: string) => {
        const byteString = atob(dataURL.split(',')[1]);
        const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], { type: mimeString });
    };

    const handleRemoveImage = () => {
        setSelectedFile(null);
        setFileError('');
    };


    const imageUrl = uploadSrc

  const [imageObjectUrl, setImageObjectUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        setImageObjectUrl(URL.createObjectURL(blob));
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();

    // Clean up the object URL when the component is unmounted to prevent memory leaks
    return () => {
      if (imageObjectUrl) {
        URL.revokeObjectURL(imageObjectUrl);
      }
    };
  }, []);

    return (
        <section className='s-480:my-10 my-5'>
            <div className='text-[11px] italic flex items-center justify-start text-gray-500 pb-4 space-x-2'>
                <Info style={{ cursor: 'pointer' }} size={12} color="#f75a2c" />
                <h6>For best results ensure your image aspect ration between 1:1.4:1 and 1:1.6:1</h6>
            </div>
            <div
                className="drop-zone w-full"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleOpenFileInput}
            >
                {selectedFile ? (
                    <>
                        <div className='flex items-center justify-end space-x-2 mb-2'>
                            <motion.button whileTap={{ scale: 1.05 }} type='button' className="outline-0 w-[80px] whitespace-nowrap rounded-[5px] bg-black text-white text-[12px] px-2 py-1 flex items-center justify-center border-2 border-black"><Swap size={14} color="#fff" />&nbsp;Change</motion.button>
                            <motion.button whileTap={{ scale: 1.05 }} type='button' className="outline-0 w-[80px] font-medium whitespace-nowrap rounded-[5px] bg-white text-black text-[12px] px-2 py-1 flex items-center justify-center border-2 border-black" onClick={handleRemoveImage}>
                                <FileX size={16} color="#000" />&nbsp;
                                Remove
                            </motion.button>
                        </div>
                        <img
                            // src={imageObjectUrl !== null ? imageObjectUrl : URL.createObjectURL(selectedFile)}
                            // src={uploadSrc === null ? uploadSrc : URL.createObjectURL(selectedFile)}
                            src={URL.createObjectURL(selectedFile)}
                            alt="uploaded"
                            className="uploaded-image"
                        />
                    </>
                ) : (
                    <button
                        type='button'
                        className="w-full flex flex-col items-center justify-center gap-4 cursor-pointer border-2 border-dashed border-gray-300 bg-white px-6 s-480:py-12 py-6 rounded-lg s-480:text-[16px] text-[12px]">
                        <CloudArrowUp size={width > 480 ? 50 : 35} color="#C7CEDB" />
                        Click here upload product photo <br /> Or drag product image here to upload
                    </button>
                )}

                <img
                    src={imageObjectUrl}
                    alt="uploaded"
                    className="uploaded-image"
                />

            </div>

            {fileError && <div className="text-red-500 text-[12px] pt-2 text-center">error: {fileError}</div>}

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </section>
    );
};

export default UploadPhoto;













  {/* {selectedFile ? (
                    <>
                        <div className='flex items-center justify-end space-x-2 mb-2'>
                            <motion.button whileTap={{ scale: 1.05 }} type='button' className="outline-0 w-[80px] whitespace-nowrap rounded-[5px] bg-black text-white text-[12px] px-2 py-1 flex items-center justify-center border-2 border-black"><Swap size={14} color="#fff" />&nbsp;Change</motion.button>
                            <motion.button whileTap={{ scale: 1.05 }} type='button' className="outline-0 w-[80px] font-medium whitespace-nowrap rounded-[5px] bg-white text-black text-[12px] px-2 py-1 flex items-center justify-center border-2 border-black" onClick={handleRemoveImage}>
                                <FileX size={16} color="#000" />&nbsp;
                                Remove
                            </motion.button>
                        </div>
                        <img
                            src={uploadSrc}
                            // src={uploadSrc === null ? uploadSrc : URL.createObjectURL(selectedFile)}
                            // src={URL.createObjectURL(selectedFile)}
                            alt="uploaded"
                            className="uploaded-image"
                        />
                    </>
                ) : (
                    <button
                        type='button'
                        className="w-full flex flex-col items-center justify-center gap-4 cursor-pointer border-2 border-dashed border-gray-300 bg-white px-6 s-480:py-12 py-6 rounded-lg s-480:text-[16px] text-[12px]">
                        <CloudArrowUp size={width > 480 ? 50 : 35} color="#C7CEDB" />
                        Click here upload product photo <br /> Or drag product image here to upload
                    </button>
                )} */}