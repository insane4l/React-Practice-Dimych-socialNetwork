import React from 'react';

const Pagination = ({currentPage, totalUsersCount, pageSize, onPageSelected}) => {

    const pagesCount = Math.ceil(totalUsersCount / pageSize);
    const pages = [];
    
    for(let i=1; i <= pagesCount; i++){
        pages.push(i);
    };
    
    const nextPages = currentPage + 2;
    const prevPages = currentPage - 2;

    return (
        <div className="pagination">
            {pages
                .filter(num => (num === 1 || num === currentPage || (num >= prevPages && num <= nextPages) || num === pagesCount) )
                .map(num =>
                    <span 
                        key={num} 
                        className={`pagination__item ${num === currentPage ? 'pagination__item_active' : ''}`}
                        onClick={() => onPageSelected(num)}>
                        {num}
                    </span>)
            }
        </div>
    )
}

export default Pagination;