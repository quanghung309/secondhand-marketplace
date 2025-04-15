
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

export type ProductStatus = "draft" | "active" | "expired" | "sold";

export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  category: string;
  images: string[];
  status: ProductStatus;
  created_at: string;
  expires_at: string | null;
  seller_id: string;
  brand?: string | null;
  is_sold?: boolean;
  updated_at?: string;
  featured?: boolean;
}

export const useListings = (status?: ProductStatus) => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["listings", user?.id, status],
    queryFn: async () => {
      let query = supabase
        .from("products")
        .select("*")
        .eq("seller_id", user?.id);

      if (status) {
        query = query.eq("status", status);
      }

      const { data, error } = await query.order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      // Return the data with proper typing
      return data as Listing[];
    },
    enabled: !!user,
  });
};

export const useUpdateListing = () => {
  const queryClient = useQueryClient();

  const updateListingMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Listing> }) => {
      const { data, error } = await supabase
        .from("products")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data as Listing;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });

  return { updateListing: updateListingMutation.mutate, isUpdating: updateListingMutation.isPending };
};

export const useDeleteListing = () => {
  const queryClient = useQueryClient();

  const deleteListingMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", id);

      if (error) {
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
    },
  });

  return { 
    deleteListing: deleteListingMutation.mutate, 
    isDeleting: deleteListingMutation.isPending 
  };
};

