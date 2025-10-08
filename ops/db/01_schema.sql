CREATE SCHEMA IF NOT EXISTS lv;

SET search_path TO lv;

-- === Categories ===================================

-- Create the categories table with the self-referencing foreign key
CREATE TABLE IF NOT EXISTS lv.categories (
    uuid UUID PRIMARY KEY,
    parent_uuid UUID,
    name VARCHAR(255) NOT NULL,
    priority INT,
    breadcrumb VARCHAR(255),
    image VARCHAR(255),
    filters JSONB,


    CONSTRAINT fk_parent_category
        FOREIGN KEY (parent_uuid)
        REFERENCES lv.categories(uuid)
        ON DELETE SET NULL
);
-- Create an index under the same schema
CREATE INDEX IF NOT EXISTS idx_category_parent_uuid ON lv.categories (parent_uuid);


-- === Migration history ===================================

CREATE TABLE IF NOT EXISTS lv.migration_history (
    version VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    checksum VARCHAR(50),
    applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
