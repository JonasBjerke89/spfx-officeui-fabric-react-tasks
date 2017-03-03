declare interface ITasksStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'tasksStrings' {
  const strings: ITasksStrings;
  export = strings;
}
