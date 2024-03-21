export default class {
    static ADD_REFRESH_TOKEN_QUERY = `INSERT INTO tokens (id, user_id, refresh_token) VALUES (?, ?, ?)`;
    static GET_REFRESH_TOKEN_BY_USER_ID_QUERY = `SELECT user_id as userId,
                                            refresh_token as refreshToken
                                            FROM tokens 
                                      WHERE user_id = ?`;

    static GET_REFRESH_TOKEN_QUERY = `SELECT id as tokenId,
                                    user_id as UserId,
                                    refresh_token as refreshToken,
                                    created_at as createdAt
                                FROM tokens where refresh_token = ?`;

    static SET_REFRESH_TOKEN_QUERY = `UPDATE tokens SET refresh_token = ? WHERE user_id = ?`;
    static DELETE_REFRESH_TOKEN_QUERY = `DELETE FROM tokens WHERE refresh_token = ?`;
}