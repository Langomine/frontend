import GaugeComponent from "react-gauge-component";

type Props = {
    score: number,
}

export default function ScoreGauge({score} : Props) {
    return (
        <GaugeComponent
            type="semicircle"
            labels={{
                valueLabel: {
                    style: {
                        fill: '#444444',
                        textShadow: 'unset',
                    },
                    formatTextValue: (value: number) =>
                        `${value} - GOOD`,
                },
            }}
            arc={{
                colorArray: ['#FF2121', '#00FF15'],
                padding: 0.02,
                subArcs: [{ limit: 3 }, { limit: 6 }, { limit: 9 }],
            }}
            pointer={{ type: 'blob', animationDelay: 0 }}
            minValue={0}
            maxValue={9}
            value={score}
        />
    )
}
