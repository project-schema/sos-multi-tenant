import { useRouter } from "next/router";

const SubsCheckout = () => {
  const router = useRouter();
  const { id } = router?.query;
  return <div>{id}</div>;
};

export default SubsCheckout;
