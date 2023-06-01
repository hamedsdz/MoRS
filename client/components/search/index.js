import { useState } from "react";
// components
import Caption from "components/caption";
import { FaTimes, FaSearch } from "react-icons/fa";
import { Modal, Input, List, Skeleton, Avatar, Button } from "antd";
import { translateText } from "components/translate";

export default function SearchModal({ open, setOpen }) {
  const [initLoading, setInitLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);

  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(5)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: "center",
          marginTop: 12,
          height: 32,
          lineHeight: "32px",
        }}
      >
        <Button onClick={onLoadMore}>{translateText("showAll")}</Button>
      </div>
    ) : null;

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
        className="bg-gray-900"
      >
        <Input
          placeholder={`${translateText("search")}...`}
          size="small"
          type="text"
          prefix={<FaSearch className="p-2" />}
          className="flex-1 px-1 mb-2"
        />
        <List
          className="max-h-[calc(100vh/1.5)] overflow-y-auto"
          loading={initLoading}
          itemLayout="horizontal"
          loadMore={loadMore}
          dataSource={list}
          renderItem={(item) => (
            <List.Item>
              <Skeleton avatar title={false} loading={item.loading} active>
                <List.Item.Meta
                  avatar={<Avatar src={item.picture.large} />}
                  title={<a href="#">{item.name?.last}</a>}
                  description=""
                />
              </Skeleton>
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
}
