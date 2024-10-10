import GaugeComponent from "react-gauge-component";
import {ChartData, ChartOptions} from "chart.js";
import {Radar} from "react-chartjs-2";

type Props = {
    fluency: number,
    lexical: number,
    grammar: number,
    pronunciation: number,
}

export default function OverallScoreRadar({fluency, lexical, grammar, pronunciation} : Props) {
    const summaryChartOptions: ChartOptions<'radar'> = {
        responsive: true,
        scales: {
            r: {
                min: 0,
                max: 9,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    }
    const summaryChartData: ChartData<'radar'> = {
        labels: ['Fluency', 'Lexical', 'Grammar', 'Pronunciation'],
        datasets: [{ data: [fluency, lexical, grammar, pronunciation] }],
    }

    return (
        <Radar
            data={summaryChartData}
            options={summaryChartOptions}
        />
    )
}
