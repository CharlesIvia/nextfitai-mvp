import styles from './works.module.css';

type StepProps = {
  stepTitle: string;
  stepDescription: string;
  number: number;
};

export default function Step({ number, stepTitle, stepDescription }: StepProps) {
  return (
    <div className={styles.step}>
      <div className={styles.stepNumber}>
        <p>{number}</p>
      </div>

      <div className={styles.stepDetails}>
        <p>
          <span>{stepTitle}</span> - {stepDescription}
        </p>
      </div>
    </div>
  );
}
