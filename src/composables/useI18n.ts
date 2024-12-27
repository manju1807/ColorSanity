import type { MessageSchema } from "@/i18n";
// src/composables/useI18n.ts
import { useI18n as useVueI18n } from "vue-i18n";

export function useI18n() {
	return useVueI18n<{ message: MessageSchema }>();
}
