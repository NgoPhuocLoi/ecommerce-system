const PagePlaceholder = () => {
  return (
    <div
      className="mx-2 my-[2px] py-[200px] text-center text-sm text-gray-600"
      style={{
        background:
          'linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMCcgaGVpZ2h0PScxMCc+DQogIDxyZWN0IHdpZHRoPScxMCcgaGVpZ2h0PScxMCcgZmlsbD0nd2hpdGUnLz4NCiAgPHBhdGggZD0nTS0xLDEgbDIsLTINCiAgICAgICAgICAgTTAsMTAgbDEwLC0xMA0KICAgICAgICAgICBNOSwxMSBsMiwtMicgc3Ryb2tlPScjY2NjJyBzdHJva2Utd2lkdGg9JzEnIHN0cm9rZS1kYXNoYXJyYXk9JzEsMScvPg0KPC9zdmc+DQo=")',
      }}
    >
      Nội dung các trang khác sẽ hiển thị ở đây
    </div>
  );
};

export default PagePlaceholder;
