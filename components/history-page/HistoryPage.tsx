import React, { useEffect, useRef } from "react";
import MissionFeedCard, { MissionFeedCardProps } from "./mission-feed-card/MissionFeedCard";
import PageHeader from "../shared/page-header/PageHeader";

import styles from './HistoryPage.module.css';

export interface HistoryPageProps {
  missions: MissionFeedCardProps[]
  pageHeader: string
}

const HistoryPage = ({
  missions,
  pageHeader
}: HistoryPageProps) => {
  const observedDiv = useRef<HTMLDivElement>(null);

  /**
   * @description Used to setup the code that handles the observed div
   */
  useEffect(() => {
    const observerCallBack = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        console.log('element visible');
      }
    };
    const observer = new IntersectionObserver(observerCallBack);
    if (observedDiv.current) observer.observe(observedDiv.current);

    return () => {
      if (observedDiv.current) observer.unobserve(observedDiv.current);
    };
  }, [observedDiv]);

  return (
    <div className={styles.base}>
      <PageHeader
        className={styles.header}
        value={pageHeader}
      />
      {missions.map((mission: MissionFeedCardProps) => {
        const { readMoreText, missionDate, missionDetails, missionName, missionId } = mission;
        return (
          <MissionFeedCard
            className={styles.card}
            key={missionId}
            missionDate={missionDate}
            missionDetails={missionDetails}
            missionName={missionName}
            missionId={missionId}
            readMoreText={readMoreText}
          />
        );
      })}
      <div ref={observedDiv}></div>
    </div>
  );
};

export default HistoryPage;