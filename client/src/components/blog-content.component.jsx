import React from "react";

const Img = ({ url, caption }) => {
  return (
    <div className="my-4">
      <img src={url} alt={caption || "Blog image"} className="w-full" />
      {caption && (
        <p className="text-dark-grey my-3 w-full text-center text-base md:mb-12">{caption}</p>
      )}
    </div>
  );
};

const Quote = ({ quote, caption }) => {
  return (
    <div className="bg-purple/10 border-purple my-4 border-l-4 p-3 pl-5">
      <p className="text-xl leading-10 md:text-2xl">{quote}</p>
      {caption && <p className="text-purple w-full text-base">{caption}</p>}
    </div>
  );
};

const List = ({ style, items }) => {
  return (
    <ol className={`my-4 pl-5 ${style === "ordered" ? "list-decimal" : "list-disc"}`}>
      {items.map((item, i) => (
        <li key={i} className="my-4" dangerouslySetInnerHTML={{ __html: item }} />
      ))}
    </ol>
  );
};

const BlogContent = ({ block }) => {

    //* handling the blogcontext made using editorjs
  const { type, data } = block;

  switch (type) {
    case "paragraph":
      return <p className="my-4" dangerouslySetInnerHTML={{ __html: data.text }} />;

    case "header":
      return data.level === 3 ? (
        <h3 className="my-4 text-3xl font-bold" dangerouslySetInnerHTML={{ __html: data.text }} />
      ) : (
        <h2 className="my-4 text-4xl font-bold" dangerouslySetInnerHTML={{ __html: data.text }} />
      );

    case "image":
      return <Img url={data.file.url} caption={data.caption} />;

    case "quote":
      return <Quote quote={data.quote} caption={data.caption} />;

    case "list":
      return <List style={data.style} items={data.items} />;

    default:
      console.warn(`Unknown block type: ${type}`);
      return null;
  }
};

export default React.memo(BlogContent);

// import React from "react";

// const Img = ({ url, caption }) => {
//   return (
//     <div>
//       <img src={url} />
//       {caption && (
//         <p className="text-dark-grey my-3 w-full text-center text-base md:mb-12">{caption}</p>
//       )}
//     </div>
//   );
// };

// const Quote = ({ quote, caption }) => {
//   return (
//     <div className="bg-purple/10 border-purple border-l-4 p-3 pl-5">
//       <p className="text-xl leading-10 md:text-2xl">{quote}</p>
//       {caption && <p className="text-purple w-full text-base">{caption}</p>}
//     </div>
//   );
// };

// const List = ({ style, items }) => {
//   return (
//     <ol className={`pl-5 ${style == "ordered" ? "list-decimal" : "list-disc"}`}>
//       {items.map((item, i) => {
//         return <li key={i} className="my-4" dangerouslySetInnerHTML={{ __html: item }}></li>;
//       })}
//     </ol>
//   );
// };

// const BlogContent = ({ block }) => {
//   let { type, data } = block;

//   if (type == "paragraph") {
//     return <p dangerouslySetInnerHTML={{ __html: data.text }}>data.text</p>;
//   }

//   if (type == "header") {
//     if (data.level == 3) {
//       return (
//         <h3 className="text-3xl font-bold" dangerouslySetInnerHTML={{ __html: data.text }}>
//           data.text
//         </h3>
//       );
//     }
//     return (
//       <h2 className="text-4xl font-bold" dangerouslySetInnerHTML={{ __html: data.text }}>
//         data.text
//       </h2>
//     );
//   }

//   if (type == "image") {
//     return <Img url={data.file.url} caption={data.caption} />;
//   }

//   if (type == "quote") {
//     return <Quote quote={data.quote} caption={data.caption} />;
//   }

//   if (type == "list") {
//     return <List style={data.style} items={data.items} />;
//   }
// };

// export default BlogContent;
