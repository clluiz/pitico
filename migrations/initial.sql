CREATE SCHEMA IF NOT EXISTS pitico;

CREATE TABLE IF NOT EXISTS pitico.urls (
    id SERIAL PRIMARY KEY,
    original_url TEXT NOT NULL CHECK (original_url ~ '^https?://'), -- Ensures URL starts with http:// or https://
    short_code VARCHAR NULL UNIQUE, -- Short code for the URL (e.g., 'abc123')
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);