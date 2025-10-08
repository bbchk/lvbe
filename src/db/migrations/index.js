// created table when migrations first run (if there is not such a table crate it)
//migrations_history
// Content: This table typically records the migration's name/version, the time it was applied, and often a checksum to detect if the migration file has been tampered with since it was applied.
// checksum!

// INSERT INTO lv.migration_history (version, name, checksum)
// VALUES (
//     '20251008075500',
//     'create_initial_users_and_products_tables',
//     '4a2b3c1d9e8f70654321abcd'
// );
