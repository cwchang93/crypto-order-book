"use client";
import { StyledMainPage } from './style';
import TableHeader from 'components/TableHeader'
import LastPriceItem from 'components/LastPriceItem';
import TableBody from 'components/TableBody';

import { useRef, useState, useEffect, useMemo } from 'react';

import useWebSocket from "react-use-websocket";

const tableHeaderItems = ["Price (USD)", "Size", "Total"]

const MAX_QUOTE = 8;

export default function Home() {


  const { sendMessage, lastMessage } = useWebSocket(
    "wss://ws.btse.com/ws/oss/futures"
  );
  const {
    sendMessage: sendLastPriceMessage,
    lastMessage: lastPricelastMessage,
  } = useWebSocket("wss://ws.btse.com/ws/futures");
  const [lastPrice, setLastPrice] = useState("0");
  const seqNumRef = useRef(0);
  const [askQuotePriceMap, setAskQuotePriceMap] = useState<any>({});
  const [bidQuotePriceMap, setBidQuotePriceMap] = useState<any>({});

  const [askNewPriceMap, setAskNewPriceMap] = useState<any>({});
  const [bidNewPriceMap, setBidNewPriceMap] = useState<any>({});

  const [asks, setAsks] = useState<any>([]);
  const [bids, setBids] = useState<any>([]);

  useEffect(() => {
    if (lastMessage !== null) {
      const data = JSON.parse(lastMessage.data).data;
      if (data && data.type === "snapshot") {
        setAsks(data.asks);
        setBids(data.bids);
        seqNumRef.current = data.seqNum;
      }
      if (data && data.type === "delta") {
        if (data.prevSeqNum !== seqNumRef.current) {
          sendMessage('{"op": "unsubscribe","args": ["update:BTCPFC_0"]}');
          sendMessage('{"op": "subscribe","args": ["update:BTCPFC_0"]}');
        }
        seqNumRef.current = data.seqNum;
        setAsks((preState: any) => {
          let temp: any = [...preState];
          for (let i = 0; i < data.asks.length; i++) {
            if (data.asks[i][1] === "0") {
              const index = temp.findIndex(
                (ele: string) => ele === data.asks[i][0]
              );
              if (index !== -1) {
                temp.splice(index, 1);
              }
            } else {
              const index = temp.findIndex(
                (ele: string) => ele[0] === data.asks[i][0]
              );
              if (index !== -1) {
                if (parseInt(data.asks[i][1]) > parseInt(temp[index][1])) {
                  setAskQuotePriceMap((preState: any) => ({
                    ...preState,
                    [data.asks[i][0]]: "size_increase",
                  }));
                } else if (
                  parseInt(data.asks[i][1]) < parseInt(temp[index][1])
                ) {
                  setAskQuotePriceMap((preState: any) => ({
                    ...preState,
                    [data.asks[i][0]]: "size_decrease",
                  }));
                }
                temp[index][1] = data.asks[i][1];
              } else {
                temp.push(data.asks[i]);
                temp.sort(
                  (a: any, b: any) => parseFloat(b[0]) - parseFloat(a[0])
                );
                setAskNewPriceMap((preState: any) => ({
                  ...preState,
                  [data.asks[i][0]]: "new_price",
                }));
              }
            }
          }
          return temp;
        });
        setBids((preState: any) => {
          let temp: any = [...preState];
          for (let i = 0; i < data.bids.length; i++) {
            if (data.bids[i][1] === "0") {
              const index = temp.findIndex(
                (ele: string) => ele === data.bids[i][0]
              );
              if (index !== -1) {
                temp.splice(index, 1);
              }
            } else {
              const index = temp.findIndex(
                (ele: string) => ele[0] === data.bids[i][0]
              );
              if (index !== -1) {
                if (parseInt(data.bids[i][1]) > parseInt(temp[index][1])) {
                  setBidQuotePriceMap((preState: any) => ({
                    ...preState,
                    [data.bids[i][0]]: "size_increase",
                  }));
                } else if (
                  parseInt(data.bids[i][1]) < parseInt(temp[index][1])
                ) {
                  setBidQuotePriceMap((preState: any) => ({
                    ...preState,
                    [data.bids[i][0]]: "size_decrease",
                  }));
                }
                temp[index][1] = data.bids[i][1];
              } else {
                temp.push(data.bids[i]);
                temp.sort(
                  (a: any, b: any) => parseFloat(b[0]) - parseFloat(a[0])
                );
                setBidNewPriceMap((preState: any) => ({
                  ...preState,
                  [data.bids[i][0]]: "new_price",
                }));
              }
            }
          }
          return temp;
        });
      }
    }
  }, [lastMessage, sendMessage]);

  const [lastPriceStyle, setlastPriceStyle] = useState('equal');
  useEffect(() => {
    if (lastPricelastMessage !== null) {
      const data = JSON.parse(lastPricelastMessage.data).data;
      if (data && data[0]) {
        setLastPrice((prePrice) => {
          if (parseFloat(data[0].price) > parseFloat(prePrice)) {
            setlastPriceStyle('higher');
          } else if (parseFloat(data[0].price) < parseFloat(prePrice)) {
            setlastPriceStyle('lower');
          } else {
            setlastPriceStyle('equal');
          }
          return data[0].price;
        });
      }
    }
  }, [lastPricelastMessage]);

  useEffect(() => {
    sendMessage('{"op": "subscribe","args": ["update:BTCPFC_0"]}');
    return () =>
      sendMessage('{"op": "unsubscribe","args": ["update:BTCPFC_0"]}');
  }, [sendMessage]);

  useEffect(() => {
    sendLastPriceMessage(
      '{"op": "subscribe","args": ["tradeHistoryApi:BTCPFC"]}'
    );
    return () =>
      sendLastPriceMessage(
        '{"op": "unsubscribe","args": ["tradeHistoryApi:BTCPFC"]}'
      );
  }, [sendLastPriceMessage]);

  const maxTotal = useMemo(() => {
    const asksTotal = asks
      .slice(asks.length - MAX_QUOTE)
      .reduce((acc: number, cur: any) => acc + parseInt(cur[1]), 0);
    const bidsTodal = bids
      .slice(0, MAX_QUOTE)
      .reduce((acc: number, cur: any) => acc + parseInt(cur[1]), 0);
    return Math.max(asksTotal, bidsTodal);
  }, [asks, bids]);

  console.log('asks', asks)

  return (
    <StyledMainPage>
      <TableHeader items={tableHeaderItems} />


      {asks.slice(asks.length - MAX_QUOTE).map((ele: any, i: number) => {
        const asksTotal = asks
          .slice(asks.length - MAX_QUOTE)
          .slice(i)
          .reduce((acc: number, cur: any) => acc + parseInt(cur[1]), 0);

        const transformNum = 100 - (asksTotal / maxTotal) * 100;
        return (
          <TableBody
            type='asks'
            isNewPrice={askNewPriceMap[ele[0]] === "new_price"}
            key={ele[0]}
            item={ele}
            onAnimationEnd={() => {
              setAskNewPriceMap((preState: any) => {
                const temp = { ...preState };
                delete temp[ele[0]];
                return temp;
              });
            }}
            onSizeAnimationEnd={() => {
              setAskQuotePriceMap((preState: any) => {
                const temp = { ...preState };
                delete temp[ele[0]];
                return temp;
              });
            }}
            isSizeIncrease={askQuotePriceMap[ele[0]] === "size_increase"}
            translateNum={transformNum}
            total={asksTotal}
          />
        );
      })}

      <LastPriceItem price={lastPrice} condition={lastPriceStyle} />

      {bids.slice(0, MAX_QUOTE).map((ele: any, i: number) => {
        const bidsTotal = bids
          .slice(0, MAX_QUOTE)
          .slice(0, i + 1)
          .reduceRight(
            (acc: number, cur: any) => acc + parseInt(cur[1]),
            0
          );
        return (
          <TableBody
            type='bids'
            isNewPrice={bidNewPriceMap[ele[0]] === "new_price"}
            key={ele[0]}
            item={ele}
            onAnimationEnd={() => {
              setBidNewPriceMap((preState: any) => {
                const temp = { ...preState };
                delete temp[ele[0]];
                return temp;
              });
            }}
            onSizeAnimationEnd={() => {
              setBidQuotePriceMap((preState: any) => {
                const temp = { ...preState };
                delete temp[ele[0]];
                return temp;
              });
            }}
            isSizeIncrease={bidQuotePriceMap[ele[0]] === "size_increase"}
            translateNum={100 - (bidsTotal / maxTotal) * 100}
            total={bidsTotal}
          />
        );
      })}

    </StyledMainPage>
  )
}
