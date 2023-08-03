"use client"

import { Container, Flex, Text } from "@mantine/core"

export default function Home() {
  return (
    <Container py='xl'>
      <Flex mih='60vh' justify='center' align='center' gap='sm' direction='column'>
        <Text size={64}>Welcome</Text>
      </Flex>
    </Container>
  )
}
