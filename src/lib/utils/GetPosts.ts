import { supabase } from './supabase';

async function GetPosts(match: any) {
  let { data: posts, error } = await supabase
    .from('posts')
    .select('*')
    .match(match);

  return { data: posts, error };
}

export default GetPosts;
