import Pagination from 'react-bootstrap/Pagination';

function PaginationWrapper({numOfPages, currPage, setCurrPage}) {
  const pages = [];

  for (let i = 0; i < numOfPages; i++) { pages[i] = i + 1; }

  return (
    <Pagination className="justify-content-center">
      <Pagination.Prev aria-label="Previous" onClick={() => (currPage > 1) && setCurrPage(currPage - 1)}/>
      {
        pages.map(page => (
          <Pagination.Item active={page === currPage} key={page} onClick={() => setCurrPage(page)}>{page}</Pagination.Item>
        ))
      }
      <Pagination.Next aria-label="Next" onClick={() => (currPage < numOfPages) && setCurrPage(currPage + 1)}/>
    </Pagination>
  );
}

export default PaginationWrapper;