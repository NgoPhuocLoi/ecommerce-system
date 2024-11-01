import { VariantOption } from "../interfaces/variant";

interface HasName {
  name: string;
  selected?: boolean;
}

interface I extends HasName {
  [key: string]: any;
}

export const getNonEmptyNameOptionsList = (
  options: I[],
  isRecommend?: boolean,
) => {
  return options.filter((option) => {
    if (isRecommend) return option.selected;
    return option.name !== "";
  });
};

export const getNumberOfVairants = (options: VariantOption[]) => {
  if (options.length < 2) return 0;

  const filterPredicate = (v: any, isRecommend?: boolean) => {
    if (isRecommend) return v.selected;
    return v.name !== "";
  };

  if (options.length === 2)
    return options[1]?.values.filter((v) =>
      filterPredicate(v, options[1]?.isRecommend),
    ).length;
  return (
    options[1]!.values.filter((v) =>
      filterPredicate(v, options[1]?.isRecommend),
    ).length *
    (options[2]!.values.filter((v) =>
      filterPredicate(v, options[2]?.isRecommend),
    ).length || 1)
  );
};
