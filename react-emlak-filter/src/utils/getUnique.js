export const getUniqueCities = (data) => {
  const uniqueProvinces = {};

  data.forEach((entry) => {
    const provinceId = entry.ad_province_id;
    const provinceName = entry.ad_province_name;

    if (!uniqueProvinces[provinceId]) {
      uniqueProvinces[provinceId] = {
        id: provinceId,
        name: provinceName,
      };
    }
  });

  const result = Object.values(uniqueProvinces);

  return result;
};

export const getUniqueDistricts = (data, cityId) => {
  const uniqueDistricts = new Set();

  data.forEach((entry) => {
    if (entry.ad_province_id === cityId) {
      uniqueDistricts.add(entry.ad_district_name);
    }
  });

  return Array.from(uniqueDistricts);
};
