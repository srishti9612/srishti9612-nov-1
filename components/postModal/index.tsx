import { useState } from 'react';
import React from 'react';
import Modal from 'react-modal';
import styles from './index.module.css';
import Close from '@public/icons/close.svg';
import VisibilityDropdown from '../visibilityDropdown';
import Image from 'next/image';

const customStyles = {
    content: {
        top: '35%',
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
        padding: '0px',
    },

    overlay: {
        backgroundColor: 'hsl(0, 0%, 90%)',
    }
};

const PostModal = () => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const profileImgUrl = "https://picsum.photos/200";
    const userName = "Jane Doe"; 

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
                <div className={styles.titleWrapper}>
                    <div className={styles.titleText}>Create a new post</div>
                    <Close className={styles.closeIcon} onClick={closeModal} />
                </div>
                <hr className={styles.line} />
                <div className={styles.postDetailsWrapper}>
                    <div className={styles.profileImgWrapper}>
                        <Image 
                            width={55} 
                            height={55}
                            objectFit="cover"
                            src={profileImgUrl} 
                            alt="Profile Picture" />
                    </div>
                    <div className={styles.userName}>{userName}</div>
                    <div className={styles.dropDownWrapper}>
                        <VisibilityDropdown />
                    </div>
                </div>
                <div>Text box with character limit</div>
                <hr className={styles.line} />
                <div>
                    <div>
                        <div>Image Icon</div>
                        <div>Emoticon Icon</div>
                    </div>
                    <button>Send Post</button>
                </div>
            </Modal>
        </div>
    )
}

export default PostModal;