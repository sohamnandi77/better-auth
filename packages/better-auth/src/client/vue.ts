import { useStore } from "@nanostores/vue";
import { BetterFetchOption } from "@better-fetch/fetch";
import { createVanillaClient } from "./base";

export const createAuthClient = (options?: BetterFetchOption) => {
	const client = createVanillaClient(options);
	function useSession() {
		return useStore(client.$atoms.$session);
	}
	function useActiveOrganization() {
		return useStore(client.$atoms.$activeOrganization);
	}
	function useListOrganization() {
		return useStore(client.$atoms.$listOrganizations);
	}
	const useInvitation = () => {
		return (
			useAuthStore(client.$atoms.$invitation) || {
				error: null,
				data: null,
			}
		);
	};
	return Object.assign(client, {
		useSession,
		useActiveOrganization,
		useListOrganization,
		useInvitation,
	});
};

export const useAuthStore = useStore;