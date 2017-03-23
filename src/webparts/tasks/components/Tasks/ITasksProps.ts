import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';

export interface ITasksProps {
  description: string;
  context: IWebPartContext;
  filter: string;
  thisSiteOnly: boolean;
}
