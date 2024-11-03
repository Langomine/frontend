import { Step, StepLabel, Stepper,} from "@mui/material";

type Props = {
    steps: string[],
    active: number,
}

export default function SteppedLoading({steps, active}: Props) {
    return (
        <>
            <Stepper activeStep={active} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </>
    )
}
