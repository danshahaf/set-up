import { supabase } from './supabase';
import { Database } from '../types/database';

export async function createMatch(
  matcherId: string,
  person1Id: string,
  person2Id: string
) {
  const { data, error } = await supabase
    .from('matches')
    .insert({
      matcher_id: matcherId,
      person1_id: person1Id,
      person2_id: person2Id,
      status: 'pending',
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getMyMatches(userId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      id,
      matcher_id,
      created_at,
      response_person1,
      response_person2,
      response1_timestanp,
      response2_timestamp,
      person1:person1_id(id, first_name, last_name),
      person2:person2_id(id, first_name, last_name)
    `)
    .eq('matcher_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data as Match[];
}

export async function getMatchesForMe(userId: string) {
  const { data, error } = await supabase
    .from('matches')
    .select(`
      *,
      matcher:matcher_id(username)
    `)
    .or(`person1_id.eq.${userId},person2_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

export async function respondToMatch(
  matchId: string,
  userId: string,
  response: boolean
) {
  const { data, error } = await supabase
    .from('match_responses')
    .insert({
      match_id: matchId,
      responder_id: userId,
      response,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
} 