import { Task } from '.././components/Task/Task'
import { taskobj } from '.././components/Tasks/Tasks'
export default class TaskService
{
    public static getTasks() : Promise<Array<taskobj>> 
    {
        return new Promise<Array<taskobj>>((resolve: (tasks : Array<taskobj>) => void, reject: (err: any) => void): void => {

            let result = new Array<taskobj>(0);
            
            for(var i = 1; i<20; i++) {
                //result.push(new taskobj() { id:i, title: "Opgave #" + i}));
                let t = new taskobj();
                t.id = i;
                t.title = 'Task #' + i;
                t.assignedTo = 'Jonas Bjerke Hansen (JOHAN)';
                t.dueDate = i + '. maj 2017'
                result.push(t);
            }

            resolve(result);
        })    
    }
}