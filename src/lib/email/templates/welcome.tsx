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
 * Welcome Email Template
 *
 * Sent to new users after successful registration.
 */

interface WelcomeEmailProps {
  userName: string;
  userEmail: string;
  tenantName: string;
  loginUrl?: string;
}

export function WelcomeEmail({
  userName = "User",
  userEmail = "user@example.com",
  tenantName = "Your Workspace",
  loginUrl = "https://advert.app/login",
}: WelcomeEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Welcome to ADVERT - Your Brand Strategy Co-Pilot</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Welcome to ADVERT!</Heading>
          </Section>

          <Section style={content}>
            <Text style={text}>Hi {userName},</Text>

            <Text style={text}>
              Thank you for creating your account on ADVERT! We&apos;re excited to have
              you on board.
            </Text>

            <Text style={text}>
              Your workspace <strong>{tenantName}</strong> is now ready. With
              ADVERT, you can create powerful brand strategies using our AI
              co-pilot.
            </Text>

            <Text style={text}>Here&apos;s what you can do next:</Text>

            <ul style={list}>
              <li style={listItem}>
                Create your first brand strategy using our guided wizard
              </li>
              <li style={listItem}>
                Let our AI co-pilot interview you to gather brand insights
              </li>
              <li style={listItem}>
                Generate the 6 pillars of your brand strategy automatically
              </li>
              <li style={listItem}>
                Edit, refine, and export your strategies
              </li>
            </ul>

            <Section style={buttonSection}>
              <Button style={button} href={loginUrl}>
                Get Started
              </Button>
            </Section>

            <Text style={text}>
              If you have any questions, feel free to reach out to our support
              team.
            </Text>

            <Text style={mutedText}>
              This email was sent to {userEmail}. If you didn&apos;t create an
              account on ADVERT, you can safely ignore this email.
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

const list = {
  paddingLeft: "20px",
  margin: "16px 0",
};

const listItem = {
  color: "#1d1c1d",
  fontSize: "16px",
  lineHeight: "28px",
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

const mutedText = {
  color: "#666",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "24px 0 0 0",
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

export default WelcomeEmail;
