import { useDarkMode } from '../../../../context'
import tw from 'twin.macro'
import { Tooltip } from '../../../Tooltip'
import React from 'react'
// import Skeleton from 'react-loading-skeleton'
// import { numberFormatter } from '../../../../utils'

interface RewardsBottomBarProps {
  calculating: boolean
  approxRewardAmount: number
}

// eslint-disable-next-line no-empty-pattern
export default function RewardsStakeBottomBar({}: // calculating,
// approxRewardAmount
RewardsBottomBarProps): JSX.Element {
  const { mode } = useDarkMode()
  // ADD min-md:mt-auto min-md:bg-gradient-to-r min-md:max-w-[342px] | back when the approxRewardAmount is added in
  // remove min-md:mt-0
  return (
    <div
      css={[
        tw`min-md:mt-2.5 flex min-md:p-2.5 min-md:mt-0
        from-green-gradient-3 text-regular min-md:text-average
        to-green-gradient-4 bg-none rounded-t-tiny min-md:text-tiny font-semibold text-grey-1
        dark:text-grey-2 min-md:text-grey-1 min-md:dark:text-grey-5 items-center justify-center
        flex-col min-md:flex-row w-full max-w-[580px]`
      ]}
    >
      {/*<div css={[tw`flex flex-wrap min-md:flex-col min-md:gap-1.25 justify-between min-md:justify-start w-full`]}>*/}
      {/*  <p css={[tw`mb-0 whitespace-nowrap`]}>Daily Rewards</p>*/}
      {/*  <p css={[tw` mb-0 text-black-4 dark:text-grey-5 min-md:text-grey-5`]}>*/}
      {/*    {calculating ? (*/}
      {/*      <Skeleton height={'15px'} width={'60px'} borderRadius={'1rem'} highlightColor={'#37BB7D'} />*/}
      {/*    ) : (*/}
      {/*      `≈ ${numberFormatter(approxRewardAmount)} USDC`*/}
      {/*    )}*/}
      {/*  </p>*/}
      {/*</div>*/}
      {/*<div css={[tw`hidden min-md:block border-1 border-solid border-divider rounded-tiny mx-2.5 h-full`]} />*/}
      {/*PLEASE ENSURE THE CENTER IS REMOVED WHEN THE ABOVE IS ADDED IN & REMOVED items-center|min-md:justify-between
       add min-md:flex-col|min-md:justify-center*/}
      <div
        css={[
          tw`flex flex-wrap  min-md:gap-1.25 justify-between min-md:justify-between
        items-center w-full`
        ]}
      >
        <p css={[tw`mb-0 flex items-center gap-1 min-md:text-regular`]}>
          Cooldown Period{' '}
          <Tooltip
            title={'You must wait 7 days after unstaking to reclaim your GOFX.'}
            className={'!inline-flex !m-0 !my-auto !w-5 !h-5 min-md:!w-4.5 min-md:!h-4.5'}
            overlayClassName={'rewards-tooltip large'}
            color={mode == 'dark' ? '#FFF' : '#1C1C1C'}
            tooltipIconClassName={`!ml-0 text-blue-1 dark:text-white min-md:text-white !w-5 !h-5
             min-md:!w-4.5 min-md:!h-4.5`}
            showArrow={false}
            overrideIcon={mode == 'dark' ? '/img/assets/tooltip_holo.svg' : '/img/assets/tooltip_blue.svg'}
          >
            <></>
          </Tooltip>
        </p>
        <p css={[tw`mb-0 text-black-4 dark:text-grey-5 min-md:text-black-4`]}>7 Days</p>
      </div>
    </div>
  )
}
