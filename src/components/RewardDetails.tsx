
import React, {FC} from "react";
import styled from "styled-components";
// import Close from "/img/assets/close-white-icon.svg";
import { useHistory } from 'react-router-dom'
import { useRewardToggle } from "../context/reward_toggle";

const REWARD_INFO_TEXT = styled.div`
    color: ${({ theme }) => theme.text1} !important;
    margin-left: 3%;
`;

const TEXT_20 = styled.div`
    font-size: 20px;
    font-weight: bold;
    color: ${({ theme }) => theme.text1} !important;
`;
const TEXT_40 = styled.span`
    font-size: 50px;
    font-weight: bold;
`;
const TEXT_50 = styled.span`
    font-size: 50px;
    font-weight: bold;
`;

const TEXT_60 = styled.span`
  background-image: linear-gradient(56deg, #716fff 20%, #e95aff 55%);
  font-family: Montserrat;
  font-size: 60px;
  font-stretch: normal;
  font-style: normal;
  font-weight: bold;
  line-height: normal;
  letter-spacing: normal;
  -webkit-background-clip: text;
  background-clip: text;
  padding-top: 8%;
  -webkit-text-fill-color: transparent;
`;

const TEXT_25 = styled.span`
    font-size: 25px;
    font-weight: 600;
`;

const TEXT_22 = styled.div`
    font-size: 22px;
    margin-top: 38px;
    font-weight: 500;
`;

const TEXT_15 = styled.div`
    font-size: 15px;
    color: ${({ theme }) => theme.text16};
`;

const REWARDS_TITLE = styled.div`
   margin-top: 2%;
`;
const EARNED_GOFX = styled.div`  
  background-image: linear-gradient(264deg, #9cc034 56%, #49821c 99%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const EARNED_GOFX_CONTAINER = styled.div`
    margin-top: -6%;
    margin-left: 55%;
`;
const UNCLAIMED_GOFX_CONTAINER = styled.div`
    margin-top: 2%;
    margin-left: 55%;
`;
const REWARD_CONTAINER = styled.span`
    position: relative;
    top: 6vh;
`;

const REWARD_DETAILS_CONTAINER = styled.div`
    margin-top: 1%;
`;
const ACTIVE_REWARDS = styled.span`

