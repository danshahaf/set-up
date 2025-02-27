export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          first_name: string;
          last_name: string;
          age: number;
          height_feet: number;
          height_inches: number;
          phone_number: string;
          bio: string;
          school: string;
          occupation: string;
          created_at: string;
        };
        Insert: {
          id: string;
          first_name: string;
          last_name: string;
          phone_number: string;
          age?: number;
          height_feet?: number;
          height_inches?: number;
          bio?: string;
          school?: string;
          occupation?: string;
          created_at?: string;
        };
        Update: {
          first_name?: string;
          last_name?: string;
          age?: number;
          height_feet?: number;
          height_inches?: number;
          phone_number?: string;
          bio?: string;
          school?: string;
          occupation?: string;
        };
      };
      matches: {
        Row: {
          id: string;
          matcher_id: string;
          person1_id: string;
          person2_id: string;
          response_person1: string | null;
          response_person2: string | null;
          response1_timestanp: string | null;
          response2_timestamp: string | null;
          created_at: string;
        };
        Insert: {
          matcher_id: string;
          person1_id: string;
          person2_id: string;
          created_at?: string;
        };
        Update: {
          response_person1?: string;
          response_person2?: string;
          response1_timestanp?: string;
          response2_timestamp?: string;
        };
      };
    };
  };
};

export type User = Database['public']['Tables']['users']['Row'];

export type Match = Omit<Database['public']['Tables']['matches']['Row'], 'person1_id' | 'person2_id'> & {
  person1: Pick<User, 'id' | 'first_name' | 'last_name'>;
  person2: Pick<User, 'id' | 'first_name' | 'last_name'>;
}; 