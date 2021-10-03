import { supabase } from './supabase';

import { get } from 'svelte/store';

import { user } from '../stores/stores';

async function CreateReply(postid: number, body: string) {
  let userid: string = get(user).id;

  const { data, error } = await supabase
    .from('replies')
    .insert([{ authorid: userid, postid: postid, body: body }]);

  return { error };
}

export default CreateReply;
