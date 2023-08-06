import styled from 'styled-components';


export const StyledTableBody = styled.div<{ $type: string; $isNewPrice: boolean }>`

    padding: 4px 10px 3px;
    display: grid;
    grid-template-columns: repeat(3,1fr);

    >div:nth-of-type(1){
        color: ${({ $type }) => ($type === 'asks' ? '#FF5B5A' : '#00b15d')};
        font-weight: 500;
    }
    

    @keyframes ask_new_price {
        0% {
            background-color: transparent;
        }
        50% {
            background-color: rgba(255, 91, 90, 0.5);
        }
        100% {
            background-color: transparent;
        }
    }


    @keyframes bid_new_price {
        0% {
            background-color: transparent;
        }
        50% {
            background-color: rgba(0, 177, 93, 0.5);
        }
        100% {
            background-color: transparent;
        }
    }

    animation-name:  ${({ $isNewPrice, $type }) => {
        if ($isNewPrice) {
            if ($type === 'asks') {
                return 'ask_new_price';
            } else if ($type === 'bids') {
                return 'bid_new_price';
            }
        }
    }};
        animation-duration: 0.5s;
        animation-timing-function: linear;
        
    .ask_new_price {
        animation-name: ask_new_price;
        animation-duration: 0.5s;
        animation-timing-function: linear;
    }

`;


export const StyledSizeItem = styled.div<{ $isSizeIncrease?: boolean }>`

    
    @keyframes size_decrease {
        0% {
            background-color: transparent;
        }
        50% {
            background-color: rgba(255, 91, 90, 0.5);
        }
        100% {
            background-color: transparent;
        }
    }

    .size_decrease {
        animation-name: size_decrease;
        animation-duration: 0.5s;
        animation-timing-function: linear;
    }

    @keyframes size_increase {
        0% {
            background-color: transparent;
        }
        50% {
            background-color: rgba(0, 177, 93, 0.5);
        }
        100% {
            background-color: transparent;
        }
    }

        animation-name: ${({ $isSizeIncrease }) => $isSizeIncrease ? 'size_increase' : 'size_decrease'}; 
        animation-duration: 0.5s;
        animation-timing-function: linear;

`;

export const StyledTotalWrap = styled.div<{ $translateNum: number; $type: string }>`

    position: relative;
    overflow: hidden;
    margin-left: 7;
    font-weight: 500;

    >div:nth-of-type(1) {
        position: absolute; 
        width: 100%; 
        height: 100%; 
        top: 0px; 
        right: 0px; 
        background-color:
        ${({ $type }) => $type === 'asks' ? 'rgba(255, 90, 90, 0.12)' : 'rgba(16, 186, 104, 0.12)'}; 
        transform: translateX(${({ $translateNum }) => `${$translateNum}%`});
        
    }
    >div:nth-of-type(2) {
        position: absolute; 
        top: 0px; 
        right: 0px;
    
    }


`;