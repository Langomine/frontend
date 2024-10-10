// @ts-ignore
import {AudioPlayer} from "react-audio-player-component";

type Props = {
    src: string,
}

export default function VoicePlayer({src} : Props) {
    return (
        <AudioPlayer
            src={src}
            minimal={true}
            width={350}
            trackHeight={75}
            barWidth={1}
            gap={1}
            visualise={true}
            backgroundColor="#FFFFFF"
            barColor="#C1D0B5"
            barPlayedColor="#99A98F"
            skipDuration={2}
            showLoopOption={true}
            showVolumeControl={true}
        />
    )
}
