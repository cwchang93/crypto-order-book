"use client";
import { StyledMainPage } from './style';
import TableHeader from 'components/TableHeader'
import LastPriceItem from 'components/LastPriceItem';

import useWebSocket from "react-use-websocket";


const tableHeaderItems = ["Price (USD)", "Size", "Total"]

export default function Home() {

  const lastPrice = 1234.3;

  return (
    <StyledMainPage>
      <TableHeader items={tableHeaderItems} />

      <LastPriceItem price={lastPrice} condition={'higher'} />

    </StyledMainPage>
  )
}
