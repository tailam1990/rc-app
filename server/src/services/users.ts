import { API_URL } from '../config';
import { get } from './request';
// import User from '../models/User';

const removedUserIds: string[] = [];

export default class UserService {
    /**
     * Get all users.  Users are retrieved from a dummy api.
     * 
     * Currently doesn't return paging parameters to frontend.
     * @param page 
     * @param limit 
     * @returns list of users
     */
    static async get(page = 0, limit = 0): Promise<any[]> {
        const res = await get<any>(`${API_URL}/?limit=${limit}`);
        return res.data
            .filter((r) => !removedUserIds.includes(r.id))
            .sort((a, b) => a.id.localeCompare(b.id));
    }

    /**
     * Remove a user from user list.
     * 
     * Removed users are kept in volatile memory.
     * @param id 
     * @returns true
     */
    static async remove(id: string): Promise<boolean> {
        !removedUserIds.includes(id) && removedUserIds.push(id);
        return true;
    }

    /**
     * Escape hatch for testing only
     * @returns removed user IDs
     */
    static getRemoved(): string[] {
        return removedUserIds;
    }
}
