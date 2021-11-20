import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

import React from "react";

function EmojiMart({ handleEmoji }) {
  return (
    <Picker
      set="google"
      showPreview={false}
      showSkinTones={false}
      onClick={handleEmoji}
      style={{ borderStyle: "none" }}
    />
  );
}

export default EmojiMart;
