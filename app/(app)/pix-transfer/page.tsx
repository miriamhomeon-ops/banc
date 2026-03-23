"use client"

import { Card, CardContent } from "@/components/ui/card"
import { ArrowRightLeft, Copy, QrCode, Download, ArrowLeft } from "lucide-react"
import Link from "next/link"

const pixOptions = [
  { 
    icon: ArrowRightLeft, 
    label: "Transferir", 
    description: "Envie dinheiro para qualquer banco",
    color: "#b8940e"
  },
  { 
    icon: Copy, 
    label: "Pix Copia e Cola", 
    description: "Cole um código Pix para pagar",
    color: "#b8940e"
  },
  { 
    icon: QrCode, 
    label: "Escanear QR Code", 
    description: "Use a câmera para ler um código",
    color: "#b8940e"
  },
  { 
    icon: Download, 
    label: "Receber Pix", 
    description: "Gere um código para receber",
    color: "#b8940e"
  },
]

export default function PixTransferPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="bg-primary px-4 pt-6 pb-8">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-2">
            <Link 
              href="/home" 
              className="w-10 h-10 bg-primary-foreground/10 rounded-full flex items-center justify-center press-effect"
            >
              <ArrowLeft className="h-5 w-5 text-primary-foreground" />
            </Link>
            <div className="flex items-center gap-1 animate-fade-in">
              <span className="text-2xl font-black text-primary-foreground">99</span>
              <span className="text-xl font-semibold text-primary-foreground">Pay</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-md mx-auto px-4 -mt-2">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl font-bold text-foreground">Pix</h1>
          <p className="text-muted-foreground text-sm">Transferências instantâneas 24h</p>
        </div>

        {/* Pix Options */}
        <div className="space-y-3">
          {pixOptions.map((option, index) => (
            <Card 
              key={option.label} 
              className={`shadow-sm border-0 cursor-pointer press-effect opacity-0 animate-fade-in-up stagger-${index + 1}`}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'rgba(245, 197, 24, 0.15)' }}
                  >
                    <option.icon className="h-6 w-6" style={{ color: option.color }} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-card-foreground">{option.label}</p>
                    <p className="text-xs text-muted-foreground">{option.description}</p>
                  </div>
                  <ArrowRightLeft className="h-4 w-4 text-muted-foreground rotate-180" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Info Card */}
        <Card className="mt-6 shadow-sm border-0 animate-fade-in-up stagger-5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(245, 197, 24, 0.15)' }}
              >
                <span className="text-lg" style={{ color: '#b8940e' }}>i</span>
              </div>
              <div>
                <p className="font-medium text-card-foreground text-sm">Pix grátis e sem limites</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Suas transferências Pix são gratuitas, ilimitadas e caem na hora, 24 horas por dia.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Balance Preview */}
        <div className="mt-6 p-4 bg-card rounded-xl shadow-sm animate-fade-in stagger-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Saldo disponível</p>
              <p className="text-lg font-bold text-card-foreground">R$ 24.105,66</p>
            </div>
            <div 
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'rgba(245, 197, 24, 0.15)', color: '#b8940e' }}
            >
              115% do CDI
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
