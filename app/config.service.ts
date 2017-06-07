import { Injectable } from "@angular/core";

@Injectable()
export class ConfigService {

    private serverPath: string;

    constructor() {
        this.serverPath = "http://localhost:3000";
    }

    setServerPath(serverPath: string) {
        this.serverPath = serverPath;
    }

    getServerPath(): string {
        return this.serverPath;
    }
}