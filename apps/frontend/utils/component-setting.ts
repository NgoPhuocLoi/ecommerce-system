export const getPaddingLikeValue = (inputValues: string) => {
  const values = inputValues
    .split(" ")
    .map((v: string) => v.substring(0, v.length - 2));

  const allValue = values.every((v: string) => v === values[0])
    ? values[0]
    : "";

  return {
    top: values[0],
    right: values[1],
    bottom: values[2],
    left: values[3],
    all: allValue,
  };
};
