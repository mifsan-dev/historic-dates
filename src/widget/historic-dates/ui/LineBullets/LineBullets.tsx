import classNames from "classnames";
import styles from "./LineBullets.module.scss";

interface LineBulletsProps {
  className?: string;
  maxNumber: number;
  activeBullet: number;
  onBulletClick: (bullet: number) => void;
}

export function LineBullets({
  className,
  maxNumber,
  activeBullet,
  onBulletClick
}: LineBulletsProps) {
  const handleBulletClick = (bullet: number) => () => {
    onBulletClick(bullet);
  };
  return (
    <div className={classNames(styles.container, className)}>
      {Array(maxNumber)
        .fill(0)
        .map((_, i) => (
          <button
            key={i}
            onClick={handleBulletClick(i + 1)}
            className={classNames(styles.bullet, {
              [styles.bulletActive]: i + 1 === activeBullet
            })}
          />
        ))}
    </div>
  );
}
