import React from 'react';
import './pagination.css';

const Pagination = (props) => {

    const {handlePaginationClick} = props;

    return (
    <div className="Pagination">
        <button className="Pagination-button" onClick={ () => handlePaginationClick('prev')} >&larr;</button>
        <button className="Pagination-button" onClick={ () => handlePaginationClick('next')} >&rarr;</button>

     </div>
    )
}

export default Pagination;