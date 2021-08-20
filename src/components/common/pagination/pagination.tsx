import React, {useState} from 'react'
import { useEffect } from 'react';

import './pagination.scss'

type PropsType = {
    currentPage: number
    totalItemsCount: number
    pageSize: number
    onPageSelected: (pageNumber: number) => void
    portionSize?: number
}


const Pagination: React.FC<PropsType> = ({currentPage, totalItemsCount, pageSize, onPageSelected, portionSize = 10}) => {
    
    const [currentPortion, setCurrentPortion] = useState(1);
    useEffect(() => {
        if (currentPortion !== selectedPagePortion) {
            setCurrentPortion(selectedPagePortion)
        }
        // eslint-disable-next-line
    }, [currentPage])

    const pagesCount = Math.ceil(totalItemsCount / pageSize);
    const pages = [];
    for(let i=1; i <= pagesCount; i++){
        pages.push(i);
    };
    
    console.log('rerendered')
    const selectedPagePortion = Math.ceil(currentPage / portionSize)
    const portionsCount = Math.ceil(pagesCount / portionSize);
    const firstPortionPageNum = (currentPortion -1) * portionSize + 1;
    const lastPortionPageNum = currentPortion * portionSize;
    
    const setNextPortion = () => {
        if (currentPortion < portionsCount) {
            setCurrentPortion(currentPortion + 1)
        }
    }
    const setPrevPortion = () => {
        if (currentPortion > 1) {
            setCurrentPortion(currentPortion - 1)
        }
    }

    return (
        <div className="pagination">
            {currentPortion > 1 && <button onClick={setPrevPortion}>Prev</button>}
            {pages
                // .filter(num => (num === 1 || num === currentPage || (num >= prevPages && num <= nextPages) || num === pagesCount) )
                .filter(num => (num >= firstPortionPageNum && num <= lastPortionPageNum))
                .map(num =>
                    <span 
                        key={num} 
                        className={`pagination__item ${num === currentPage ? 'pagination__item_active' : ''}`}
                        onClick={() => onPageSelected(num)}>
                        {num}
                    </span>)
            }
            {currentPortion < portionsCount && <button onClick={setNextPortion}>Next</button>}
        </div>
    )
}

export default Pagination