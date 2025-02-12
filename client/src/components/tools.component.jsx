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
const uploadImageByFile = async (file) => {
  try {
    // Example: Upload file to a server or cloud storage (e.g., Cloudinary, AWS S3)
    // const formData = new FormData();
    // formData.append("file", file);
    // const response = await axios.post("https://your-upload-endpoint.com/upload", formData);
    // const imageUrl = response.data.url;

    // For now, return a mock URL
    const mockUrl = URL.createObjectURL(file);
    return {
      success: 1,
      file: { url: mockUrl }
    };
  } catch (err) {
    console.error("Error uploading image by file:", err);
    return {
      success: 0,
      error: "Failed to upload image by file"
    };
  }
};

// Export the tools configuration
export const tools = {
  // Image tool with uploader configuration
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        uploadByFile: uploadImageByFile
      }
    }
  },

  // Embed tool for embedding external content (e.g., YouTube, Twitter)
  embed: Embed,

  // Header tool with customizable levels and placeholder
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Enter header text...",
      levels: [1, 2, 3, 4, 5, 6] // Supports H1 to H6
    }
  },

  // List tool with bullet or numbered list options
  list: {
    class: List,
    inlineToolbar: true,
    config: {
      defaultStyle: "unordered" // or "ordered"
    }
  },

  // Quote tool for block quotes
  quote: {
    class: Quote,
    inlineToolbar: true,
    config: {
      quotePlaceholder: "Enter a quote...",
      captionPlaceholder: "Quote author"
    }
  },

  // Marker tool for highlighting text
  marker: {
    class: Marker,
    inlineToolbar: true
  },

  // InlineCode tool for inline code snippets
  inlineCode: InlineCode,

  // Code tool for code blocks with syntax highlighting
  code: {
    class: CodeTool,
    config: {
      placeholder: "Enter your code here..."
    }
  },

  // Table tool for creating tables
  table: {
    class: Table,
    inlineToolbar: true,
    config: {
      rows: 2, // Default number of rows
      cols: 2 // Default number of columns
    }
  },

  // Link tool for adding hyperlinks
  link: {
    class: LinkTool,
    config: {
      endpoint: "https://your-backend.com/fetch-url" // Endpoint to fetch link metadata
    }
  },

  // Checklist tool for to-do lists
  checklist: {
    class: Checklist,
    inlineToolbar: true
  },

  // Delimiter tool for adding a horizontal line
  delimiter: Delimiter,

  // Warning tool for adding warning blocks
  warning: {
    class: Warning,
    inlineToolbar: true,
    config: {
      titlePlaceholder: "Title",
      messagePlaceholder: "Message"
    }
  },

  // Underline tool for underlining text
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
//   image: {
//     class: Image,
//     config: {
//       class: Image,
//       config: {
//         uploader: {
//           uploadByUrl: uploadImageByUrl,
//           uploadByFile: uploadImageByFile
//         }
//       }
//     }
//   },
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
