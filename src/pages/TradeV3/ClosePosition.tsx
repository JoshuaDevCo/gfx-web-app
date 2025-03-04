import { FC, useMemo, useState } from 'react'
import { useCrypto, useOrderBook } from '../../context'
import { useTraderConfig } from '../../context/trader_risk_group'
import tw, { styled } from 'twin.macro'
import 'styled-components/macro'
import { Button } from '../../components'
import {
  convertToFractional,
  displayFractional,
  getClosePositionPrice,
  getExitQuantityInNumber,
  getExitQuntity,
  getPerpsPrice,
  mulFractionals
} from './perps/utils'
import { Fractional } from './perps/dexterity/types'
import * as anchor from '@project-serum/anchor'
import { RotatingLoader } from '../../components/RotatingLoader'
import { checkMobile } from '../../utils'

const WRAPPER = styled.div`
  .percentage {
    ${tw`w-full h-[45px] rounded-circle flex flex-row dark:bg-black-1 bg-grey-4 mb-3.75`}
    >input {
      ${tw`w-full h-[45px] rounded-circle flex pl-6 font-semibold text-regular text-grey-1 
        flex-row dark:bg-black-1 bg-grey-4 border-none`}
      outline: none;
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    input[type='number'] {
      -moz-appearance: textfield;
    }
    .percentage-num {
      ${tw`w-1/4 font-semibold cursor-pointer flex flex-row items-center justify-center h-full 
        text-[16px] text-grey-1 sm:text-regular`}
    }
    .selected {
      ${tw`rounded-half text-white dark:text-grey-5`}
      background-image: linear-gradient(105deg, #f7931a 6%, #ac1cc7 96%);
    }
  }
`

const ROW = styled.div`
  ${tw`flex flex-row justify-between items-start mb-4 sm:mb-2.5`}

  > span {
    ${tw`text-average font-semibold text-grey-1 sm:text-regular`}
  }

  .value {
    ${tw`text-black-4 dark:text-white`}
    .positive {
      ${tw`text-green-2 font-medium`}
    }
    .negative {
      ${tw`text-red-1 font-medium`}
    }
  }
`

const percentDetails = [
  {
    index: 0,
    display: 25,
    value: new Fractional({ m: new anchor.BN(25), exp: new anchor.BN(2) })
  },
  {
    index: 1,
    display: 50,
    value: new Fractional({ m: new anchor.BN(5), exp: new anchor.BN(1) })
  },
  {
    index: 2,
    display: 75,
    value: new Fractional({ m: new anchor.BN(75), exp: new anchor.BN(2) })
  },
  {
    index: 3,
    display: 100,
    value: new Fractional({ m: new anchor.BN(1), exp: new anchor.BN(0) })
  }
]

