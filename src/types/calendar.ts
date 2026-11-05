export type MiniGameType =
  | 'tree-lights'
  | 'dress-snowman'
  | 'snowflake-pop'
  | 'jingle-bells'
  | 'gingerbread'
  | 'rudolph-nose'
  | 'snow-globe'
  | 'feed-squirrel'
  | 'hot-cocoa'
  | 'train-whistle'
  | 'ice-castle'
  | 'penguin-slide'
  | 'candy-cane'
  | 'animal-chorus'
  | 'wrap-gifts'
  | 'pop-ornaments'
  | 'aurora-sky'
  | 'sled-ride'
  | 'cozy-fireplace'
  | 'polar-bear'
  | 'decorate-cabin'
  | 'santa-cookies'
  | 'reindeer-team'
  | 'sleigh-finale';

export interface SurpriseContent {
  day: number;
  title: string;
  badgeIcon: string;
  shortMessage: string;
  parentActivityTip?: string;
  miniGame: MiniGameType;
  customNote?: string;
}

export interface CalendarSettings {
  childName: string;
  calendarTitle: string;
  soundEnabled: boolean;
  speechEnabled: boolean;
  testMode: boolean; // if true, all doors can be opened immediately
  simulatedDay: number | null; // null means use real-world today's date
  openedDays: number[]; // array of days already opened [1, 2, ...]
  customSurprises: Record<number, Partial<SurpriseContent>>;
}

export type DoorStatus = 'opened' | 'ready' | 'locked';
