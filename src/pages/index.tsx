import { NextPage } from "next";
import { FaArrowDown } from "react-icons/fa";

interface NFTType {
  mint: string;
  staked: boolean;
  stakedTime: number;
}

const Home: NextPage = () => {
  return (
    <main className="w-full px-10 py-10">
      <div className="w-full flex justify-center items-center pt-40">
        <img
          src="/img/banner.gif" // Assuming the image path is correct and starts from the public directory
          className="w-full object-cover justify-center flex items-center"
          alt="Banner"
        />
      </div>
      <div className="w-full">
        <p className="text-white text-center text-md regularfont">Learn more</p>
        <div className="w-full flex justify-center mt-4">
          <FaArrowDown color="white" />
        </div>
      </div>
      <div className="w-full flex justify-center">
        <div className="w-[900px] text-white">
          <div className="space-y-10 mt-10">
            <h1 className="text-2xl font-bold lowercase">
              WE ARE KAFIR!
            </h1>
            <p className="text-lg leading-10 regularfont">
              Scalability Solution: Aiming to mitigate network congestion
              EVM Compatibility: It is compatible with the Ethereum Virtual Machine (EVM), allowing developers to deploy smart contracts, build dApps, etc., but with increased throughput and reduced costs.
              Rollups Technology: Kafirchain uses rollups, significantly enhancing transaction speed and scalability.
            </p>
          </div>
          <div className="space-y-10 mt-10">
            <h1 className="text-2xl font-bold lowercase">
              Key Features:
            </h1>
            <p className="text-lg leading-10 regularfont">
              High Throughput: Offers increased transaction throughput, enabling faster and more efficient processing of transactions.
              Reduced Gas Fees: Provides a cost-effective alternative by reducing gas fees associated with transactions and smart contract executions.
              EVM Compatibility: Allows seamless integration with existing Ethereum-based applications, making it easier for developers to migrate or deploy dApps.
            </p>
          </div>
          <div className="space-y-10 mt-10">
            <h1 className="text-2xl font-bold lowercase">
              Use Cases and Benefits:
            </h1>
            <p className="text-lg leading-10 regularfont">
              dApp Scalability: Enables decentralized applications to scale effectively, leading to improved user experiences.
              Cost-Efficient Transactions: Facilitates cost-effective transactions, making it more accessible for users to interact with Ethereum-based applications.
              Smart Contract Deployment: Offers a more affordable environment for deploying smart contracts, fostering innovation and development within the Kafirchain ecosystem.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
