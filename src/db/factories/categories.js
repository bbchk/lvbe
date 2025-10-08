function one(overrides = {}) {
  const base = {
    uuid: faker.string.uuid(),
    parent_uuid: null,
    name: faker.commerce.department(),
    priority: 1,
    breadcrumb: '',
    image: faker.image.url(),
    filters: JSON.stringify([]),
  };
  return { ...base, ...overrides };
}

function many(count, overrides = {}) {
  const items = [];

  for (let i = 0; i < count; i++) {
    const currentOverrides =
      typeof overrides === 'function' ? overrides(i) : overrides;

    items.push(one({ priority: i + 1, ...currentOverrides }));
  }

  return items;
}

export default { one, many };
