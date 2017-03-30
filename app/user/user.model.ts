export class User {
    constructor(public email: string,
        public password: string,
        public firstName?: string,
        public lastName?: string,
        public admin?: boolean,
        public healths?: Array<Object>,
        public messages?: Array<Object>,
        public id?: string) { }
} 