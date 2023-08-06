import React from 'react';
import { StyledTableHeaderContainer, StyledTableHeaderCell } from './style';

interface TableHeaderProps {
    items: string[];
}

const TableHeader = ({ items }: TableHeaderProps) => {
    return (
        <StyledTableHeaderContainer>
            {
                items.map((tableItem: string) => {
                    return (
                        <StyledTableHeaderCell key={tableItem}>
                            {tableItem}
                        </StyledTableHeaderCell>
                    )
                })
            }
        </StyledTableHeaderContainer>
    );
};

export default TableHeader;
