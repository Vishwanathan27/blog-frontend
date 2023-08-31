import React from "react";

import ProtectedRoute from "../../shared/ProtectedRoute";
import dynamic from "next/dynamic";
const Details = dynamic(() => import("../../components/Details/Details"), {
  ssr: false,
});

export default function Login() {
  return (
    <ProtectedRoute>
      <Details />
    </ProtectedRoute>
  );
}
