import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

/**
 * Password Reset Email Template
 *
 * Sent when a user requests a password reset.
 */

interface PasswordResetEmailProps {
  userName: string;
  resetUrl: string;
}

export function PasswordResetEmail({
  userName = "User",
  resetUrl = "https://advert.app/auth/reset-password?token=example",
}: PasswordResetEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Reset your ADVERT password</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Reset Your Password</Heading>
          </Section>

          <Section style={content}>
            <Text style={text}>Hi {userName},</Text>

            <Text style={text}>
              We received a request to reset the password for your ADVERT
              account. Click the button below to choose a new password.
            </Text>

            <Section style={buttonSection}>
              <Button style={button} href={resetUrl}>
                Reset Password
              </Button>
            </Section>

            <Text style={text}>
              This link will expire in <strong>1 hour</strong>. If you need a
              new link, visit the forgot password page and request another one.
            </Text>

            <Text style={warningText}>
              If you didn&apos;t request a password reset, you can safely ignore
              this email. Your password will not be changed.
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              &copy; {new Date().getFullYear()}{" "}
              <Link href="https://advert.app" style={link}>
                ADVERT
              </Link>
              . All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0 48px",
  marginBottom: "64px",
  maxWidth: "560px",
};

const header = {
  padding: "0 48px",
  textAlign: "center" as const,
};

const h1 = {
  color: "#1d1c1d",
  fontSize: "28px",
  fontWeight: "700",
  margin: "30px 0",
  padding: "0",
  lineHeight: "36px",
};

const content = {
  padding: "0 48px",
};

const text = {
  color: "#1d1c1d",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const warningText = {
  color: "#b45309",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "24px 0 0 0",
  padding: "12px 16px",
  backgroundColor: "#fef3c7",
  borderRadius: "6px",
};

const buttonSection = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#0f172a",
  borderRadius: "6px",
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  padding: "12px 24px",
};

const footer = {
  padding: "0 48px",
  borderTop: "1px solid #e6ebf1",
  marginTop: "32px",
  paddingTop: "20px",
};

const footerText = {
  color: "#8898aa",
  fontSize: "12px",
  lineHeight: "16px",
  textAlign: "center" as const,
};

const link = {
  color: "#556cd6",
  textDecoration: "none",
};

export default PasswordResetEmail;
