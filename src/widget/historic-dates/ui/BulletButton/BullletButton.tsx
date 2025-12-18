import { MouseEventHandler } from "react";
import classNames from "classnames";
import styles from "./BulletButton.module.scss";

export interface BulletButtonProps {
  number: number;
  title?: string;
  active?: boolean;
  className?: string;
  onClick?: MouseEventHandler;
}

export function BulletButton({
  className,
  number,
  title,
  onClick,
  active
}: BulletButtonProps) {
  return (
    <button
      onClick={!active ? onClick : undefined}
      className={classNames(styles.container, className)}
    >
      <div
        className={classNames(styles.circle, {
          [styles.circleActive]: active
        })}
      >
        {number}
      </div>
      <div
        className={classNames(styles.title, {
          [styles.titleVisible]: active
        })}
      >
        {title}
      </div>
    </button>
  );
}
