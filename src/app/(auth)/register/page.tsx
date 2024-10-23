import AuthLayout from "@/components/common/auth-layout";
import { constructMetadata } from "@/lib/utils/construct-metadata";
import RegisterationForm from "./form";

export const metadata = constructMetadata({
  title: `Create your ${process.env.NEXT_PUBLIC_APP_NAME} account`,
});

export default function RegisterPage() {
  return (
    <AuthLayout variant="register">
      <RegisterationForm />
    </AuthLayout>
  );
}
