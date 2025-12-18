import { ArrowSwitcher } from "../ArrowSwitcher/ArrowSwitcher";
import { CircleBullets } from "../CircleBullets/CircleBullets";
import { HistoricDatesData } from "../../model/types";
import { LineBullets } from "../LineBullets/LineBullets";
import { SwiperLegend } from "../SwiperLegend/SwiperLegend";
import { Years } from "../Years/Years";
import classNames from "classnames";
import styles from "./HistoricDates.module.scss";
import { useIsMobile } from "@/shared/ui";
import { useState } from "react";

interface HistoricDatesProps {
  data: HistoricDatesData[];
}

export function HistoricDates({ data }: HistoricDatesProps) {
  const isMobile = useIsMobile();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleBulletClick = (activeBullet: number) => {
    const nextActiveIndex = activeBullet - 1;
    setActiveIndex(nextActiveIndex);
  };

  return (
    <div className={classNames(styles.wrapper, { [styles.mobile]: isMobile })}>
      <section className={styles.container}>
        <h2 className={styles.title}>
          Исторические <span>даты</span>
        </h2>
        <div className={styles.yearsCircleContainer}>
          <Years
            startYear={data[activeIndex].startYear}
            endYear={data[activeIndex].endYear}
          />
          {!isMobile && (
            <CircleBullets
              className={styles.circle}
              maxNumber={data.length}
              onBulletClick={handleBulletClick}
              activeBullet={activeIndex + 1}
              activeBulletTitle={data[activeIndex].title}
            />
          )}
        </div>
        <div className={styles.arrowsBulletsContainer}>
          <ArrowSwitcher
            className={styles.arrowSwitcher}
            maxNumber={data.length}
            curNumber={activeIndex + 1}
            onRightClick={(nextNumber) => {
              setActiveIndex(--nextNumber);
            }}
            onLeftClick={(prevNumber) => {
              setActiveIndex(--prevNumber);
            }}
          />
          {isMobile && (
            <LineBullets
              className={styles.lineBullets}
              maxNumber={data.length}
              onBulletClick={handleBulletClick}
              activeBullet={activeIndex + 1}
            />
          )}
        </div>
        <SwiperLegend
          mobileTitle={data[activeIndex].title}
          className={styles.swiperLegend}
          legends={data[activeIndex].legends}
        />
      </section>
    </div>
  );
}
