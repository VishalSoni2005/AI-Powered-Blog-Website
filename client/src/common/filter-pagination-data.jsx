import axios from "axios";

export const filterPaginationData = async ({
  createNewArray = false,
  state, // {results:[],page:1,totalDocs:0}
  data, // array of blog object come from post request
  page,
  arr,
  countRoute,
  data_to_send = {},
}) => {
  let obj;

  if (state != null && !createNewArray) {
    obj = { ...state, results: [...state.results, ...data], page: page };
  } else {
    await axios
      .post(`http://localhost:8080${countRoute}`, data_to_send)
      .then(({ data: { totalDocs } }) => {
        obj = {
          results: data,
          page: 1,
          totalDocs,
        };
        // console.log("Data after filtering:", obj);
      })
      .catch((err) => console.log(err));
  }
  return obj;
};
