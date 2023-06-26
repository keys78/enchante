// interface Props {
//     currentPage: number,
//     setCurrentPage: any,
//     totalPages: number
// }

// const Pagination = ({currentPage, setCurrentPage, totalPages}: Props) => {

//   const handlePrevPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(currentPage- 1);
//     }
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   return (
//     <div>
//       <button className='border border-black rounded-[5px] p-2 text-white bg-black' onClick={handlePrevPage} disabled={currentPage === 1}>
//         {'<'} Previous Page
//       </button>
//       <br /> <br />
//       <button className='border border-black rounded-[5px] p-2 text-white bg-black' onClick={handleNextPage} disabled={currentPage === totalPages}
//       >
//         Next Page {'>'}
//       </button>
//     </div>
//   );
// };

// export default Pagination;


import React from 'react';
import { getPaginationItems } from './paginationLogic';
import PageLink from './PageLink';

interface Props {
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    totalPages: number;
}

const Pagination: React.FC<Props> = ({ currentPage, setCurrentPage, totalPages }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const pageNums = getPaginationItems(currentPage, totalPages, 7);


    return (
        <div>
            <button
                className="border border-black rounded-[5px] p-2 text-white bg-black"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
            >
                {'<'} Previous Page
            </button>
            {pageNums.map((pageNum, idx) => (
                <PageLink
                    key={idx}
                    active={currentPage === pageNum}
                    disabled={isNaN(pageNum)}
                    onClick={() => setCurrentPage(pageNum)}
                >
                    {!isNaN(pageNum) ? pageNum : '...'}
                </PageLink>
            ))}

            <button
                className="border border-black rounded-[5px] p-2 text-white bg-black"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                Next Page {'>'}
            </button>
        </div>

    );
};

export default Pagination;