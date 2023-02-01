import { useRef, useState } from 'react';
import { ModalProps, ShowModalProps } from '../types';

export default function useModal() {
    const initialState: ModalProps = {
        visible: false,
        message: '',
        type: '',
        buttonTexts: [],
        image: '',
    };

    const [modalProps, setModalProps] = useState(initialState);
    const resolveRef = useRef<HTMLInputElement>(null);

    const showModal = ({
        message = '',
        type = 'alert',
        async = false,
        buttonTexts = ['확인'],
        image,
    }: ShowModalProps): Promise<Boolean> | void => {
        setModalProps({
            visible: true,
            message,
            type,
            buttonTexts,
            image: image ? image : '',
        });

        if (async) {
            return new Promise<Boolean>((resolve) => {
                // resolveRef.current = resolve;
            });
        }
    };

    const hideModal = (flag: boolean): void => {
        setModalProps(initialState);
        if (resolveRef.current) {
            // resolveRef.current(flag);
        }
    };

    return { modalProps, showModal, hideModal };
}
