
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {useState, useEffect} from "react";
import {useToken, useNetwork, useContractWrite, usePrepareContractWrite} from "wagmi";
import {ercAbi} from "@/const";
import getOneInchRouter from "@/helpers/getOneInchRouter";


const Home = () => {

    const [tokenAddress, setTokenAddress] = useState<any>("");
    const [spender, setSpender] = useState<any>("");

    const { chain, chains } = useNetwork();
    const chainId = chain?.id ?? 1

    const setupOneInch = async () => {
        await getOneInchRouter(chainId).then((res) => {
            setSpender(res);
        })
    };

    const token = useToken({
        address: tokenAddress,
        chainId: chainId,
        enabled: tokenAddress !== "",
    })

    const { config } = usePrepareContractWrite({
        address: tokenAddress,
        abi: ercAbi,
        functionName: 'approve',
        args: [spender, "9999999999999999999999999999999"],
    })

    const { data, isLoading, isSuccess, write, isError, isIdle } = useContractWrite({
        ...config,
    })

    useEffect(() => {
        setTokenAddress("");
        setSpender("");
    }, [chain])

    return (
        <main className="bg-gray-100 h-full w-full flex items-center justify-center py-32 flex-col text-black">

            <h1 className="text-5xl font-semibold mb-16">
                ERC20 Approve
            </h1>

            <ConnectButton />

            <input
                type="text"
                className="border-2 border-gray-300 rounded-md p-2 m-2 color-black w-96 mt-8"
                placeholder="Token address"
                onChange={(e) => setTokenAddress(e.target.value)}
                value={tokenAddress}
            />

            {token && token.data && token.data.name && (
                <div className="font-semibold text-lg">
                    Token: {token.data.name}
                </div>
            )}

            <input
                type="text"
                className="border-2 border-gray-300 rounded-md p-2 m-2 color-black w-96 mt-8"
                placeholder="Spender"
                onChange={(e) => setSpender(e.target.value)}
                value={spender}
            />

            <button onClick={() => setupOneInch()} className="bg-green-600 font-medium text-sm text-white px-3 py-1 rounded-xl hover:bg-green-700 transition duration-100">
                Setup Auto OneInch router
            </button>

            <button
                className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-xl mt-4 hover:bg-blue-700 transition duration-100"
                onClick={() => write ? write() : null}
            >
                Approve
            </button>

            <a href="https://github.com/0xlearnyt/ercapprove" target="_blank" rel="nofollow noopenner" className="text-blue-600 underline mt-8">
                Repo
            </a>

        </main>
    )
}

export default Home;