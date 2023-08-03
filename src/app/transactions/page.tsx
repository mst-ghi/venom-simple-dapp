"use client"

import { useApp } from "@/store"
import { currency, previewAddress, unixToDate } from "@/utils"
import { Container, Text } from "@mantine/core"
import { DataTable } from "mantine-datatable"

export default function Home() {
  const { wallet } = useApp()

  return (
    <Container py='xl'>
      {wallet?.data?.transactions[0] && (
        <DataTable
          height={700}
          idAccessor='id.lt'
          withBorder
          borderRadius='lg'
          withColumnBorders
          striped
          highlightOnHover
          records={wallet?.data?.transactions}
          columns={[
            { accessor: "totalFees", render: ({ totalFees }) => <span>{currency(totalFees)}</span> },
            {
              accessor: "inMessage.src",
              title: "Source Address",
              render: ({ inMessage }) => <span>{previewAddress(inMessage.src?.toString())}</span>,
            },
            {
              accessor: "inMessage.dst",
              title: "Destination Address",
              render: ({ inMessage }) => <span>{previewAddress(inMessage.dst?.toString())}</span>,
            },
            { accessor: "createdAt", render: ({ createdAt }) => <span>{unixToDate(createdAt)}</span> },
          ]}
        />
      )}

      {!wallet?.data?.transactions[0] && <Text size={64}>Transactions nt found</Text>}
    </Container>
  )
}
