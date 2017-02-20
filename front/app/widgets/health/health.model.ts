export class Health {
    
    currentHealth: number;
    healthId?: string;
    userId?: string;

    constructor(currentHealth: number, healthId?: string, userId?: string) {
        this.currentHealth = currentHealth;
        this.healthId = healthId;
        this.userId = userId;
    }
    
}