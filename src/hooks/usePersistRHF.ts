// hooks/usePersistRHF.ts
import { useEffect, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { ls } from "utils/form-persist";

type Opts<T> = {
  fields?: (keyof T)[];
  clearOnSubmitSuccess?: boolean;
  serialize?: (values: T) => T;
  deserialize?: (values: Partial<T>) => Partial<T>;
};

export function usePersistRHF<T extends Record<string, any>>(
  key: string,
  methods: UseFormReturn<T>,
  opts: Opts<T> = {}
) {
  const { watch, reset, formState } = methods;
  const hydrated = useRef(false);

  // 1) Cargar del LS una sola vez
  useEffect(() => {
    if (hydrated.current) return;
    const saved = ls.get<Partial<T>>(key, {});
    const incoming = opts.deserialize ? opts.deserialize(saved) : saved;
    if (incoming && Object.keys(incoming).length) {
      reset({ ...(methods.getValues() as T), ...(incoming as T) }, { keepDefaultValues: true });
    }
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, reset]);

  // 2) Guardar cada cambio
  useEffect(() => {
    const sub = watch((values) => {
      if (!hydrated.current) return;
      const v = values as T;
      const picked =
        opts.fields && opts.fields.length
          ? Object.fromEntries(opts.fields.map((k) => [k as string, v[k]]))
          : v;
      const toSave = opts.serialize ? opts.serialize(picked as T) : (picked as T);
      ls.set(key, toSave);
    });
    return () => sub.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, key]);

  // 3) (opcional) limpiar tras submit exitoso
  useEffect(() => {
    if (!opts.clearOnSubmitSuccess) return;
    if (formState.isSubmitSuccessful) ls.remove(key);
  }, [formState.isSubmitSuccessful, key, opts.clearOnSubmitSuccess]);
}
