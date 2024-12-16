export const fallbackLng = "en";
export const languages = [fallbackLng, "zh"];
export const defaultNS = "translation";
export const cookieName = "i18next";

export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS
) {
  return {
    defaultNS,
    // preload: languages,
    fallbackLng,
    fallbackNS: defaultNS,
    lng,
    ns,
    // debug: true,
    supportedLngs: languages,
    // backend: {
    //   projectId: '01b2e5e8-6243-47d1-b36f-963dbb8bcae3'
    // }
  };
}
