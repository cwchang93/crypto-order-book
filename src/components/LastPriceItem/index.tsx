import { StyledLastPrice } from './style';
import { priceFormatter } from 'utils';
import ArrowDownIcon from "images/arrowDown.svg";


interface LastPriceItemProps {
    price: number;
    condition?: 'higher' | 'lower' | 'equal'
}

const LastPriceItem = ({ price, condition }: LastPriceItemProps) => {

    return (
        <StyledLastPrice
            condition={condition}
        >
            {priceFormatter(price)}
            <ArrowDownIcon />
        </StyledLastPrice>)

}

export default LastPriceItem;