import Locale from "assets/locale/fa.json";

export function translateText(id) {
  return Locale[id];
}

export default function Translate({ id }) {
  return Locale[id];
}
