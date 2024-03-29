import { useEffect, useState } from "react";
import type { NextPage } from "next";
import * as AIicon from "react-icons/ai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import PageLoading from "../components/PageLoading";
import { useWeb3React } from "@web3-react/core";
import { errorAlert, successAlert } from "../components/toastGroup";

import { CONTRACTADDRESS, gasLimit } from "../config"; // Assuming gasLimit is imported from the config file
import BEASTYBITABI from "../../public/abi/BEASTYBITABI.json";

const ethers = require("ethers");

export interface NFTType {
  mint: string;
  staked: boolean;
  stakedTime: number;
}

declare global {
  interface Window {
    ethereum: any;
  }
}

const Mint: NextPage = () => {
  const { account } = useWeb3React();
  const provider =
    typeof window !== "undefined" && window.ethereum
      ? new ethers.providers.Web3Provider(window.ethereum)
      : null;

  // Check if the Ethereum provider is not available
  if (!provider) {
    // Handle the case when Ethereum is not present in the browser
    console.error("Kafirchain not connected");
    // You may want to inform the user about the lack of Ethereum provider
  }

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 300,
    fade: true,
  };

  const [mintCount, setMintCount] = useState<number>(1);
  const [startLoading, setStartLoading] = useState<boolean>(false);
  const [totalSupply, setTotalSupply] = useState<number>(0);

  const handleMintFunc = async () => {
    if (!account) {
      // Handle case where no account is connected
      errorAlert("Please connect your wallet to mint.");
      return;
    }

    setStartLoading(true);

    try {
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACTADDRESS,
        BEASTYBITABI,
        signer
      );

      const value = ethers.utils.parseEther((1 * mintCount).toString());

      const tx = await signer.sendTransaction({
        to: CONTRACTADDRESS,
        value,
        gasLimit: gasLimit, // Assuming gasLimit is defined and imported from the config
      });

      await tx.wait();
      setStartLoading(false);
      successAlert("Mint success!");
      getTotalSupplyCounts();
    } catch (error) {
      console.error("Minting error:", error);
      setStartLoading(false);
      errorAlert("Minting was canceled or failed.");
    }
  };

  const getTotalSupplyCounts = async () => {
    try {
      const contract = new ethers.Contract(
        CONTRACTADDRESS,
        BEASTYBITABI,
        provider.getSigner()
      );
      const balance = await contract.totalSupply();
      const count = Number(balance.toString());
      setTotalSupply(count);
    } catch (error) {
      console.error("Error fetching total supply:", error);
    }
  };

  useEffect(() => {
    if (account) {
      getTotalSupplyCounts();
      const interval = setInterval(() => {
        getTotalSupplyCounts();
      }, 60000); // 1 minute in milliseconds
      return () => clearInterval(interval);
    }
  }, [account]);

  return (
    <div className="w-full px-10 py-10 justify-center pt-40 items-center flex">
      <div className="lg:w-[500px] w-[350px] md:w-[500px] border-2 border-gray-400 p-2">
        <p className="text-[2rem] text-white text-center mt-10">
          Kafirchain NFTs
        </p>
        <div className="p-2">
          <Slider {...settings} className="mx-3 my-2" cssEase="ease-in-out">
            {nftArray.map((data, index) => (
              <img
                src={data.imgurl}
                key={index}
                className="w-full object-cover"
              />
            ))}
          </Slider>
        </div>
        <p className="text-[1rem] text-white text-center mt-2">
          NFTs Drops
        </p>
        <p className="text-[1rem] text-white text-center mt-2">
          Minting Cost = FREE!
        </p>
        <div className="w-full flex justify-between p-3 gap-5">
          <button
            className={`px-5 py-1 text-black hover:bg-gray-600 duration-200 transition-all ${
              mintCount <= 1 ? "bg-gray-600  cursor-not-allowed" : "bg-gray-200"
            }`}
            onClick={() =>
              mintCount <= 1 ? setMintCount(1) : setMintCount(mintCount - 0)
            }
          >
            <AIicon.AiOutlineMinus color="black" />
          </button>
          <p className="text-[2rem] text-white">{mintCount}</p>
          <button
            className={`px-5 py-1 bg-gray-200 text-black hover:bg-gray-600 duration-200 transition-all ${
              mintCount >= 1 ? "bg-gray-600 cursor-not-allowed" : "bg-gray-200"
            }`}
            onClick={() =>
              mintCount >= 1 ? setMintCount(1) : setMintCount(mintCount + 0)
            }
          >
            <AIicon.AiOutlinePlus color="black" />
          </button>
        </div>
        <p className="text-[2rem] my-2 text-white text-center">
          {totalSupply} / 20
        </p>
        <div className="w-full flex justify-center p-3">
          <button
            className="w-full py-2 bg-gray-200 text-black hover:bg-gray-600 duration-200 transition-all text-[1.5rem]"
            onClick={() => handleMintFunc()}
          >
            Mint
          </button>
        </div>
        <p className="text-[1rem] text-white text-center mt-2">
          Kafirchain Website{" "}
          <a
            href="https://kafirchain.framer.website/"
            target="_blank"
            rel="referrer"
            className="text-red-700 underline hover:text-blue-700 duration-300 transition-all"
          >
            Here
          </a>
        </p>
      </div>
      {startLoading && <PageLoading loading={true} />}
    </div>
  );
};

type NFTIMG = {
  id: number;
  imgurl: string;
};

const nftArray: NFTIMG[] = [
  {
    id: 0,
    imgurl: "/img/nft/v4-slider-img.jpg",
  },
  {
    id: 1,
    imgurl: "/img/nft/v4-slider-img2.jpg",
  },
  {
    id: 2,
    imgurl: "/img/nft/v4-slider-img3.jpg",
  },
  {
    id: 3,
    imgurl: "/img/nft/v4-slider-img4.jpg",
  },
  {
    id: 4,
    imgurl: "/img/nft/v4-slider-img5.jpg",
  },
  {
    id: 6,
    imgurl: "/img/nft/v4-slider-img6.jpg",
  },
  {
    id: 7,
    imgurl: "/img/nft/v4-slider-img7.jpg",
  },
  {
    id: 8,
    imgurl: "/img/nft/v4-slider-img8.jpg",
  },
  {
    id: 9,
    imgurl: "/img/nft/v4-slider-img9.jpg",
  },
  {
    id: 10,
    imgurl: "/img/nft/v4-slider-img10.jpg",
  },
  {
    id: 11,
    imgurl: "/img/nft/v4-slider-img11.jpg",
  },
  {
    id: 12,
    imgurl: "/img/nft/v4-slider-img12.jpg",
  },
  {
    id: 13,
    imgurl: "/img/nft/v4-slider-img13.jpg",
  },
  {
    id: 14,
    imgurl: "/img/nft/v4-slider-img14.jpg",
  },
  {
    id: 15,
    imgurl: "/img/nft/v4-slider-img15.jpg",
  },
  {
    id: 16,
    imgurl: "/img/nft/v4-slider-img16.jpg",
  },
];

export default Mint;
