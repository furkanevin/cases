const Item = ({ ad }) => {
  const infoData = [
    ad.ad_status,
    ad.ad_category,
    ad.ad_province_name,
    ad.ad_district_name,
    ad.ad_nhood_name,
  ];
  return (
    <div className="bg-blue-200 p-5 rounded-lg border-[2px] border-blue-500 text-black flex flex-col gap-3">
      <h1 className="text-lg font-semibold">{ad.ad_page_title}</h1>
      <p>{ad.ad_comment.slice(0, 50) + '...'}</p>

      <div className="flex flex-wrap gap-6">
        {infoData.map((text, i) => (
          <span key={i} className="bg-blue-500 p-1 rounded text-white shadow">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Item;
