// components
import { HiInboxStack } from "react-icons/hi2";
import Caption from "components/caption";

export default function EmptyResult() {
  return (
    <div className="flex flex-col text-center">
      <span className="text-center text-5xl text-neutral-neu6">
        <HiInboxStack />
      </span>
      <Caption text bold>
        dataNotfound
      </Caption>
    </div>
  );
}
