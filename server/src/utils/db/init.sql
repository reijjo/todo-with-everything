DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'todos'
    ) THEN
        CREATE DATABASE todos;
    END IF;
END $$;
