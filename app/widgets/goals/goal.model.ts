export class Goal {
    content: string;
    completed: boolean;
    date: Date;
    goalId?: string;

    constructor(content: string, completed: boolean, date: Date, goalId?:string) {
        this.content = content;
        this.completed = completed;
        this.date = date;
        this.goalId = goalId;
    }
}