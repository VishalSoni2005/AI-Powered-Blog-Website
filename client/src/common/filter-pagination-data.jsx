import axios from "axios";

export const filterPaginationData = async ({
  createNewArray = false,
  state,
  data,
  page,
  countRoute,
  data_to_send
}) => {
  let obj;

  if (arr != null && !createNewArray) {
    obj = { ...state, results: [...state.results, ...data], page: page };
  } else {
    await axios
      .post(`http://localhost:3000/${countRoute}`, data_to_send)
      .then(({ data: { totalDocs } }) => {
        obj = {
          results: data,
          page: 1,
          totalDocs: totalDocs
        };
      })
      .catch((err) => console.log(err));
  }
  return obj;
};
