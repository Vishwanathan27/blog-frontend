import React from "react";
import Details from "@/components/Details/Details";
import ProtectedRoute from "../../shared/ProtectedRoute";

export default function Login() {
  return (
    <ProtectedRoute>
      <Details />
    </ProtectedRoute>
  );
}
