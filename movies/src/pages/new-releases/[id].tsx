import { useRouter } from "next/router";
import React from "react";

const NewReleaseById = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>NewReleaseById: {id}</div>;
};

export default NewReleaseById;
