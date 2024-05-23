import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'escalas',
      password: '123',
      port: 5432,
    });
  }

  async onModuleInit() {
    await this.pool.query(`CREATE TABLE IF NOT EXISTS nurses (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      coren VARCHAR(30) NOT NULL UNIQUE
    );
    
    CREATE TABLE IF NOT EXISTS schedules (
      id SERIAL PRIMARY KEY,
      nurse_id INTEGER NOT NULL,
      month INTEGER NOT NULL,
      year INTEGER NOT NULL,
      schedule JSON NOT NULL,
      FOREIGN KEY (nurse_id) REFERENCES nurses(id),
      CONSTRAINT unique_nurse_schedule UNIQUE (nurse_id, month, year)
  );
    `);
  }

  async onModuleDestroy() {
    await this.pool.end();
  }

  async query(query: string, params?: any[]): Promise<any> {
    const { rows } = await this.pool.query(query, params);
    return rows;
}
}