`;
const TEXT_40_UNCLAIMED = styled.div`
 background-image: linear-gradient(340deg,#f1c52a 56% ,#ea7e00 99%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 50px;
    font-weight: bold;
    margin-top: -15px;
`;

const LINE = styled.div`
  width: 65vw;
  height: 2px;
  margin: 21px 0px 0px 2px;
  transform: rotate(0deg);
  background-color: ${({theme}) => theme.text1};
`;

const CLAIM_BTN = styled.div`
    width: 111px;
    height: 41px;
    background-color: #3735bb;
    border-radius: 52.5px;
    margin-top: -3.5%;
    margin-left: 11%;
    position: absolute;
    font-size: 18px;
    cursor: pointer;
    padding-top: 10px;
    text-align: center;
    font-weight: 600;
    font-style: normal;
    line-height: 1.1;
    color: white !important;
`;
const SubstractImg = styled.div`
    height: 38px;
    width: 38px;
    margin-left: 1%;
    margin-top: -5px;
    display: inline-block;
    position: absolute;
    filter: ${({theme}) => theme.substractImg};
    background-image: url(${'/img/assets/Substract.svg'});
`;

export const RewardInfoComponent : FC = () => {
    return (
        <REWARD_INFO_TEXT>  
        <REWARDS_TITLE> <TEXT_25> Rewards <SubstractImg/> </TEXT_25></REWARDS_TITLE>
        <REWARD_CONTAINER>
        <TEXT_60> 42.69 M <TEXT_50> GOFX</TEXT_50> </TEXT_60> <br/>
        <TEXT_20> Rewards over the next 6 -12 months</TEXT_20>
        </REWARD_CONTAINER>

        <EARNED_GOFX_CONTAINER>   
        <EARNED_GOFX><TEXT_40> 200.457</TEXT_40> <br/> </EARNED_GOFX>
        <TEXT_20>Earned GOFX</TEXT_20>
        </EARNED_GOFX_CONTAINER>

        <UNCLAIMED_GOFX_CONTAINER>
        <TEXT_40_UNCLAIMED> 10.55 </TEXT_40_UNCLAIMED> <CLAIM_BTN>CLAIM</CLAIM_BTN>
        <TEXT_20>Unclaimed GOFX</TEXT_20> 
        </UNCLAIMED_GOFX_CONTAINER>

        <REWARD_DETAILS_CONTAINER>
            <ACTIVE_REWARDS> <TEXT_25>Active Rewards</TEXT_25> </ACTIVE_REWARDS> 
            <LINE/>

            <ul>
                <li>
                    <TEXT_22> <strong> 0.69% </strong>  listing fee in the first 60 days on our store. </TEXT_22>
                    <TEXT_15>1.5% after the 60 days period ends. </TEXT_15>
                </li>
                <li>
                    <TEXT_22> For each listing you will recive <strong>25 GOFX</strong>, up to the first <strong>100,000</strong> listings. </TEXT_22>
                    <TEXT_15>Up to 100,000 lisitings (We will re-asses after reaching the target).</TEXT_15>
                </li>
                <li>
                    <TEXT_22> For each NFT sale you will recive <strong>2%</strong> of the sale volume in <strong>GOFX</strong>. </TEXT_22>
                    <TEXT_15>If you sell an NFT for $100 we will give $2 worth of GOFX at current market price. </TEXT_15>
                </li>
            </ul>

        </REWARD_DETAILS_CONTAINER>
        </REWARD_INFO_TEXT>
    );
}

const RECTANGLE = styled.a`
  width: 263px;
  height: 60px;
  flex-grow: 0;
  margin: 3% 0 5px;
  border-radius: 45px;
  background-color: #fff;
  border: none;
  color: #7d289d;
  font-size: 18px;
  font-weight: bold;
  position: absolute;
  left: 81%;
  cursor: pointer;
  line-height: 55px;
  text-align: center;
`;

const STAKE_TEXT = styled.div`
    margin: 0 24px 61px 52px;
    font-size: 28px;
    font-weight: 600;
    text-align: center;
    padding-top: 25%;

`;
const APR_TEXT = styled.div`
    font-size: 58px; 
    text-align:center;
    font-weight: bold;
`;

const BUY_GOFX = styled.div`
  height: 17px;
  margin-top: 40%;
  margin-left: 8%;
  font-size: 17px;
  text-align: center;
  font-weight: bold;

`;
const CLOSE_ICON = styled.div`  
    margin-left: 90%;
    padding-top: 3%;
    width: 25px;
  height: 25px;
  object-fit: contain;
    cursor: pointer;
`;

export const RewardRedirectComponent : FC = () => {
    const history = useHistory();
    const { rewardToggle } = useRewardToggle(); 

    const handleStakeClick = () => {
        rewardToggle(false)
        history.push("/farm")
    }

    const closeRewardModal = () => {
        rewardToggle(false)
    }

    return (
        <> 
        <CLOSE_ICON onClick={closeRewardModal} >
            <img src={`${window.origin}/img/assets/close-white-icon.svg`} alt="copy_address" />
        </CLOSE_ICON>

        <STAKE_TEXT>
        Stake now your <strong> GOFX </strong> <br/> and earn up to:
        </STAKE_TEXT>
        <APR_TEXT>
            200% APR  
        </APR_TEXT>
        <RECTANGLE onClick={handleStakeClick}>
        Stake
        </RECTANGLE>
        <BUY_GOFX>
            Buy GOFX
        </BUY_GOFX>
        </>
    );
}