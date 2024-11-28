import { apiURL, apiKey } from "../constants/constants";

const fetchKeywordGames = async (searchString: string) => {
    try {
        const response = await fetch(searchString);
        if (!response.ok) throw new Error("Issue fetching search data!");

        const searchData = await response.json();
        return searchData;
    } catch (err) {
        console.error(err)
        throw err;
    }
}

const fetchUpcomingGamesData = async () => {
    //period for upcoming games will be the next three months
    //current date
    const currentDate = new Date();
    //formatted string for current date
    const currentDateString = currentDate.toISOString().split("T")[0];
    //date 3 months from now
    const dateThreeMonthsFromNow = new Date();
    dateThreeMonthsFromNow.setMonth(currentDate.getMonth() + 3);
    //formatted string for date 3 months from now
    const dateThreeMonthsFromNowString = dateThreeMonthsFromNow.toISOString().split("T")[0];

    const searchString = `${apiURL}/games?dates=${currentDateString},${dateThreeMonthsFromNowString}&ordering=-added&key=${apiKey}`;

    try {
        const response = await fetch(searchString);
        if (!response.ok) throw new Error("Issue fetching search data!");

        const searchData = await response.json();
        return searchData;
    } catch (err) {
        console.error(err)
        throw err;
    }
}

const fetchTrendingGamesData = async () => {
    //period for trending games will be the last month
    //current date
    const currentDate = new Date();
    //formatted string for current date
    const currentDateString = currentDate.toISOString().split("T")[0];
    //date a month ago
    const currentDateMonthAgo = new Date();
    currentDateMonthAgo.setMonth(currentDate.getMonth() - 1);
    //formatted string for date a month ago
    const previousMonthString = currentDateMonthAgo.toISOString().split("T")[0];

    const searchString = `${apiURL}/games?dates=${previousMonthString},${currentDateString}&ordering=-added&key=${apiKey}`;

    try {
        const response = await fetch(searchString);
        if (!response.ok) throw new Error("Issue fetching search data!");

        const searchData = await response.json();
        return searchData;
    } catch (err) {
        console.error(err)
        throw err;
    }
}

const fetchGameDetails = async (gameId: number) => {
    try {
        const response = await fetch(`${apiURL}/games/${gameId}?key=${apiKey}`);
        if (!response.ok) throw new Error("Issue fetching search data!");

        const searchData = await response.json();
        return searchData;
    } catch (err) {
        console.error(err)
        throw err;
    }
}

export { fetchKeywordGames, fetchUpcomingGamesData, fetchTrendingGamesData, fetchGameDetails }