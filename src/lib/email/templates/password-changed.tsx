import {
  Body,
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
 * Password Changed Confirmation Email Template
 *
 * Sent after a successful password reset to confirm the change.
 */

interface PasswordChangedEmailProps {
  userName: string;
}

export function PasswordChangedEmail({
  userName = "User",
}: PasswordChangedEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Your ADVERT password has been changed</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Password Changed</Heading>
          </Section>

          <Section style={content}>
            <Text style={text}>Hi {userName},</Text>

            <Text style={text}>
              Your ADVERT password has been successfully changed. You can now log
              in with your new password.
            </Text>

            <Text style={warningText}>
              If you did not make this change, please contact support
              immediately. Your account may have been compromised.
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
  color: "#991b1b",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "24px 0 0 0",
  padding: "12px 16px",
  backgroundColor: "#fef2f2",
  borderRadius: "6px",
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

export default PasswordChangedEmail;
