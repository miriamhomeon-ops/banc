"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, FileText, TrendingUp, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/home", icon: Home, label: "Home" },
  { href: "/extrato", icon: FileText, label: "Extrato" },
  { href: "/rendimentos", icon: TrendingUp, label: "Rendimentos" },
  { href: "/configuracoes", icon: Settings, label: "Config" },
]

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg safe-area-bottom animate-fade-in">
      <div className="max-w-md mx-auto flex items-center justify-around py-2 px-4 pb-safe">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-2 rounded-xl min-w-[60px]",
                "transition-all duration-200 ease-out",
                "active:scale-90",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <div className={cn(
                "relative transition-transform duration-200",
                isActive && "scale-110"
              )}>
                <item.icon className={cn("h-6 w-6", isActive && "stroke-[2.5px]")} />
                {isActive && (
                  <span 
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary animate-scale-in"
                    style={{ backgroundColor: '#b8940e' }}
                  />
                )}
              </div>
              <span className={cn(
                "text-xs transition-all duration-200",
                isActive ? "font-semibold" : "font-medium"
              )}>
                {item.label}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
