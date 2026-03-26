import dabaConfig from "./daba.json";

export interface FeatureFlags {
  whatsapp_only: boolean;
  show_admin: boolean;
  show_auth: boolean;
  use_local_cafe: boolean;
}

export const features: FeatureFlags = {
  whatsapp_only: import.meta.env.VITE_WHATSAPP_ONLY === "true" || dabaConfig.features.whatsapp_only,
  show_admin: import.meta.env.VITE_SHOW_ADMIN === "true" || dabaConfig.features.show_admin,
  show_auth: import.meta.env.VITE_SHOW_AUTH === "true" || dabaConfig.features.show_auth,
  use_local_cafe: import.meta.env.VITE_USE_LOCAL_CAFE === "true" || true, // Default to true for easy peasy version
};
