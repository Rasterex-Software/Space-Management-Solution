import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from "dotenv";

dotenv.config();

export const dbConfig: TypeOrmModuleOptions = {
// const dbConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.SM_API_POSTGRES_HOST, // '127.0.0.1',
  port: Number(process.env.SM_API_POSTGRES_PORT), // 5432,
  username: process.env.SM_API_POSTGRES_USER, // 'root',
  password: process.env.SM_API_POSTGRES_PASS, // 'pass',
  database: process.env.SM_API_POSTGRES_DB, // 'rxpm',
  synchronize: false,
  logging: true,
  // cache: {
  //   type: 'redis',
  //   options: {
  //     host: process.env.SM_API_REDIS_HOST, // '127.0.0.1',
  //     port: process.env.SM_API_REDIS_POST, // 6379,
  //   },
  // },
  entities: [join(__dirname, './**/*.entity{.ts,.js}')],
  cli: {
    migrationsDir: 'src/db/migrations'
  }
};

// export = dbConfig;