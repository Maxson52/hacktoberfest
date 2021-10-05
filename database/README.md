# Database

The database and authentication is done entirely with Supabase.

There are four tables:

- public.users
- posts
- replies
- reports

The **users** table has three columns, it automatically filled by the trigger:

- id (uuid)
- joined_at
- email

The **posts** table has columns for:

- id
- created_at
- updated_at
- title
- body

The **replies** table has columns for:

- id
- created_at
- postid (FK to a post)
- authorid (FK to author id)
- body
