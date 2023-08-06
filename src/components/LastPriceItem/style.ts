import styled from 'styled-components';

const LAST_PRICE_STYLE = {
    higher: {
        color: '#00b15d',
        bgColor: 'rgba(16, 186, 104, 0.12)',
        arrowDownStyle: {
            transform: 'rotate(180deg)',
            display: 'block',
        },
    },
    lower: {
        color: '#FF5B5A',
        bgColor: 'rgba(255, 90, 90, 0.12)',
        arrowDownStyle: {
            transform: 'rotate(0deg)',
            display: 'block',
        },
    },
    equal: {
        color: '#F0F4F8',
        bgColor: 'rgba(134, 152, 170, 0.12)',
        arrowDownStyle: {
            transform: 'rotate(0deg)',
            display: 'none',
        },
    },
};

export const StyledLastPrice = styled.div<{ condition?: string }>`
        height: 28px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16.8px;

  ${(props) => {
        switch (props.condition) {
            case 'higher':
                return `
          color: ${LAST_PRICE_STYLE.higher.color};
          background-color: ${LAST_PRICE_STYLE.higher.bgColor};
          > svg {
            display: ${LAST_PRICE_STYLE.higher.arrowDownStyle.display};
            transform: ${LAST_PRICE_STYLE.higher.arrowDownStyle.transform};
          }
        `;
            case 'lower':
                return `
          color: ${LAST_PRICE_STYLE.lower.color};
          background-color: ${LAST_PRICE_STYLE.lower.bgColor};
          > svg {
            display: ${LAST_PRICE_STYLE.lower.arrowDownStyle.display};
            transform: ${LAST_PRICE_STYLE.lower.arrowDownStyle.transform};
          }
        `;
            default:
                return `
          color: ${LAST_PRICE_STYLE.equal.color};
          background-color: ${LAST_PRICE_STYLE.equal.bgColor};
          > svg {
            display: ${LAST_PRICE_STYLE.equal.arrowDownStyle.display};
            transform: ${LAST_PRICE_STYLE.equal.arrowDownStyle.transform};
          }
        `;
        }
    }}
`;
