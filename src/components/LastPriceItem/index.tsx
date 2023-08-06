import { StyledLastPrice } from './style';
import { priceFormatter } from 'utils';
import ArrowDownIcon from "images/arrowDown.svg";


interface LastPriceItemProps {
    price: string;
    condition?: string;
}

const LastPriceItem = ({ price, condition }: LastPriceItemProps) => {

    return (
        <StyledLastPrice
            condition={condition}
        >
            {priceFormatter(parseFloat(price))}
            <ArrowDownIcon />
        </StyledLastPrice>)

}

export default LastPriceItem;