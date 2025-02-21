const LoadMoreDataBtn = ({ state, fetchDataFn }) => {
  if (state != null && state.totalDocs > state.results.length) {
    return (
      <button
        className="text-dark-grey hover:bg-gery/30 flex items-center gap-2 p-2 px-3"
        onClick={() => fetchDataFn({ page: state.page + 1 })}>
        Load More
      </button>
    );
  }
};

export default LoadMoreDataBtn;
