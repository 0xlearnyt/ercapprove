import axios from 'axios'
import {useNetwork} from "wagmi";

const getOneInchRouter = async (chainId: any) => {

    const response = await axios.get(`https://api.1inch.io/v5.0/${chainId}/approve/spender`)
    return response.data.address
}

export default getOneInchRouter