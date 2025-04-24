import { createPool } from  'mysql2/promise.js';
import { MYSQLHOST,MYSQLDATABASE,MYSQLPASSWORD,MYSQLUSER,MYSQLPORT } from './config.js';



export const pool = await createPool({
    user: MYSQLUSER,
    password: MYSQLPASSWORD,
    host: MYSQLHOST,
    port: MYSQLPORT,
    database: MYSQLDATABASE,

})
