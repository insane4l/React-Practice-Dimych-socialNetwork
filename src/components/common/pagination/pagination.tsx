import React, {useState} from 'react'
import { useEffect } from 'react';
import { nextArrow, prevArrow } from '../../../assets/icons';

import './pagination.scss'


const Pagination: React.FC<PropsType> = ({currentPage, totalItemsCount, pageSize, onPageSelected, portionSize = 10}) => {

    const [currentPortion, setCurrentPortion] = useState(currentPage);

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
    

    const selectedPagePortion = Math.ceil(currentPage / portionSize);
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
            {currentPortion > 1 
                ? <button onClick={setPrevPortion} className="pagination__prev-btn">
                    <img src={prevArrow} alt="prev" className="pagination__prev-arrow" />
                  </button>

                : <div className="pagination__btn-stub"></div>
            }

            <div className="pagination__list">
                {pages
                    .filter(num => (num >= firstPortionPageNum && num <= lastPortionPageNum))
                    .map(num =>
                        <button 
                            key={num} 
                            className={`pagination__item ${num === currentPage ? 'pagination__item_active' : ''}`}
                            onClick={() => onPageSelected(num)}>
                            {num}
                        </button>)
                }
            </div>

            {currentPortion < portionsCount
                ? <button onClick={setNextPortion} className="pagination__next-btn">
                    <img src={nextArrow} alt="next" className="pagination__next-arrow" />
                  </button>
                  
                : <div className="pagination__btn-stub"></div>
            }
        </div>
    )
}


type PropsType = {
    currentPage: number
    totalItemsCount: number
    pageSize: number
    onPageSelected: (pageNumber: number) => void
    portionSize?: number
}

export default Pagination