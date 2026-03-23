"use client"

import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function DadosPessoais() {
  return (
    <main className="min-h-screen p-4 max-w-md mx-auto">

      <header className="mb-6">
        <Link href="/home" className="text-sm text-primary">← Voltar</Link>
        <h1 className="text-xl font-bold mt-2">Dados pessoais</h1>
      </header>

      <Card>
        <CardContent className="p-4 space-y-4">

          <div>
            <p className="text-sm text-muted-foreground">Nome</p>
            <p className="font-semibold">Nelis Charello da Silva</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">CPF</p>
            <p className="font-semibold">400.112.242-15</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Endereço</p>
            <p className="font-semibold">
              Rua Goiânia, 520<br/>
              Cajuru<br/>
              Curitiba - PR
            </p>
          </div>

        </CardContent>
      </Card>

    </main>
  )
}
