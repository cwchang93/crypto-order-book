import styled from 'styled-components';


export const StyledTableBody = styled.div`

    display: flex;
    padding: 4px 0 3px;
    flex-direction: column;


    >div:nth-of-type(1){
        flex: 1 1 27%; 
        color: rgb(255, 91, 90); 
        font-weight: 500;
    }
    
    >div:nth-of-type(2){
        flex: 1 1 27%; 
        margin-left: 7px; 
        font-weight: 500;
    }
    
    >div:nth-of-type(3){
        flex: 1 1 46%;
        position: relative;
        overflow: hidden;
        margin-left: 7px;
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

    .ask_new_price {
        animation-name: ask_new_price;
        animation-duration: 0.5s;
        animation-timing-function: linear;
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

    .bid_new_price {
        animation-name: bid_new_price;
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

export const StyledTotalWrap = styled.div<{ $translateNum: number }>`

    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background-color: rgba(255, 90, 90, 0.12);
    transform: translateX(translateNum);
`;