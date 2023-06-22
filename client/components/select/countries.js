// api
import { useGetMovieCountries } from "apis/movies";
// component
import { Select } from "antd";
import { translateText } from "components/translate";

const { Option } = Select;

export default function CountriesSelect({ ...props }) {
  const { loading, data } = useGetMovieCountries();
  return (
    <Select
      loading={loading}
      allowClear
      placeholder={translateText("filterByProductionCountries")}
      {...props}
    >
      {!!data &&
        data.map((countries, key) => (
          <Option key={key} value={countries}>
            {countries}
          </Option>
        ))}
    </Select>
  );
}
