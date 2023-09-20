import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { UserAuth } from "@/interfaces/userAuth.interface";

export const useAuthStore = defineStore("auth", () => {
  const user = ref<null | UserAuth>(null)
  const nameInitial = computed(() => {
    return user.value ? user.value.name.charAt(0) : null
  })

  return { user, nameInitial };
});
