import { Modal } from "@mantine/core";
import { ReactNode, createContext, useContext, useState } from "react";


interface ModalContextProps {
    modalOpen: boolean,
    closeModal: () => any,
    showModal: (title: string, content: ReactNode | string, onConfirmClick?: () => any, onCancelClick?: () => any, customControls?: ReactNode, closeable?: boolean) => any
}

const defaultModalContext: ModalContextProps = {
    modalOpen: false,
    closeModal: () => { },
    showModal: () => { }
}

export const ModalContext = createContext<ModalContextProps>(defaultModalContext)

export const useModal = () => useContext(ModalContext)

interface ModalContextProviderProps {
    children?: React.ReactNode
}

export const ModalContextProvider = ({ children }: ModalContextProviderProps) => {


    const [modalOpen, setModalOpen] = useState<boolean>(defaultModalContext.modalOpen);
    const [modalTitle, setModalTitle] = useState<string>('Information');
    const [modalContent, setModalContent] = useState<ReactNode | string>('This is a modal');
    const [modalCustomControls, setModalCustomControls] = useState<ReactNode | undefined>();
    const [modalCloseable, setModalCloseable] = useState<boolean>(true);

    function showModal(title: string, content: ReactNode | string, onConfirmClick?: () => any, onCancelClick?: () => any, customControls: ReactNode = undefined, closeable: boolean = true) {
        setModalTitle(title);
        setModalContent(content);
        customControls && setModalCustomControls(customControls);
        setModalCloseable(closeable)
        setModalOpen(true);
    }


    const closeModal = () => setModalOpen(false);

    const value: ModalContextProps = {
        modalOpen,
        closeModal,
        showModal
    };



    return <ModalContext.Provider value={value}>
        {children}
        <Modal opened={modalOpen} onClose={closeModal} title={modalTitle} withCloseButton={modalCloseable} centered>
            {modalContent}
            {modalCustomControls}
        </Modal>
    </ModalContext.Provider>
}
