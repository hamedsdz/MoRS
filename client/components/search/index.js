import { useState } from "react";
// api
import { useSearchMovies } from "apis/movies";
// components
import Caption from "components/caption";
import { FaTimes, FaSearch } from "react-icons/fa";
import { Modal, Input, List } from "antd";
import Card from "components/card";
import { translateText } from "components/translate";

export default function SearchModal({ open, setOpen }) {
  const limit = 5;
  const [search, setSearch] = useState(undefined);
  const [page, setPage] = useState(1);

  const [{ loading, data }, apiCall] = useSearchMovies();

  return (
    <div>
      <Modal
        title={<Caption text>searchMovie</Caption>}
        centered
        closable
        open={open}
        closeIcon={<FaTimes />}
        footer={null}
        onCancel={() => setOpen(false)}
        className="w-3/5"
      >
        <Input
          placeholder={`${translateText("search")}...`}
          size="small"
          type="text"
          prefix={<FaSearch className="p-2" />}
          className="flex-1 px-1 mb-2"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          onPressEnter={() => apiCall({ search, limit, page })}
        />
        <List
          className="max-h-[calc(100vh/1.5)] overflow-y-auto overflow-x-hidden py-4 shadow-none items-center justify-center"
          loading={loading}
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3,
            xxl: 3,
          }}
          dataSource={data?.movies?.docs ?? []}
          renderItem={(item) => (
            <List.Item>
              <Card poster={item.poster_path} size="small" />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}
