import { CloudArrowUp, FileX, Swap } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import React, { useState, useRef } from 'react';

const UploadPhoto = ({ props }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string>('');

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleOpenFileInput = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        console.log('file to', file)

        if (file) {
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
        if (file.size > 500 * 1024) {
            setFileError('File size exceeds 500 KB, please rescale or select another.');
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
                    props.setFieldValue('image', file.name)
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

    return (
        <section className='my-10'>
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
                            src={URL.createObjectURL(selectedFile)}
                            alt="Uploaded"
                            className="uploaded-image"
                        />
                    </>
                ) : (
                    <button
                        type='button'
                        className="w-full flex flex-col items-center justify-center gap-4 cursor-pointer border-2 border-dashed border-gray-300 bg-white px-6 s-480:py-12 py-6 rounded-lg">
                        <CloudArrowUp size={50} color="#C7CEDB" />
                        Click here upload photo <br /> Or drag image here to upload
                    </button>
                )}
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