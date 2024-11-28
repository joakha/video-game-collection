import { PieData } from "../../types/types";
import useGame from "../../hooks/useGame";
import { useState, useEffect } from "react";
import { PieChart } from "react-native-gifted-charts";

const StatusPieChart = () => {

    const { firebaseGamesWithKeys } = useGame();

    const [statusData, setStatusData] = useState<PieData[]>([]);

    const formatStatusData = () => {
        const pieStatusData: PieData[] = [];

        const statuses = [
            { status: "Playing", color: "#77dd77" },
            { status: "Completed", color: "#A7C7E7" },
            { status: "Paused", color: "#FFFAA0" },
            { status: "Dropped", color: "#FAA0A0" },
            { status: "Planned", color: "darkgray" }
        ];

        statuses.forEach((status => {
            const statusCount = firebaseGamesWithKeys.filter(game => game.status === status.status).length;

            if (statusCount > 0) {
                pieStatusData.push(
                    {
                        value: statusCount,
                        color: status.color,
                        text: `${statusCount} ${status.status}`
                    }
                )
            }
        }))

        return pieStatusData;
    }

    useEffect(() => {
        if (firebaseGamesWithKeys.length > 0) {
            setStatusData(formatStatusData());
        } else {
            setStatusData([]);
        }
    }, [firebaseGamesWithKeys]);

    return (
        <PieChart
            showText
            textColor="black"
            radius={125}
            textSize={13}
            data={statusData}
        />
    )
}

export default StatusPieChart