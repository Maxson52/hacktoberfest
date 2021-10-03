import { supabase } from './supabase';

async function GetReplies(match: any) {
  let { data: replies, error } = await supabase
    .from('replies')
    .select('*')
    .match(match);

  return { data: replies, error };
}

export default GetReplies;
