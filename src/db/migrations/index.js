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
//


// IMPORTANT!
// implement:
// A migration class contains two methods: up and down. The up method is used to add new tables, columns, or indexes to your database, while the down method should reverse the operations performed by the up method.
// PROMPT user for prod app_ENV
//Some migration operations are destructive, which means they may cause you to lose data. In order to protect you from running these commands against your production database, you will be prompted for confirmation before the commands are executed

// Implement step flag as well
//php artisan migrate:refresh --step=5
