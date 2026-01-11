import React from "react";
import { createAdminClient } from "@/lib/supabase-server";
import AdminUsersClient, { User } from "./client";

export default async function AdminUsersPage() {
  const supabase = await createAdminClient();
  
  // Fetch users (Default limit is 50, usually enough for simple admin)
  const { data: { users: authUsers }, error: authError } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000
  });
  
  if (authError) {
      console.error("Error fetching auth users:", authError);
      return <div className="p-8 text-red-500">Error loading users. Check server logs.</div>;
  }
  
  // Fetch roles
  const { data: roles, error: roleError } = await supabase.from('context_memberships').select('user_id, role');

  if (roleError) {
      console.error("Error fetching roles:", roleError);
  }
  
  // Merge Data
  const users: User[] = (authUsers || []).map(u => {
      const userRole = roles?.find(r => r.user_id === u.id)?.role || 'user';
      return {
          id: u.id,
          email: u.email || '',
          name: u.user_metadata?.full_name || u.user_metadata?.name || '',
          role: userRole,
          last_sign_in_at: u.last_sign_in_at || '',
          created_at: u.created_at
      };
  });
  
  return <AdminUsersClient initialUsers={users} />;
}
