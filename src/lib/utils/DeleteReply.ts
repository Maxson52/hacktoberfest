import { supabase } from './supabase';

async function DeleteReply(id: any) {
  const { data, error } = await supabase
    .from('replies')
    .delete()
    .match({ id: id });

  return { error };
}

export default DeleteReply;
