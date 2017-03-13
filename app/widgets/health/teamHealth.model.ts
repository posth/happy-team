export class TeamHealth {

    teamHealth: number;
    teamHealthDate: Date;
    teamHealthId?: string;

    constructor(teamHealth: number,
        teamHealthDate: Date, teamHealthId?: string) {
        this.teamHealth = teamHealth;
        this.teamHealthDate = teamHealthDate;
        this.teamHealthId = teamHealthId;
    }
}