import { supabase } from './supabase';

async function CreateReport(
  postid: any,
  authorid: any,
  userid: any,
  description: string
) {
  const { data, error } = await supabase.from('reports').insert([
    {
      reported_user: authorid,
      reported_post: postid,
      created_by: userid,
      description: description
    }
  ]);

  return { error };
}

export default CreateReport;
