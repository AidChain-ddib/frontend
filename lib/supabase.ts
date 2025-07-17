import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Project {
  id: string
  title: string
  description: string
  creator_id: string
  funding_goal: number
  total_raised: number
  category: string
  status: "active" | "completed" | "paused"
  created_at: string
  updated_at: string
  contract_id?: string
  ipfs_hash?: string
}

export interface Milestone {
  id: string
  project_id: string
  title: string
  description: string
  amount: number
  deadline: string
  status: "pending" | "in_progress" | "completed" | "verified"
  created_at: string
  updated_at: string
  deliverables: any[]
  verification_score?: number
}

export interface Donation {
  id: string
  project_id: string
  donor_id: string
  amount: number
  transaction_hash: string
  created_at: string
}

export interface Verification {
  id: string
  milestone_id: string
  verifier_id: string
  decision: "approve" | "reject"
  feedback: string
  stake_amount: number
  created_at: string
}

export class DatabaseService {
  static async createProject(projectData: Omit<Project, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("projects").insert([projectData]).select().single()

    if (error) throw error
    return data
  }

  static async getProject(id: string) {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        milestones (*),
        donations (*)
      `)
      .eq("id", id)
      .single()

    if (error) throw error
    return data
  }

  static async getProjects(filters?: { category?: string; status?: string }) {
    let query = supabase.from("projects").select(`
        *,
        milestones (count),
        donations (sum(amount))
      `)

    if (filters?.category) {
      query = query.eq("category", filters.category)
    }

    if (filters?.status) {
      query = query.eq("status", filters.status)
    }

    const { data, error } = await query.order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async createMilestone(milestoneData: Omit<Milestone, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase.from("milestones").insert([milestoneData]).select().single()

    if (error) throw error
    return data
  }

  static async updateMilestone(id: string, updates: Partial<Milestone>) {
    const { data, error } = await supabase.from("milestones").update(updates).eq("id", id).select().single()

    if (error) throw error
    return data
  }

  static async createDonation(donationData: Omit<Donation, "id" | "created_at">) {
    const { data, error } = await supabase.from("donations").insert([donationData]).select().single()

    if (error) throw error
    return data
  }

  static async getDonationsByProject(projectId: string) {
    const { data, error } = await supabase
      .from("donations")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async createVerification(verificationData: Omit<Verification, "id" | "created_at">) {
    const { data, error } = await supabase.from("verifications").insert([verificationData]).select().single()

    if (error) throw error
    return data
  }

  static async getVerificationsByMilestone(milestoneId: string) {
    const { data, error } = await supabase
      .from("verifications")
      .select(`
        *,
        milestones (
          title,
          projects (title)
        )
      `)
      .eq("milestone_id", milestoneId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async getUserProjects(userId: string) {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        *,
        milestones (count),
        donations (sum(amount))
      `)
      .eq("creator_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async getUserDonations(userId: string) {
    const { data, error } = await supabase
      .from("donations")
      .select(`
        *,
        projects (title, status)
      `)
      .eq("donor_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }

  static async getUserVerifications(userId: string) {
    const { data, error } = await supabase
      .from("verifications")
      .select(`
        *,
        milestones (
          title,
          projects (title)
        )
      `)
      .eq("verifier_id", userId)
      .order("created_at", { ascending: false })

    if (error) throw error
    return data
  }
}
