import $api from "../http";

export default class GithubService {
    static async getProfile(username: string) {
        try {
            const response = await $api.get(`/profile/${username}`);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }

    static async getActivity(username: string) {
        try {
            const response = await $api.get(`/activity/${username}`);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }

    static async getRepos(username: string) {
        try {
            const response = await $api.get(`/repos/${username}`);
            return response.data;
        } catch (e) {
            console.error(e);
        }
    }
}