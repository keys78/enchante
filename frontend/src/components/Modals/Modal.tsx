import { AnimatePresence, motion } from 'framer-motion';
import { useRef } from 'react'
import useOnClickOutside from '../hooks/useOnClickOutside';
import { backdropVariant, modalVariant } from '../../utils/animations';

interface props {
    showModal: boolean,
    general?: string
    children: any
    setShowModal: (val: boolean) => void;
}

const Modal = ({ showModal, setShowModal, general, children }: props) => {
    const modalRef = useRef(null)

    const handleClickOutside = () => { setShowModal(false) }
    useOnClickOutside(modalRef, handleClickOutside)

    return (
        <AnimatePresence>
            {
                showModal ? (
                    <motion.div
                        variants={backdropVariant}
                        initial="hidden"
                        animate="visible"
                        // exit="hidden"
                        className='fixed w-full h-full left-0 top-0 fix-marg flex px-4 items-center justify-center !z-[99999999999999999] bg-modalBackgroundLayer'>
                        <motion.div
                            ref={modalRef}
                            variants={modalVariant}
                            className={`${general} max-w-[600px] h-[600px] overflow-y-auto w-full bg-white rounded-md text-black sm:p-8 p-5 overflow-auto `} >
                            {children}
                        </motion.div>
                    </motion.div>
                ) : null}
        </AnimatePresence>
    )
}

export default Modal;

