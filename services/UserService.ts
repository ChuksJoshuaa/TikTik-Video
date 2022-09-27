import axios from "axios";

const BASE_URL = process.env.BASE_URL;

export interface IUserData {
    id: number,
    username: string,
    title: string,
    thumbnail: string,
}

async function discoverUsers(): Promise<IUserData[]> {
    const data = await axios.get<Array<IUserData>>(`${BASE_URL}/api/v1/users/discover/`);
    return data.data
}

const UserService = {
    discoverUsers,
}

export default UserService;