DO $$
BEGIN
    IF NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'todos'
    ) THEN
        CREATE DATABASE todos;
    END IF;

    IF NOT EXISTS (
        SELECT FROM pg_database WHERE datname = 'test_todos'
    ) THEN
        CREATE DATABASE test_todos;
    END IF;
END $$;
