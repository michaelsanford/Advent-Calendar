import React from 'react';
import { DoorCard } from './DoorCard';
import type { DoorStatus, SurpriseContent } from '../types/calendar';

interface CalendarGridProps {
  currentDay: number;
  testMode: boolean;
  openedDays: number[];
  surprises: SurpriseContent[];
  onOpenDoor: (day: number) => void;
  onLockedDoorClick: (day: number) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDay,
  testMode,
  openedDays,
  surprises,
  onOpenDoor,
  onLockedDoorClick
}) => {
  const getDoorStatus = (day: number): DoorStatus => {
    if (openedDays.includes(day)) {
      return 'opened';
    }
    if (testMode || day <= currentDay) {
      return 'ready';
    }
    return 'locked';
  };

  return (
    <div className="relative z-20 w-full max-w-7xl mx-auto px-2 sm:px-4 md:px-6 pb-6 pt-2">
      {/* 
        Responsive Grid:
        - Mobile portrait: 3 or 4 columns
        - Tablet landscape (Samsung Tab A): 6 columns x 4 rows
      */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3 md:gap-4 auto-rows-fr">
        {surprises.map((surprise) => {
          const status = getDoorStatus(surprise.day);
          return (
            <div key={surprise.day} className="h-full">
              <DoorCard
                day={surprise.day}
                status={status}
                surprise={surprise}
                onOpen={onOpenDoor}
                onLockedClick={onLockedDoorClick}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};
