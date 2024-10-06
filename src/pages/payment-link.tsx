import { useParams } from "react-router-dom";

export const PaymentLinkPage = () => {
  const param = useParams();
  console.log(param);
  return <>This is payment link is {param.link}</>;
};
