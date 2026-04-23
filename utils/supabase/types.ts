export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: '14.5';
  };
  public: {
    Tables: {
      authors: {
        Row: {
          bio_md: string | null;
          bio_ta_md: string | null;
          created_at: string;
          credentials: string | null;
          display_name: string;
          email: string | null;
          id: string;
          linkedin_url: string | null;
          photo_url: string | null;
          slug: string;
        };
        Insert: {
          bio_md?: string | null;
          bio_ta_md?: string | null;
          created_at?: string;
          credentials?: string | null;
          display_name: string;
          email?: string | null;
          id?: string;
          linkedin_url?: string | null;
          photo_url?: string | null;
          slug: string;
        };
        Update: {
          bio_md?: string | null;
          bio_ta_md?: string | null;
          created_at?: string;
          credentials?: string | null;
          display_name?: string;
          email?: string | null;
          id?: string;
          linkedin_url?: string | null;
          photo_url?: string | null;
          slug?: string;
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          author: string | null;
          author_id: string | null;
          body_md: string | null;
          body_ta_md: string | null;
          cover_url: string | null;
          created_at: string;
          excerpt: string | null;
          excerpt_ta: string | null;
          id: string;
          last_reviewed_at: string | null;
          locale: string;
          published: boolean;
          published_at: string | null;
          reading_time_minutes: number | null;
          slug: string;
          tags: string[];
          title: string;
          title_ta: string | null;
        };
        Insert: {
          author?: string | null;
          author_id?: string | null;
          body_md?: string | null;
          body_ta_md?: string | null;
          cover_url?: string | null;
          created_at?: string;
          excerpt?: string | null;
          excerpt_ta?: string | null;
          id?: string;
          last_reviewed_at?: string | null;
          locale?: string;
          published?: boolean;
          published_at?: string | null;
          reading_time_minutes?: number | null;
          slug: string;
          tags?: string[];
          title: string;
          title_ta?: string | null;
        };
        Update: {
          author?: string | null;
          author_id?: string | null;
          body_md?: string | null;
          body_ta_md?: string | null;
          cover_url?: string | null;
          created_at?: string;
          excerpt?: string | null;
          excerpt_ta?: string | null;
          id?: string;
          last_reviewed_at?: string | null;
          locale?: string;
          published?: boolean;
          published_at?: string | null;
          reading_time_minutes?: number | null;
          slug?: string;
          tags?: string[];
          title?: string;
          title_ta?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'blog_posts_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'authors';
            referencedColumns: ['id'];
          },
        ];
      };
      cities: {
        Row: {
          climate_notes: string | null;
          climate_notes_ta: string | null;
          created_at: string;
          district: string | null;
          geo_lat: number | null;
          geo_lng: number | null;
          governing_authority: string | null;
          intro_en: string | null;
          intro_ta: string | null;
          name: string;
          name_ta: string | null;
          nearby_cities: string[];
          population_rough: number | null;
          slug: string;
          soil_type: string | null;
          tier: number;
        };
        Insert: {
          climate_notes?: string | null;
          climate_notes_ta?: string | null;
          created_at?: string;
          district?: string | null;
          geo_lat?: number | null;
          geo_lng?: number | null;
          governing_authority?: string | null;
          intro_en?: string | null;
          intro_ta?: string | null;
          name: string;
          name_ta?: string | null;
          nearby_cities?: string[];
          population_rough?: number | null;
          slug: string;
          soil_type?: string | null;
          tier?: number;
        };
        Update: {
          climate_notes?: string | null;
          climate_notes_ta?: string | null;
          created_at?: string;
          district?: string | null;
          geo_lat?: number | null;
          geo_lng?: number | null;
          governing_authority?: string | null;
          intro_en?: string | null;
          intro_ta?: string | null;
          name?: string;
          name_ta?: string | null;
          nearby_cities?: string[];
          population_rough?: number | null;
          slug?: string;
          soil_type?: string | null;
          tier?: number;
        };
        Relationships: [];
      };
      entities: {
        Row: {
          answer_short: string;
          answer_short_ta: string | null;
          author_id: string | null;
          body_md: string;
          body_ta_md: string | null;
          created_at: string;
          last_reviewed_at: string | null;
          published: boolean;
          published_at: string | null;
          question: string;
          question_ta: string | null;
          related_cities: string[];
          related_entities: string[];
          related_services: string[];
          schema_type: string;
          slug: string;
          title: string;
          title_ta: string | null;
          updated_at: string;
        };
        Insert: {
          answer_short: string;
          answer_short_ta?: string | null;
          author_id?: string | null;
          body_md: string;
          body_ta_md?: string | null;
          created_at?: string;
          last_reviewed_at?: string | null;
          published?: boolean;
          published_at?: string | null;
          question: string;
          question_ta?: string | null;
          related_cities?: string[];
          related_entities?: string[];
          related_services?: string[];
          schema_type?: string;
          slug: string;
          title: string;
          title_ta?: string | null;
          updated_at?: string;
        };
        Update: {
          answer_short?: string;
          answer_short_ta?: string | null;
          author_id?: string | null;
          body_md?: string;
          body_ta_md?: string | null;
          created_at?: string;
          last_reviewed_at?: string | null;
          published?: boolean;
          published_at?: string | null;
          question?: string;
          question_ta?: string | null;
          related_cities?: string[];
          related_entities?: string[];
          related_services?: string[];
          schema_type?: string;
          slug?: string;
          title?: string;
          title_ta?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'entities_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'authors';
            referencedColumns: ['id'];
          },
        ];
      };
      landing_pages: {
        Row: {
          author_id: string | null;
          city_slug: string | null;
          created_at: string;
          featured_project_ids: string[];
          hero_image_id: string | null;
          id: string;
          meta_description: string | null;
          meta_description_ta: string | null;
          modifier_json: Json;
          page_type: string;
          published: boolean;
          published_at: string | null;
          service_slug: string | null;
          slug: string;
          tier: string | null;
          title: string;
          title_ta: string | null;
          unique_example_md: string;
          unique_example_ta_md: string | null;
          unique_intro_md: string;
          unique_intro_ta_md: string | null;
          updated_at: string;
        };
        Insert: {
          author_id?: string | null;
          city_slug?: string | null;
          created_at?: string;
          featured_project_ids?: string[];
          hero_image_id?: string | null;
          id?: string;
          meta_description?: string | null;
          meta_description_ta?: string | null;
          modifier_json?: Json;
          page_type: string;
          published?: boolean;
          published_at?: string | null;
          service_slug?: string | null;
          slug: string;
          tier?: string | null;
          title: string;
          title_ta?: string | null;
          unique_example_md: string;
          unique_example_ta_md?: string | null;
          unique_intro_md: string;
          unique_intro_ta_md?: string | null;
          updated_at?: string;
        };
        Update: {
          author_id?: string | null;
          city_slug?: string | null;
          created_at?: string;
          featured_project_ids?: string[];
          hero_image_id?: string | null;
          id?: string;
          meta_description?: string | null;
          meta_description_ta?: string | null;
          modifier_json?: Json;
          page_type?: string;
          published?: boolean;
          published_at?: string | null;
          service_slug?: string | null;
          slug?: string;
          tier?: string | null;
          title?: string;
          title_ta?: string | null;
          unique_example_md?: string;
          unique_example_ta_md?: string | null;
          unique_intro_md?: string;
          unique_intro_ta_md?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'landing_pages_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'authors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'landing_pages_city_slug_fkey';
            columns: ['city_slug'];
            isOneToOne: false;
            referencedRelation: 'cities';
            referencedColumns: ['slug'];
          },
        ];
      };
      leads: {
        Row: {
          assigned_to: string | null;
          built_up_sqft: number | null;
          city: string | null;
          created_at: string;
          email: string | null;
          floors: string | null;
          id: string;
          message: string | null;
          name: string | null;
          notes: string | null;
          phone: string | null;
          plot_sqft: number | null;
          source: string;
          status: string;
          tier_interest: string | null;
          timeline: string | null;
          updated_at: string;
          utm_campaign: string | null;
          utm_medium: string | null;
          utm_source: string | null;
        };
        Insert: {
          assigned_to?: string | null;
          built_up_sqft?: number | null;
          city?: string | null;
          created_at?: string;
          email?: string | null;
          floors?: string | null;
          id?: string;
          message?: string | null;
          name?: string | null;
          notes?: string | null;
          phone?: string | null;
          plot_sqft?: number | null;
          source: string;
          status?: string;
          tier_interest?: string | null;
          timeline?: string | null;
          updated_at?: string;
          utm_campaign?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Update: {
          assigned_to?: string | null;
          built_up_sqft?: number | null;
          city?: string | null;
          created_at?: string;
          email?: string | null;
          floors?: string | null;
          id?: string;
          message?: string | null;
          name?: string | null;
          notes?: string | null;
          phone?: string | null;
          plot_sqft?: number | null;
          source?: string;
          status?: string;
          tier_interest?: string | null;
          timeline?: string | null;
          updated_at?: string;
          utm_campaign?: string | null;
          utm_medium?: string | null;
          utm_source?: string | null;
        };
        Relationships: [];
      };
      project_photos: {
        Row: {
          caption: string | null;
          caption_ta: string | null;
          created_at: string;
          display_order: number;
          id: string;
          is_cover: boolean;
          project_id: string;
          url: string;
        };
        Insert: {
          caption?: string | null;
          caption_ta?: string | null;
          created_at?: string;
          display_order?: number;
          id?: string;
          is_cover?: boolean;
          project_id: string;
          url: string;
        };
        Update: {
          caption?: string | null;
          caption_ta?: string | null;
          created_at?: string;
          display_order?: number;
          id?: string;
          is_cover?: boolean;
          project_id?: string;
          url?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'project_photos_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
        ];
      };
      projects: {
        Row: {
          author_id: string | null;
          built_up_sqft: number | null;
          city_slug: string | null;
          completion_date: string | null;
          created_at: string;
          display_order: number | null;
          featured: boolean;
          floors: string | null;
          id: string;
          locale: string;
          location: string | null;
          name: string;
          name_ta: string | null;
          plot_sqft: number | null;
          slug: string;
          start_date: string | null;
          status: string;
          story: string | null;
          story_ta: string | null;
          testimonial: string | null;
          testimonial_client_name: string | null;
          tier: string | null;
          type: string | null;
          updated_at: string;
        };
        Insert: {
          author_id?: string | null;
          built_up_sqft?: number | null;
          city_slug?: string | null;
          completion_date?: string | null;
          created_at?: string;
          display_order?: number | null;
          featured?: boolean;
          floors?: string | null;
          id?: string;
          locale?: string;
          location?: string | null;
          name: string;
          name_ta?: string | null;
          plot_sqft?: number | null;
          slug: string;
          start_date?: string | null;
          status?: string;
          story?: string | null;
          story_ta?: string | null;
          testimonial?: string | null;
          testimonial_client_name?: string | null;
          tier?: string | null;
          type?: string | null;
          updated_at?: string;
        };
        Update: {
          author_id?: string | null;
          built_up_sqft?: number | null;
          city_slug?: string | null;
          completion_date?: string | null;
          created_at?: string;
          display_order?: number | null;
          featured?: boolean;
          floors?: string | null;
          id?: string;
          locale?: string;
          location?: string | null;
          name?: string;
          name_ta?: string | null;
          plot_sqft?: number | null;
          slug?: string;
          start_date?: string | null;
          status?: string;
          story?: string | null;
          story_ta?: string | null;
          testimonial?: string | null;
          testimonial_client_name?: string | null;
          tier?: string | null;
          type?: string | null;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'projects_author_id_fkey';
            columns: ['author_id'];
            isOneToOne: false;
            referencedRelation: 'authors';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'projects_city_slug_fkey';
            columns: ['city_slug'];
            isOneToOne: false;
            referencedRelation: 'cities';
            referencedColumns: ['slug'];
          },
        ];
      };
      review_outreach: {
        Row: {
          client_name: string;
          id: string;
          incentive_sent: boolean;
          incentive_sent_at: string | null;
          invited_at: string | null;
          notes: string | null;
          phone: string | null;
          platforms_posted: string[];
          project_id: string | null;
          status: string;
          updated_at: string;
        };
        Insert: {
          client_name: string;
          id?: string;
          incentive_sent?: boolean;
          incentive_sent_at?: string | null;
          invited_at?: string | null;
          notes?: string | null;
          phone?: string | null;
          platforms_posted?: string[];
          project_id?: string | null;
          status?: string;
          updated_at?: string;
        };
        Update: {
          client_name?: string;
          id?: string;
          incentive_sent?: boolean;
          incentive_sent_at?: string | null;
          invited_at?: string | null;
          notes?: string | null;
          phone?: string | null;
          platforms_posted?: string[];
          project_id?: string | null;
          status?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'review_outreach_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
        ];
      };
      reviews: {
        Row: {
          client_location: string | null;
          client_name: string;
          created_at: string;
          display_order: number | null;
          external_id: string | null;
          featured: boolean;
          id: string;
          is_video: boolean;
          project_id: string | null;
          quote: string | null;
          quote_ta: string | null;
          rating: number;
          responded_at: string | null;
          response_text: string | null;
          source: string;
          source_url: string | null;
          video_url: string | null;
        };
        Insert: {
          client_location?: string | null;
          client_name: string;
          created_at?: string;
          display_order?: number | null;
          external_id?: string | null;
          featured?: boolean;
          id?: string;
          is_video?: boolean;
          project_id?: string | null;
          quote?: string | null;
          quote_ta?: string | null;
          rating: number;
          responded_at?: string | null;
          response_text?: string | null;
          source: string;
          source_url?: string | null;
          video_url?: string | null;
        };
        Update: {
          client_location?: string | null;
          client_name?: string;
          created_at?: string;
          display_order?: number | null;
          external_id?: string | null;
          featured?: boolean;
          id?: string;
          is_video?: boolean;
          project_id?: string | null;
          quote?: string | null;
          quote_ta?: string | null;
          rating?: number;
          responded_at?: string | null;
          response_text?: string | null;
          source?: string;
          source_url?: string | null;
          video_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'reviews_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
        ];
      };
      site_settings: {
        Row: {
          key: string;
          updated_at: string;
          value: string;
        };
        Insert: {
          key: string;
          updated_at?: string;
          value: string;
        };
        Update: {
          key?: string;
          updated_at?: string;
          value?: string;
        };
        Relationships: [];
      };
      suppliers: {
        Row: {
          category: string;
          city_slug: string | null;
          created_at: string;
          id: string;
          is_partner: boolean;
          name: string;
          phone: string | null;
          website_url: string | null;
        };
        Insert: {
          category: string;
          city_slug?: string | null;
          created_at?: string;
          id?: string;
          is_partner?: boolean;
          name: string;
          phone?: string | null;
          website_url?: string | null;
        };
        Update: {
          category?: string;
          city_slug?: string | null;
          created_at?: string;
          id?: string;
          is_partner?: boolean;
          name?: string;
          phone?: string | null;
          website_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'suppliers_city_slug_fkey';
            columns: ['city_slug'];
            isOneToOne: false;
            referencedRelation: 'cities';
            referencedColumns: ['slug'];
          },
        ];
      };
      testimonials: {
        Row: {
          client_location: string | null;
          client_name: string;
          created_at: string;
          featured: boolean;
          id: string;
          project_id: string | null;
          project_type: string | null;
          quote_en: string;
          quote_ta: string | null;
          rating: number | null;
        };
        Insert: {
          client_location?: string | null;
          client_name: string;
          created_at?: string;
          featured?: boolean;
          id?: string;
          project_id?: string | null;
          project_type?: string | null;
          quote_en: string;
          quote_ta?: string | null;
          rating?: number | null;
        };
        Update: {
          client_location?: string | null;
          client_name?: string;
          created_at?: string;
          featured?: boolean;
          id?: string;
          project_id?: string | null;
          project_type?: string | null;
          quote_en?: string;
          quote_ta?: string | null;
          rating?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'testimonials_project_id_fkey';
            columns: ['project_id'];
            isOneToOne: false;
            referencedRelation: 'projects';
            referencedColumns: ['id'];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};
