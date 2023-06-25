import { AnimatePresence, motion } from 'framer-motion'
import useWindowSize from '../hooks/useWindowSize'
import AllFilters from './AllFilters';
import { modalVariants } from '../../utils/animations';
import { X } from '@phosphor-icons/react';

interface Props {
    showFiltersBar: boolean,
    setShowFiltersBar: (arg:boolean) => void
}

const MobileProductsFilters = ({setShowFiltersBar, showFiltersBar}: Props) => {
    const  { width } = useWindowSize();
    return (
        <AnimatePresence>
            {
                width < 767 && showFiltersBar && (
                    <motion.div
                        variants={modalVariants as never}
                        initial="initial"
                        animate="final"
                        exit="exit"
                        className="filterbar-wrapper w-[300px] bg-white h-[100vh] fixed top-0 left-0 p-[16px] overflow-y-auto"
                    >
                        <X size={24} onClick={() => setShowFiltersBar(!showFiltersBar)} className="absolute top-8 right-4" color="#070707" weight="regular" />
                        <h1 className='font-medium pt-5'>Select Filters</h1>
                        <AllFilters setShowFiltersBar={setShowFiltersBar} allFilterCompStyles={'mt-[50px] w-full rounded-[5px] border p-1'} />
                    </motion.div>
                )
            }
        </AnimatePresence>
    )
}

export default MobileProductsFilters