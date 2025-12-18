import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";
import { useLayoutEffect, useRef, useState } from "react";

import ArrowRight from "./arrow-right.svg";
import { Navigation } from "swiper/modules";
import SwiperInstance from "swiper";
import classNames from "classnames";
import styles from "./SwiperLegend.module.scss";
import { useIsMobile } from "@/shared/ui";

interface SwiperLegendProps {
  className?: string;
  mobileTitle?: string;
  legends: { title: string; description: string }[];
}

export function SwiperLegend({
  legends,
  mobileTitle,
  className
}: SwiperLegendProps) {
  const isMobile = useIsMobile();
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [curLegends, setCurLegends] = useState(legends);
  const [curMobileTitle, setCurMobileTitle] = useState(mobileTitle);
  const [isEdge, setIsEdge] = useState({ start: true, end: true });
  const [shouldAppear, setShouldAppear] = useState(false);
  useLayoutEffect(() => {
    swiperRef.current?.update();
    setIsEdge({
      start: swiperRef.current?.isBeginning ?? true,
      end: swiperRef.current?.isEnd ?? true
    });
  }, [curLegends]);

  useLayoutEffect(() => {
    setShouldAppear(false);
    const timeout = setTimeout(() => {
      setShouldAppear(true);
      setCurLegends(legends);
      setCurMobileTitle(mobileTitle);
    }, 1000);
    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [legends, mobileTitle]);

  return (
    <div
      className={classNames(
        styles.container,
        { [styles.containerVisible]: shouldAppear, [styles.mobile]: isMobile },
        className
      )}
    >
      {isMobile && (
        <div className={styles.mobileTitle}>
          {curMobileTitle ? curMobileTitle : ""}
        </div>
      )}
      <div className={styles.legendsWrapper}>
        {!isMobile && (
          <div className={styles.arrowContainer}>
            {!isEdge.start && (
              <button
                onClick={() => {
                  swiperRef.current?.slidePrev();
                }}
                className={classNames(styles.arrow, styles.arrowLeft)}
              >
                <ArrowRight />
              </button>
            )}
          </div>
        )}
        <Swiper
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsEdge({
              start: swiper.isBeginning,
              end: swiper.isEnd
            });
          }}
          centeredSlides={false}
          onSlideChange={(swiper) => {
            setIsEdge({
              start: swiper.isBeginning,
              end: swiper.isEnd
            });
          }}
          slidesPerView={"auto"}
          className={styles.swiper}
          modules={[Navigation]}
        >
          {curLegends.map((legend, index) => (
            <SwiperSlide className={styles.legend} key={legend.title + index}>
              <div className={styles.title}>{legend.title}</div>
              <p className={styles.description}>{legend.description}</p>
            </SwiperSlide>
          ))}
        </Swiper>
        {!isMobile && (
          <div className={styles.arrowContainer}>
            {!isEdge.end && (
              <button
                onClick={() => {
                  swiperRef.current?.slideNext();
                }}
                className={classNames(styles.arrow, styles.arrowRight)}
              >
                <ArrowRight />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
