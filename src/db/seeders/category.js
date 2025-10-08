import dbPool from '#root/config/db.js';
import factory from '#root/db/factories/index.export.js';

async function seeder() {
  const parent = factory.categories.create.one({
    name: 'Для Собак',
    breadcrumb: 'Для Собак',
    parent_uuid: null,
    filters: JSON.stringify([]),
  });

  await dbPool.query(
    `INSERT INTO lv.categories (uuid, parent_uuid, name, priority, breadcrumb, image, filters)
     VALUES ($1, $2, $3, $4, $5, $6, $7)`,
    [
      parent.uuid,
      parent.parent_uuid,
      parent.name,
      parent.priority,
      parent.breadcrumb,
      parent.image,
      parent.filters,
    ]
  );

  const children = factory.categories.create.many(10, (i) => ({
    parent_uuid: parent.uuid,
    breadcrumb: `${parent.name} > ${factory.categories.create.one().name}`,
    filters: JSON.stringify(['Filter1', 'Filter2']),
    priority: i + 1,
  }));

  for (const child of children) {
    await dbPool.query(
      `INSERT INTO lv.categories (uuid, parent_uuid, name, priority, breadcrumb, image, filters)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        child.uuid,
        child.parent_uuid,
        child.name,
        child.priority,
        child.breadcrumb,
        child.image,
        child.filters,
      ]
    );
  }

  // TODO: loggingin seeders and factories
  // console.log(`✅ Inserted 1 parent and ${children.length} child categories`);
}

export default seeder;

