export const extractMetadataFromResponseClientSide = async (
  res: Response,
  fallback?: object,
) => {
  if (!res.ok) {
    return fallback ?? null;
  }

  const data = await res.json();
  if (data.statusCode !== 200 && data.statusCode !== 201) {
    return fallback ?? null;
  }

  return data.metadata;
};
