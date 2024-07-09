// const config = {
//    host: 'sql3.freesqldatabase.com',
//    port: 3306,
//    user: 'sql3718809',
//    password: '1PtpLX6Yiz',
//    database: 'sql3718809'
// };

const config = {
    host: process.env.HOST_DB,
    user: proccess.env.USER_DB,
    password: process.env.PASS_DB,
    database:process.env.DB
}

export default config;
