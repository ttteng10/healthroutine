import { Navigate, Route, Routes } from "react-router";
import SignInPage from "./pages/sign-in-page";
import SignUpPage from "./pages/sign-up-page";
import ForgetPasswordPage from "./pages/forget-password-page";
import IndexPage from "./pages/index-page";
import GlobalLayout from "./components/layout/global-layout";
import GuestOnlyLayout from "./components/layout/guest-only-layout";
import MemberOnlyLayout from "./components/layout/member-only-layout";
import ResetPasswordPage from "./pages/reset-password-page";

export default function RootRoute() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route element={<GuestOnlyLayout />}>
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/forget-password" element={<ForgetPasswordPage />} />
        </Route>

        <Route element={<MemberOnlyLayout />}>
          <Route path="/" element={<IndexPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
}
