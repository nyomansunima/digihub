import * as React from 'react'
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components'
import { FC } from 'react'

interface VerifyEmailTemplateProps {
  fullName: string
  verificationCode: string
}

/**
 * Render email for verification email
 * and activate the user account
 *
 * @returns {FC}
 */
const VerifyEmailTemplate: FC<VerifyEmailTemplateProps> = ({
  fullName,
  verificationCode,
}) => {
  return (
    <Html>
      <Head>
        <title>Verify Your DigiHub Account</title>
      </Head>
      <Preview>Verify email address & activate your account on DigiHub</Preview>
      <Tailwind>
        <Body className="bg-neutral-100 flex justify-center items-center py-20">
          <Container className="bg-white rounded-xl p-5 flex flex-col">
            <Section>
              <Heading as="h2">Verify DigiHub Account</Heading>
              <Hr />

              <Text className="font-medium">Hi {fullName}</Text>

              <Text>
                Thanks to join the amazing platform, We glad you are here.
                Before you can explore anything, please copy this verification
                code to activate your account.
              </Text>

              <Text className="text-2xl font-medium flex justify-center items-center px-10 py-4 rounded-lg bg-neutral-100">
                {verificationCode}
              </Text>

              <Text>
                Please don't share this code to anyone. To ensure your account
                secure. NOTE: This verification code only work for 5 mins
              </Text>

              <Hr />

              <Text className="font-medium">Happy Growing!</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export { VerifyEmailTemplate }
