"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field"
import { Spinner } from "@/components/ui/spinner"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { login, user, isLoading } = useAuth()

  // Redireciona automaticamente quando o usuário está logado
  useEffect(() => {
    if (user) {
      window.location.href = "/home"
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    // Simula delay de loading
    await new Promise(resolve => setTimeout(resolve, 800))

    try {
      const success = await login(username, password) // ✅ await
      if (!success) {
        setError("Usuário ou senha inválidos")
        setIsSubmitting(false)
      }
      // Se login tiver sucesso, o useEffect acima faz o redirect
    } catch (err) {
      setError("Erro ao logar, tente novamente")
      setIsSubmitting(false)
    }
  }

  // Tela de loading enquanto verifica se já está logado
  if (isLoading) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center">
          <div className="w-20 h-20 bg-card rounded-full mx-auto flex items-center justify-center shadow-lg mb-4 animate-pulse-soft">
            <span className="text-3xl font-bold text-primary">99</span>
          </div>
          <Spinner className="h-6 w-6 mx-auto text-primary-foreground" />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-primary p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-card rounded-full mx-auto flex items-center justify-center shadow-lg mb-4">
            <span className="text-3xl font-bold text-primary">99</span>
          </div>
          <h1 className="text-2xl font-bold text-primary-foreground">99Pay</h1>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="pb-4">
            <h2 className="text-xl font-semibold text-center text-card-foreground">Entrar</h2>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="username">Usuário</FieldLabel>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Digite seu usuário"
                    required
                    className="h-12 rounded-xl"
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    required
                    className="h-12 rounded-xl"
                  />
                </Field>
              </FieldGroup>

              {error && (
                <p className="text-destructive text-sm text-center mt-4">{error}</p>
              )}

              <Button
                type="submit"
                className="w-full h-12 mt-6 rounded-xl text-base font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Spinner className="h-5 w-5" />
                    Entrando...
                  </span>
                ) : (
                  "Entrar"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
