# NOTES

## DESIGN SYSTEM

#### Performance/Querying

- index on `owner_id` column in the `folders` table to improve query performance when searching for a user's folders
- second
- third

#### Databse Schemas

A schema in PostgreSQL is a way to organize database objects, particularly tables, into namespaces. Let me explain the concept in more detail:

##### Definition:

A schema is a named collection of tables, views, functions, operators, and other database objects.

##### Purpose:

- To organize database objects into logical groups
- To allow multiple users to use one database without interfering with each other
- To allow third-party applications to be put into separate schemas to avoid name collisions

##### Default schema:

In PostgreSQL, the default schema is called "public"
If you don't specify a schema, objects are created in the public schema

##### Creating a schema:

You can create a new schema using the CREATE SCHEMA command:
`CREATE SCHEMA myschema;`

##### Creating objects in a schema:

To create an object in a specific schema, you prefix the object name with the schema name:

```sql
CREATE TABLE myschema.mytable (
id serial PRIMARY KEY,
name text
);
```

##### Accessing objects in a schema:

To access an object in a schema, you use the dot notation:
`SELECT * FROM myschema.mytable;`

#### Search path:

PostgreSQL uses a search path to determine which schema to look in when an object is referenced without a schema qualifier
You can set the search path for your session:
`SET search_path TO myschema, public;`

##### Benefits:

- Improved organization of database objects
- Better security through access control at the schema level
- Ability to have multiple objects with the same name in different schemas

_Consider using schemas if:_

- You want to separate system tables from user data
- You plan to have multiple versions or environments of your app in the same database
- You want to group related tables together (e.g., all tables related to file management in one schema, user management in another)

## AUTH

- Rather than use Prisma for auth, set up session-based authentication using Passport.js & Prisma session store library

Additional security recommendations:

- Add rate limiting for login attempts
- Implement CSRF protection
- Use secure sessions with Redis or similar
- Add password complexity requirements
- Implement account lockout after failed attempts
- Add 2FA support
