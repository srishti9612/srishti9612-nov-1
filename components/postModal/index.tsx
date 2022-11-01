import { useState } from 'react';
import React from 'react';
import Modal from 'react-modal';
import { isNoSubstitutionTemplateLiteral } from 'typescript';
import { getRSCModuleType } from 'next/dist/build/analysis/get-page-static-info';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        minHeight: '50%',
        maxHeight: 'max-content',
        minWidth: '40%',
        maxWidth: 'max-content',
      },

    overlay: {
        backgroundColor: 'hsl(0, 0%, 90%)',
    }
};

// modal.setAppElement

const PostModal = () => {
    let subTitle;
    const [modalIsOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    }

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <div>
            <button onClick={openModal}>Open Modal</button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <button onClick={closeModal}>close</button>
                <div>I am a modal</div>
            </Modal>
        </div>
    )
}

export default PostModal;