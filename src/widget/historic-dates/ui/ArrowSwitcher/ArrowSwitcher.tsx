import ArrowLeft from "./arrow-left.svg";
import ArrowRight from "./arrow-right.svg";
import classNames from "classnames";
import styles from "./ArrowSwitcher.module.scss";
import { useIsMobile } from "@/shared/ui";

interface ArrowSwitcherProps {
  className?: string;
  maxNumber: number;
  curNumber: number;
  onRightClick: (nextNumber: number) => void;
  onLeftClick: (prevNumber: number) => void;
}

export function ArrowSwitcher({
  className,
  maxNumber,
  curNumber,
  onRightClick,
  onLeftClick
}: ArrowSwitcherProps) {
  const isMobile = useIsMobile();
  return (
    <div
      className={classNames(
        styles.container,
        { [styles.mobile]: isMobile },
        className
      )}
    >
      <div className={styles.numbers}>
        {String(curNumber).padStart(2, "0")}/
        {String(maxNumber).padStart(2, "0")}
      </div>
      <div className={styles.arrowsContainer}>
        <button
          disabled={1 === curNumber}
          onClick={() => onLeftClick(curNumber - 1)}
          className={classNames(styles.arrow, {
            [styles.arrowDisabled]: 1 >= curNumber
          })}
        >
          <ArrowLeft className={styles.icon} />
        </button>
        <button
          disabled={maxNumber <= curNumber}
          onClick={() => onRightClick(curNumber + 1)}
          className={classNames(styles.arrow, {
            [styles.arrowDisabled]: maxNumber === curNumber
          })}
        >
          <ArrowRight className={styles.icon} />
        </button>
      </div>
    </div>
  );
}
