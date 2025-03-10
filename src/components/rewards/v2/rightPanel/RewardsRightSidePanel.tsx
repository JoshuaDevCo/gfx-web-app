import useRewards from '../../../../context/rewardsContext'
import { useDarkMode } from '../../../../context'
import { numberFormatter } from '../../../../utils'
import tw from 'twin.macro'
import { Tooltip } from '../../../Tooltip'
import RewardsClaimButton from './RewardsClaimButton'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import RewardsRightLayout from '../../layout/RewardsRightLayout'

export default function RewardsRightSidePanel({ apy }: { apy: number }): JSX.Element {
  const { totalEarned, totalStaked, gofxValue, totalStakedGlobally, userStakeRatio } = useRewards()
  const { mode } = useDarkMode()

  const totalEarnedString = numberFormatter(totalEarned, 2)
  const stakeRatio = numberFormatter(userStakeRatio, 2)

  return (
    <RewardsRightLayout cssStyles={[tw`bg-gradient-to-r from-green-gradient-3 to-green-gradient-4 `]}>
      <h1 css={[tw`text-h2 min-md:text-h1 font-semibold !mb-0`]}>
        {apy == 0 ? (
          <Skeleton highlightColor={'#37BB7D'} height={'15px'} width={'60px'} borderRadius={'1rem'} />
        ) : (
          `${apy}% APY`
        )}
      </h1>
      <div css={[tw`flex flex-col gap-2 flex-1 max-w-[300px] w-full justify-center`]}>
        <div css={[tw`flex flex-col gap-2 items-center`]}>
          <p
            css={[
              tw`mb-0 text-45 min-sm:text-3xl text-white opacity-60 leading-[1]`,
              totalEarned > 0 && tw`opacity-100`
            ]}
          >
            {totalEarnedString == '0.00' ? (totalEarned > 0 ? '< 0.00' : '0.00') : totalEarnedString}
          </p>
          <p css={[tw`mb-0 text-regular min-sm:text-average text-white`]}>Past USDC Earnings</p>
        </div>
        <div css={[tw`flex flex-col items-center `]}>
          <p css={[tw`mb-0 text-regular min-sm:text-average text-white flex items-center gap-1.25`]}>
            Total Staked&nbsp;
            <Tooltip
              title={
                <div css={[tw`flex flex-col my-auto [&>p]:mb-0 [&>p]:text-tiny [&>p]:font-semibold `]}>
                  <p css={[mode == 'dark' ? tw`text-black-4` : tw`text-grey-5`]}>Global Staked GOFX</p>
                  <p css={[mode == 'dark' ? tw`text-black-4` : tw`text-grey-5`]}>
                    ≈ {numberFormatter(totalStakedGlobally, 2)}
                  </p>
                  <p css={[mode == 'dark' ? tw`text-black-4` : tw`text-grey-5`]}>My Stake Ratio</p>
                  <p css={[mode == 'dark' ? tw`text-black-4` : tw`text-grey-5`]}>
                    ≈ {stakeRatio == '0.00' ? '<0.01' : stakeRatio}%
                  </p>
                </div>
              }
              className={'!inline-flex !m-0 !my-auto !w-5 !h-5 min-md:!w-4.5 min-md:!h-4.5 relative'}
              overlayClassName={'rewards-tooltip small '}
              color={mode == 'dark' ? '#FFF' : '#1C1C1C'}
              tooltipIconClassName={' !ml-0 !w-5 !h-5 min-sm:!w-4.5 min-sm:!h-4.5'}
              useTextWrapper={false}
              showArrow={false}
              overrideIcon={'/img/assets/tooltip_holo.svg'}
            >
              <></>
            </Tooltip>
          </p>

          <p
            css={[
              tw`mb-0 text-regular min-sm:text-average opacity-60 text-white`,
              totalStaked > 0 && tw`opacity-100`
            ]}
          >
            {numberFormatter(totalStaked)} GOFX (≈ ${numberFormatter(gofxValue * totalStaked)})
          </p>
        </div>
        <RewardsClaimButton />
      </div>
      <h4 css={[tw`mb-0 text-center text-white font-semibold text-tiny min-md:text-regular font-semibold !mb-0 `]}>
        During cooldown no rewards will be earned
      </h4>
    </RewardsRightLayout>
  )
}
