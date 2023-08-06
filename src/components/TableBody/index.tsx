import React from 'react';
import { StyledTableBody, StyledSizeItem, StyledTotalWrap } from './style';
import { priceFormatter, sizeFormatter } from 'utils';


interface TableBodyProps {
    item: string[];
    onAnimationEnd: () => void;
    onSizeAnimationEnd: () => void;
    isSizeIncrease?: boolean;
    translateNum: number;
    total: number;
}
const TableBody = ({ item, onAnimationEnd, isSizeIncrease, onSizeAnimationEnd, translateNum, total }: TableBodyProps) => {
    return (
        <StyledTableBody
            onAnimationEnd={onAnimationEnd}
            key={item[0]}
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
            <div>
                <StyledTotalWrap $translateNum={translateNum}  >
                    <div
                        style={{
                            position: "absolute",
                            top: 0,
                            right: 0,
                        }}
                    >
                        {sizeFormatter(total)}
                    </div>
                </StyledTotalWrap>
            </div>
        </StyledTableBody>
    );
};

export default TableBody;
