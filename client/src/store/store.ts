import { makeAutoObservable } from "mobx";
import GithubService from "../service/GithubService";

export default class Store {
    isLoading = false;
    currentProc = "";

    constructor() {
        makeAutoObservable(this);
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    setCurrentProc(proc: string) {
        this.currentProc = proc;
    }

    async getProfile(username: string) {
        this.setLoading(true);
        this.setCurrentProc("Getting profile");
        try {
            const response = await GithubService.getProfile(username);
            this.setLoading(false);
            return response;
        } catch (e) {
            this.setLoading(false);
            console.error(e);
        }
    }

    async getRepos(username: string) {
        this.setLoading(true);
        this.setCurrentProc("Analyzing repositories");
        try {
            const response = await GithubService.getRepos(username);
            this.setLoading(false);
            return response;
        } catch (e) {
            this.setLoading(false);
            console.error(e);
        }
    }

    async getActivity(username: string) {
        this.setLoading(true);
        this.setCurrentProc("Looking for activity");
        try {
            const response = await GithubService.getActivity(username);
            this.setLoading(false);
            return response;
        } catch (e) {
            this.setLoading(false);
            console.error(e);
        }
    }
}