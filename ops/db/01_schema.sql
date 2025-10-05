CREATE SCHEMA lv;

-- Create the categories table with the self-referencing foreign key
CREATE TABLE lv.categories (
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
CREATE INDEX idx_category_parent_uuid ON lv.categories (parent_uuid);
