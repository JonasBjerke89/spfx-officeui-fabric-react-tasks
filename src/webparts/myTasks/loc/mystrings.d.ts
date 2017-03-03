declare interface IMyTasksStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
}

declare module 'myTasksStrings' {
  const strings: IMyTasksStrings;
  export = strings;
}
