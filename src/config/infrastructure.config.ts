import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function getJwtSecrets() {
    return {
      secret: 'secret',
      signOptions: { expiresIn: '60s' },
    };
}

export function getDBConfigs(): TypeOrmModuleOptions {
  return {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DATABASE,
    entities: ["dist/modules/v1/entity/**/*.entity{.ts,.js}"],
    synchronize: true
  }
}