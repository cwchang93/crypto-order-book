import React from 'react';
import { StyledTableBody, StyledSizeItem, StyledTotalWrap } from './style';
import { priceFormatter, sizeFormatter } from 'utils';


interface TableBodyProps {
    type: string;  // ask, bid
    item: string[];
    onAnimationEnd: () => void;
    onSizeAnimationEnd: () => void;
    isSizeIncrease?: boolean;
    isNewPrice: boolean;
    translateNum: number;
    total: number;
}
const TableBody = ({ type, item, onAnimationEnd, isSizeIncrease, onSizeAnimationEnd, translateNum, total, isNewPrice }: TableBodyProps) => {
    return (
        <StyledTableBody
            onAnimationEnd={onAnimationEnd}
            $isNewPrice={isNewPrice}
            key={item[0]}
            $type={type}
        >
            <div
            >
                {priceFormatter(parseFloat(item[0]))}
            </div>
            <StyledSizeItem
                $isSizeIncrease={isSizeIncrease}
                onAnimationEnd={onSizeAnimationEnd}
            >
                {sizeFormatter(parseFloat(item[1]))}
            </StyledSizeItem>
            <StyledTotalWrap $translateNum={translateNum} $type={type}  >
                <div></div>
                <div>
                    {sizeFormatter(total)}
                </div>
            </StyledTotalWrap>
        </StyledTableBody>
    );
};

export default TableBody;
