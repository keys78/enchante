import { useLayoutEffect } from 'react';
import { getPaginationItems } from './paginationLogic';
import PageLink from './PageLink';
import { CaretLeft, CaretRight } from '@phosphor-icons/react';
import { motion } from 'framer-motion';

const Pagination = ({ currentPage, setCurrentPage, totalPages, }) => {
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const pageNums = getPaginationItems(currentPage, totalPages, 5);
    const isPrevButtonDisabled = currentPage === 1;
    const isNextButtonDisabled = currentPage === totalPages;

    return (
        <div className="flex items-center space-x-5 justify-center">
            <motion.button
                whileHover={!isPrevButtonDisabled ? { scale: 0.95 } : undefined}
                className="text-[14px] capitalize font-medium flex items-center space-x-2 pagination-controls border-none outline-none border border-black rounded-tl-[5px] rounded-bl-[5px] py-2 px-6 text-white bg-black"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={isPrevButtonDisabled}
            >
                <CaretLeft color="#fff" weight="bold" size={16} />
                <span>Previous</span>
            </motion.button>
            {pageNums.map((pageNum, idx) => (
                <PageLink
                    key={idx}
                    active={currentPage === pageNum}
                    disabled={isNaN(pageNum)}
                    onClick={() => handlePageChange(pageNum)}
                >
                    {!isNaN(pageNum) ? pageNum : '...'}
                </PageLink>
            ))}
            <motion.button
                whileHover={!isNextButtonDisabled ? { scale: 0.95 } : undefined}
                className="text-[14px] capitalize font-medium flex items-center space-x-2 pagination-controls border-none outline-none border border-black rounded-tr-[5px] rounded-br-[5px] py-2 px-6 text-white bg-black"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={isNextButtonDisabled}
            >
                <span>Next</span>
                <CaretRight color="#fff" weight="bold" size={16} />
            </motion.button>
        </div>
    );
};

export default Pagination;

//     const handlePrevPage = () => currentPage > 1 && setCurrentPage(prevPage => prevPage - 1);
//     const handleNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1);