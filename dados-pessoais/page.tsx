"use client"

import { useAuth } from "@/lib/auth-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Shield, Bell, HelpCircle, LogOut, ChevronRight } from "lucide-react"

const menuItems = [
  { icon: User, label: "Dados pessoais", href: "#" },
  { icon: Shield, label: "Segurança", href: "#" },
  { icon: Bell, label: "Notificações", href: "#" },
  { icon: HelpCircle, label: "Ajuda", href: "#" },
]

export default function ConfiguracoesPage() {
  const { user, logout } = useAuth()

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-primary px-4 pt-6 pb-6">
        <div className="max-w-md mx-auto animate-fade-in">
          <h1 className="text-xl font-bold text-primary-foreground">Configurações</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto px-4 mt-4 pb-24">
        {/* Profile Card */}
        <Card className="shadow-sm border-0 animate-fade-in-up">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center animate-scale-in">
                <span className="text-2xl font-bold text-foreground">N</span>
              </div>
              <div className="animate-slide-in-right">
                <p className="text-lg font-semibold text-card-foreground">{user?.name}</p>
                <p className="text-sm text-muted-foreground">@{user?.username}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Items */}
        <Card className="mt-4 shadow-sm border-0 animate-fade-in-up stagger-2">
          <CardContent className="p-0">
            {menuItems.map((item, index) => (
              <button
                key={item.label}
                className={`w-full flex items-center justify-between p-4 transition-all duration-200 press-effect hover:bg-muted/50 opacity-0 animate-slide-in-right stagger-${index + 1} ${
                  index < menuItems.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-foreground" />
                  </div>
                  <span className="text-sm font-medium text-card-foreground">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            ))}
          </CardContent>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={logout}
          variant="outline"
          className="w-full mt-6 h-12 rounded-xl border-destructive text-destructive hover:bg-destructive/10 press-effect animate-fade-in stagger-6"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Sair da conta
        </Button>

        {/* App Version */}
        <p className="text-center text-xs text-muted-foreground mt-8 animate-fade-in stagger-6">
          99Pay v1.0.0
        </p>
      </div>
    </main>
  )
}
