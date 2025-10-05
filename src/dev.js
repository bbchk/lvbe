import pkg from 'pg';
import { faker } from '@faker-js/faker';

const { Client } = pkg;

const client = new Client({
  user: 'lvbe',
  host: 'localhost',
  database: 'lv',
  password: 'lvbe',
  port: 5433,
});

await client.connect();

const parentId = '11111111-1111-1111-1111-111111111111';

for (let i = 0; i < 10; i++) {
  const uuid = faker.string.uuid();
  const name = faker.commerce.department();
  const breadcrumb = `Для Собак > ${name}`;
  const priority = i + 1;
  const image = faker.image.url();
  const filters = JSON.stringify(['Filter1', 'Filter2']);

  await client.query(
    `INSERT INTO lv.categories (uuid, parent_uuid, name, priority, breadcrumb, image, filters)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [uuid, parentId, name, priority, breadcrumb, image, filters]
  );
}

await client.end();
console.log('Test categories inserted!');
