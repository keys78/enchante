import React, { useEffect, useCallback, useState } from "react";

interface CardItem {
  id: number;
  title: string;
  copy: string;
}

const cardItems: CardItem[] = [
  {
    id: 1,
    title: "Stacked Card Carousel",
    copy:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dui scelerisque, tempus dui non, blandit nulla. Etiam sed interdum est."
  },
  {
    id: 2,
    title: "Second Item",
    copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  },
  {
    id: 3,
    title: "A Third Card",
    copy:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet dui scelerisque, tempus dui non, blandit nulla."
  },
  {
    id: 4,
    title: "Fourth",
    copy: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  }
];

interface Indexes {
  previousIndex: number;
  currentIndex: number;
  nextIndex: number;
}

function determineClasses(indexes: Indexes, cardIndex: number): string {
  if (indexes.currentIndex === cardIndex) {
    return "active";
  } else if (indexes.nextIndex === cardIndex) {
    return "next";
  } else if (indexes.previousIndex === cardIndex) {
    return "prev";
  }
  return "inactive";
}

const CardCarousel: React.FC = () => {
  const [indexes, setIndexes] = useState<Indexes>({
    previousIndex: 0,
    currentIndex: 0,
    nextIndex: 1
  });

  const handleCardTransition = useCallback(() => {
    // If we've reached the end, start again from the first card,
    // but carry previous value over
    if (indexes.currentIndex >= cardItems.length - 1) {
      setIndexes({
        previousIndex: cardItems.length - 1,
        currentIndex: 0,
        nextIndex: 1
      });
    } else {
      setIndexes((prevState) => ({
        previousIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex + 1,
        nextIndex:
          prevState.currentIndex + 2 === cardItems.length
            ? 0
            : prevState.currentIndex + 2
      }));
    }
  }, [indexes.currentIndex]);

  useEffect(() => {
    const transitionInterval = setInterval(() => {
      handleCardTransition();
    }, 4000);

    return () => clearInterval(transitionInterval);
  }, [handleCardTransition, indexes]);

  return (
    <div className="container">
      <ul className="card-carousel">
        {cardItems.map((card, index) => (
          <li
            key={card.id}
            className={`card ${determineClasses(indexes, index)}`}
          >
            <h2>{card.title}</h2>
            <p>{card.copy}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CardCarousel;

// OTHER VALIDATION METHODS
// const validateFields = (fields) => {
//   const requiredFields = {
//     name: 'Name',
//     category: 'Category',
//     desc: 'Description',
//     sizes: 'Sizes',
//     color: 'Color',
//     free_shipping: 'Free shipping',
//     brand: 'Brand',
//     price: 'Price',
//     new_product: 'New product',
//     discount: 'Discount',
//     star_ratings: 'Star ratings',
//   };

//   for (const field in requiredFields) {
//     if (!fields[field]) {
//       return { isValid: false, message: `${requiredFields[field]} is a required field` };
//     }
//   }

//   return { isValid: true };
// };



// import React, { useState, useRef } from 'react';

// const UploadPhoto = () => {
//     const [selectedFile, setSelectedFile] = useState<File | null>(null);
//     const [fileError, setFileError] = useState<string>('');

//     const fileInputRef = useRef<HTMLInputElement>(null);

//     const handleOpenFileInput = () => {
//         if (fileInputRef.current) {
//             fileInputRef.current.click();
//         }
//     };

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const file = event.target.files && event.target.files[0];
        
//         if (file) {
//           if (file.size > 500 * 1024) {
//             setFileError('File size exceeds 500 KB, please rescale or select another.');
//             return;
//           }
      
//           const reader = new FileReader();
//           reader.onload = () => {
//             if (typeof reader.result === 'string') {
//               const img = new Image();
//               img.onload = () => {
//                 const canvas = document.createElement('canvas');
//                 const context = canvas.getContext('2d');
//                 if (!context) {
//                   return;
//                 }
      
//                 const aspectRatio = 1.6 / 1;
//                 let newWidth = img.width;
//                 let newHeight = img.height;
      
//                 if (img.width / img.height > aspectRatio) {
//                   newWidth = img.height * aspectRatio;
//                 } else {
//                   newHeight = img.width / aspectRatio;
//                 }
      
//                 canvas.width = newWidth;
//                 canvas.height = newHeight;
//                 context.drawImage(img, 0, 0, newWidth, newHeight);
      
//                 const scaledImageDataURL = canvas.toDataURL('image/jpeg');
//                 setSelectedFile(new File([dataURLtoBlob(scaledImageDataURL)], file.name));
//                 setFileError('');
//               };
      
//               img.src = reader.result;
//             }
//           };
//           reader.readAsDataURL(file);
//         }
//       };
      

//     const dataURLtoBlob = (dataURL: string) => {
//         const byteString = atob(dataURL.split(',')[1]);
//         const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
//         const ab = new ArrayBuffer(byteString.length);
//         const ia = new Uint8Array(ab);
//         for (let i = 0; i < byteString.length; i++) {
//             ia[i] = byteString.charCodeAt(i);
//         }
//         return new Blob([ab], { type: mimeString });
//     };

//     const handleRemoveImage = () => {
//         setSelectedFile(null);
//         setFileError('');
//     };

//     return (
//         <section>
//             <button className="upload-button" onClick={handleOpenFileInput}>
//                 {selectedFile ? 'Change Image' : 'Upload Photo'}
//             </button>
//             {selectedFile && (
//                 <>
//                     <button className="remove-button" onClick={handleRemoveImage}>
//                         Remove
//                     </button>
//                     <img
//                         src={URL.createObjectURL(selectedFile)}
//                         alt="Uploaded"
//                         className="uploaded-image"
//                     />
//                 </>
//             )}

//             {fileError && <div>{fileError}</div>}

//             <input
//                 type="file"
//                 accept="image/*"
//                 ref={fileInputRef}
//                 onChange={handleFileChange}
//                 style={{ display: 'none' }}
//             />
//         </section>
//     );
// };

// export default UploadPhoto;





 // filterProductsByPrice: (state, action: PayloadAction<{ priceRange: { min: number; max: number } }>) => {
    //     const { priceRange } = action.payload;
    //     state.filteredProducts = state.products.filter((product: Product) => product.price <= priceRange.max);
    // },