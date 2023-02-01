import { createContext } from 'react';
import { ModalProps, ShowModalProps } from '../types';

interface IModalContext {
    modalProps: ModalProps;
    showModal: (arg0: ShowModalProps) => Promise<boolean> | void;
    hideModal: (arg0: boolean) => void;
}

const ModalContext = createContext<IModalContext>({
    modalProps: {
        visible: false,
        message: '',
        type: '',
        buttonTexts: [],
        image: '',
    },
    showModal: function (arg0: ShowModalProps) {
        throw new Error('Function not implemented.');
    },
    hideModal: function (arg0: boolean): void {
        throw new Error('Function not implemented.');
    },
});

const { Provider } = ModalContext;
export { ModalContext, Provider };
