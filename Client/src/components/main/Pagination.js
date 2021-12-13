import "./Pagination.css";
import ArrowLeft from "../icons/ArrowLeft";
import ArrowRight from "../icons/ArrowRight";
import ReactPaginate from "react-paginate";

export default function Pagination({
    limit,
    total,
    page,
    setPage
}) {

    return (
        <ReactPaginate
            containerClassName="pagination center"
            pageClassName="page"
            activeClassName="page page-current"
            breakClassName="page page-ellipsis"
            previousClassName="page page-previous"
            nextClassName="page page-next"
            disabledClassName="page page-disabled"
            previousLabel={<ArrowLeft />}
            nextLabel={<ArrowRight />}
            pageCount={Number(Math.ceil(total / limit))}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            forcePage={page - 1}
            onPageChange={e => setPage(Number(e.selected + 1))}
        />
    );
}
