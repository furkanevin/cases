import ReactPaginate from 'react-paginate';
import { useData } from '../context/UniversityContext';
import { useSearchParams } from 'react-router-dom';

const Pagination = () => {
  const { universities, maxCount } = useData();
  const [params, setParams] = useSearchParams();

  const handlePageClick = (e) => {
    params.set('_page', e.selected + 1);
    setParams(params);
  };

  return (
    <div className="flex justify-center my-10">
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={Math.ceil(maxCount / 9)}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
