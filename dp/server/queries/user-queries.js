export default class {
    static ADD_USER_QUERY = `INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)`;
    static ADD_ACTIVATION_LINK = 'INSERT INTO activation_links (id, user_id, activation_link) VALUES (?, ?, ?)';

    static GET_USER_BY_ID_QUERY = `SELECT id as userId,
                                        name,
                                        email,
                                        password,
                                        is_activated as isActivated
                                    FROM users
                                    WHERE userId = ?`;
                                    
    static GET_USER_BY_ACTIVATION_LINK_QUERY = `SELECT users.id as userId,  
                                                            users.is_activated as isActivated,
                                                            activation_links.activation_link as activationLink
                                                             from users 
                                                        LEFT JOIN activation_links 
                                                        ON users.id = activation_links.user_id
                                                        WHERE activation_links.activation_link = ?`;

    static GET_USER_BY_EMAIL = `SELECT id as userId,
                                    name,
                                    email,
                                    password,
                                    is_activated as isActivated
                                FROM users
                                WHERE email = ?`;

    static SET_ACTIVATED_STATUS = `UPDATE users SET is_activated = 1 WHERE users.id = ?`;
    static GET_ALL_USERS = `SELECT * FROM users;`

}