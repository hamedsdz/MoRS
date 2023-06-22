// api
import { useGetMovieGenres } from "apis/movies";
// component
import { Select } from "antd";
import { translateText } from "components/translate";

const { Option } = Select;

export default function GenresSelect({ ...props }) {
  const { loading, data } = useGetMovieGenres();
  return (
    <Select loading={loading} allowClear placeholder={translateText("filterByGenre")} {...props}>
      {!!data &&
        data.map((genre, key) => (
          <Option key={key} value={genre}>
            {genre}
          </Option>
        ))}
    </Select>
  );
}
