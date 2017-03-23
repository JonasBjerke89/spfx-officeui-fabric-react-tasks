import * as React from 'react';
import * as ReactDom from 'react-dom';
import { 
  Version
} from '@microsoft/sp-core-library';

import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneCheckbox
} from '@microsoft/sp-webpart-base';

import * as strings from 'tasksStrings';
import Tasks from './components/Tasks/Tasks';
import { ITasksProps } from './components/Tasks/ITasksProps';
import { ITasksWebPartProps } from './ITasksWebPartProps';

export default class TasksWebPart extends BaseClientSideWebPart<ITasksWebPartProps> {

  public render(): void {
    
    const element: React.ReactElement<ITasksProps> = React.createElement(
      Tasks,
      {
        description: this.properties.description,
        context: this.context,
        filter: this.properties.filter,
        thisSiteOnly: this.properties.thisSiteOnly
      }
    );
    
    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {    
    return Version.parse('1.0');
  }

  

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('filter', {
                  label: 'Set filter'
                }),
                PropertyPaneCheckbox('thisSiteOnly', {
                  text: 'This site only (else everything)'
                }),
              ]
            }
          ]
        }
      ]
    };
  }
}
