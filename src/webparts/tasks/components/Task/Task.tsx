import * as React from 'react';
import { ITaskProps } from './ITaskProps';

export class Task extends React.Component<ITaskProps, void> {
  render() {
    return (
      <div>
        {this.props.title} {this.props.assignedTo} {this.props.dueDate}
      </div>
    );
  }
}