export const ClosePosition: FC<{
  setVisibleState: React.Dispatch<React.SetStateAction<any>>
  setSummaryData: React.Dispatch<React.SetStateAction<any>>
  setPerpsEndModal: React.Dispatch<React.SetStateAction<any>>
}> = ({ setVisibleState, setSummaryData, setPerpsEndModal }) => {
  const { traderInfo, activeProduct } = useTraderConfig()
  const { selectedCrypto, getAskSymbolFromPair } = useCrypto()
  const { orderBook } = useOrderBook()
  const price = getPerpsPrice(orderBook)
  const [percentageIndex, setPercentageindex] = useState<number>(3)
  const [loading, setLoading] = useState<boolean>(false)
  const [customAmount, setCustomAmount] = useState<string>(null)
  const [inputValue, setInputValue] = useState<number>(null)

  const { closePosition } = useTraderConfig()
  const symbol = useMemo(
    () => getAskSymbolFromPair(selectedCrypto.pair),
    [getAskSymbolFromPair, selectedCrypto.pair]
  )
  const assetIcon = useMemo(() => `/img/crypto/${symbol}.svg`, [symbol, selectedCrypto.type])

  const handlePercentageChange = (e: React.MouseEvent<HTMLElement>, index: number) => {
    setPercentageindex(index)
  }

  const entryPrice = useMemo(() => traderInfo.averagePosition.price, [traderInfo, activeProduct])

  const totalExitQty = useMemo(
    () => getExitQuntity(traderInfo.balances, activeProduct),
    [traderInfo, activeProduct]
  )

  const totalExitQtyNumber = useMemo(
    () => getExitQuantityInNumber(traderInfo.balances, activeProduct),
    [traderInfo, activeProduct]
  )

  const getFractionalCustomAmount = (customAmount: string) => {
    const side = traderInfo.averagePosition.side
    const fractionalCustomAmount = convertToFractional(customAmount)
    if (side === 'sell') {
      const negativeCustomAmount = mulFractionals(
        new Fractional({
          m: new anchor.BN(-1),
          exp: new anchor.BN(0)
        }),
        fractionalCustomAmount
      )
      return negativeCustomAmount
    } else {
      return fractionalCustomAmount
    }
  }

  const selectedExitQty = useMemo(() => {
    if (!percentageIndex && customAmount) {
      return getFractionalCustomAmount(customAmount)
    } else {
      const multiplier = percentDetails[percentageIndex]?.value
      return mulFractionals(multiplier, totalExitQty)
    }
  }, [totalExitQty, percentageIndex, customAmount])

  const exitPrice = useMemo(
    () => getClosePositionPrice(displayFractional(selectedExitQty), orderBook),
    [selectedExitQty, orderBook]
  )

  const pnlNumber = useMemo(() => {
    if (!traderInfo.averagePosition.price) return '-'
    const averagePrice = traderInfo.averagePosition.price,
      sellPrice = exitPrice
    if (!sellPrice || !Number(averagePrice)) return '-'
    const side = traderInfo.averagePosition.side
    const difference = side === 'buy' ? sellPrice - Number(averagePrice) : Number(averagePrice) - sellPrice
    let totalPnl = difference * Number(displayFractional(selectedExitQty))

    totalPnl = side === 'sell' ? totalPnl * -1 : totalPnl
    return totalPnl
  }, [traderInfo, selectedExitQty])

  const pnlEstimate = useMemo(() => {
    if (pnlNumber === '-') return <span>-</span>

    const isNegative = pnlNumber < 0
    return (
      <span className={isNegative ? 'negative' : 'positive'}>
        {(!isNegative ? '+' : '') + pnlNumber.toFixed(2)}
      </span>
    )
  }, [pnlNumber])

  const percentageChange = useMemo(() => {
    const exitPriceNum = Number(exitPrice)
    const entry = Number(traderInfo.averagePosition.price)
    if (Number.isNaN(exitPriceNum) || Number.isNaN(entry)) return 0
    else {
      const percent = ((exitPriceNum - entry) / entry) * 100
      return Math.abs(percent).toFixed(1)
    }
  }, [pnlNumber])

  const closePositionFn = async () => {
    setLoading(true)
    const response = await closePosition(orderBook, selectedExitQty)
    if (response && response.txid) {
      setVisibleState(false)
      setPerpsEndModal(true)
      setSummaryData({
        entryPrice: entryPrice,
        exitPrice: exitPrice,
        pnl: pnlNumber !== '-' ? Math.abs(pnlNumber).toFixed(2) : '-',
        profit: pnlNumber !== '-' ? !(pnlNumber < 0) : false,
        leverage: '10',
        percentageChange: percentageChange
      })
    }
    setLoading(false)
  }

  const handleInputChange = (e) => {
    const inputAmt = e.target.value.replace(/[^0-9]\./g, '')
    if (!isNaN(+inputAmt)) setInputValue(+inputAmt)
    if (!isNaN(+inputAmt) && +inputAmt) {
      if (+inputAmt <= Math.abs(totalExitQtyNumber)) {
        setPercentageindex(null)
        setCustomAmount(inputAmt)
      }
    } else {
      setPercentageindex(3)
      setCustomAmount(null)
    }
  }

  const displayExitQty = useMemo(() => {
    const qt = Number(displayFractional(selectedExitQty))
    if (qt) {
      const qty = qt.toFixed(2)
      return qty
    }
    return '0.0'
  }, [selectedExitQty])

  const slippage = useMemo(() => {
    if (Number.isNaN(exitPrice) || exitPrice === 0) return 'N/A'
    if (Number.isNaN(price) || price === 0) return 'N/A'
    if (Number(displayExitQty) < 0) {
      if (exitPrice - price > 0) {
        const percentage = ((exitPrice - price) / price) * 100
        return percentage.toFixed(2) + '%'
      } else return 'N/A'
    } else {
      if (price - exitPrice > 0) {
        const percentage = ((price - exitPrice) / price) * 100
        return percentage.toFixed(2) + '%'
      } else return 'N/A'
    }
  }, [exitPrice, price, displayExitQty])

  return (
    <WRAPPER>
      <div tw="flex items-center my-4 sm:my-3">
        <span tw="text-lg font-semibold text-grey-1 dark:text-grey-5 sm:text-regular">
          {displayExitQty} {symbol}
        </span>
        <img
          tw="ml-2.5"
          src={assetIcon}
          alt={symbol}
          height={checkMobile() ? '20px' : '28px'}
          width={checkMobile() ? '20px' : '28px'}
        />
        <span tw="ml-auto text-average font-semibold text-black-4 dark:text-grey-5 sm:text-tiny">${price}</span>
        <span tw="text-average font-semibold text-grey-1 sm:text-tiny">(Market Price)</span>
      </div>
      <div className="percentage">
        {percentDetails.map((elem, index) => (
          <div
            className={percentageIndex === index ? 'percentage-num selected' : 'percentage-num'}
            onClick={(e) => {
              handlePercentageChange(e, index)
            }}
            key={index}
          >
            {elem.display}%
          </div>
        ))}
      </div>
      <div tw="flex flex-row justify-between">
        <span tw="text-regular font-semibold dark:text-grey-4 text-grey-1 mb-2.5 sm:text-tiny">Custom</span>
        {inputValue > Math.abs(totalExitQtyNumber) ? (
          <span tw="text-red-1 font-semibold text-regular">Maximum quantity exceeded!</span>
        ) : null}
      </div>
      <div className="percentage">
        <input
          type="number"
          placeholder="Enter custom quantity"
          onChange={handleInputChange}
          value={customAmount}
        />
      </div>
      <div tw="mb-4.5">
        <ROW>
          <span>Est. Exit Price</span>
          <span className="value">${exitPrice}</span>
        </ROW>
        <ROW>
          <span>Est. Slippage</span>
          <span className="value">{slippage}</span>
        </ROW>
        <ROW>
          <span>New Est. Liquidation Price</span>
          <span className="value">None</span>
        </ROW>
        <ROW>
          <span>Est. Realised P&L</span>
          <span className="value">
            {pnlEstimate} {pnlNumber === '-' ? ' ' : 'USD'}
          </span>
        </ROW>
      </div>
      <Button
        onClick={closePositionFn}
        height="50px"
        width="100%"
        cssStyle={tw`bg-blue-1 text-grey-5 font-semibold border-0 rounded-circle text-average sm:text-regular`}
      >
        <span>
          {loading ? (
            <RotatingLoader text="" textSize={12} iconSize={30} iconColor="white" />
          ) : percentDetails[percentageIndex]?.display ? (
            `Close ${percentDetails[percentageIndex].display}% of the position`
          ) : (
            'Close Position'
          )}
        </span>
      </Button>
    </WRAPPER>
  )
}
