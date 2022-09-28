import axios from "axios";

const BASE_URL = process.env.BASE_URL;

export interface ITag {
    name: string,
}

async function getAll(): Promise<ITag[]> {
    return axios.get(`${BASE_URL}/api/v1/tags/`);
}

const TagService = {
    getAll,
}

export default TagService;