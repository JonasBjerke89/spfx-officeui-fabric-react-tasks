import { Task } from '.././components/Task/Task'
import { taskobj } from '.././components/Tasks/Tasks'

import { 
  Version,
  Environment,
  EnvironmentType
} from '@microsoft/sp-core-library';

import { 
    SPHttpClient, 
    SPHttpClientConfiguration, 
    SPHttpClientResponse, 
    ODataVersion, 
    ISPHttpClientConfiguration, 
    ISPHttpClientOptions, 
    ISPHttpClientBatchOptions, 
    SPHttpClientBatch, 
    ISPHttpClientBatchCreationOptions 
} from '@microsoft/sp-http';

import {
  IWebPartContext
} from '@microsoft/sp-webpart-base';

export interface ITaskEntity {
  description: string;
  context: IWebPartContext
}

export class SPTaskEntity {
  public ListItemID: number;
  public Title: string;
  public DueDateOWSDATE: string;
  public StatusOWSCHCS: string;
  public PercentCompleteOWSNMBR: number;
  public AssignedToOWSUSER: string;
  public AssignedTo: string;
}

export default class TaskService
{
    private static parseSearchResult(searchResult) : Array<SPTaskEntity> {
        var obj = [];

        var results = searchResult.PrimaryQueryResult.RelevantResults.Table.Rows;
        results.forEach(((item, index) => {            
            var cell = {};
            item.Cells.forEach(((i,v) => {
                cell[i.Key] = i.Value;
            }));

            obj.push(cell);
        }));
        
        return obj;
    }

    public static getTasks(ctx : IWebPartContext, filter: string, thisSiteOnly: boolean) : Promise<Array<taskobj>> 
    {
        let result = new Array<taskobj>(0);

        if(Environment.type == EnvironmentType.Local) {
            return new Promise<Array<taskobj>>((resolve: (tasks : Array<taskobj>) => void, reject: (err: any) => void): void => {
                
                for(var i = 1; i<20; i++) {
                    let t = new taskobj();
                    t.id = i;
                    t.title = 'Task #' + i;
                    t.assignedTo = 'Jonas Bjerke Hansen (JOHAN)';
                    t.dueDate = i + '. maj 2017'
                    result.push(t);
                }

                resolve(result);
            })    
        } else
        {
            const spSearchConfig: ISPHttpClientConfiguration = {
                defaultODataVersion: ODataVersion.v3
            };

            const clientConfigODataV3: SPHttpClientConfiguration = SPHttpClient.configurations.v1.overrideWith(spSearchConfig);

            let webUrl = ctx.pageContext.web.absoluteUrl;
            let currentUser = ctx.pageContext.user.displayName;
            
            let query = '';

            switch(filter)
            {
                case "All":
                query = 'ContentTypeId:0x0108*';
                break;
                case "MyTasks":
                query = `ContentTypeId:0x0108*+AssignedTo:"${currentUser}"`;
                break;
            }

            if(thisSiteOnly)
            {
                query = query + `+Path:https:%2f%2fitrelation.sharepoint.com%2fsites%2fjohandev`;
            }

            return new Promise<Array<taskobj>>((resolve: (tasks : Array<taskobj>) => void, reject: (err: any) => void): void => {
                ctx.spHttpClient.get(`${webUrl}/_api/search/query?querytext='${query}'&selectproperties='ListItemID%2cTitle%2cDueDateOWSDATE%2c+StatusOWSCHCS%2cPercentCompleteOWSNMBR%2cAssignedToOWSUSER%2cAssignedTo'`, clientConfigODataV3, {
                    
                }).then((response: SPHttpClientResponse) => {
                    response.json().then((searchResult: any) => {
                        var results = this.parseSearchResult(searchResult);

                        results.forEach(((item: SPTaskEntity, index) => {
                            let t = new taskobj();
                            t.id = item.ListItemID;
                            t.title = item.Title;
                            t.assignedTo = item.AssignedTo;
                            t.dueDate = item.DueDateOWSDATE;
                            result.push(t);
                            
                        }));

                        resolve(result);                        
                    });
                });

                
                /*for(var i = 1; i<10; i++) {
                    let t = new taskobj();
                    t.id = i;
                    t.title = 'Task #' + i;
                    t.assignedTo = 'Jonas Bjerke Hansen (JOHAN)';
                    t.dueDate = i + '. maj 2017'
                    result.push(t);
                }

                resolve(result);*/
            })    
            
            
            /*return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
            .then((response: SPHttpClientResponse) => {
                return response.json();
            });*/
        }
    }
}