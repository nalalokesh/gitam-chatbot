export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      academic_records: {
        Row: {
          attendance_percentage: number | null
          cgpa: number | null
          created_at: string | null
          id: string
          sgpa: number | null
          tuition_paid: boolean | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          attendance_percentage?: number | null
          cgpa?: number | null
          created_at?: string | null
          id?: string
          sgpa?: number | null
          tuition_paid?: boolean | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          attendance_percentage?: number | null
          cgpa?: number | null
          created_at?: string | null
          id?: string
          sgpa?: number | null
          tuition_paid?: boolean | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      change_logs: {
        Row: {
          action_type: string
          admin_id: string
          created_at: string | null
          description: string
          id: string
          kb_record_id: string | null
        }
        Insert: {
          action_type: string
          admin_id: string
          created_at?: string | null
          description: string
          id?: string
          kb_record_id?: string | null
        }
        Update: {
          action_type?: string
          admin_id?: string
          created_at?: string | null
          description?: string
          id?: string
          kb_record_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "change_logs_kb_record_id_fkey"
            columns: ["kb_record_id"]
            isOneToOne: false
            referencedRelation: "knowledge_base"
            referencedColumns: ["id"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          created_at: string | null
          id: string
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      knowledge_base: {
        Row: {
          answer_text: string
          created_at: string | null
          created_by: string | null
          id: string
          intent: Database["public"]["Enums"]["intent_type"]
          question_patterns: string[]
          tags: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          answer_text: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          intent: Database["public"]["Enums"]["intent_type"]
          question_patterns: string[]
          tags?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          answer_text?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          intent?: Database["public"]["Enums"]["intent_type"]
          question_patterns?: string[]
          tags?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          batch: string | null
          branch: string | null
          campus: string | null
          created_at: string | null
          email: string
          full_name: string
          id: string
          phone: string | null
          registration_no: string | null
          semester: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          batch?: string | null
          branch?: string | null
          campus?: string | null
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          phone?: string | null
          registration_no?: string | null
          semester?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          batch?: string | null
          branch?: string | null
          campus?: string | null
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          phone?: string | null
          registration_no?: string | null
          semester?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      queries: {
        Row: {
          answer: string | null
          answered_at: string | null
          confidence_score: number | null
          created_at: string | null
          detected_intent: Database["public"]["Enums"]["intent_type"] | null
          id: string
          is_from_kb: boolean | null
          question: string
          session_id: string | null
          status: Database["public"]["Enums"]["query_status"] | null
          user_id: string | null
        }
        Insert: {
          answer?: string | null
          answered_at?: string | null
          confidence_score?: number | null
          created_at?: string | null
          detected_intent?: Database["public"]["Enums"]["intent_type"] | null
          id?: string
          is_from_kb?: boolean | null
          question: string
          session_id?: string | null
          status?: Database["public"]["Enums"]["query_status"] | null
          user_id?: string | null
        }
        Update: {
          answer?: string | null
          answered_at?: string | null
          confidence_score?: number | null
          created_at?: string | null
          detected_intent?: Database["public"]["Enums"]["intent_type"] | null
          id?: string
          is_from_kb?: boolean | null
          question?: string
          session_id?: string | null
          status?: Database["public"]["Enums"]["query_status"] | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "queries_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "chat_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "student"
      intent_type:
        | "fees"
        | "attendance"
        | "grades"
        | "hostel"
        | "placements"
        | "scholarships"
        | "academics"
        | "admissions"
        | "general"
      query_status: "answered" | "unanswered" | "pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "student"],
      intent_type: [
        "fees",
        "attendance",
        "grades",
        "hostel",
        "placements",
        "scholarships",
        "academics",
        "admissions",
        "general",
      ],
      query_status: ["answered", "unanswered", "pending"],
    },
  },
} as const
