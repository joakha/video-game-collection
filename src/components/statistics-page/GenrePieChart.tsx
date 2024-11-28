import { useEffect, useState } from "react";
import useGame from "../../hooks/useGame"
import { PieData } from "../../types/types";
import { PieChart } from "react-native-gifted-charts";

const GenrePieChart = () => {

    const { firebaseGamesWithKeys } = useGame()

    const [genreData, setGenreData] = useState<PieData[]>([]);

    const formatGenreData = () => {
        const pieGenreData: PieData[] = [];
        const genreCounts: any = {};

        firebaseGamesWithKeys.forEach(game => {
            const gameGenre: string = game.genres?.split(",")[0] || "Unknown";

            if (genreCounts[gameGenre]) {
                genreCounts[gameGenre]++
            } else {
                genreCounts[gameGenre] = 1;
            }
        })

        Object.keys(genreCounts).forEach(key => {
            pieGenreData.push(
                {
                    value: genreCounts[key],
                    text: `${genreCounts[key]} ${key}`
                }
            )
        })

        return pieGenreData;
    }

    useEffect(() => {
        if (firebaseGamesWithKeys.length > 0) {
            setGenreData(formatGenreData());
        } else {
            setGenreData([]);
        }
    }, [firebaseGamesWithKeys]);

    return (
        <PieChart
            showText
            textColor="black"
            radius={100}
            textSize={13}
            data={genreData}
        />
    )
}

export default GenrePieChart