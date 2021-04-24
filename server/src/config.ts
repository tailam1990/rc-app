import * as env from 'dotenv';
env.config();

export const API_KEY = process.env.API_KEY;
export const API_URL = 'https://dummyapi.io/data/api/user';
export const PORT = process.env.PORT || '';
export const SERVER_KEY = process.env.SERVER_KEY || '';
