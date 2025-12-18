import { useEffect, useState } from "react";

import classNames from "classnames";
import styles from "./Years.module.scss";
import { useIsMobile } from "@/shared/ui";

interface YearsProps {
  startYear: number;
  endYear: number;
}

export function Years({ startYear, endYear }: YearsProps) {
  const isMobile = useIsMobile();
  const [curYears, setCurYears] = useState({ startYear, endYear });

  useEffect(() => {
    let start: null | number = null;
    let raf: null | number = null;
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / 1000, 1);
      setCurYears((prev) => ({
        startYear: Math.floor(
          prev.startYear + progress * Math.floor(startYear - prev.startYear)
        ),
        endYear: Math.floor(
          prev.endYear + progress * Math.floor(endYear - prev.endYear)
        )
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, [endYear, startYear]);

  return (
    <div
      className={classNames(styles.container, { [styles.mobile]: isMobile })}
    >
      <span className={classNames(styles.year, styles.yearLeft)}>
        {curYears.startYear}
      </span>
      <span className={classNames(styles.year, styles.yearRight)}>
        {curYears.endYear}
      </span>
    </div>
  );
}
