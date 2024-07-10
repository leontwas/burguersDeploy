// const config = {
//    host: 'sql3.freesqldatabase.com',
//    port: 3306,
//    user: 'sql3718809',
//    password: '1PtpLX6Yiz',
//    database: 'sql3718809'
// };

const config = {
    host: process.env.HOST_DB || 'localhost',
    port: process.env.PORT || 3000,
    user: process.env.USER_DB || 'root',
    password: process.env.PASS_DB || 'root',
    database:process.env.DB || 'hamburgueseria'
}

//    const config = {
//    host: 'localhost',
//    port: 3000,
//    user: 'root',
//    password: 'root',
//    database: 'hamburgueseria'
// }




export default config;
