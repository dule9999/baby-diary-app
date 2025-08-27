import { apiFetch } from "./api";
import { getToken } from "./auth";

export async function getBabies() {
  const token = await getToken()
  return apiFetch("/api/babies", {}, token || undefined);
}

export async function createBaby(
  baby: { name: string; img?: string; date_of_birth?: string; blood_group?: string; address?: string }
) {
  const token = await getToken()
  return apiFetch("/api/babies", {
    method: "POST",
    body: JSON.stringify(baby),
  }, token || undefined);
}

export async function inviteUserToBaby(babyId: string, email: string) {
  const token = await getToken()
  return apiFetch(`/api/babies/${babyId}/invite`, {
    method: "POST",
    body: JSON.stringify({ email }),
  }, token || undefined);
}
