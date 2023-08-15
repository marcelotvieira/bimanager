import * as mysql from 'mysql2/promise';

export class Connection {
  private _db: mysql.Pool;

  constructor(connectionURL: string) {
    this._db = this.createConnection(connectionURL);
    this.testConnection();
  }

  private async testConnection() {
    const conn = await this._db.getConnection();
    console.log(await conn.ping());
    console.log('Connection is active');
  }


  private processURL(url: string) {
    const urlInHalf = url.split('@');
    const userAndPassword = urlInHalf[0].split('/')[2].split(':');
    const hostAndPort = urlInHalf[1].split('/')[0].split(':');
    const database = urlInHalf[1].split('/')[1];

    const connectionConfig = {
      host: hostAndPort[0],
      port: Number(hostAndPort[1]),
      database,
      user: userAndPassword[0],
      password: userAndPassword[1],
    };
    return connectionConfig;
  }

  public createConnection(url: string): mysql.Pool {
    const connectionData = this.processURL(url);
    const connectionConfigData = {
      ...connectionData,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    };

    console.log(connectionConfigData);
    const connection = mysql.createPool(connectionConfigData);
    return connection;
  }

  public async execute(query: string, values?: string[]) {
    console.log(query);
    try {
      const [rows] = await this._db.execute(query, values);
      console.log(rows);
      return rows;
    } catch (error) {
      console.error('Erro na consulta:', error);
      throw error;
    }
  }

  public async closeConnection() {
    await this._db.end();
  }
}
