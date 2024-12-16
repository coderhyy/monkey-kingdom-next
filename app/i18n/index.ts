import { createInstance, FlatNamespace, KeyPrefix, Namespace } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { FallbackNs } from "react-i18next";
import { initReactI18next } from "react-i18next/initReactI18next";

import { getOptions } from "./settings";

const initI18next = async (lng: string, ns: string | string[]) => {
  // on server side we create a new instance for each render, because during compilation everything seems to be executed in parallel
  const i18nInstance = createInstance();
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`)
      )
    )
    .init(getOptions(lng, ns));
  return i18nInstance;
};

type $FirstNamespace<Ns extends Namespace> = Ns extends readonly unknown[]
  ? Ns[0]
  : Ns;
type $Tuple<T> = readonly [T?, ...T[]];

export async function getTranslation<
  Ns extends $Tuple<FlatNamespace> | FlatNamespace,
  KPrefix extends KeyPrefix<
    FallbackNs<
      Ns extends FlatNamespace ? FlatNamespace : $FirstNamespace<FlatNamespace>
    >
  > = undefined
>(lng: string, ns?: Ns, options: { keyPrefix?: KPrefix } = {}) {
  const i18nextInstance = await initI18next(
    lng,
    Array.isArray(ns) ? (ns as string[]) : (ns as string)
  );
  return {
    i18n: i18nextInstance,
    t: Array.isArray(ns)
      ? i18nextInstance.getFixedT(lng, ns[0], options.keyPrefix)
      : i18nextInstance.getFixedT(lng, ns as FlatNamespace, options.keyPrefix),
  };
}