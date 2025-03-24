import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";

import { Context } from "./main";

import LanguagePieChart from "./components/LanguagePieChart";
import ActivityChart from "./components/ActivityChart";
import LoadingDots from "./components/LoadingDots";
import Divider from "./components/Divider";


interface GithubProfileProps {
    name: string,
    avatar_url: string,
    html_url: string,
    bio: string,
    public_repos: number,
    created_at: Date,
}

interface GithubRepoProps {
    id: number,
    language: string,
    name: string,
    stargazers_count: number,
    html_url: string,
    created_at: Date,
    updated_at: Date,
}

interface ContributionDay {
    date: string;
    contributionCount: number;
}

interface Week {
    contributionDays: ContributionDay[];
}

interface ActivityChartProps {
    totalContributions: number;
    weeks: Week[];
}

function Profile() {
    const { store } = useContext(Context);

    const navigate = useNavigate();
    const { username } = useParams<string>();
    const [profile, setProfile] = useState<GithubProfileProps>();
    const [languages, setLanguages] = useState({});
    const [state, setState] = useState<string>("");
    const [topRepos, setTopRepos] = useState<GithubRepoProps[]>([]);
    const [activity, setActivity] = useState<ActivityChartProps>();

    const formatDate = (date: Date) => date.toISOString().split("T")[0];
    const daysBetween = (date: Date) => Math.floor((Math.abs(new Date().getTime() - date.getTime())) / (1000 * 60 * 60 * 24));

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                if (username) {
                    await store.getProfile(username)
                        .then((result) => {
                            setProfile(result);
                        });
                    await store.getRepos(username)
                        .then((result) => {
                            if (result.length > 0) {
                                const languageCount: { [key: string]: number } = {};
            
                                result.forEach((repo: GithubRepoProps) => {
                                    const lang = repo.language || "Unknown";
                                    languageCount[lang] = (languageCount[lang] || 0) + 1;
                                });
                            
                                setLanguages(languageCount);

                                const sortedRepos = result.sort((a: any, b: any) => b.stargazers_count - a.stargazers_count);
                                setTopRepos(sortedRepos.slice(0, 5));
                            }
                        })
                    await store.getActivity(username)
                        .then((result) => {
                            setActivity(result);
                        });

                    setState("Loaded")
                }
            } catch (err: any) {
                setState("NotFound");
                setTimeout(() => {
                    navigate("/");
                }, 3000);
            }
        };
    
        fetchAllData();
    }, [username]);

    if (store.isLoading) return (        
        <div className="flex flex-col gap-2 h-screen items-center justify-center">
            <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <p className="flex flex-row font-light">{store.currentProc} <LoadingDots /></p>
            {/* <p className="font-light">{store.currentProc}</p> */}
        </div>
    )

    if (state === "Loaded" && (profile && activity)) {
        return (
            <div className="flex flex-col gap-5 p-5">
                <div className="flex flex-row gap-5">
                    <img onClick={() => window.open(profile.html_url, "_blank")} src={profile.avatar_url} className="cursor-pointer rounded-full w-32 h-32 border-2 border-black" />
                    <div className="flex flex-col justify-center">
                        <p>{profile.name}</p>
                        <p className="font-light text-sm"><b>Public repos:</b> {profile.public_repos}</p>
                        <p className="font-light text-sm"><b>Bio:</b> {profile.bio}</p>
                        <p className="font-light text-sm"><b>Created at:</b> {formatDate(new Date(profile.created_at))} ({daysBetween(new Date(profile.created_at))} days ago)</p>
                    </div>
                </div>
                <Divider />
                <div className="flex flex-col items-center">
                    <p className="text-lg font-bold text-neutral-600">Languages</p>
                    <div className="w-64 h-auto">
                        <LanguagePieChart languageCount={languages} />
                    </div>
                </div>
                <Divider />
                <ActivityChart totalContributions={activity.totalContributions} weeks={activity.weeks}/>
                <Divider />
                <div className="flex flex-col">
                    <p>Top Repositories</p>
                    <div className="flex flex-col gap-2">
                        {topRepos.map(repo => (
                            <div onClick={() => window.open(repo.html_url, "_blank")} key={repo.id} className="cursor-pointer hover:bg-neutral-200 transition-all duration-200 ease-in-out flex flex-col gap-2 p-2 border-2 border-gray-200 rounded-md">
                                <div className="flex flex-row justify-between w-full">
                                    <div className="flex flex-row gap-2">
                                        <p className="cursor-pointer font-bold text-lg">{repo.name}</p>
                                        <p className="border-2 border-gray-200 rounded-full px-3 font-light text-sm flex items-center">Public</p>
                                    </div>
                                    <div className="px-2 border-2 border-gray-200 rounded-md bg-gray-200">
                                        <p className="text-sm font-light">{repo.stargazers_count} stars</p>
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2 font-light text-sm">
                                    <p>{repo.language || "Unknown"}</p>•
                                    <p>Updated {formatDate(new Date(repo.updated_at))}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default observer(Profile);