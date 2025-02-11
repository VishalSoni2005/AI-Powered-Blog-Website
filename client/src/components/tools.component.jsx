import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
// import LinkTool from "@editorjs/link";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
// import { Editor } from "@toast-ui/react-editor";
import Marker from "@editorjs/marker";
// import MarkerList from "@editorjs/marker-list";
import InlineCode from "@editorjs/inline-code";
import Header from "@editorjs/header";
import CodeTool from "@editorjs/code"; // Import for code blocks

const uploadImageByUrl = async url => {
  let link = new Promise((resolve, reject) => {
    try {
      resolve(url);
    } catch (err) {
      reject(err);
    }
  });
  return link.then(url => {
    return {
      sucess: 1,
      file: { url },
    };
  });
};

const uploadImageByFile = async file => {
  let link = new Promise((resolve, reject) => {
    try {
      resolve(url);
    } catch (err) {
      reject(err);
    }
  });
  return link.then(url => {
    return {
      sucess: 1,
      file: { url },
    };
  });
};

export const tools = {
  image: {
    class: Image,
    config: {
      class: Image,
      config: {
        uploader: {
          uploadByUrl: uploadImageByUrl,
          uploadByFile: uploadImageByFile,
        },
      },
    },
  },
  embed: Embed,
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter header text...",
      levels: [1, 2, 3, 4, 5, 6],
    },
  },
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      type: "bullet", // or "numbered"
    },
  },
  quote: Quote,
  marker: Marker,
  inlineCode: InlineCode,
  code: CodeTool, // Assign the correct tool
};
