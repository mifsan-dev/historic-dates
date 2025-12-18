import { BulletButton, BulletButtonProps } from "../BulletButton/BullletButton";
import { memo, useLayoutEffect, useRef } from "react";

import classNames from "classnames";
import styles from "./CircleBullets.module.scss";

function normalizeAngle(angle: number) {
  return ((angle % 360) + 360) % 360;
}

export type Bullet = Pick<BulletButtonProps, "number" | "title">;

interface CircleBulletsProps {
  className?: string;
  maxNumber: number;
  activeBullet: number;
  activeBulletTitle?: string;
  onBulletClick: (activeBullet: number) => void;
}

export const CircleBullets = memo(
  ({
    maxNumber,
    onBulletClick,
    activeBullet,
    activeBulletTitle,
    className
  }: CircleBulletsProps) => {
    const initialBulletRef = useRef(activeBullet);
    const circleRef = useRef<HTMLDivElement | null>(null);
    const currentRotationRef = useRef(0);

    useLayoutEffect(() => {
      const circle = circleRef.current;
      if (circle) {
        const children = circle.children;
        const count = children.length;
        const radius = (circle as HTMLElement).offsetWidth / 2;

        for (let i = 0; i < count; i++) {
          const offsetAngle = +Math.PI / 6;
          const indexWithOffset =
            (i - initialBulletRef.current + 1 + count) % count;
          const angle =
            (indexWithOffset / count) * 2 * Math.PI - Math.PI / 2 + offsetAngle;
          const x = radius + radius * Math.cos(angle);
          const y = radius + radius * Math.sin(angle);
          const element = children[i] as HTMLElement;
          element.style.position = "absolute";
          element.style.left = x + "px";
          element.style.top = y + "px";
        }
      }
    }, []);

    const rotateToElement = (activeNumber: number) => {
      const circle = circleRef.current;
      if (circle) {
        const children = circle.children;
        const count = children.length;
        const index = (activeNumber - initialBulletRef.current + count) % count;
        const anglePerItem = 360 / count;
        const rawTarget = -(index * anglePerItem);
        const target = normalizeAngle(rawTarget);
        const current = normalizeAngle(currentRotationRef.current);

        let delta = target - current;
        delta = normalizeAngle(delta);
        if (delta > 180) delta -= 360;

        const animationDuration = Math.abs(delta / 180);

        const finalTarget = currentRotationRef.current + delta;
        (circle as HTMLElement).style.transition =
          `transform ${animationDuration}s ease`;
        (circle as HTMLElement).style.transform =
          `translate(-50%, -50%) rotate(${finalTarget}deg)`;

        currentRotationRef.current = finalTarget;

        for (let i = 0; i < count; i++) {
          const element = children[i] as HTMLElement;
          (element as HTMLElement).style.transition =
            `transform ${animationDuration}s ease`;
          element.style.transform = `translate(-50%, -50%) rotate(${-finalTarget}deg)`;
        }
      }
    };

    useLayoutEffect(() => {
      rotateToElement(activeBullet);
    }, [activeBullet]);

    const onCircleElementClick = (bullet: number) => () => {
      onBulletClick(bullet);
    };

    return (
      <div ref={circleRef} className={classNames(styles.circle, className)}>
        {Array(maxNumber)
          .fill(0)
          .map((_, i) => (
            <BulletButton
              key={i}
              className={styles.circleItem}
              onClick={onCircleElementClick(i + 1)}
              number={i + 1}
              active={activeBullet === i + 1}
              title={activeBullet === i + 1 ? activeBulletTitle : undefined}
            />
          ))}
      </div>
    );
  }
);

CircleBullets.displayName = "MemoCircleBullets";
