import Embed from "@editorjs/embed";
import Image from "@editorjs/image";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import InlineCode from "@editorjs/inline-code";
import Header from "@editorjs/header";
import CodeTool from "@editorjs/code";
import Table from "@editorjs/table"; // Added Table tool
import LinkTool from "@editorjs/link"; // Added Link tool
import Checklist from "@editorjs/checklist"; // Added Checklist tool
import Delimiter from "@editorjs/delimiter"; // Added Delimiter tool
import Warning from "@editorjs/warning"; // Added Warning tool
import Underline from "@editorjs/underline"; // Added Underline tool

// Function to handle image upload by URL
//* custom uploader function
const uploadImageByUrl = async (url) => {
  try {
    return {
      success: 1,
      file: { url }
    };
  } catch (err) {
    console.error("Error uploading image by URL:", err);
    return {
      success: 0,
      error: "Failed to upload image by URL"
    };
  }
};

// Function to handle image upload by file
//* this function is to upload file in editor section
const uploadImageByFile = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post("http://localhost:3000/upload", formData);
    const imageUrl = response.data.url;

    return {
      success: 1,
      file: { url: imageUrl }
    };
  } catch (err) {
    console.error("Error uploading image by file:", err);
    return {
      note: "Error uploading image by file in editor from tools.components section",
      success: 0,
      error: "Failed to upload image by file"
    };
  }
};

// Export the tools configuration
export const tools = {
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        uploadByFile: uploadImageByFile
      }
    }
  },

  embed: Embed,

  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter header text...",
      levels: [1, 2, 3, 4, 5, 6] // Supports H1 to H6
    }
  },

  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered"
    }
  },

  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Enter a quote...",
      captionPlaceholder: "Quote author"
    }
  },

  marker: {
    class: Marker,
    inlineToolbar: true
  },

  inlineCode: InlineCode,

  code: {
    class: CodeTool,
    config: {
      placeholder: "Enter your code here..."
    }
  },

  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2, // Default number of rows
      cols: 2 // Default number of columns
    }
  },

  //todo: configure link 
  link: {
    class: LinkTool,
    config: {
      endpoint: "https://your-backend.com/fetch-url"
    }
  },

  checklist: {
    class: Checklist,
    inlineToolbar: true
  },

  delimiter: Delimiter,

  warning: {
    class: Warning,
    inlineToolbar: true,
    config: {
      titlePlaceholder: "Title",
      messagePlaceholder: "Message"
    }
  },

  underline: Underline
};

// import Embed from "@editorjs/embed";
// import Image from "@editorjs/image";
// // import LinkTool from "@editorjs/link";
// import List from "@editorjs/list";
// import Quote from "@editorjs/quote";
// // import { Editor } from "@toast-ui/react-editor";
// import Marker from "@editorjs/marker";
// // import MarkerList from "@editorjs/marker-list";
// import InlineCode from "@editorjs/inline-code";
// import Header from "@editorjs/header";
// import CodeTool from "@editorjs/code"; // Import for code blocks

// const uploadImageByUrl = async (url) => {
//   let link = new Promise((resolve, reject) => {
//     try {
//       resolve(url);
//     } catch (err) {
//       reject(err);
//     }
//   });
//   return link.then((url) => {
//     return {
//       sucess: 1,
//       file: { url }
//     };
//   });
// };
//   //todo:
// const uploadImageByFile = async (file) => {
//     //todo: uploadImage(e).then( url => {})
// };

// export const tools = {
//     image: {
//       class: Image,
//       config: {
//         uploader: {
//           uploadByUrl: uploadImageByUrl,
//           uploadByFile: uploadImageByFile
//         }
//       }
//     },
//   embed: Embed,
//   header: {
//     class: Header,
//     inlineToolbar: true,
//     config: {
//       placeholder: "Enter header text...",
//       levels: [1, 2, 3, 4, 5, 6]
//     }
//   },
//   list: {
//     class: List,
//     inlineToolbar: true,
//     config: {
//       type: "bullet" // or "numbered"
//     }
//   },
//   quote: Quote,
//   marker: Marker,
//   inlineCode: InlineCode,
//   code: CodeTool // Assign the correct tool
// };
