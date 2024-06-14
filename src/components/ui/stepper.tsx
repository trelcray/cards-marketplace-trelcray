import { CheckCircle2 } from "lucide-react";

interface IStepperProps {
  currentStep: number;
  complete: boolean;
  steps: string[];
}

export const Stepper: React.FC<IStepperProps> = ({
  complete,
  currentStep,
  steps,
}) => {
  return (
    <div className="flex justify-center">
      {steps?.map((step, i) => (
        <div
          key={i}
          className={`step-item ${currentStep === i + 1 && "active"} ${
            (i + 1 < currentStep || complete) && "complete"
          } `}
        >
          <div className="step">
            {i + 1 < currentStep || complete ? (
              <CheckCircle2 size={24} />
            ) : (
              i + 1
            )}
          </div>
          <p className="text-gray-500">{step}</p>
        </div>
      ))}
    </div>
  );
};
