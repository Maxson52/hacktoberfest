-- Updates a row in public.posts
create or replace function public.handle_updated_at() 
returns trigger as $$
begin
  update posts 
     set updated_at = new.created_at 
   where id = new.postid;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_new_reply
  after insert on public.replies
  for each row execute procedure public.handle_updated_at();

-- Inserts a row into public.users
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);

  return new;
end;
$$ language plpgsql security definer;

-- Trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();