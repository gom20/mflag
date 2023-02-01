import React from 'react';
import CustomModal from '../components/CustomModal';
import { Provider } from './ModalContext';
import useModal from './useModal';

const ModalProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    let { modalProps, showModal, hideModal } = useModal();
    return (
        <Provider value={{ modalProps, showModal, hideModal }}>
            <CustomModal />
            {children}
        </Provider>
    );
};

export { ModalProvider };
