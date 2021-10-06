import { supabase } from './supabase';

import { get } from 'svelte/store';

import { user } from '../stores/stores';

async function CreatePrompt(title: string, body: string) {
  let userid: string = get(user).id;

  const { data, error } = await supabase
    .from('posts')
    .insert([{ title: title, body: body, authorid: userid }]);

  return { error };
}

export default CreatePrompt;
