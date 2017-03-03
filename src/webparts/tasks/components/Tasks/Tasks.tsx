import * as React from 'react';
import styles from '../../Tasks.module.scss';
import { ITasksProps } from './ITasksProps';
import { ITasksState } from './ITasksState';
import { Task } from '../Task/Task';
import { escape } from '@microsoft/sp-lodash-subset';
import TaskService from '../../services/TaskService';
import { DetailsList, DetailsListLayoutMode, IColumn } from 'office-ui-fabric-react/lib/'

export class taskobj {
  public id: number;
  public title: string;
  public assignedTo: string;
  public dueDate: string;
}
export default class Tasks extends React.Component<ITasksProps, ITasksState> {
  constructor()
  {
    super();

    this.state = {
      tasks: [] as taskobj[]
    };
  }

   /* React life-cycle: This method will be called on component load */
  public componentDidMount(): void {
    this.getTasks();
  }

  public getTasks()
  {
      TaskService.getTasks().then((tasks) => {
        this.setState({ tasks: tasks })
      });
  }

  public render(): React.ReactElement<ITasksProps> {
    let mode = DetailsListLayoutMode.justified;
    let columns = [] as IColumn[];
    columns.push({ fieldName: 'id', key: 'id', name:'ID', minWidth:25, maxWidth:25})
    columns.push({ fieldName: 'title', key: 'title', name:'Title', minWidth:200, maxWidth:250})
    columns.push({ fieldName: 'assignedTo', key: 'assignedTo', name:'Assigned to', minWidth:200})
    columns.push({ fieldName: 'dueDate', key: 'dueDate', name:'Due date', minWidth:100})

    return (
        <DetailsList items={this.state.tasks} key='id' columns={columns} />
    );
  }
}