import { useState, useRef } from "react";
import React from "react";
import Modal from "react-modal";
import styles from "./index.module.css";
import Close from "@public/icons/close.svg";
import RemoveImg from "@public/icons/removeImg.svg";
import VisibilityDropdown from "../visibilityDropdown";
import Image from "next/image";
import Emoticons from "@public/icons/emoticons.svg";
import UploadImage from "@public/icons/image.svg";
import Send from "@public/icons/send.svg";
import Picker from "emoji-picker-react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    height: "max-content",
    width: "40%",
    padding: "0px",
    overflow: "hidden",
  },

  overlay: {
    backgroundColor: "hsl(0, 0%, 90%)",
  },
};

const PostModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [numberUsed, setNumberUsed] = useState(0);
  const [postText, setPostText] = useState("");
  const [image, setImage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  let inputFile = useRef<HTMLInputElement>(null);
  const profileImgUrl = "https://picsum.photos/200";
  const userName = "Jane Doe";

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handlePostText = (e: any) => {
    console.log("handle Post text");
    console.log(e.target.value.length);
    setPostText(e.target.value);
  };

  const isKeyCodeValid = (keyCode: number) => {
    let keycode = keyCode;

    let valid = 
        (keycode > 47 && keycode < 58)   || // number keys
        keycode == 32 || keycode == 13   || // spacebar & return key(s) (if you want to allow carriage returns)
        keycode == 8                     ||
        (keycode > 64 && keycode < 91)   || // letter keys
        (keycode > 95 && keycode < 112)  || // numpad keys
        (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
        (keycode > 218 && keycode < 223);   // [\]' (in order)

    return valid;
  }

  const handleKeyPress = (e: any) => {
    console.log("handleKeyPress");
    console.log(e);
    console.log("posttextlength");
    console.log(postText.length);

    const isValid = isKeyCodeValid(e.keyCode);
    console.log(isValid);
    console.log(e.keyCode);

    if (isValid) {
      if (postText.length > 0 && e.keyCode === 8) {
        if (e.keyCode === 8) {
          setNumberUsed((prevNumber) => prevNumber - 1);
        } 
      } else {
        if (e.keyCode !== 8) {
          setNumberUsed((prevNumber) => prevNumber + 1);
        }
      }
    }
  };

  const handleImageChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const openImagePicker = () => {
    if (inputFile.current) {
      inputFile.current.click();
    }
  };

  const handleRemoveImg = () => {
    setImage("");
    if (inputFile.current) {
      inputFile.current.value = "";
    }
  };

  const onEmojiClick = (emojiObject: any) => {
    console.log("Emoji object #####################");
    console.log(emojiObject);
    setPostText((prevText) => prevText + emojiObject.emoji);
    setNumberUsed((prevNumber) => prevNumber + 1);
    console.log("Post text after emoji is added ###############");
    console.log(postText);
    console.log(postText.length);
    setShowEmojis(false);
    console.log("post text ##############");
    console.log(postText);
  };

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
              alt="Profile Picture"
            />
          </div>
          <div className={styles.userName}>{userName}</div>
          <div className={styles.dropDownWrapper}>
            <VisibilityDropdown />
          </div>
        </div>
        <textarea
          className={styles.postTextArea}
          placeholder="What's happening?"
          maxLength={250}
          value={postText}
          onChange={(e) => handlePostText(e)}
          onKeyDown={(e) => handleKeyPress(e)}
        />
        <div className={styles.charLimitInfoWrapper}>
          <div className={styles.charLimitInfo}>{numberUsed}/250</div>
        </div>
        {image && (
          <div className={styles.imagePreview}>
            <div className={styles.removeImgContainer}>
              <RemoveImg onClick={handleRemoveImg} />
            </div>
            <Image
              src={image}
              alt="Image preview"
              className={styles.imgPreviewCustom}
              height={100}
              width={100}
            />
          </div>
        )}
        <hr className={styles.actionBarBorder} />
        <div className={styles.actionBar}>
          <div className={styles.actionItems}>
            <div className={styles.imgUploadWrapper}>
              <input
                type="file"
                id="file"
                ref={inputFile}
                onChange={(e) => handleImageChange(e)}
                style={{ display: "none" }}
                accept=".jpg,.jpeg,.png"
              />
              <UploadImage
                className={styles.imgUploadIcon}
                onClick={openImagePicker}
              />
            </div>
            <div className={styles.emoticonWrapper}>
              <Emoticons
                className={styles.emoticonIcon}
                onClick={() => setShowEmojis(!showEmojis)}
              />
              {showEmojis && (
                <div className={styles.pickerWrapper}>
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
          </div>
          <div className={styles.sendButton}>
            Send Post
            <Send className={styles.sendIcon} />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PostModal;
