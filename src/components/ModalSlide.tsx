import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import { RewardsPopup } from "./RewardsPopup";
import { useRewardToggle } from "../context/reward_toggle";

const WRAPPER = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  background: ${({ theme }) => theme.modalBackground};
  overflow: hidden;
  z-index: 999;
`
const MODAL = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: -35px;
  width: 100vw;
  height: 70vh;
  animation: fadeIn 1s, slideIn .8s linear;
  border-radius: 20px 20px 0 0;
  box-shadow: 0px -3px 30px 7px rgb(104 104 104 / 58%);
  z-index: 1000;
}
@keyframes slideIn {
  0% {
    transform: translateY(1000px);
    animation-timing-function: ease-out;
  }
  60% {
    transform: translateY(-30px);
    animation-timing-function: ease-in;
  }
  80% {
    transform: translateY(10px);
    animation-timing-function: ease-out;
  }
  100% {
    transform: translateY(0px);
    animation-timing-function: ease-in;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
interface IModalSlide {
  rewardModal: boolean
  rewardToggle: Dispatch<SetStateAction<boolean>>
}

const closeRewardModal = (e, rewardToggle) => {
  if(e.target.id === "wrapper-background"){
    rewardToggle(false)
  }
}

export const ModalSlide = (props: IModalSlide) => {
  const { rewardToggle } = useRewardToggle() 
  return (
    <WRAPPER id="wrapper-background" onClick={(e) => closeRewardModal(e, rewardToggle)}>
      <MODAL id="modal">
        <RewardsPopup />
      </MODAL>
    </WRAPPER>
  )
}
