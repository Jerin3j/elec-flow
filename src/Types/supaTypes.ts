export default interface MsgObj{
  usr_text: string | null,
  sp_text: string | null,
  timestamp: string,
}
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      "messages": {
        Row: {
          created_at: string
          from: string | null
          id: number
          is_chat: boolean 
          message: MsgObj[] 
          message_id: string | null
          sp_profile: string 
          spname: string | null
          to: string | null
          user_profile: string 
          username: string | null
        }
        Insert: {
          created_at: string
          from?: string | null
          id?: number
          is_chat?: boolean 
          message?: MsgObj[]
          message_id?: string | null
          sp_profile?: string | null
          spname?: string | null
          to?: string | null
          user_profile?: string 
          username?: string | null
        }
        Update: {
          created_at?: string
          from?: string | null
          id?: number
          is_chat?: boolean 
          message?: MsgObj[]
          message_id?: string | null
          sp_profile?: string 
          spname?: string | null
          to?: string | null
          user_profile?: string 
          username?: string | null
        }
        Relationships: []
      },
      "service-providers": {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: number
          job: string | null
          last_name: string | null
          location: string | null
          latitude: number
          longitude: number 
          password: string | null
          phonenumber: number | null
          profilePicUrl: string | null
          uuid: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          job?: string | null
          last_name?: string | null
          latitude?: number
          longitude?: number
          location?: string | null
          password?: string | null
          phonenumber?: number | null
          profilePicUrl?: string | null
          uuid?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          job?: string | null
          last_name?: string | null
          latitude?: number
          longitude?: number
          location?: string | null
          password?: string | null
          phonenumber?: number | null
          profilePicUrl?: string | null
          uuid?: string | null
        }
        Relationships: []
      },
      "users": {
        Row: {
          created_at: string
          email: string | null
          first_name: string | null
          id: number
          last_name: string | null
          latitude: number | null
          location: string | null
          longitude: number | null
          password: string | null
          phonenumber: number | null
          profilePicUrl: string 
          uuid: string | null
        }
        Insert: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          password?: string | null
          phonenumber?: number | null
          profilePicUrl?: string 
          uuid?: string | null
        }
        Update: {
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: number
          last_name?: string | null
          latitude?: number | null
          location?: string | null
          longitude?: number | null
          password?: string | null
          phonenumber?: number | null
          profilePicUrl?: string 
          uuid?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
