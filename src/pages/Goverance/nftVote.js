import React, { useState } from "react";
import { Link } from "react-router-dom";

import { nftVoteData } from "../../utils/data/nft-vote.data";

import view from "../../assests/goverance/view.svg";

const NftVote = () => {
  const [text, setText] = useState(0);

  return (
    <div className="w-full md:mt-0 mt-9">
      <div className="bg-[#2D2D2D] rounded-[8px] py-8 px-[22px]">
        <h1 className="capitalize font-bold mb-2 text-xl md:text-2xl md:leading-[41px] text-white">
          Vote
        </h1>
        <p className="text-[#777E90] text-sm mb-5">Select an NFT to vote for</p>
        {nftVoteData.map((item, index) => (
          <div className="flex justify-between items-center mb-4" key={index}>
            <label class="form-control">
              <input type="checkbox" name="checkbox" value="Bike" />
              {item}
            </label>
            <Link to="/" className="text-[#66A8FF] text-base flex">
              View details
              <img src={view} alt="" />
            </Link>
          </div>
        ))}
        <div>
          <p className="text-white text-[13px] leading-7 mb-4 capitalize font-medium">
            enter amount to stake
          </p>
          <div className="flex items-center">
            <input
              type="number"
              placeholder="Enter Amount"
              value={text}
              className="text-sm leading-4 focus:outline-none w-full pr-2 bg-[#29282E] px-3 py-4 rounded-lg border border-[#475467] mr-2 text-white"
              onChange={(e) => setText(e.target.value)}
            />
            <button className="btn-color w-[180px] font-medium xl:text-base xl:leading-[18px] rounded-[40px] h-10 ">
              Vote
            </button>
          </div>
          <p className="text-[#E8EDF0] mt-4 text-sm">{text} $</p>
        </div>
      </div>
    </div>
  );
};

export default NftVote;
