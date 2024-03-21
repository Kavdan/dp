export default class {
    email;
    userId;
    isActivated;
    name; 

    constructor(user) {
        this.email = user.email;
        this.userId = user.userId;
        this.isActivated = user.isActivated;
        this.name = user.name;
    }
}