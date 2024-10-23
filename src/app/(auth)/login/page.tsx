import AuthLayout from "@/components/common/auth-layout";
import { constructMetadata } from "@/lib/utils/construct-metadata";
import LoginForm from "./form";

export const metadata = constructMetadata({
  title: "Log into your workspace",
});

export default function Login() {
  return (
    <AuthLayout variant="login">
      <LoginForm />
    </AuthLayout>
  );
}
